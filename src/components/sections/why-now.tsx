"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/lib/animation";

export function WhyNow() {
  return (
    <motion.section
      aria-label="Why now"
      className="w-full max-w-7xl mx-auto px-8 py-20 sm:py-24"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-3xl flex flex-col gap-6">
        <h2
          className="font-display leading-[1.05]"
          style={{
            fontSize: "var(--font-xl)",
            color: "var(--color-ink)",
          }}
        >
          What your competitors will be piloting next quarter.
        </h2>
        <p
          style={{
            fontSize: "var(--font-base)",
            color: "var(--color-ink)",
            lineHeight: 1.55,
          }}
        >
          The next wave of software won't look like dashboards. It will move
          money, review risk, coach teams, and operate across your business in
          real time.
        </p>
      </div>
    </motion.section>
  );
}
