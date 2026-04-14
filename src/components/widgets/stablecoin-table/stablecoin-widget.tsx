"use client";

import { formatLoopClock } from "./format";
import { frames } from "./mock-frames";
import { StablecoinTable } from "./stablecoin-table";
import { useStablecoinFrames } from "./use-stablecoin-frames";

function WidgetClock() {
  const { idx } = useStablecoinFrames(frames);
  return (
    <span className="font-medium text-ink tabular-nums">
      {formatLoopClock(idx, frames.length)}
    </span>
  );
}

export function StablecoinWidget() {
  return (
    <section
      aria-label="Stablecoin Monitor"
      className="mx-auto w-full max-w-[1040px] border border-ink/15 bg-paper font-[family-name:var(--font-body)]"
    >
      <header className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            Stablecoin Monitor
          </span>
          <span className="text-[11px] text-mid">Institutional Desk · USD</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-mid">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 animate-pulse rounded-full bg-ink"
          />
          <span className="sr-only">Live, updates every 500 milliseconds</span>
          <span className="font-medium uppercase tracking-[0.12em] text-ink">
            Live
          </span>
          <span aria-hidden="true">·</span>
          <WidgetClock />
          <span aria-hidden="true">·</span>
          <span className="uppercase tracking-[0.12em]">Agg</span>
        </div>
      </header>

      <div className="bg-paper">
        <StablecoinTable />
      </div>

      <footer className="flex items-center justify-between border-t border-ink/10 px-4 py-2 text-[10px] text-mid">
        <span>12 assets · refresh 500 ms</span>
        <span>src: mock · loop 10 s</span>
      </footer>
    </section>
  );
}
