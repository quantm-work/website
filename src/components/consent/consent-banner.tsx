"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  type PrivacyChoicesOpenDetail,
  QMW_OPEN_PRIVACY_CHOICES,
} from "@/lib/consent/events";
import {
  detectGPC,
  isSessionBannerDismissed,
  setSessionBannerDismissed,
  useConsentStore,
} from "@/lib/consent/store";
import { useConsentPolicy } from "./consent-provider";

type Mode = "first" | "details";

const buttonBase =
  "inline-flex min-h-[44px] items-center justify-center px-4 py-2 font-sans font-semibold text-xs uppercase tracking-wide transition-[background-color,color,border-color] duration-[var(--transition-base)]";

const primaryButton = `${buttonBase} border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]`;

const secondaryButton = `${buttonBase} border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]`;

function ToggleRow({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start justify-between gap-3 py-3 ${disabled ? "opacity-70" : "cursor-pointer"}`}
    >
      <span className="flex flex-col">
        <span className="font-semibold text-[length:var(--font-xs)] text-[var(--color-ink)]">
          {label}
        </span>
        <span className="text-[length:var(--font-xs)] text-[#525252] leading-snug">
          {description}
        </span>
      </span>
      <span
        className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center border border-[var(--color-ink)] transition-colors duration-[var(--transition-base)] ${checked ? "bg-[var(--color-ink)]" : "bg-[var(--color-paper)]"}`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`absolute top-0.5 h-3.5 w-3.5 transition-[left,background-color] duration-[var(--transition-base)] ${checked ? "left-[18px] bg-[var(--color-paper)]" : "left-0.5 bg-[var(--color-ink)]"}`}
        />
      </span>
    </label>
  );
}

export function ConsentBanner() {
  const { requiresOptIn, geoLabel, resolved } = useConsentPolicy();
  const { preferences, hydrated, updatePreferences } = useConsentStore();

  const headingId = useId();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("first");
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [marketing, setMarketing] = useState<boolean>(false);
  const gpcHandled = useRef(false);

  const seedFromPrefs = useCallback(() => {
    if (preferences) {
      setAnalytics(preferences.analytics);
      setMarketing(preferences.marketing);
    } else {
      // opt-in regions start denied; opt-out regions start granted
      setAnalytics(!requiresOptIn);
      setMarketing(!requiresOptIn);
    }
  }, [preferences, requiresOptIn]);

  // Honor GPC: writes denied prefs automatically, skip banner.
  useEffect(() => {
    if (!hydrated) return;
    if (gpcHandled.current) return;
    if (!detectGPC()) return;
    if (preferences?.source === "gpc") {
      gpcHandled.current = true;
      return;
    }
    gpcHandled.current = true;
    updatePreferences({
      analytics: false,
      marketing: false,
      source: "gpc",
    });
    setOpen(false);
  }, [hydrated, preferences, updatePreferences]);

  // Auto-open for opt-in regions with no existing choice and no session dismiss.
  // Wait for `resolved` so we don't flash the banner for opt-out visitors while
  // the policy fetch is in flight.
  useEffect(() => {
    if (!hydrated) return;
    if (!resolved) return;
    if (!requiresOptIn) return;
    if (preferences) return;
    if (isSessionBannerDismissed()) return;
    if (detectGPC()) return;
    seedFromPrefs();
    setMode("first");
    setOpen(true);
  }, [hydrated, resolved, requiresOptIn, preferences, seedFromPrefs]);

  // External trigger (footer link, floating button) — opens preference center.
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<PrivacyChoicesOpenDetail>;
      seedFromPrefs();
      setMode(ce.detail?.mode ?? "details");
      setOpen(true);
    };
    window.addEventListener(QMW_OPEN_PRIVACY_CHOICES, handler);
    return () => window.removeEventListener(QMW_OPEN_PRIVACY_CHOICES, handler);
  }, [seedFromPrefs]);

  // Keyboard: Esc closes (session-dismiss if first, just close if details).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mode === "first") {
        setSessionBannerDismissed();
      }
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mode]);

  const acceptAll = () => {
    updatePreferences({ analytics: true, marketing: true, source: "banner" });
    setOpen(false);
  };

  const rejectAll = () => {
    updatePreferences({ analytics: false, marketing: false, source: "banner" });
    setOpen(false);
  };

  const saveChoices = () => {
    updatePreferences({
      analytics,
      marketing,
      source: "preference-center",
    });
    setOpen(false);
  };

  const dismissWithoutChoice = () => {
    setSessionBannerDismissed();
    setOpen(false);
  };

  if (!hydrated || !open) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={headingId}
      data-region={geoLabel}
      data-mode={mode}
      className="fade-in-up fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[360px] border border-[var(--color-ink)] bg-[var(--color-paper)] sm:inset-x-auto sm:left-4 sm:mx-0"
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <h2
            id={headingId}
            className="font-semibold text-[length:var(--font-sm)] text-[var(--color-ink)]"
          >
            {mode === "first"
              ? "Cookies on quantm.work"
              : "Your privacy choices"}
          </h2>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismissWithoutChoice}
            className="-mr-1 -mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center text-[#525252] transition-colors duration-[var(--transition-base)] hover:text-[var(--color-ink)]"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden="true"
              className="block"
            >
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </svg>
          </button>
        </div>

        {mode === "first" ? (
          <>
            <p className="text-[length:var(--font-xs)] text-[#525252] leading-snug">
              We use necessary cookies to run this site, and optional analytics
              to understand how it&apos;s used. You can accept all, reject
              optional, or customize.{" "}
              <a
                href="/privacy"
                className="underline transition-colors duration-[var(--transition-base)] hover:text-[var(--color-ink)]"
              >
                Privacy policy
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className={`${secondaryButton} flex-1`}
              >
                Reject
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className={`${primaryButton} flex-1`}
              >
                Accept
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                seedFromPrefs();
                setMode("details");
              }}
              className="self-start text-[length:var(--font-xs)] text-[#525252] underline transition-colors duration-[var(--transition-base)] hover:text-[var(--color-ink)]"
            >
              Customize
            </button>
          </>
        ) : (
          <>
            <p className="text-[length:var(--font-xs)] text-[#525252] leading-snug">
              Choose which optional cookies to allow. Your choice is stored on
              this device only.
            </p>
            <div className="divide-y divide-[var(--color-subtle)] border-y border-[var(--color-subtle)]">
              <ToggleRow
                id={`${headingId}-necessary`}
                label="Necessary"
                description="Required for the site to function. Always on."
                checked={true}
                disabled
              />
              <ToggleRow
                id={`${headingId}-analytics`}
                label="Analytics"
                description="Anonymous usage metrics to improve the site."
                checked={analytics}
                onChange={setAnalytics}
              />
              <ToggleRow
                id={`${headingId}-marketing`}
                label="Marketing"
                description="Used to measure ad performance. None active today."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("first")}
                className={`${secondaryButton} flex-1`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={saveChoices}
                className={`${primaryButton} flex-1`}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
