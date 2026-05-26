import { fiveDayPlan } from "../lib/ar-workflow-data";
import { SectionLabel } from "./SectionLabel";

export function FiveDaySprint() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 text-[var(--color-ink)]">
      <div className="border border-[var(--color-ink)] p-6">
        <div className="mb-7 max-w-2xl">
          <SectionLabel>Installed in 5 days</SectionLabel>
          <h2 className="font-display text-3xl font-semibold leading-tight">
            Fast enough to prove value. Structured enough to trust.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[var(--ar-muted)]">
            We do not start by replacing your finance stack. We map the workflow
            you already have and install the missing follow-up layer around it.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {fiveDayPlan.map(([day, text]) => (
            <div key={day} className="border border-[var(--color-subtle)] p-4">
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                {day}
              </p>
              <span className="mt-3 block h-1 w-8 bg-[var(--ar-accent)]" />
              <p className="mt-3 text-sm leading-6 text-[var(--color-mid)]">
                {text}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--color-mid)]">
          Built for teams that want working automation quickly — without losing
          control of client communication.
        </p>
      </div>
    </section>
  );
}
