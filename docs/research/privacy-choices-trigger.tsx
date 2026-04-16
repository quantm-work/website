"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openPrivacyChoices } from "@/lib/analytics/consent-events";
import { cn } from "@/lib/utils";

/**
 * Persistent re-access to the preference center (CCPA / GDPR withdrawal parity).
 */
export function PrivacyChoicesTrigger() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 48) {
        setHiddenByScroll(true);
      } else if (y < lastY || y <= 16) {
        setHiddenByScroll(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isStudio) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => openPrivacyChoices("details")}
      className={cn(
        "fixed bottom-6 left-4 z-[55] rounded-full border border-border bg-background px-4 py-2 text-s1-regular text-text-secondary shadow-glass transition-opacity hover:text-text-primary md:bottom-8 md:left-8",
        hiddenByScroll ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      Privacy choices
    </button>
  );
}
