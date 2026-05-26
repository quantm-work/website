"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";

const implementationOptions = [
  "Invoice sources: Google Sheets, Airtable, CSV, CRM, QuickBooks/Xero export",
  "Workflow runtime: QuantM Engine using n8n or custom TypeScript/Python depending on client needs",
  "Draft creation: Gmail or Outlook",
  "Notifications: Slack or Teams",
  "Logs: Google Sheets, Airtable, CRM, or database",
  "Approval gates: required before sending by default",
  "Weekly summaries: cash-risk report and follow-up summary",
];

export function TechnicalAppendix() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 text-[var(--ar-ink)]">
      <div className="border border-[var(--ar-border)] bg-white p-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-4 text-left"
          aria-expanded={open}
        >
          <div>
            <SectionLabel>For technical teams</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              Implementation options, hidden until needed.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ar-muted)]">
              Technical buyers can inspect the workflow. Business buyers do not
              need to.
            </p>
          </div>
          <ChevronDown
            className={`shrink-0 text-[var(--ar-accent)] transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {implementationOptions.map((option) => (
              <div
                key={option}
                className="border border-[var(--ar-border)] bg-[var(--ar-paper)] p-4 text-sm font-medium leading-6"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
