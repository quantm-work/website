export function ARWorkflowAgentCard() {
  return (
    <a
      href="/demos/ar-workflow-agent"
      className="block border border-[var(--color-ink)] p-6 text-[var(--color-ink)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
        Finance workflows
      </p>
      <h3 className="mt-4 text-2xl font-semibold">AR Workflow Agent</h3>
      <p className="mt-3 text-sm leading-6 opacity-70">
        Turn unpaid invoices into approved drafts, escalation tracking, and
        weekly AR briefs — inside Gmail, Outlook, Sheets, Slack, or Teams.
      </p>
      <p className="mt-5 text-sm font-semibold">See demo →</p>
    </a>
  );
}
