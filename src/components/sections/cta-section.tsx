"use client";

import { motion } from "framer-motion";
import { ctaReveal } from "@/lib/animation";
import { CALENDAR_LINK } from "@/lib/config";

export function CTASection() {
  return (
    <motion.section
      aria-label="Call to action"
      className="w-full py-14 md:py-24 px-6 md:px-8 flex flex-col items-center justify-center text-center max-w-7xl mx-auto"
      variants={ctaReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2
        className="font-display max-w-3xl text-balance"
        style={{
          fontSize: "var(--font-xl)",
          color: "var(--color-ink)",
          lineHeight: 1.1,
        }}
      >
        Bring us the workflow everyone complains about.
      </h2>
      <p
        className="mt-6 max-w-2xl text-balance"
        style={{
          fontSize: "var(--font-base)",
          color: "var(--color-ink)",
          lineHeight: 1.55,
        }}
      >
        We'll turn it into a working AI system, payment rail, or operational
        console your team can actually use.
      </p>
      <motion.a
        href={CALENDAR_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a build sprint"
        className="mt-8 md:mt-12 w-full sm:w-auto inline-flex items-center justify-center bg-[var(--color-ink)] text-[var(--color-paper)] px-12 py-7 text-base font-semibold min-w-[44px] min-h-[72px]"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        Book a build sprint
      </motion.a>
      <p
        className="mt-5 text-[11px] sm:text-[12px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-balance"
        style={{ color: "var(--color-mid)" }}
      >
        Stablecoin infrastructure · agentic workflows · executive AI systems
      </p>
    </motion.section>
  );
}
