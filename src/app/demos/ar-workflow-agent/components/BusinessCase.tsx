import { SectionLabel } from "./SectionLabel";

const metrics = [
  {
    title: "Faster follow-up cycles",
    body: "Drafts prepared as soon as an invoice becomes due or overdue.",
  },
  {
    title: "Fewer missed reminders",
    body: "Every invoice has an owner, status, and next action.",
  },
  {
    title: "Clear escalation",
    body: "High-value or long-overdue invoices stop disappearing inside spreadsheets.",
  },
];

export function BusinessCase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 text-[var(--color-ink)]">
      <div className="grid gap-8 border border-[var(--color-ink)] p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel>Why it matters</SectionLabel>
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            A few days of follow-up delay becomes working-capital drag.
          </h2>
          <p className="mt-5 text-sm leading-6 text-[var(--color-mid)]">
            Every overdue invoice already represents earned revenue. The
            workflow does not need to be complicated. It needs to make the next
            action obvious, assigned, drafted, and logged.
          </p>
        </div>
        <div className="grid gap-3">
          {metrics.map((metric) => (
            <article
              key={metric.title}
              className="border border-[var(--ar-border)] bg-white p-5"
            >
              <span className="mb-4 block h-1 w-8 bg-[var(--ar-accent)]" />
              <h3 className="text-sm font-semibold">{metric.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-mid)]">
                {metric.body}
              </p>
            </article>
          ))}
          <div className="border border-[var(--ar-accent)] bg-[var(--ar-soft)] p-5 text-[var(--ar-ink)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ar-accent)]">
              Example only
            </p>
            <p className="mt-3 text-lg font-semibold leading-7">
              20 overdue invoices x 7 fewer days outstanding = measurable
              cash-flow improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
