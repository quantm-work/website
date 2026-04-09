"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { CALENDAR_LINK, COMPANY_NAME } from "@/lib/config";
import { getMailtoLink } from "@/lib/email";

type NavLink = {
  id: string;
  label: string;
  href: string;
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkGroupId = useId();

  const navLinks: NavLink[] = [
    { id: `${linkGroupId}-contact`, label: "Contact", href: getMailtoLink() },
    { id: `${linkGroupId}-book`, label: "Book Now", href: CALENDAR_LINK },
  ];

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
          className="font-display text-lg uppercase tracking-[0.02em] text-[var(--color-ink)]"
        >
          {COMPANY_NAME}
        </a>

        <a
          href={getMailtoLink()}
          aria-label="Contact us via email"
          className="hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-none border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-2 text-sm text-[var(--color-paper)] transition-[background-color,color] duration-[var(--transition-base)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] md:inline-flex"
        >
          Contact
        </a>

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
          className="mobile-menu-enter fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-10 bg-[var(--color-paper)] md:hidden"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              className="group relative font-display text-2xl uppercase tracking-[0.02em] text-[var(--color-ink)]"
              aria-label={link.label}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[var(--color-ink)] transition-transform duration-[var(--transition-base)] group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
