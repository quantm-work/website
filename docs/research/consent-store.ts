"use client";

import { useCallback, useMemo } from "react";
import { useConsentPolicy } from "@/lib/analytics/consent-policy-context";
import type {
  ConsentGeoLabel,
  ConsentPreferences,
  ConsentSource,
} from "@/types/analytics";

import {
  effectiveAnalytics,
  effectiveFunctional,
  effectiveMarketing,
} from "./consent-effective";

const STORAGE_KEY = "fsds_consent_preferences";
/** ~6 months — CNIL-style refresh; aligns with plan */
const CONSENT_DURATION_DAYS = 180;

const SESSION_DISMISS_KEY = "fsds_consent_banner_dismissed_session";

export function detectGPC(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean(
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl,
  );
}

function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored) as ConsentPreferences;

    const now = Date.now();
    const age = now - consent.timestamp;
    const maxAge = CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000;

    if (age > maxAge) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    const currentVersion = process.env.NEXT_PUBLIC_CONSENT_VERSION || "2.0.0";
    if (consent.version !== currentVersion) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    // Migrate legacy records without `functional`
    if (typeof consent.functional !== "boolean") {
      consent.functional = false;
    }

    return consent;
  } catch {
    return null;
  }
}

function setStoredConsent(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(
      new CustomEvent("consent-updated", { detail: preferences }),
    );
  } catch (error) {
    console.error("[Consent] Failed to store preferences:", error);
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

export function clearSessionBannerDismissed(): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_DISMISS_KEY);
  } catch {
    // ignore
  }
}

export function useConsentStore() {
  const { requiresOptIn, geoLabel } = useConsentPolicy();

  const getPreferences = useCallback((): ConsentPreferences | null => {
    return getStoredConsent();
  }, []);

  const updatePreferences = useCallback(
    (
      partial: Partial<
        Omit<ConsentPreferences, "timestamp" | "version" | "necessary">
      > & {
        source?: ConsentSource;
        region?: ConsentGeoLabel;
      },
    ) => {
      const current = getStoredConsent();
      const version = process.env.NEXT_PUBLIC_CONSENT_VERSION || "2.0.0";

      const updated: ConsentPreferences = {
        necessary: true,
        functional: partial.functional ?? current?.functional ?? false,
        analytics: partial.analytics ?? current?.analytics ?? false,
        marketing: partial.marketing ?? current?.marketing ?? false,
        timestamp: Date.now(),
        version,
        source: partial.source ?? current?.source ?? "preference-center",
        region: partial.region ?? current?.region ?? geoLabel,
      };

      setStoredConsent(updated);
    },
    [geoLabel],
  );

  const hasConsent = useCallback((): boolean => {
    return getStoredConsent() !== null;
  }, []);

  const canLoadAnalytics = useCallback((): boolean => {
    return effectiveAnalytics(getStoredConsent(), requiresOptIn);
  }, [requiresOptIn]);

  const canLoadFunctional = useCallback((): boolean => {
    return effectiveFunctional(getStoredConsent(), requiresOptIn);
  }, [requiresOptIn]);

  const canLoadMarketing = useCallback((): boolean => {
    return effectiveMarketing(getStoredConsent(), requiresOptIn);
  }, [requiresOptIn]);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event("consent-updated"));
    }
  }, []);

  return useMemo(
    () => ({
      preferences: getPreferences(),
      getPreferences,
      updatePreferences,
      hasConsent,
      canLoadAnalytics,
      canLoadFunctional,
      canLoadMarketing,
      reset,
    }),
    [
      getPreferences,
      updatePreferences,
      hasConsent,
      canLoadAnalytics,
      canLoadFunctional,
      canLoadMarketing,
      reset,
    ],
  );
}
