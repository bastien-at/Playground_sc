import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeJsonParse(input: string):
  | { ok: true; value: unknown }
  | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(input) };
  } catch {
    return { ok: false, error: "JSON invalide" };
  }
}

export function sanitizeString(input: string) {
  return input.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}
