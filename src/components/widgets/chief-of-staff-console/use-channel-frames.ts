"use client";

import { useEffect, useState } from "react";
import { CHANNELS } from "./channel-data";

/**
 * Channel rotation state machine.
 *
 * Reuses the 500ms tick used by every other widget on the homepage so the
 * tile reel stays synchronized in cadence. Two layers of motion:
 *
 *   - Macro: active channel rotates every TICKS_PER_CHANNEL ticks (~7s)
 *     to walk the manager's focus through the rail.
 *   - Micro: a sub-step within the active channel advances every tick.
 *     The pane uses it to slide its message window forward and to append
 *     tool-call lines, producing the "tool calls keep landing" feel.
 *
 * Pure derivation from a single tick counter keeps motion deterministic
 * and makes server/client render output identical.
 */

const TICK_MS = 500;
const TICKS_PER_CHANNEL = 14; // ~7s

export type ChannelFrame = {
  /** Index of the active channel in CHANNELS. */
  activeIdx: number;
  /** Tick within the active channel (0..TICKS_PER_CHANNEL-1). */
  subTick: number;
  /** Total ticks per channel rotation. */
  channelTicks: number;
  /** Monotonic tick. */
  tick: number;
};

const TOTAL_CYCLE = CHANNELS.length * TICKS_PER_CHANNEL;

function frameForTick(tick: number): ChannelFrame {
  const wrapped = ((tick % TOTAL_CYCLE) + TOTAL_CYCLE) % TOTAL_CYCLE;
  const activeIdx = Math.floor(wrapped / TICKS_PER_CHANNEL);
  const subTick = wrapped % TICKS_PER_CHANNEL;
  return {
    activeIdx,
    subTick,
    channelTicks: TICKS_PER_CHANNEL,
    tick,
  };
}

export function useChannelFrames(): ChannelFrame {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let id: number | undefined;

    const start = () => {
      if (id !== undefined) return;
      id = window.setInterval(() => {
        setTick((t) => (t + 1) % TOTAL_CYCLE);
      }, TICK_MS);
    };

    const stop = () => {
      if (id !== undefined) {
        window.clearInterval(id);
        id = undefined;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return frameForTick(tick);
}

export const CHANNEL_TICKS_PER_CHANNEL = TICKS_PER_CHANNEL;
