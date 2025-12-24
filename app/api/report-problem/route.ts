import { NextResponse } from "next/server";
import { z } from "zod";

function truncateString(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max) + "...";
}

function toAirtableDateOnly(input: string | undefined) {
  const d = input ? new Date(input) : new Date();
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function parseAirtableFieldNameFromMessage(message: unknown): string | null {
  if (typeof message !== "string") return null;

  const unknownField = message.match(/Unknown field name: \\"([^\\"]+)\\"/);
  if (unknownField?.[1]) return unknownField[1];

  const invalidValue = message.match(/Field \\"([^\\"]+)\\"/);
  if (invalidValue?.[1]) return invalidValue[1];

  return null;
}

const schema = z.object({
  comment: z.string().min(1).max(2000),
  executionId: z.string().min(1).max(200).optional(),
  success: z.boolean().optional(),
  executedAt: z.string().optional(),
  payload: z.unknown().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Body JSON invalide" } },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Validation échouée" } },
      { status: 400 },
    );
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!apiKey || !baseId || !tableName) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            "Configuration manquante: AIRTABLE_API_KEY / AIRTABLE_BASE_ID / AIRTABLE_TABLE_NAME",
          code: "ENV_MISSING",
        },
      },
      { status: 500 },
    );
  }

  const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`;

  const payloadJson = JSON.stringify(parsed.data.payload ?? null);
  const payloadTruncated = truncateString(payloadJson, 90_000);

  const executedAt = toAirtableDateOnly(parsed.data.executedAt);

  const fields: Record<string, unknown> = {
    ExecutionId: parsed.data.executionId ?? "—",
    Comment: parsed.data.comment,
    Payload: payloadTruncated,
  };

  if (typeof parsed.data.success === "boolean") {
    fields.Success = parsed.data.success;
  }

  if (executedAt) {
    fields.ExecutedAt = executedAt;
  }

  const record = {
    fields,
  };

  async function postToAirtable(r: { fields: Record<string, unknown> }) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ records: [r] }),
    });

    const text = await res.text();
    const data = text
      ? (() => {
          try {
            return JSON.parse(text);
          } catch {
            return text;
          }
        })()
      : null;

    return { res, data };
  }

  let attemptRecord: { fields: Record<string, unknown> } = record;
  for (let attempt = 0; attempt < 2; attempt++) {
    const { res, data } = await postToAirtable(attemptRecord);
    if (res.ok) {
      return NextResponse.json({ success: true, data }, { status: 200 });
    }

    const errType = (data as any)?.error?.type;
    const errMessage =
      typeof data === "string"
        ? data
        : (data as any)?.error?.message || `Erreur Airtable (${res.status})`;

    const snippet =
      typeof data === "string"
        ? data.slice(0, 800)
        : JSON.stringify(data).slice(0, 800);

    console.error("[report-problem] airtable error", {
      status: res.status,
      statusText: res.statusText,
      type: errType,
      snippet,
    });

    const canRetry =
      attempt === 0 &&
      (errType === "UNKNOWN_FIELD_NAME" || errType === "INVALID_VALUE_FOR_COLUMN");

    if (canRetry) {
      const fieldName = parseAirtableFieldNameFromMessage(errMessage);
      if (fieldName && fieldName in attemptRecord.fields) {
        const { [fieldName]: _, ...rest } = attemptRecord.fields;
        attemptRecord = { fields: rest };
        continue;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: errMessage,
          status: res.status,
          code: "AIRTABLE_HTTP_ERROR",
        },
      },
      { status: res.status },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: { message: "Erreur Airtable (retries épuisés)", code: "AIRTABLE_HTTP_ERROR" },
    },
    { status: 500 },
  );
}
