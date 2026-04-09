"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { sectionReveal } from "@/lib/animation";

const sections = [
  "Infrastructure at Scale",
  "Capital Moves Fast",
  "Built for What's Next",
];

export function ParallaxStack() {
  const id = useId();

  return (
    <div className="mx-auto max-w-7xl">
      {sections.map((title) => (
        <motion.section
          key={`${id}-${title}`}
          aria-label={title}
          className="relative aspect-video overflow-hidden bg-[var(--color-ink)]"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h2
              className="font-display text-center px-6"
              style={{
                fontSize: "var(--font-xl)",
                color: "var(--color-paper)",
              }}
            >
              {title}
            </h2>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
