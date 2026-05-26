import { ShieldCheck } from "lucide-react";

const controls = [
  "Drafts are prepared, not automatically sent by default",
  "Every action is logged",
  "Escalation rules are explicit",
  "Tone can match the company’s client relationship",
  "Finance can override any recommendation",
  "Technical teams can inspect the workflow",
];

export function HumanApproval() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 text-[var(--ar-ink)]">
      <div className="grid gap-8 border border-[var(--ar-border)] bg-white p-6 shadow-[0_20px_60px_rgba(11,11,13,0.06)] md:p-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[var(--ar-accent)] bg-[var(--ar-soft)] text-[var(--ar-accent)]">
            <ShieldCheck size={22} />
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Automation where it helps. Human approval where it matters.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {controls.map((control) => (
            <div
              key={control}
              className="border border-[var(--ar-border)] bg-[var(--ar-paper)] p-4"
            >
              <span className="mb-4 block h-1 w-8 bg-[var(--ar-accent)]" />
              <p className="text-sm font-semibold leading-6">{control}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
