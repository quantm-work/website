import type { ConsentPreferences } from "@/types/analytics";

/**
 * Under opt-out regimes (US / rest of world), non-essential scripts may load by default
 * until the user sets preferences or GPC opts them out.
 */
export function effectiveAnalytics(
  prefs: ConsentPreferences | null,
  requiresOptIn: boolean,
): boolean {
  if (requiresOptIn) {
    return prefs?.analytics === true;
  }
  if (prefs === null) return true;
  return prefs.analytics === true;
}

export function effectiveFunctional(
  prefs: ConsentPreferences | null,
  requiresOptIn: boolean,
): boolean {
  if (requiresOptIn) {
    return prefs?.functional === true;
  }
  if (prefs === null) return true;
  return prefs.functional === true;
}

export function effectiveMarketing(
  prefs: ConsentPreferences | null,
  requiresOptIn: boolean,
): boolean {
  if (requiresOptIn) {
    return prefs?.marketing === true;
  }
  if (prefs === null) return true;
  return prefs.marketing === true;
}
