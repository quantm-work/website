export function Reframe() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 text-[var(--ar-ink)]">
      <div className="border border-[var(--ar-ink)] bg-[var(--ar-accent)] p-8 text-[var(--ar-ink)] shadow-[0_22px_60px_rgba(244,196,48,0.18)] md:p-10">
        <div className="h-1 w-20 bg-[var(--ar-ink)]" />
        <p className="mt-8 max-w-4xl font-display text-4xl font-semibold leading-tight md:text-6xl">
          The invoice was sent.
          <br />
          The work was done.
          <br />
          The revenue is earned.
          <br />
          But the follow-up workflow is still manual.
        </p>
        <p className="mt-8 border-t border-[rgba(17,16,12,0.28)] pt-6 text-xl font-semibold">
          That is where cash gets stuck.
        </p>
      </div>
    </section>
  );
}
