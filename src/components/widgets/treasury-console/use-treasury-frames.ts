"use client";

import { useEffect, useState } from "react";

const TICK_MS = 500;

export function useTreasuryTick(length: number): number {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (length <= 0) return;
    let id: number | undefined;

    const start = () => {
      if (id !== undefined) return;
      id = window.setInterval(() => {
        setIdx((i) => (i + 1) % length);
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
  }, [length]);

  return idx;
}
