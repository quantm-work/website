"use client";

import { openPrivacyChoices } from "@/lib/consent/events";

/**
 * Persistent re-access to the preference center, rendered inline in the footer.
 * Minimal text link matching the other footer links.
 */
export function PrivacyChoicesTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openPrivacyChoices("details")}
      className={
        className ??
        "min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[var(--color-ink)] transition-opacity duration-[var(--transition-base)] group-hover:opacity-40 hover:!opacity-100"
      }
    >
      Cookies
    </button>
  );
}
