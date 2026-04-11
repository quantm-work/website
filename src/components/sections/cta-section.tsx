"use client";

import { motion } from "framer-motion";
import { ctaReveal } from "@/lib/animation";
import { CALENDAR_LINK } from "@/lib/config";

export function CTASection() {
  return (
    <motion.section
      aria-label="Call to action"
      className="w-full py-24 px-8 flex flex-col items-center justify-center text-center max-w-7xl mx-auto"
      variants={ctaReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2
        className="font-display mb-12"
        style={{
          fontSize: "var(--font-xl)",
          color: "var(--color-ink)",
        }}
      >
        Ready to build?
      </h2>
      <motion.a
        href={CALENDAR_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a consultation"
        className="inline-flex items-center justify-center bg-[var(--color-ink)] text-[var(--color-paper)] px-12 py-7 text-base font-medium min-w-[44px] min-h-[72px]"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        Book Now
      </motion.a>
    </motion.section>
  );
}
