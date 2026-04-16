import { cookies, headers } from "next/headers";

export type ConsentGeoLabel = "eu" | "us" | "other";
export type UsOptInMode = "off" | "ca" | "all";

export type ConsentPolicy = {
  requiresOptIn: boolean;
  countryCode: string | null;
  countrySubdivision: string | null;
  geoLabel: ConsentGeoLabel;
};

const EU_UK_EEA_CH = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "UK",
  "IS",
  "LI",
  "NO",
  "CH",
] as const;

const EU_UK_EEA_CH_SET = new Set<string>(EU_UK_EEA_CH);

/** ISO 3166-1 alpha-2 country codes where GDPR-style opt-in applies. Exposed for Consent Mode v2 `region`. */
export const EU_UK_EEA_CH_CODES: readonly string[] = EU_UK_EEA_CH;

export function isEuUkEea(countryCode: string | null | undefined): boolean {
  if (!countryCode) return false;
  return EU_UK_EEA_CH_SET.has(countryCode.trim().toUpperCase());
}

export function getConsentGeoLabel(
  countryCode: string | null | undefined,
): ConsentGeoLabel {
  if (!countryCode) return "other";
  const upper = countryCode.trim().toUpperCase();
  if (upper === "US") return "us";
  if (isEuUkEea(upper)) return "eu";
  return "other";
}

export function normalizeUsSubdivision(
  raw: string | null | undefined,
): string | null {
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();
  if (upper.length === 2) return upper;
  const parts = upper.split("-");
  const last = parts[parts.length - 1];
  return last && last.length === 2 ? last : null;
}

function getUsOptInMode(): UsOptInMode {
  const raw = process.env.NEXT_PUBLIC_CONSENT_US_OPT_IN?.trim().toLowerCase();
  if (raw === "off" || raw === "all" || raw === "ca") return raw;
  return "ca";
}

export function shouldUsOptIn(
  countryCode: string | null | undefined,
  subdivisionCode: string | null | undefined,
  mode: UsOptInMode,
): boolean {
  if (mode === "off") return false;
  if (!countryCode || countryCode.trim().toUpperCase() !== "US") return false;
  if (mode === "all") return true;
  return normalizeUsSubdivision(subdivisionCode) === "CA";
}

/**
 * Parse a debug override like "DE", "us-ca", "US-CA" into { country, subdivision }.
 * Returns null for "clear" or empty values.
 */
function parseDebugRegion(
  raw: string | null | undefined,
): { country: string; subdivision: string | null } | null {
  if (!raw) return null;
  const trimmed = raw.trim().toUpperCase();
  if (!trimmed || trimmed === "CLEAR") return null;
  if (trimmed === "EU") return { country: "DE", subdivision: null };
  const parts = trimmed.split("-");
  const country = parts[0] ?? "";
  if (country.length !== 2) return null;
  const sub = parts[1] && parts[1].length === 2 ? parts[1] : null;
  return { country, subdivision: sub };
}

/**
 * Server-only. Resolves the consent policy for this request using Vercel geo headers,
 * with a `qmw_debug_region` cookie override for local/preview testing.
 */
export async function resolveRegion(): Promise<ConsentPolicy> {
  const [h, c] = await Promise.all([headers(), cookies()]);

  let countryCode: string | null = null;
  let countrySubdivision: string | null = null;

  const debug = parseDebugRegion(c.get("qmw_debug_region")?.value);
  if (debug) {
    countryCode = debug.country;
    countrySubdivision = debug.subdivision;
  } else {
    countryCode = h.get("x-vercel-ip-country")?.toUpperCase() ?? null;
    countrySubdivision = h.get("x-vercel-ip-country-region") ?? null;
  }

  const geoLabel = getConsentGeoLabel(countryCode);
  const mode = getUsOptInMode();
  const requiresOptIn =
    isEuUkEea(countryCode) ||
    shouldUsOptIn(countryCode, countrySubdivision, mode);

  return { requiresOptIn, countryCode, countrySubdivision, geoLabel };
}
