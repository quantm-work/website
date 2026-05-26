import { ArrowRight, PlayCircle } from "lucide-react";
import { CALENDAR_LINK } from "@/lib/config";
import { QuantMEngine } from "./QuantMEngine";
import { SectionLabel } from "./SectionLabel";

const workflowSteps = [
  {
    label: "Invoice Source",
    detail: "Sheets · Airtable · CSV · CRM",
    visual: <SourceModule />,
  },
  {
    label: "QuantM Engine",
    detail: "Rules · Drafting · Escalation",
    visual: <QuantMEngine compact />,
  },
  {
    label: "Approval Draft",
    detail: "Gmail · Outlook",
    visual: <DraftModule />,
  },
  {
    label: "Follow-Up Log",
    detail: "Status · Owner · Next action",
    visual: <LogModule />,
  },
];

function SourceModule() {
  return (
    <div className="border border-[var(--ar-border)] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="h-2 w-2 bg-[#0F9D58]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ar-muted)]">
          Source
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-4 border border-[var(--ar-border)] bg-[var(--ar-soft)]"
          />
        ))}
      </div>
    </div>
  );
}

function DraftModule() {
  return (
    <div className="border border-[var(--ar-border)] bg-white p-4">
      <div className="flex items-center justify-between border-b border-[var(--ar-border)] pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ar-muted)]">
          Draft
        </span>
        <span className="border border-[var(--ar-accent)] px-2 py-0.5 text-[10px] font-semibold text-[var(--ar-accent)]">
          Review
        </span>
      </div>
      <div className="mt-3 space-y-2">
        <span className="block h-2 w-4/5 bg-[var(--ar-ink)]" />
        <span className="block h-2 w-11/12 bg-[var(--ar-border)]" />
        <span className="block h-2 w-2/3 bg-[var(--ar-border)]" />
      </div>
    </div>
  );
}

function LogModule() {
  return (
    <div className="border border-[var(--ar-border)] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 bg-[var(--ar-accent)]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ar-muted)]">
          Audit trail
        </span>
      </div>
      <div className="space-y-2">
        {["Owner", "Status", "Next"].map((label) => (
          <div key={label} className="grid grid-cols-[46px_1fr] gap-2">
            <span className="text-[10px] text-[var(--ar-muted)]">{label}</span>
            <span className="h-2 self-center bg-[var(--ar-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowStrip() {
  return (
    <div className="border border-[var(--ar-border)] bg-white p-5 shadow-[0_22px_70px_rgba(11,11,13,0.08)] md:p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-mid)]">
            Actual workflow
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-mid)]">
            From invoice source to approval-ready follow-up.
          </p>
        </div>
        <span className="hidden border border-[var(--ar-ink)] bg-[var(--ar-accent)] px-3 py-1 text-xs font-semibold text-[var(--ar-ink)] sm:inline-flex">
          Human-approved
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {workflowSteps.map((step, index) => (
          <div key={step.label} className="contents">
            <div className="min-h-40 border border-[var(--ar-border)] bg-[var(--ar-paper)] p-3">
              <div className="min-h-24">{step.visual}</div>
              <p className="mt-4 text-sm font-semibold text-[var(--color-ink)]">
                {step.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--ar-muted)]">
                {step.detail}
              </p>
            </div>

            {index < workflowSteps.length - 1 && (
              <div className="flex items-center justify-center text-[var(--color-mid)]">
                <ArrowRight
                  size={30}
                  strokeWidth={1.8}
                  className="rotate-90 text-[var(--ar-accent)] sm:rotate-0"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 border border-[var(--color-subtle)] p-4">
        <p className="text-sm font-semibold text-[var(--color-ink)]">
          From overdue invoice to approval-ready follow-up — without adding
          another dashboard.
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-mid)]">
          The workflow prepares drafts and records context. Your team approves
          before any client-facing message leaves the inbox.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-24 text-[var(--color-ink)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <SectionLabel>QuantM AR Workflow Agent</SectionLabel>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] md:text-6xl">
          Late invoices are not the problem. Manual follow-up is.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-mid)]">
          QuantM installs a 5-day finance workflow that identifies overdue
          invoices, prepares approval-ready reminders, records every follow-up,
          and flags cash-risk — inside the tools your team already uses.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--ar-ink)] bg-[var(--ar-accent)] px-5 py-3 text-sm font-semibold text-[var(--ar-ink)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--ar-ink)] hover:text-white"
          >
            Book a workflow audit
            <ArrowRight size={18} />
          </a>
          <a
            href="#video-proof"
            className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--ar-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-[var(--transition-base)] hover:border-[var(--ar-ink)] hover:bg-[var(--ar-soft)]"
          >
            <PlayCircle size={18} />
            Watch 90-second proof
          </a>
        </div>
        <p className="mt-5 text-sm font-medium text-[var(--ar-muted)]">
          Human-approved by default. Nothing is sent without review.
        </p>
      </div>

      <WorkflowStrip />
    </section>
  );
}
