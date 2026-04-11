"use client";

import { useCallback, useEffect, useState } from "react";
import { CALENDAR_LINK, COMPANY_NAME, WHATSAPP_LINK } from "@/lib/config";
import { getMailtoLink } from "@/lib/email";

const buttonBase =
  "inline-flex min-h-[44px] items-center justify-center px-6 py-2 font-sans font-medium text-sm transition-[background-color,color,border-color] duration-[var(--transition-base)]";

const primaryButtonClass = `${buttonBase} border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]`;

const secondaryButtonClass = `${buttonBase} border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]`;

const whatsappButtonClass = `${buttonBase} min-w-[44px] border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]`;

function WhatsappIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

type CtaButtonsProps = {
  size?: "default" | "large";
  onNavigate?: () => void;
};

function CtaButtons({ size = "default", onNavigate }: CtaButtonsProps) {
  const sizeClass = size === "large" ? "text-base px-8 py-3 min-h-[52px]" : "";

  return (
    <>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        onClick={onNavigate}
        className={`${whatsappButtonClass} ${sizeClass}`}
      >
        <WhatsappIcon />
      </a>
      <a
        href={CALENDAR_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a meeting"
        onClick={onNavigate}
        className={`${primaryButtonClass} ${sizeClass}`}
      >
        Book Now
      </a>
      <a
        href={getMailtoLink()}
        aria-label="Contact us via email"
        onClick={onNavigate}
        className={`${secondaryButtonClass} ${sizeClass}`}
      >
        Contact
      </a>
    </>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="fade-in-down sticky top-0 z-50 bg-[var(--color-paper)]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8"
      >
        <a
          href="/"
          aria-label={`${COMPANY_NAME} home`}
          className="font-display text-4xl font-medium text-[var(--color-ink)]"
        >
          {COMPANY_NAME}
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <CtaButtons />
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className="block h-[2px] w-5 bg-[var(--color-ink)] transition-transform duration-[var(--transition-base)]"
            style={
              menuOpen
                ? { transform: "translateY(7px) rotate(45deg)" }
                : undefined
            }
          />
          <span
            className="block h-[2px] w-5 bg-[var(--color-ink)] transition-opacity duration-[var(--transition-base)]"
            style={menuOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block h-[2px] w-5 bg-[var(--color-ink)] transition-transform duration-[var(--transition-base)]"
            style={
              menuOpen
                ? { transform: "translateY(-7px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="mobile-menu-enter fixed right-0 left-0 top-16 z-40 flex h-[calc(100svh-4rem)] w-full flex-col items-center justify-center gap-6 md:hidden"
          style={{ backgroundColor: "var(--color-paper)" }}
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <CtaButtons size="large" onNavigate={closeMenu} />
        </div>
      )}
    </header>
  );
}
