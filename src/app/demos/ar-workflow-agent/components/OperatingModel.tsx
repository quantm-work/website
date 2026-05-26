import { QuantMEngine } from "./QuantMEngine";
import { SectionLabel } from "./SectionLabel";

function SheetsLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path fill="#0f9d58" d="M7 3h13l5 5v21H7z" />
      <path fill="#87d3a2" d="M20 3v6h5z" />
      <path
        fill="#fff"
        d="M11 13h12v11H11zm2 2v2h3v-2zm5 0v2h3v-2zm-5 4v2h3v-2zm5 0v2h3v-2z"
      />
    </svg>
  );
}

function AirtableLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path fill="#f9b233" d="M15.5 4 4 8.8l11.5 4.9L27 8.8z" />
      <path fill="#18bfff" d="M17 14.9 28 10.2v12.6L17 28z" />
      <path fill="#f82b60" d="M15 14.9 4 10.2v12.6L15 28z" />
    </svg>
  );
}

function GmailLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path
        fill="none"
        stroke="#4285f4"
        strokeLinejoin="miter"
        strokeWidth="4"
        d="M5 9v16h22V9L16 18z"
      />
      <path
        fill="none"
        stroke="#ea4335"
        strokeLinejoin="miter"
        strokeWidth="3"
        d="m5 9 11 9L27 9"
      />
    </svg>
  );
}

function OutlookLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path fill="#0a5bd3" d="M4 8h14v16H4z" />
      <path fill="#28a8ea" d="M18 6h10v20H18z" />
      <path
        fill="#fff"
        d="M9 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
      />
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path fill="#36c5f0" d="M12 4a3 3 0 0 1 3 3v5h-3a3 3 0 0 1 0-6z" />
      <path fill="#2eb67d" d="M28 12a3 3 0 0 1-3 3h-5v-3a3 3 0 0 1 6 0z" />
      <path fill="#ecb22e" d="M20 28a3 3 0 0 1-3-3v-5h3a3 3 0 0 1 0 6z" />
      <path fill="#e01e5a" d="M4 20a3 3 0 0 1 3-3h5v3a3 3 0 0 1-6 0z" />
      <path fill="#36c5f0" d="M4 12a3 3 0 0 1 6 0v3H7a3 3 0 0 1-3-3" />
      <path fill="#2eb67d" d="M20 4a3 3 0 0 1 3 3v3h-3a3 3 0 0 1 0-6" />
      <path fill="#ecb22e" d="M28 20a3 3 0 0 1-6 0v-3h3a3 3 0 0 1 3 3" />
      <path fill="#e01e5a" d="M12 28a3 3 0 0 1-3-3v-3h3a3 3 0 0 1 0 6" />
    </svg>
  );
}

function TeamsLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path fill="#6264a7" d="M13 8h10v12a5 5 0 0 1-10 0z" />
      <path fill="#7b83eb" d="M20 6h8v12a4 4 0 0 1-8 0z" />
      <path fill="#464775" d="M5 10h12v13H5z" />
      <path fill="#fff" d="M8 14h6v2h-2v5h-2v-5H8z" />
    </svg>
  );
}

function GraphicBlock({
  icons,
  title,
  subtitle,
  emphasized = false,
}: {
  icons: React.ReactNode;
  title: string;
  subtitle: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`flex min-h-32 items-center gap-5 border p-5 shadow-[0_14px_34px_rgba(10,10,10,0.08)] ${
        emphasized
          ? "border-[var(--ar-ink)] bg-[var(--ar-accent)]"
          : "border-[var(--color-subtle)] bg-white"
      }`}
    >
      <div className="flex shrink-0 items-center gap-2">{icons}</div>
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-[var(--color-mid)]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export function OperatingModel() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 text-[var(--color-ink)]">
      <div className="border border-[var(--ar-ink)] bg-[var(--ar-soft)] p-6 text-[var(--ar-ink)] shadow-[0_22px_60px_rgba(17,16,12,0.06)]">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_2.26fr] lg:items-center">
          <div>
            <SectionLabel>No new dashboard required</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              No new dashboard required.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--ar-muted)]">
              The workflow lives where your team already works.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <GraphicBlock
              icons={
                <>
                  <SheetsLogo />
                  <AirtableLogo />
                </>
              }
              title="Invoice source"
              subtitle="Sheets · Airtable · CSV · CRM"
            />
            <GraphicBlock
              emphasized
              icons={
                <div className="w-44">
                  <QuantMEngine compact />
                </div>
              }
              title="QuantM Engine"
              subtitle="Rules · Drafting · Escalation"
            />
            <GraphicBlock
              icons={
                <>
                  <GmailLogo />
                  <OutlookLogo />
                  <SlackLogo />
                  <TeamsLogo />
                </>
              }
              title="Approval surface"
              subtitle="Gmail · Outlook · Slack · Teams"
            />
            <GraphicBlock
              icons={<SheetsLogo />}
              title="Audit trail"
              subtitle="Follow-up log · CRM update · Weekly report"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
