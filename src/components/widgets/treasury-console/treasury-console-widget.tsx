"use client";

import { useId } from "react";
import { formatCompactUsd, formatPlainCount } from "./format";
import { EXECUTE_STEPS, frames, type Rule } from "./frames";
import { useTreasuryTick } from "./use-treasury-frames";

function StatusDot({ status }: { status: Rule["status"] }) {
  // active = subtle, queued = ring, executing = pulse, completed = filled
  if (status === "executing") {
    return (
      <span
        aria-hidden="true"
        className="inline-block size-1.5 animate-pulse rounded-full bg-ink"
      />
    );
  }
  if (status === "queued") {
    return (
      <span
        aria-hidden="true"
        className="inline-block size-1.5 rounded-full ring-1 ring-ink/40"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="inline-block size-1.5 rounded-full bg-ink/25"
    />
  );
}

function StatusLabel({ status }: { status: Rule["status"] }) {
  const text =
    status === "executing"
      ? "executing"
      : status === "queued"
        ? "queued"
        : status === "completed"
          ? "done"
          : "active";
  return (
    <span className="text-[10px] uppercase tracking-[0.12em] text-mid">
      {text}
    </span>
  );
}

export function TreasuryConsoleWidget() {
  const idx = useTreasuryTick(frames.length);
  const frame = frames[idx];
  const statsKeyPrefix = useId();
  const rulesKeyPrefix = useId();
  const stepsKeyPrefix = useId();

  const stats = [
    {
      label: "Total supply",
      value: formatCompactUsd(frame.stats.totalSupplyUsd),
    },
    {
      label: "Circulating",
      value: formatCompactUsd(frame.stats.circulatingUsd),
    },
    {
      label: "Attested reserves",
      value: formatCompactUsd(frame.stats.attestedReservesUsd),
    },
    {
      label: "Pending flows",
      value: `${formatCompactUsd(frame.stats.pendingFlowsUsd)} · ${formatPlainCount(
        frame.stats.pendingFlowCount,
      )}`,
    },
  ];

  return (
    <section
      aria-label="Stablecoin Treasury Console"
      className="mx-auto w-full max-w-[1040px] border border-ink/15 bg-paper font-[family-name:var(--font-body)]"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            Treasury Console
          </span>
          <span className="text-[11px] text-mid">Programmable USDC · USD</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-mid">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 animate-pulse rounded-full bg-ink"
          />
          <span className="font-medium uppercase tracking-[0.12em] text-ink">
            Live
          </span>
          <span aria-hidden="true">·</span>
          <span className="uppercase tracking-[0.12em]">CCTP v2</span>
        </div>
      </header>

      {/* Market-timing line */}
      <div className="border-b border-ink/10 px-4 py-2">
        <p className="text-[12px] italic text-mid">
          Stablecoin payments are moving from crypto-native teams into payroll,
          vendors, and treasury ops.
        </p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 border-b border-ink/10 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={`${statsKeyPrefix}-${stat.label}`}
            className={[
              "px-4 py-3",
              // Mobile 2×2: bottom border only on top row (i < 2)
              i < 2 ? "border-b border-ink/10" : "",
              // Mobile 2×2: right border on left-column cells (even index)
              i % 2 === 0 ? "border-r border-ink/10" : "",
              // Desktop 4-col: remove bottom border, restore right borders
              i < stats.length - 1
                ? "sm:border-b-0 sm:border-r sm:border-ink/10"
                : "",
              i === stats.length - 1 ? "sm:border-r-0" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-mid">
              {stat.label}
            </div>
            <div className="mt-1 text-[15px] font-semibold tabular-nums text-ink">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Rules + Execute */}
      <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr]">
        {/* Rules ledger */}
        <div className="sm:border-r sm:border-ink/10">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-mid">
              Rules ledger
            </span>
            <span className="text-[10px] text-mid">
              {frame.rules.length} active
            </span>
          </div>
          <ul className="divide-y divide-ink/5">
            {frame.rules.map((rule) => (
              <li
                key={`${rulesKeyPrefix}-${rule.id}`}
                className={[
                  "flex items-center gap-3 px-4 py-2.5 transition-colors",
                  rule.status === "executing" ? "bg-ink/[0.04]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <StatusDot status={rule.status} />
                <span className="flex-1 text-[12.5px] font-medium text-ink">
                  {rule.label}
                </span>
                <StatusLabel status={rule.status} />
              </li>
            ))}
          </ul>
        </div>

        {/* Execute panel */}
        <div>
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-mid">
              Execute
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-mid">
              {frame.execute.chain}
            </span>
          </div>

          <div className="px-4 py-3">
            <div className="text-[12.5px] font-semibold text-ink">
              {frame.execute.ruleLabel}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[11px] text-mid tabular-nums">
              <span>{formatCompactUsd(frame.execute.amountUsd)}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{frame.execute.hash}</span>
            </div>
          </div>

          <ol className="border-t border-ink/10">
            {EXECUTE_STEPS.map((step, i) => {
              const isActive = i === frame.execute.activeStep;
              const isDone = i < frame.execute.activeStep;
              return (
                <li
                  key={`${stepsKeyPrefix}-${step.key}`}
                  className={[
                    "flex items-center gap-3 px-4 py-1.5",
                    isActive ? "bg-ink/[0.04]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "inline-block size-1.5 rounded-full",
                      isActive
                        ? "animate-pulse bg-ink"
                        : isDone
                          ? "bg-ink"
                          : "bg-ink/20",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "flex-1 text-[12px]",
                      isDone || isActive ? "text-ink" : "text-mid",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "text-[12px]",
                      isDone
                        ? "text-ink"
                        : isActive
                          ? "text-ink"
                          : "text-ink/15",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : isActive ? "•" : "·"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Proof bar */}
      <div className="border-t border-ink/10 px-4 py-2">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-mid">
          CCTP · Base · Solana · escrow rules · payout approvals · reserve
          checks
        </div>
      </div>

      {/* Engagement-shape line */}
      <div className="border-t border-ink/10 px-4 py-2">
        <p className="text-[12px] italic text-mid">
          Prototype in 2–4 weeks · treasury rules, payouts, attestations
        </p>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-ink/10 px-4 py-2 text-[10px] text-mid">
        <span>Sample · synthetic flows · realistic ranges</span>
        <span>refresh 500 ms · loop 12 s</span>
      </footer>
    </section>
  );
}
