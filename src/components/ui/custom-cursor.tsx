"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type CustomCursorProps = {
  className?: string;
};

const SPRING_CONFIG = { damping: 25, stiffness: 250 };

export function CustomCursor({ className }: CustomCursorProps) {
  const [isTouch, setIsTouch] = useState(true); // default true to avoid flash on SSR
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = SPRING_CONFIG;
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const size = isHovering ? 40 : 12;

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouch, handleMouseMove]);

  if (isTouch) return null;

  return (
    <motion.div
      className={`custom-cursor pointer-events-none fixed z-[9999] rounded-full ${className ?? ""}`}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "var(--color-ink)",
      }}
      animate={{
        width: size,
        height: size,
        mixBlendMode: isHovering ? "difference" : "normal",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 250 }}
    />
  );
}
