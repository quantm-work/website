import type { ConsentPreferences } from "./store";

/**
 * Opt-in regions: category off unless explicitly granted.
 * Opt-out regions: category on when no record exists yet (legacy consent); otherwise honor the stored value.
 */
export function effectiveAnalytics(
  prefs: ConsentPreferences | null,
  requiresOptIn: boolean,
): boolean {
  if (requiresOptIn) return prefs?.analytics === true;
  if (prefs === null) return true;
  return prefs.analytics === true;
}

export function effectiveMarketing(
  prefs: ConsentPreferences | null,
  requiresOptIn: boolean,
): boolean {
  if (requiresOptIn) return prefs?.marketing === true;
  if (prefs === null) return true;
  return prefs.marketing === true;
}
