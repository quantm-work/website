export function QuantMEngine({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border border-[var(--ar-ink)] bg-[var(--ar-accent)] text-[var(--ar-ink)] shadow-[0_18px_44px_rgba(244,196,48,0.22)] ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 bg-white opacity-35 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(17,16,12,0.62)]">
            QuantM Engine
          </p>
          <span className="h-2 w-2 bg-[var(--ar-ink)] shadow-[0_0_14px_rgba(17,16,12,0.28)]" />
        </div>
        <p className="mt-2 text-sm font-semibold">
          Rules · Drafting · Escalation
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["Rules", "Tone", "Risk"].map((label, index) => (
            <div
              key={label}
              className="border border-[rgba(17,16,12,0.22)] bg-white/35 p-2"
            >
              <span className="block h-1 w-5 bg-[var(--ar-ink)]" />
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(17,16,12,0.64)]">
                {label}
              </p>
              <span
                className="mt-2 block h-1 bg-[rgba(17,16,12,0.24)]"
                style={{ width: `${60 + index * 12}%` }}
              />
            </div>
          ))}
        </div>
        {!compact && (
          <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgba(17,16,12,0.58)]">
            <span className="h-px flex-1 bg-[rgba(17,16,12,0.22)]" />
            Approval gate active
          </div>
        )}
      </div>
    </div>
  );
}
