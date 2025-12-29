import { NextResponse } from "next/server";
import { z } from "zod";

import { executeN8nWorkflow, toApiResponse } from "@/lib/n8n-client";
import { sanitizeString } from "@/lib/utils";

const schema = z
  .object({
    input: z
      .object({
        firstname: z.string().min(1).max(200),
        lastname: z.string().min(1).max(200),
        message: z.string().min(1).max(10_000),
      })
      .optional(),
    firstname: z.string().min(1).max(200).optional(),
    lastname: z.string().min(1).max(200).optional(),
    message: z.string().min(1).max(10_000).optional(),
    dryRun: z.boolean().optional(),
    jsonPayload: z.record(z.unknown()).optional(),

    param1: z.string().min(1).max(200).optional(),
    param2: z.string().min(1).max(200).optional(),
  })
  .superRefine((val, ctx) => {
    const hasInput = Boolean(val.input);
    const hasFlat = Boolean(val.firstname && val.lastname && val.message);
    const hasLegacy = Boolean(val.param1 && val.param2);
    if (!hasInput && !hasFlat && !hasLegacy) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Body invalide: fournir input ou (firstname + lastname + message) ou (param1 + param2)",
      });
    }

    if (val.input && (val.firstname || val.lastname || val.message)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Body invalide: ne pas mélanger input.* avec des champs à plat (firstname/lastname/message)",
      });
    }
  });

type RateLimitEntry = { count: number; windowStartMs: number };

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

const rateLimitStore: Map<string, RateLimitEntry> = (globalThis as any)
  .__n8n_workflow_rate_limit_store__
  ? (globalThis as any).__n8n_workflow_rate_limit_store__
  : new Map();

(globalThis as any).__n8n_workflow_rate_limit_store__ = rateLimitStore;

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now - current.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStartMs: now });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0 };
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return { ok: true, remaining: RATE_LIMIT_MAX - current.count };
}

function asRecord(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  return v as Record<string, unknown>;
}

function getString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function stripMarkdownCodeFences(raw: string): string {
  let s = raw.trim();

  // Handle fenced blocks like ```json ... ``` (or ``` ... ```)
  if (s.startsWith("```")) {
    s = s.replace(/^```[a-zA-Z]*\s*/m, "");
    s = s.replace(/```\s*$/m, "");
    return s.trim();
  }

  // Handle malformed fences like ``json ... ``
  if (s.startsWith("``")) {
    s = s.replace(/^``[a-zA-Z]*\s*/m, "");
    s = s.replace(/``\s*$/m, "");
    return s.trim();
  }

  return s;
}

function parseJudge(judge: unknown):
  | { decision?: string; note?: number; feedback?: string[] }
  | null {
  if (!judge) return null;

  if (typeof judge === "string") {
    const trimmed = stripMarkdownCodeFences(judge);
    if (!trimmed) return null;
    try {
      const parsed = JSON.parse(trimmed);
      return asRecord(parsed) as any;
    } catch {
      return { feedback: [trimmed] };
    }
  }

  if (typeof judge === "object") return asRecord(judge) as any;
  return null;
}

function normalizeN8nResponseData(data: unknown): unknown {
  const item = Array.isArray(data) ? data[0] : data;
  const root = asRecord(item);
  if (!root) return data;

  const motif = getString(root.motif);
  const reponse = getString(root.reponse);
  const judge = parseJudge(root.judge);
  const client = asRecord(root.client);

  if (!motif && !reponse && !judge && !client) return data;

  const decisionRaw = judge ? getString((judge as any).decision) : null;
  const feedback = judge && Array.isArray((judge as any).feedback)
    ? ((judge as any).feedback as unknown[])
        .map(getString)
        .filter((v): v is string => Boolean(v))
    : [];

  const status =
    decisionRaw === "ACCEPT" || decisionRaw === "GO" ? "GO" : decisionRaw ? "KO" : null;

  return {
    motif_ia: motif,
    client: {
      firstname: client ? getString(client.firstname) : null,
      lastname: client ? getString(client.lastname) : null,
      message: client ? getString(client.message) : null,
    },
    response: {
      gemini: {
        status,
        response: reponse,
        ko_reason: feedback.length ? feedback.join("\n") : null,
        judge: judge ?? null,
      },
    },
  };
}

export async function POST(req: Request) {
  const startedAtMs = Date.now();
  const executionId = crypto.randomUUID();

  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);

  if (!rl.ok) {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Rate limit: 10 requêtes/minute" },
        executedAt: new Date().toISOString(),
        executionId,
        durationMs: Date.now() - startedAtMs,
      },
      {
        status: 429,
        headers: {
          "x-ratelimit-limit": String(RATE_LIMIT_MAX),
          "x-ratelimit-remaining": "0",
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Body JSON invalide" },
        executedAt: new Date().toISOString(),
        executionId,
        durationMs: Date.now() - startedAtMs,
      },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Validation échouée" },
        executedAt: new Date().toISOString(),
        executionId,
        durationMs: Date.now() - startedAtMs,
      },
      { status: 400 },
    );
  }

  const normalizedInput = parsed.data.input
    ? {
        firstname: parsed.data.input.firstname,
        lastname: parsed.data.input.lastname,
        message: parsed.data.input.message,
      }
    : parsed.data.firstname && parsed.data.lastname && parsed.data.message
      ? {
          firstname: parsed.data.firstname,
          lastname: parsed.data.lastname,
          message: parsed.data.message,
        }
      : undefined;

  const payload = {
    input: normalizedInput
      ? {
          firstname: sanitizeString(normalizedInput.firstname),
          lastname: sanitizeString(normalizedInput.lastname),
          message: sanitizeString(normalizedInput.message),
        }
      : undefined,
    dryRun: parsed.data.dryRun,
    jsonPayload: parsed.data.jsonPayload,
    param1: parsed.data.param1 ? sanitizeString(parsed.data.param1) : undefined,
    param2: parsed.data.param2 ? sanitizeString(parsed.data.param2) : undefined,
  };

  console.log("[execute-workflow]", {
    executionId,
    executedAt: new Date().toISOString(),
    ip,
    hasInput: Boolean(payload.input),
    messageLen: payload.input?.message.length,
    hasLegacyParams: Boolean(payload.param1 && payload.param2),
    hasJsonPayload: Boolean(payload.jsonPayload),
    dryRun: Boolean(payload.dryRun),
  });

  const result = await executeN8nWorkflow(payload);
  const normalizedResult = result.ok
    ? { ok: true as const, data: normalizeN8nResponseData(result.data) }
    : result;
  const response = toApiResponse(executionId, startedAtMs, normalizedResult);

  const status = response.success ? 200 : response.error.status ?? 500;

  return NextResponse.json(response, {
    status,
    headers: {
      "x-ratelimit-limit": String(RATE_LIMIT_MAX),
      "x-ratelimit-remaining": String(rl.remaining),
    },
  });
}
