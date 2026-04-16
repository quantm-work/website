"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useConsentPolicy } from "@/components/consent/consent-provider";
import { effectiveAnalytics, effectiveMarketing } from "./effective";
import { QMW_CONSENT_UPDATED } from "./events";
import type { ConsentGeoLabel } from "./region";

export type ConsentSource = "banner" | "preference-center" | "gpc";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
  source: ConsentSource;
  region: ConsentGeoLabel;
};

const STORAGE_KEY = "qmw_consent_preferences";
const SESSION_DISMISS_KEY = "qmw_consent_banner_dismissed_session";
const CONSENT_DURATION_DAYS = 180;

function getVersion(): string {
  return process.env.NEXT_PUBLIC_CONSENT_VERSION || "1.0.0";
}

export function detectGPC(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean(
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl,
  );
}

function readStored(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ConsentPreferences;
    const maxAge = CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.timestamp > maxAge) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (parsed.version !== getVersion()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(prefs: ConsentPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(
      new CustomEvent(QMW_CONSENT_UPDATED, { detail: prefs }),
    );
  } catch {
    // silent — localStorage disabled or full
  }
}

export function isSessionBannerDismissed(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSessionBannerDismissed(): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
  } catch {
    // ignore
  }
}

/**
 * Subscribes to the storage + custom event so consumers re-render when prefs change.
 * Returns `null` pre-hydration so callers can distinguish "unknown" from "no consent yet".
 */
export function useConsentStore() {
  const { requiresOptIn, geoLabel } = useConsentPolicy();
  const [prefs, setPrefs] = useState<ConsentPreferences | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPrefs(readStored());
    setHydrated(true);

    const onChange = () => setPrefs(readStored());
    window.addEventListener(QMW_CONSENT_UPDATED, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(QMW_CONSENT_UPDATED, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const updatePreferences = useCallback(
    (partial: {
      analytics?: boolean;
      marketing?: boolean;
      source?: ConsentSource;
    }) => {
      const current = readStored();
      const next: ConsentPreferences = {
        necessary: true,
        analytics: partial.analytics ?? current?.analytics ?? false,
        marketing: partial.marketing ?? current?.marketing ?? false,
        timestamp: Date.now(),
        version: getVersion(),
        source: partial.source ?? current?.source ?? "preference-center",
        region: geoLabel,
      };
      writeStored(next);
    },
    [geoLabel],
  );

  const reset = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(QMW_CONSENT_UPDATED));
  }, []);

  const canLoadAnalytics = useMemo(
    () => effectiveAnalytics(prefs, requiresOptIn),
    [prefs, requiresOptIn],
  );
  const canLoadMarketing = useMemo(
    () => effectiveMarketing(prefs, requiresOptIn),
    [prefs, requiresOptIn],
  );

  return {
    preferences: prefs,
    hydrated,
    hasConsent: prefs !== null,
    canLoadAnalytics,
    canLoadMarketing,
    updatePreferences,
    reset,
  };
}
