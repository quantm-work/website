"use client";

import { motion, useScroll } from "framer-motion";

type ScrollProgressProps = {
  className?: string;
};

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`scroll-progress pointer-events-none fixed left-0 right-0 top-0 z-50 ${className ?? ""}`}
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left",
        height: 2,
        backgroundColor: "var(--color-ink)",
      }}
    />
  );
}
