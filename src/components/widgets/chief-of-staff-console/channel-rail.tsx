"use client";

import { useId } from "react";
import { CHANNELS, type Channel } from "./channel-data";

type ChannelRailProps = {
  activeIdx: number;
  /** Global tick — used to nudge timestamps so they feel alive. */
  tick: number;
};

function formatActivity(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  return `${hours}h`;
}

function indicatorClass(channel: Channel, isActive: boolean): string {
  if (channel.hasRunningTask) return "bg-ink animate-pulse";
  if (isActive) return "bg-ink";
  return "bg-ink/25";
}

export function ChannelRail({ activeIdx, tick }: ChannelRailProps) {
  const railId = useId();
  return (
    <nav aria-labelledby={railId} className="bg-paper">
      {/* ── Desktop (≥md): vertical sidebar ── */}
      <div className="hidden h-full flex-col border-r border-ink/10 md:flex">
        <header className="border-b border-ink/10 px-3 py-2">
          <h3
            id={railId}
            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mid"
          >
            Channels
          </h3>
        </header>
        <ol className="flex-1 overflow-hidden">
          {CHANNELS.map((channel, idx) => {
            const isActive = idx === activeIdx;
            const seconds = isActive
              ? Math.max(2, (tick % 9) + 2)
              : channel.lastActivitySec + ((tick + idx * 3) % 7);
            return (
              <li
                key={channel.id}
                className={[
                  "flex items-center justify-between gap-2 px-3 py-2 transition-colors duration-200",
                  isActive
                    ? "border-l-2 border-ink bg-ink/[0.04]"
                    : "border-l-2 border-transparent",
                ].join(" ")}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={[
                      "inline-block size-1.5 shrink-0 rounded-full",
                      indicatorClass(channel, isActive),
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "truncate text-[12px]",
                      isActive
                        ? "font-semibold text-ink"
                        : "font-medium text-ink/80",
                    ].join(" ")}
                  >
                    <span className="text-mid">#</span>
                    {channel.name}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] tabular-nums text-mid">
                  {formatActivity(seconds)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Mobile (<md): horizontal scrollable strip ── */}
      <div className="flex flex-col border-b border-ink/10 md:hidden">
        <div className="flex items-center justify-between border-b border-ink/10 px-3 py-1.5">
          <h3
            id={railId}
            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mid"
          >
            Channels
          </h3>
          <span className="text-[10px] tabular-nums text-mid">
            {CHANNELS.length} ch
          </span>
        </div>
        <ol className="flex gap-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CHANNELS.map((channel, idx) => {
            const isActive = idx === activeIdx;
            const seconds = isActive
              ? Math.max(2, (tick % 9) + 2)
              : channel.lastActivitySec + ((tick + idx * 3) % 7);
            return (
              <li
                key={channel.id}
                className={[
                  "flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 transition-colors duration-200",
                  isActive ? "border-ink bg-ink/[0.04]" : "border-transparent",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "inline-block size-1.5 shrink-0 rounded-full",
                    indicatorClass(channel, isActive),
                  ].join(" ")}
                />
                <span
                  className={[
                    "whitespace-nowrap text-[11px]",
                    isActive
                      ? "font-semibold text-ink"
                      : "font-medium text-ink/60",
                  ].join(" ")}
                >
                  <span className="text-mid">#</span>
                  {channel.name}
                </span>
                <span className="shrink-0 text-[9.5px] tabular-nums text-mid">
                  {formatActivity(seconds)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
