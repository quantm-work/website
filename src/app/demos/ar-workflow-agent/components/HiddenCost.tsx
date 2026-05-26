import { SectionLabel } from "./SectionLabel";

const warningCards = [
  {
    title: "Follow-ups live in inboxes",
    body: "Nobody knows which reminder was sent, when, or by whom.",
  },
  {
    title: "Status is scattered",
    body: "Finance, sales, and operations work from different versions of the truth.",
  },
  {
    title: "Escalation happens late",
    body: "High-value invoices are noticed only after the delay is already expensive.",
  },
  {
    title: "Cash-risk is invisible",
    body: "Teams see unpaid invoices, but not the next action required to move them.",
  },
];

export function HiddenCost() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-[var(--color-ink)]">
      <div className="border-y border-[var(--color-ink)] py-12">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionLabel>The hidden cost</SectionLabel>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Revenue gets delayed when follow-up depends on memory.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-mid)]">
              Most overdue invoices do not fail because nobody cares. They fail
              because the process after issuing the invoice is scattered across
              inboxes, spreadsheets, and informal reminders.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {warningCards.map((card) => (
                <article
                  key={card.title}
                  className="border border-[var(--ar-border)] bg-white p-5 shadow-[0_12px_36px_rgba(11,11,13,0.04)]"
                >
                  <span className="mb-5 block h-1 w-8 bg-[var(--ar-accent)]" />
                  <h3 className="text-sm font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--ar-muted)]">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
