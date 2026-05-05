"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CHANNELS } from "./channel-data";
import { ChannelPane } from "./channel-pane";
import { ChannelRail } from "./channel-rail";
import { useChannelFrames } from "./use-channel-frames";

const PROOF_BAR_ITEMS = [
  "calendar",
  "linear",
  "notion",
  "gmail",
  "slack",
  "drive",
  "github",
  "approvals",
] as const;

const paneFade = {
  initial: { opacity: 0, x: 6 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -4 },
} as const;

export function ChiefOfStaffWidget() {
  const frame = useChannelFrames();
  const activeChannel = CHANNELS[frame.activeIdx];

  // Header counters tick subtly so the chrome looks alive.
  const runningCount = CHANNELS.filter((c) => c.hasRunningTask).length;
  const lastSync = Math.max(2, (frame.tick % 19) + 2);
  const totalRunningTasks = 12 + (frame.tick % 4); // 12-15

  return (
    <section
      aria-label="Multi-channel Chief of Staff Console"
      className="mx-auto w-full max-w-[1040px] border border-ink/15 bg-paper font-[family-name:var(--font-body)]"
    >
      {/* Top italic line */}
      <div className="border-b border-ink/10 bg-paper px-4 py-2">
        <p className="text-[11px] italic leading-snug text-mid">
          Every manager runs ten projects in parallel. Their AI chief of staff
          runs all ten with them, in the channels where the work happens.
        </p>
      </div>

      {/* Header chrome */}
      <header className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-2.5">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
            Chief of Staff
          </span>
          <span className="hidden text-[11px] text-mid sm:inline">
            Multi-channel agent runtime
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-mid">
          <span className="hidden tabular-nums sm:inline">
            <span className="font-medium text-ink">{CHANNELS.length}</span>{" "}
            channels
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="hidden tabular-nums sm:inline">
            <span className="font-medium text-ink">{runningCount}</span> running
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="inline-flex items-center gap-1 border border-ink/15 px-1.5 py-[1px] text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink">
            <span
              aria-hidden="true"
              className="inline-block size-1 animate-pulse rounded-full bg-ink"
            />
            <span className="tabular-nums">last sync {lastSync}s ago</span>
          </span>
        </div>
      </header>

      {/* Body — rail + pane.
          Desktop (≥md): side-by-side 28/72 split.
          Mobile: stacked — channel strip on top, pane below. */}
      <div
        className="grid grid-cols-1 md:grid-cols-[28%_72%]"
        style={{ minHeight: 380 }}
      >
        <ChannelRail activeIdx={frame.activeIdx} tick={frame.tick} />
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeChannel.id}
              variants={paneFade}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ChannelPane
                channel={activeChannel}
                subTick={frame.subTick}
                tick={frame.tick}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Proof bar */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-ink/10 px-4 py-2">
        {PROOF_BAR_ITEMS.map((item, i) => (
          <span
            key={item}
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-mid"
          >
            {item}
            {i < PROOF_BAR_ITEMS.length - 1 ? (
              <span aria-hidden="true" className="ml-2 text-ink/25">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </div>

      {/* Engagement-shape line */}
      <div className="border-t border-ink/10 px-4 py-2">
        <p className="text-[11px] italic leading-snug text-mid">
          Executive AI pilot · channel design, agent runtime, manager approval
          surface
        </p>
      </div>

      {/* Footer chip */}
      <footer className="flex items-center justify-between border-t border-ink/10 px-4 py-2 text-[10px] text-mid">
        <span>
          Sample · synthetic channels · {CHANNELS.length} ch ·{" "}
          <span className="tabular-nums">{totalRunningTasks}</span> running
          tasks
        </span>
        <span>
          rotates every {Math.round((frame.channelTicks * 500) / 1000)}s
        </span>
      </footer>
    </section>
  );
}
