"use client";

import { useEffect, useState } from "react";
import type { Frame } from "./frames";

const TICK_MS = 500;

export function useSwarmFrames(frames: readonly Frame[]): {
  frame: Frame;
  idx: number;
} {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let id: number | undefined;

    const start = () => {
      if (id !== undefined) return;
      id = window.setInterval(() => {
        setIdx((i) => (i + 1) % frames.length);
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
  }, [frames]);

  return { frame: frames[idx], idx };
}
