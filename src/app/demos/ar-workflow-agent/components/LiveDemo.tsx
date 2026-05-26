"use client";

import {
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  MailOpen,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { invoices, proofSteps } from "../lib/ar-workflow-data";
import { SectionLabel } from "./SectionLabel";

type DraftEmail = {
  id: string;
  step: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  label: string;
};

const invoiceAvatarStyles = [
  "bg-[var(--ar-accent)] text-[var(--ar-ink)]",
  "bg-[var(--ar-soft)] text-[var(--ar-ink)]",
  "bg-[var(--ar-ink)] text-white",
];

function formatMoney(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

function buildDraftEmails(invoice: (typeof invoices)[number]): DraftEmail[] {
  const amount = formatMoney(invoice.amount, invoice.currency);
  const daysLabel =
    invoice.days > 0
      ? `${invoice.days} days overdue`
      : `due in ${Math.abs(invoice.days)} day`;

  return [
    {
      id: `${invoice.id}-tracker`,
      step: proofSteps[0],
      to: "ar-ops@quantm.work",
      subject: `AR action found: ${invoice.id} for ${invoice.client}`,
      preview: `${invoice.client} needs ${invoice.nextAction.toLowerCase()}.`,
      label: "Internal intake",
      body: `Hi team,\n\nThe invoice tracker flagged ${invoice.id} for ${invoice.client}.\n\nAmount: ${amount}\nStatus: ${invoice.status}\nTiming: ${daysLabel}\nOwner: ${invoice.owner}\n\nRecommended next action: ${invoice.nextAction}.\n\nThis is queued for review before any client-facing message is sent.`,
    },
    {
      id: `${invoice.id}-engine`,
      step: proofSteps[1],
      to: "workflow@quantm.work",
      subject: `QuantM Engine rules applied: ${invoice.id}`,
      preview: "Follow-up rules, tone, and escalation status were evaluated.",
      label: "QuantM Engine",
      body: `QuantM Engine result\n\nInvoice: ${invoice.id}\nClient: ${invoice.client}\nTiming: ${daysLabel}\nRule applied: ${invoice.nextAction}\nTone: relationship-aware finance reminder\nEscalation: ${invoice.status === "Escalation" ? "internal escalation note required" : "no escalation required yet"}\n\nThe workflow is ready to prepare a human-approved draft.`,
    },
    {
      id: `${invoice.id}-reminder`,
      step: proofSteps[2],
      to: invoice.email,
      subject: `Friendly reminder: ${invoice.id}`,
      preview: `A polite payment reminder is ready for ${invoice.client}.`,
      label: "Client reminder",
      body: `Hi ${invoice.client} team,\n\nI hope you are well. I am following up on invoice ${invoice.id} for ${amount}.\n\nOur records show it is currently ${daysLabel}. Could you confirm whether payment has been scheduled, or let us know if you need anything from our side?\n\nThanks,\n${invoice.owner}`,
    },
    {
      id: `${invoice.id}-gmail`,
      step: proofSteps[3],
      to: invoice.email,
      subject: `Draft ready in Gmail: ${invoice.id}`,
      preview: "The Gmail draft is created but not sent.",
      label: "Gmail draft",
      body: `Draft status: created, not sent.\n\nRecipient: ${invoice.email}\nSubject: Friendly reminder: ${invoice.id}\nApproval note: ${invoice.owner} should review tone, amount, and recipient before sending.\n\nNo external email leaves the system until a human approves it.`,
    },
    {
      id: `${invoice.id}-log`,
      step: proofSteps[4],
      to: "follow-up-log@quantm.work",
      subject: `Follow-up log updated: ${invoice.id}`,
      preview: "The audit trail captures the draft, status, and owner.",
      label: "Audit update",
      body: `Follow-up log entry\n\nInvoice: ${invoice.id}\nClient: ${invoice.client}\nOwner: ${invoice.owner}\nAction: Gmail draft prepared for approval\nStatus: Awaiting human review\nNext review: next business day\n\nThe log links the generated draft to the original invoice row.`,
    },
    {
      id: `${invoice.id}-brief`,
      step: proofSteps[5],
      to: "finance-leads@quantm.work",
      subject: `Weekly AR brief: ${invoice.client} risk update`,
      preview: "A finance-lead summary is ready for weekly review.",
      label: "Weekly brief",
      body: `Weekly AR brief excerpt\n\n${invoice.client} has ${invoice.id} marked as ${invoice.status} for ${amount}.\n\nCurrent action: ${invoice.nextAction}\nClient-facing draft: prepared, not sent\nOwner: ${invoice.owner}\nRisk note: monitor until payment confirmation is received.\n\nRecommended review: approve reminder or escalate internally if no reply is received.`,
    },
  ];
}

function GmailDraftDrawer({
  draft,
  onClose,
}: {
  draft: DraftEmail;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-[rgba(10,10,10,0.25)]">
      <button
        type="button"
        aria-label="Close Gmail draft preview"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <aside
        aria-label="Gmail draft preview"
        className="relative h-full w-full max-w-xl overflow-y-auto border-l border-[var(--color-ink)] bg-[var(--color-paper)] p-5 shadow-[-12px_0_0_var(--color-ink)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-subtle)] pb-4">
          <div className="flex h-10 w-10 items-center justify-center border border-[var(--color-ink)] text-[#ea4335]">
            <MailOpen size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">Gmail - Drafts</p>
            <p className="text-xs text-[var(--color-mid)]">{draft.label}</p>
          </div>
          <button
            type="button"
            aria-label="Close draft drawer"
            onClick={onClose}
            className="ml-auto flex h-10 w-10 items-center justify-center border border-[var(--color-ink)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 border border-[var(--color-subtle)] bg-white">
          <div className="border-b border-[var(--color-subtle)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ea4335]">
              Draft
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-tight">
              {draft.subject}
            </h3>
          </div>
          <div className="space-y-3 border-b border-[var(--color-subtle)] px-4 py-4 text-sm">
            <p>
              <span className="text-[var(--color-mid)]">To:</span> {draft.to}
            </p>
            <p>
              <span className="text-[var(--color-mid)]">Subject:</span>{" "}
              {draft.subject}
            </p>
          </div>
          <div className="whitespace-pre-line px-4 py-5 text-sm leading-7">
            {draft.body}
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-[var(--color-mid)]">
          Preview only. The workflow creates approval-ready drafts; it does not
          send client emails automatically.
        </p>
      </aside>
    </div>
  );
}

export function LiveDemo() {
  const [invoiceId, setInvoiceId] = useState(invoices[0].id);
  const [running, setRunning] = useState(false);
  const [drafts, setDrafts] = useState<DraftEmail[]>([]);
  const [activeDraft, setActiveDraft] = useState<DraftEmail | null>(null);
  const runRef = useRef(0);

  const selected =
    invoices.find((invoice) => invoice.id === invoiceId) || invoices[0];

  useEffect(() => {
    return () => {
      runRef.current += 1;
    };
  }, []);

  async function runWorkflow() {
    const runId = runRef.current + 1;
    runRef.current = runId;

    setRunning(true);
    setDrafts([]);
    setActiveDraft(null);

    const generatedDrafts = buildDraftEmails(selected);

    for (const draft of generatedDrafts) {
      await new Promise((resolve) => setTimeout(resolve, 420));

      if (runRef.current !== runId) {
        return;
      }

      setDrafts((currentDrafts) => [...currentDrafts, draft]);
    }

    if (runRef.current !== runId) {
      return;
    }

    setActiveDraft(generatedDrafts[2]);
    setRunning(false);
  }

  return (
    <section
      id="live-demo"
      className="mx-auto max-w-6xl px-6 py-14 text-[var(--color-ink)]"
    >
      <div className="mb-8 max-w-3xl">
        <SectionLabel>Run the live demo</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight">
          A real automation behind a simple buyer-facing experience.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-mid)]">
          The prospect sees the outcome. Behind the scenes, the workflow reads
          the invoice source, prepares the draft, and writes the follow-up
          record.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="border border-[var(--ar-border)] bg-white p-5 shadow-[0_18px_50px_rgba(11,11,13,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Today’s payment actions</h3>
            <span className="border border-[var(--color-subtle)] px-3 py-1 text-xs text-[var(--color-mid)]">
              Demo invoices
            </span>
          </div>

          <div className="space-y-3">
            {invoices.map((invoice, index) => {
              const active = invoice.id === invoiceId;
              const isOverdue = invoice.days > 0;
              const statusText = isOverdue
                ? `${invoice.days} days overdue`
                : "due soon";
              const statusClass = isOverdue
                ? active
                  ? "text-white"
                  : "text-[var(--ar-ink)]"
                : active
                  ? "text-white/75"
                  : "text-[var(--ar-muted)]";
              return (
                <button
                  type="button"
                  key={invoice.id}
                  onClick={() => {
                    runRef.current += 1;
                    setInvoiceId(invoice.id);
                    setRunning(false);
                    setDrafts([]);
                    setActiveDraft(null);
                  }}
                  className={`w-full border p-4 text-left transition ${
                    active
                      ? "border-[var(--ar-ink)] bg-[var(--ar-ink)] text-[var(--color-paper)] shadow-[inset_4px_0_0_var(--ar-accent)]"
                      : "border-[var(--ar-border)] bg-[var(--ar-paper)] hover:border-[var(--ar-ink)] hover:bg-[var(--ar-soft)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${invoiceAvatarStyles[index % invoiceAvatarStyles.length]}`}
                      >
                        {invoice.client.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {invoice.client}
                        </p>
                        <p
                          className={`mt-1 text-sm ${
                            active
                              ? "text-[var(--color-paper)]/70"
                              : "text-[var(--color-mid)]"
                          }`}
                        >
                          {invoice.id}
                        </p>
                        <p
                          className={`mt-2 text-xs leading-5 ${
                            active
                              ? "text-[var(--color-paper)]/80"
                              : "text-[var(--color-mid)]"
                          }`}
                        >
                          Next action: {invoice.nextAction}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-semibold">
                        {invoice.currency === "EUR" ? "€" : invoice.currency}
                        {invoice.amount.toLocaleString()}
                      </p>
                      <p
                        className={`mt-1 text-sm font-semibold ${statusClass}`}
                      >
                        {statusText}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border border-[var(--ar-border)] bg-[var(--ar-paper)] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
              <Mail size={16} />
              Human-approved draft creation
            </div>
            <p className="mt-2 text-sm text-[var(--color-mid)]">
              Selected: {selected.client} · {selected.id}
            </p>
            <button
              type="button"
              onClick={runWorkflow}
              disabled={running}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 border border-[var(--ar-ink)] bg-[var(--ar-accent)] px-4 py-3 text-sm font-semibold text-[var(--ar-ink)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--ar-ink)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {running ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Mail size={16} />
              )}
              {running ? "Running workflow..." : "Create approval draft"}
            </button>
            <p className="mt-3 text-xs leading-5 text-[var(--color-mid)]">
              The demo generates Gmail-style drafts locally so the approval flow
              can be inspected step by step.
            </p>
          </div>
        </div>

        <div className="border border-[var(--ar-border)] bg-white p-5 shadow-[0_18px_50px_rgba(11,11,13,0.06)]">
          <h3 className="text-xl font-semibold">Workflow result</h3>
          <p className="mt-1 text-sm text-[var(--color-mid)]">
            A clean trail from invoice signal to reviewable action.
          </p>

          <div className="mt-5 space-y-3">
            {proofSteps.map((step, index) => {
              const draft = drafts[index];
              return (
                <button
                  type="button"
                  key={step}
                  disabled={!draft}
                  onClick={() => draft && setActiveDraft(draft)}
                  className={`flex w-full gap-3 border p-4 text-left transition-colors duration-[var(--transition-base)] ${
                    draft
                      ? "border-[var(--ar-ink)] bg-[var(--ar-soft)] hover:bg-[var(--ar-accent)]"
                      : "border-[var(--ar-border)] text-[var(--color-mid)]"
                  }`}
                >
                  {draft ? (
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[var(--ar-ink)]"
                      size={18}
                    />
                  ) : running && index === drafts.length ? (
                    <Loader2
                      className="mt-0.5 shrink-0 animate-spin text-[var(--ar-ink)]"
                      size={18}
                    />
                  ) : (
                    <FileText className="mt-0.5 shrink-0" size={18} />
                  )}
                  <div>
                    <p className="text-sm font-medium">{step}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {draft ? draft.subject : `Step ${index + 1}`}
                    </p>
                    {draft && (
                      <p className="mt-2 text-xs font-semibold">
                        Open Gmail draft
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border border-[var(--ar-border)] bg-[var(--ar-paper)] p-4">
            {drafts.length > 0 ? (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-[var(--ar-ink)]" size={18} />
                  <p className="font-medium">
                    Drafts generated in Gmail preview
                  </p>
                </div>
                <div className="space-y-2 text-sm text-[var(--color-mid)]">
                  <p>Invoice: {selected.id}</p>
                  <p>Drafts: {drafts.length}</p>
                  <p>
                    Click any completed step above to open the draft drawer.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-6 text-[var(--color-mid)]">
                Run the workflow to show that the finance process produces an
                approval-ready result.
              </p>
            )}
          </div>
        </div>
      </div>

      {activeDraft && (
        <GmailDraftDrawer
          draft={activeDraft}
          onClose={() => setActiveDraft(null)}
        />
      )}
    </section>
  );
}
