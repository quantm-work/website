/**
 * EU-27 member states (ISO 3166-1 alpha-2), plus UK, EEA (IS, LI, NO), and CH (often aligned for privacy UX).
 */
const EU_UK_EEA_CH = new Set([
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
]);

/**
 * Returns true when the visitor should get GDPR-style opt-in (banner + blocked non-essential scripts).
 */
export function isEuUkEea(countryCode: string | null | undefined): boolean {
  if (!countryCode) return false;
  const upper = countryCode.trim().toUpperCase();
  return EU_UK_EEA_CH.has(upper);
}

export type ConsentGeoLabel = "eu" | "us" | "other";

/**
 * Map raw country to a coarse label for consent UX. US is explicit; "other" follows CCPA-style opt-out like US.
 */
export function getConsentGeoLabel(
  countryCode: string | null | undefined,
): ConsentGeoLabel {
  if (!countryCode) return "other";
  const upper = countryCode.trim().toUpperCase();
  if (upper === "US") return "us";
  if (isEuUkEea(upper)) return "eu";
  return "other";
}

/** Vercel / ISO 3166-2 style (e.g. `CA`, `US-CA`) → two-letter state/region where applicable. */
export function normalizeUsSubdivision(
  raw: string | null | undefined,
): string | null {
  if (!raw) return null;
  const u = raw.trim().toUpperCase();
  if (u.length === 2) return u;
  const parts = u.split("-");
  const last = parts[parts.length - 1];
  return last && last.length === 2 ? last : null;
}

/**
 * Feature flag: extend GDPR-style opt-in to US visitors (default: California only).
 * `off` — CCPA-style opt-out for all US (legacy).
 * `ca` — US + CA subdivision → opt-in (default when env unset).
 * `all` — entire US → opt-in.
 */
export type UsOptInMode = "off" | "ca" | "all";

export function getUsOptInModeFromEnv(): UsOptInMode {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_CONSENT_US_OPT_IN?.trim().toLowerCase()
      : undefined;
  if (raw === "off" || raw === "all" || raw === "ca") {
    return raw;
  }
  return "ca";
}

/**
 * Whether US traffic should use opt-in banner + blocked third parties before consent.
 */
export function shouldUsOptIn(
  countryCode: string | null | undefined,
  subdivisionCode: string | null | undefined,
  mode: UsOptInMode,
): boolean {
  if (mode === "off") return false;
  if (!countryCode || countryCode.trim().toUpperCase() !== "US") return false;
  if (mode === "all") return true;
  const sub = normalizeUsSubdivision(subdivisionCode);
  return sub === "CA";
}
