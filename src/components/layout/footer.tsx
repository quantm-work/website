import { useId } from "react";
import { COMPANY_NAME } from "@/lib/config";
import { getMailtoLink, getSupportMailtoLink } from "@/lib/email";

type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export default function Footer() {
  const linkGroupId = useId();

  const links: FooterLink[] = [
    { id: `${linkGroupId}-terms`, label: "Terms", href: "/terms" },
    { id: `${linkGroupId}-privacy`, label: "Privacy", href: "/privacy" },
    {
      id: `${linkGroupId}-support`,
      label: "Support",
      href: getSupportMailtoLink(),
    },
    { id: `${linkGroupId}-contact`, label: "Contact", href: getMailtoLink() },
  ];

  return (
    <footer className="fade-in-up bg-[var(--color-paper)] px-8 py-8 font-semibold text-[var(--color-ink)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-[length:var(--font-xs)]">
          {`${COMPANY_NAME} © ${new Date().getFullYear()}`}
        </span>

        <div className="group flex items-center gap-6 text-[length:var(--font-xs)]">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.label}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[var(--color-ink)] transition-opacity duration-[var(--transition-base)] group-hover:opacity-40 hover:!opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
