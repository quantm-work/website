"use client";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { useConsentStore } from "@/lib/consent/store";

type GtagArgs =
  | ["js", Date]
  | ["config", string]
  | ["consent", "default", Record<string, string | string[]>]
  | ["consent", "update", Record<string, string>]
  | ["event", string, Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/**
 * Conditionally loads GA4 + Vercel Analytics only after analytics consent is granted.
 * The Consent Mode v2 `default` signal is emitted synchronously from layout.tsx so
 * it lands before any third-party script; this component owns `consent update` and
 * the gated script tags.
 */
export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const { canLoadAnalytics, canLoadMarketing, hydrated } = useConsentStore();
  const lastSentRef = useRef<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    const analyticsState = canLoadAnalytics ? "granted" : "denied";
    const marketingState = canLoadMarketing ? "granted" : "denied";
    const signature = `${analyticsState}|${marketingState}`;
    if (lastSentRef.current === signature) return;
    lastSentRef.current = signature;
    window.gtag("consent", "update", {
      analytics_storage: analyticsState,
      ad_storage: marketingState,
      ad_user_data: marketingState,
      ad_personalization: marketingState,
    });
  }, [hydrated, canLoadAnalytics, canLoadMarketing]);

  if (!canLoadAnalytics) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.gtag('js', new Date());window.gtag('config', ${JSON.stringify(gaId)});`}
          </Script>
        </>
      ) : null}
      <Analytics />
    </>
  );
}
