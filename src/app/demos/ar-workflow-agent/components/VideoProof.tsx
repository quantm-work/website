import { Play } from "lucide-react";
import { QuantMEngine } from "./QuantMEngine";
import { SectionLabel } from "./SectionLabel";

function MiniSheetsLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path fill="currentColor" d="M5 2h9l5 5v15H5z" opacity="0.85" />
      <path fill="var(--color-paper)" d="M14 2v6h5z" opacity="0.8" />
      <path
        fill="var(--color-paper)"
        d="M8 10h8v8H8zm2 2v1h2v-1zm4 0v1h1v-1zm-4 3v1h2v-1zm4 0v1h1v-1z"
      />
    </svg>
  );
}

function InvoiceTrackerPanel() {
  return (
    <div className="flex h-full flex-col border border-[var(--color-subtle)] bg-[var(--color-paper)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-subtle)] px-3 py-3">
        <span className="text-[#188038]">
          <MiniSheetsLogo />
        </span>
        <p className="text-sm font-semibold">Invoice Tracker</p>
        <span className="ml-auto text-[var(--color-mid)]">×</span>
      </div>
      <div className="grid grid-cols-5 border-b border-[var(--color-subtle)] bg-[var(--color-subtle)]/45 text-[10px] font-semibold text-[var(--color-mid)]">
        {["Invoice #", "Customer", "Amount", "Due Date", "Status"].map(
          (label) => (
            <span
              key={label}
              className="border-r border-[var(--color-paper)] p-2"
            >
              {label}
            </span>
          ),
        )}
      </div>
      {[
        ["INV-1023", "Acme Studio", "€3,240", "May 7, 2024", "Overdue"],
        ["INV-1044", "Nova Digital", "€2,900", "May 20, 2024", "Due Soon"],
        ["INV-1055", "Lima Properties", "€13,020", "Apr 30, 2024", "Overdue"],
      ].map((row) => (
        <div
          key={row[0]}
          className="grid grid-cols-5 border-b border-[var(--color-subtle)] text-[10px]"
        >
          {row.map((cell) => (
            <span
              key={cell}
              className="truncate border-r border-[var(--color-subtle)] p-2"
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
      <div className="grid grid-cols-5 gap-4 p-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="h-2 bg-[var(--color-subtle)]"
            style={{ opacity: index % 3 === 0 ? 0.9 : 0.55 }}
          />
        ))}
      </div>
    </div>
  );
}

function EnginePanel() {
  return (
    <div className="flex h-full flex-col border border-[var(--color-subtle)] bg-[var(--color-paper)] p-3">
      <p className="text-sm font-semibold">QuantM Engine</p>
      <div className="mt-3 flex-1">
        <QuantMEngine compact />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-semibold">
        {["Rules applied", "Tone selected", "Escalation checked"].map(
          (label) => (
            <span
              key={label}
              className="border border-[var(--ar-border)] bg-[var(--ar-soft)] p-2 text-[var(--ar-ink)]"
            >
              {label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function AgentPanel() {
  return (
    <div className="flex h-full flex-col border border-[var(--color-subtle)] bg-[var(--color-paper)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-subtle)] px-3 py-3">
        <span className="pixelated-type text-xs">Approval Draft</span>
        <span className="ml-auto border border-[var(--color-subtle)] px-1 text-[10px]">
          ×
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6">
        <p className="text-lg font-semibold">Reminder ready for review</p>
        <p className="mt-2 text-xs leading-5 text-[var(--color-mid)]">
          Tone, amount, recipient, and context are prepared before sending.
        </p>
        <div className="mt-5 border border-[var(--ar-ink)] bg-[var(--ar-accent)] px-4 py-3 text-sm font-semibold text-[var(--ar-ink)]">
          Human approval required
        </div>
      </div>
    </div>
  );
}

function GmailDraftPanel() {
  return (
    <div className="flex h-full flex-col border border-[var(--color-subtle)] bg-[var(--color-paper)]">
      <div className="flex items-center border-b border-[var(--color-subtle)] px-3 py-3">
        <p className="text-sm font-semibold">Gmail - Drafts</p>
        <span className="ml-auto text-[var(--color-mid)]">×</span>
      </div>
      <div className="mx-4 mt-3 h-8 border border-[var(--color-subtle)] bg-[var(--color-subtle)]/45 px-3 py-2 text-xs text-[var(--color-mid)]">
        Search in mail
      </div>
      <div className="mt-4 border-t border-[var(--color-subtle)] px-4 py-4 text-xs">
        <span className="font-semibold text-[#ea4335]">Draft</span>
        <span className="ml-3 text-[var(--color-mid)]">
          Reminder: Invoice INV-1023 from Acme Studio
        </span>
      </div>
      <div className="space-y-3 px-4">
        {[86, 48, 68, 86, 48].map((width, index) => (
          <span
            key={index}
            className="block h-2 bg-[var(--color-subtle)]"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function VideoProof() {
  return (
    <section
      id="video-proof"
      className="mx-auto max-w-6xl px-6 py-10 text-[var(--color-ink)]"
    >
      <div className="border border-[var(--color-ink)] p-5 md:p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Watch it working</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              A 90-second proof: from overdue invoice to approved draft.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--color-mid)]">
            The public page stays simple. The demo proves the workflow can read
            a tracker, select the right invoice, prepare the message, and record
            the follow-up trail.
          </p>
        </div>

        <div className="relative overflow-hidden border border-[var(--ar-ink)] bg-[var(--ar-soft)] p-3 shadow-[0_24px_70px_rgba(17,16,12,0.1)]">
          <div className="grid min-h-[250px] gap-3 lg:grid-cols-[1.18fr_1.06fr_0.92fr_1.18fr]">
            <InvoiceTrackerPanel />
            <EnginePanel />
            <AgentPanel />
            <GmailDraftPanel />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(251,250,244,0.22)]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--ar-ink)] bg-[var(--ar-accent)] text-[var(--ar-ink)] shadow-[0_0_0_8px_rgba(244,196,48,0.24)]">
              <Play size={34} fill="currentColor" strokeWidth={0} />
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-[var(--color-mid)]">
          Panel flow: Invoice Tracker → QuantM Engine → Approval Draft → Gmail
          Draft + Follow-Up Log.
        </p>
      </div>
    </section>
  );
}
