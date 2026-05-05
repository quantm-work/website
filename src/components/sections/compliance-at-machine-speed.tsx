"use client";

import { motion } from "framer-motion";
import { AgentSwarmWidget } from "@/components/widgets/agent-swarm/agent-swarm-widget";
import { sectionReveal } from "@/lib/animation";

export function ComplianceAtMachineSpeed() {
  return (
    <div className="mx-auto max-w-7xl mt-16 md:mt-24">
      <motion.section
        aria-label="Compliance at Machine Speed"
        className="relative aspect-video overflow-hidden bg-[var(--color-ink)]"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(250,250,250,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.055) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 55%, black 40%, transparent 85%)",
          }}
        />

        <div className="iso-stage absolute inset-0 flex items-center justify-center">
          <div
            className="iso-widget relative"
            style={{ width: "min(96%, 1120px)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -bottom-14 h-24 bg-black/85 blur-3xl"
            />
            <div className="relative overflow-hidden shadow-[0_80px_180px_-20px_rgba(0,0,0,0.85),0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
              <AgentSwarmWidget />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-8 sm:px-12 sm:pb-10">
          <h2
            className="font-display max-w-[60%] leading-[0.95] bg-[var(--color-ink)] px-4 py-3"
            style={{
              fontSize: "var(--font-xl)",
              color: "var(--color-paper)",
            }}
          >
            Compliance at Machine Speed
          </h2>
          <span className="hidden bg-[var(--color-ink)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[color:rgb(250_250_250_/_0.55)] sm:block">
            Agentic review trace
          </span>
        </div>
      </motion.section>
    </div>
  );
}
