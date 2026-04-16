"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FSDS_OPEN_PRIVACY_CHOICES,
  type PrivacyChoicesOpenDetail,
} from "@/lib/analytics/consent-events";
import { useConsentPolicy } from "@/lib/analytics/consent-policy-context";
import {
  detectGPC,
  isSessionBannerDismissed,
  setSessionBannerDismissed,
  useConsentStore,
} from "@/lib/analytics/consent-store";
import type { ConsentPreferences } from "@/types/analytics";
import { ConsentBanner } from "./consent-banner";
import { PrivacyChoicesTrigger } from "./privacy-choices-trigger";

const BANNER_VERSION = "2.0.0";

function getPolicyVersion(): string {
  return process.env.NEXT_PUBLIC_PRIVACY_POLICY_VERSION ?? "2026-04";
}

async function logConsentEvent(payload: {
  preferences: ConsentPreferences;
  source: ConsentPreferences["source"];
  gpcSignal: boolean;
  geoLabel: string;
  countryCode: string | null;
  bannerVersion: string;
  policyVersion: string;
}): Promise<void> {
  try {
    await fetch("/api/consent/log", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // non-blocking
  }
}

function GpcToast({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDismiss, 6000);
    return () => window.clearTimeout(t);
  }, [onDismiss]);

  return (
    <output className="fixed bottom-24 left-1/2 z-[60] max-w-md -translate-x-1/2 rounded-md border border-border bg-background px-4 py-3 text-sm text-text-primary shadow-glass md:bottom-6">
      Opt-out request honored. We have disabled sale/sharing of personal
      information for this browser as signaled by Global Privacy Control.
    </output>
  );
}

export function ConsentManager() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const { requiresOptIn, geoLabel, countryCode } = useConsentPolicy();
  const { hasConsent, getPreferences, updatePreferences } = useConsentStore();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMode, setBannerMode] = useState<"first" | "details">("first");
  const [gpcToast, setGpcToast] = useState(false);
  const [bannerInstance, setBannerInstance] = useState(0);
  const gpcHandledRef = useRef(false);

  /** Only auto-opens the first-layer banner for EU/EEA/UK when no choice exists yet. Never force-closes (preference center may be open). */
  const refreshInitialBanner = useCallback(() => {
    if (!requiresOptIn) return;
    if (!hasConsent() && !isSessionBannerDismissed()) {
      setBannerMode("first");
      setShowBanner(true);
      setBannerInstance((k) => k + 1);
    }
  }, [hasConsent, requiresOptIn]);

  useEffect(() => {
    refreshInitialBanner();
  }, [refreshInitialBanner]);

  useEffect(() => {
    if (gpcHandledRef.current) return;
    if (!detectGPC()) return;

    gpcHandledRef.current = true;
    updatePreferences({
      analytics: false,
      marketing: false,
      functional: false,
      source: "gpc",
      region: geoLabel,
    });

    const prefs = getPreferences();
    if (prefs) {
      void logConsentEvent({
        preferences: prefs,
        source: "gpc",
        gpcSignal: true,
        geoLabel,
        countryCode,
        bannerVersion: BANNER_VERSION,
        policyVersion: getPolicyVersion(),
      });
    }

    setGpcToast(true);
    setShowBanner(false);
  }, [countryCode, geoLabel, getPreferences, updatePreferences]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<PrivacyChoicesOpenDetail>;
      const mode = ce.detail?.mode ?? "details";
      const _prefs = getPreferences();
      setBannerMode(mode);
      setShowBanner(true);
      setBannerInstance((k) => k + 1);
      // If user has preferences, details will seed from props below
    };

    window.addEventListener(FSDS_OPEN_PRIVACY_CHOICES, handler);
    return () => window.removeEventListener(FSDS_OPEN_PRIVACY_CHOICES, handler);
  }, [getPreferences]);

  const handleAcceptAll = () => {
    updatePreferences({
      functional: true,
      analytics: true,
      marketing: true,
      source: "banner",
      region: geoLabel,
    });
    const prefs = getPreferences();
    if (prefs) {
      void logConsentEvent({
        preferences: prefs,
        source: "banner",
        gpcSignal: false,
        geoLabel,
        countryCode,
        bannerVersion: BANNER_VERSION,
        policyVersion: getPolicyVersion(),
      });
    }
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    updatePreferences({
      functional: false,
      analytics: false,
      marketing: false,
      source: "banner",
      region: geoLabel,
    });
    const prefs = getPreferences();
    if (prefs) {
      void logConsentEvent({
        preferences: prefs,
        source: "banner",
        gpcSignal: false,
        geoLabel,
        countryCode,
        bannerVersion: BANNER_VERSION,
        policyVersion: getPolicyVersion(),
      });
    }
    setShowBanner(false);
  };

  const handleSaveDetails = (prefs: {
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => {
    updatePreferences({
      ...prefs,
      source: "preference-center",
      region: geoLabel,
    });
    const next = getPreferences();
    if (next) {
      void logConsentEvent({
        preferences: next,
        source: "preference-center",
        gpcSignal: false,
        geoLabel,
        countryCode,
        bannerVersion: BANNER_VERSION,
        policyVersion: getPolicyVersion(),
      });
    }
    setShowBanner(false);
  };

  const handleDismissWithoutChoice = () => {
    setSessionBannerDismissed();
    setShowBanner(false);
  };

  const handleBackFromDetails = () => {
    // no consent saved
  };

  const stored = getPreferences();
  const seedFunctional = stored ? stored.functional : !requiresOptIn;
  const seedAnalytics = stored ? stored.analytics : !requiresOptIn;
  const seedMarketing = stored ? stored.marketing : !requiresOptIn;

  if (isStudio) {
    return null;
  }

  return (
    <>
      {gpcToast ? <GpcToast onDismiss={() => setGpcToast(false)} /> : null}
      {showBanner ? (
        <ConsentBanner
          key={bannerInstance}
          initialMode={bannerMode}
          initialFunctional={seedFunctional}
          initialAnalytics={seedAnalytics}
          initialMarketing={seedMarketing}
          onAcceptAll={handleAcceptAll}
          onRejectAll={handleRejectAll}
          onSaveDetails={handleSaveDetails}
          onDismissWithoutChoice={handleDismissWithoutChoice}
          onBackFromDetails={handleBackFromDetails}
        />
      ) : (
        <PrivacyChoicesTrigger />
      )}
    </>
  );
}
