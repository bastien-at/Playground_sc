import { ExecuteWorkflowRequestBody, ExecuteWorkflowResponse } from "@/lib/types";
import { Buffer } from "buffer";

type ExecuteOptions = {
  timeoutMs?: number;
};

function parsePositiveInt(v: string | undefined): number | null {
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  const i = Math.trunc(n);
  return i > 0 ? i : null;
}

function formatDurationMs(ms: number) {
  if (!Number.isFinite(ms) || ms <= 0) return `${ms}ms`;
  const s = ms / 1000;
  return Number.isInteger(s) ? `${s}s` : `${s.toFixed(1)}s`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetriableStatus(status: number) {
  return status >= 500 && status <= 599;
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

export async function executeN8nWorkflow(
  payload: ExecuteWorkflowRequestBody,
  opts: ExecuteOptions = {},
): Promise<{ ok: true; data: unknown } | { ok: false; error: { message: string; status?: number; code?: string } }> {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    return {
      ok: false,
      error: {
        message:
          "Configuration manquante: N8N_WEBHOOK_URL n'est pas défini côté serveur.",
        code: "ENV_MISSING",
      },
    };
  }

  const timeoutFromEnv = parsePositiveInt(process.env.N8N_TIMEOUT_MS);
  const timeoutMs = opts.timeoutMs ?? timeoutFromEnv ?? 30_000;
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  const apiKey = process.env.N8N_API_KEY;
  if (apiKey) headers["x-n8n-api-key"] = apiKey;

  const basicUser = process.env.N8N_BASIC_AUTH_USER;
  const basicPass = process.env.N8N_BASIC_AUTH_PASSWORD;
  if (basicUser && basicPass) {
    const token = Buffer.from(`${basicUser}:${basicPass}`, "utf8").toString(
      "base64",
    );
    headers["authorization"] = `Basic ${token}`;
  }

  if (!payload.input) {
    return {
      ok: false,
      error: {
        message:
          "Body invalide: input est requis pour appeler ce webhook n8n (firstname/lastname/message).",
        code: "VALIDATION_ERROR",
      },
    };
  }

  const n8nBody = {
    firstname: payload.input.firstname,
    lastname: payload.input.lastname,
    message: payload.input.message,
  };

  const body = JSON.stringify(n8nBody);

  let lastError: { message: string; status?: number; code?: string } | null = null;

  const maxAttempts = 2;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers,
          body,
        },
        timeoutMs,
      );

      const text = await res.text();
      const data = text ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      })() : null;

      if (!res.ok) {
        const snippet =
          typeof data === "string"
            ? data.slice(0, 500)
            : JSON.stringify(data).slice(0, 500);

        console.error("[n8n-client] non-OK response", {
          url,
          status: res.status,
          statusText: res.statusText,
          snippet,
        });

        const err = {
          message:
            typeof data === "string"
              ? data
              : (data as any)?.message || `Erreur n8n (${res.status}): ${snippet}`,
          status: res.status,
          code: "N8N_HTTP_ERROR",
        };
        lastError = err;

        if (isRetriableStatus(res.status) && attempt < maxAttempts - 1) {
          await sleep(300 * (attempt + 1));
          continue;
        }
        return { ok: false, error: err };
      }

      return { ok: true, data };
    } catch (e: any) {
      const isAbort = e?.name === "AbortError";

      console.error("[n8n-client] request failed", {
        url,
        isAbort,
        name: e?.name,
        message: e?.message,
        cause: e?.cause,
      });

      const technical = typeof e?.message === "string" && e.message
        ? ` (${e.message})`
        : "";
      lastError = {
        message: isAbort
          ? `Timeout: n8n n'a pas répondu sous ${formatDurationMs(timeoutMs)}.${technical}`
          : `Erreur réseau lors de l'appel à n8n.${technical}`,
        code: isAbort ? "TIMEOUT" : "NETWORK_ERROR",
      };

      if (attempt < maxAttempts - 1) {
        await sleep(300 * (attempt + 1));
        continue;
      }

      return { ok: false, error: lastError };
    }
  }

  return {
    ok: false,
    error: lastError ?? { message: "Erreur inconnue", code: "UNKNOWN" },
  };
}

export function toApiResponse(
  executionId: string,
  startedAtMs: number,
  result:
    | { ok: true; data: unknown }
    | { ok: false; error: { message: string; status?: number; code?: string } },
): ExecuteWorkflowResponse {
  const executedAt = new Date().toISOString();
  const durationMs = Date.now() - startedAtMs;

  if (result.ok) {
    return {
      success: true,
      data: result.data,
      executedAt,
      executionId,
      durationMs,
    };
  }

  return {
    success: false,
    error: result.error,
    executedAt,
    executionId,
    durationMs,
  };
}
