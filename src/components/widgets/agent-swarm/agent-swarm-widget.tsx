"use client";

import { useId } from "react";
import { AgentGraph } from "./agent-graph";
import { type CaseRow, frames, type RiskBand, type TraceLine } from "./frames";
import { useSwarmFrames } from "./use-swarm-frames";

function formatLatency(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${ms}ms`;
}

function riskBandLabel(band: RiskBand): string {
  if (band === "low") return "Low";
  if (band === "med") return "Med";
  return "High";
}

function caseStatusBadge(status: CaseRow["status"]): {
  text: string;
  className: string;
} {
  if (status === "active") {
    return {
      text: "Active",
      className: "bg-ink text-paper",
    };
  }
  if (status === "cleared") {
    return {
      text: "Cleared",
      className: "border border-ink/20 text-mid",
    };
  }
  if (status === "flagged") {
    return {
      text: "Flagged",
      className: "border border-ink text-ink",
    };
  }
  return {
    text: "Pending",
    className: "border border-ink/15 text-mid",
  };
}

function VerdictPanel({
  state,
  riskBand,
  riskScore,
}: {
  state: "pending" | "review" | "cleared" | "flagged";
  riskBand: RiskBand;
  riskScore: number;
}) {
  const steps: readonly { id: string; label: string }[] = [
    { id: "pending", label: "Pending" },
    { id: "review", label: "Review" },
    {
      id: state === "flagged" ? "flagged" : "cleared",
      label: state === "flagged" ? "Flagged" : "Cleared",
    },
  ];
  const reachedIndex = (() => {
    if (state === "pending") return 0;
    if (state === "review") return 1;
    return 2;
  })();

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-ink/10 px-4 py-2.5 md:gap-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-mid">
        Verdict
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {steps.map((step, i) => {
          const reached = i <= reachedIndex;
          const isLast = i === steps.length - 1;
          const isFlagged = state === "flagged" && isLast;
          return (
            <div key={step.id} className="flex items-center gap-1.5">
              <span
                className={[
                  "px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.12em] tabular-nums",
                  reached
                    ? isFlagged
                      ? "bg-ink text-paper"
                      : "bg-ink text-paper"
                    : "border border-ink/15 text-mid",
                ].join(" ")}
              >
                {isFlagged ? `❗ ${step.label}` : step.label}
              </span>
              {!isLast ? (
                <span aria-hidden="true" className="text-mid">
                  →
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="ml-auto flex items-center gap-2 text-[11px] text-mid md:gap-3">
        <span className="uppercase tracking-[0.12em]">Risk</span>
        <span className="font-medium tabular-nums text-ink">
          {riskBandLabel(riskBand)} · {riskScore}
        </span>
      </div>
    </div>
  );
}

function CaseQueue({ cases }: { cases: readonly CaseRow[] }) {
  const reactKey = useId();
  return (
    <div className="flex flex-col">
      <span className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-mid border-b border-ink/10">
        Case Queue
      </span>
      <ul className="flex flex-col">
        {cases.map((c, i) => {
          const badge = caseStatusBadge(c.status);
          const isActive = c.status === "active";
          return (
            <li
              key={`${reactKey}-${c.id}`}
              className={[
                "px-3 py-2 transition-colors duration-200",
                isActive ? "bg-ink/[0.04]" : "",
                i < cases.length - 1 ? "border-b border-ink/5" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold leading-tight text-ink">
                  {c.label}
                </span>
                <span
                  className={[
                    "shrink-0 px-1.5 py-[2px] text-[9px] font-medium uppercase tracking-[0.12em]",
                    badge.className,
                  ].join(" ")}
                >
                  {badge.text}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-mid tabular-nums">
                <span>{c.volume}</span>
                <span aria-hidden="true">·</span>
                <span>{c.jurisdiction}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function LiveTrace({ lines }: { lines: readonly TraceLine[] }) {
  const reactKey = useId();
  return (
    <div className="flex flex-col">
      <span className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-mid border-b border-ink/10 flex items-center justify-between">
        <span>Live Trace</span>
        <span className="flex items-center gap-1 text-mid">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 animate-pulse rounded-full bg-ink"
          />
          <span className="font-medium uppercase tracking-[0.12em] text-ink">
            tail
          </span>
        </span>
      </span>
      <ul className="flex flex-col">
        {lines.map((line, i) => {
          const opacity = Math.max(0.35, 1 - i * 0.11);
          return (
            <li
              key={`${reactKey}-${line.id}`}
              style={{ opacity }}
              className={[
                "flex items-baseline gap-2 px-3 py-[5px] text-[11px] leading-tight",
                i < lines.length - 1 ? "border-b border-ink/[0.04]" : "",
                line.flag ? "bg-ink/[0.05]" : "",
              ].join(" ")}
            >
              <span className="w-[64px] shrink-0 truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-ink md:w-[78px]">
                {line.agentLabel}
              </span>
              <span aria-hidden="true" className="text-mid">
                →
              </span>
              <span className="flex-1 truncate font-medium text-ink">
                {line.flag ? "❗ " : ""}
                {line.tool}
              </span>
              <span className="shrink-0 text-[10px] tabular-nums text-mid">
                {formatLatency(line.latencyMs)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AgentSwarmWidget() {
  const { frame } = useSwarmFrames(frames);

  return (
    <section
      aria-label="Compliance Agent Swarm"
      className="mx-auto w-full max-w-[1040px] border border-ink/15 bg-paper font-[family-name:var(--font-body)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-1 border-b border-ink/10 px-4 py-2.5">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            Compliance Agent Swarm
          </span>
          <span className="text-[11px] text-mid">AML / KYC · Onboarding</span>
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
          <span className="uppercase tracking-[0.12em]">5 agents</span>
        </div>
      </header>

      <div className="border-b border-ink/10 px-4 py-2">
        <p className="text-[11px] italic text-mid">
          Regulated teams aren&apos;t replacing reviewers. They&apos;re giving
          reviewers agentic systems with receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-ink/10">
          <CaseQueue cases={frame.cases} />
        </div>
        <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-ink/10 p-3 flex items-center justify-center min-h-[140px] md:min-h-0">
          <AgentGraph
            activeNode={frame.activeNode}
            activeEdge={frame.activeEdge}
          />
        </div>
        <div className="md:col-span-4">
          <LiveTrace lines={frame.trace} />
        </div>
      </div>

      <VerdictPanel
        state={frame.verdict.state}
        riskBand={frame.verdict.riskBand}
        riskScore={frame.verdict.riskScore}
      />

      <div className="border-t border-ink/10 px-4 py-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-mid">
          OFAC · PEP · OCR · KYB · Reviewer Handoff · Audit Trace
        </p>
      </div>

      <div className="border-t border-ink/10 px-4 py-2">
        <p className="text-[11px] italic text-mid">
          Pilot in 30 days · intake, review, audit trace, human approval
        </p>
      </div>

      <footer className="flex items-center justify-between border-t border-ink/10 px-4 py-2 text-[10px] text-mid">
        <span>Sample · synthetic cases · audit-grade trace</span>
        <span>refresh 500 ms · loop 8 s</span>
      </footer>
    </section>
  );
}
