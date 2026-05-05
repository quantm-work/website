"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { sectionReveal } from "@/lib/animation";

type MCPCard = {
  name: string;
  oneLiner: string;
  stamp: string;
};

const mcps: MCPCard[] = [
  {
    name: "Treasury Autopilot",
    oneLiner: "Your money moves itself overnight. Reconciled by morning.",
    stamp: "Bank-grade · runs overnight · zero finance work",
  },
  {
    name: "Sanctions Tripwire",
    oneLiner: "Catch a risky customer before legal does.",
    stamp: "Government watchlists · checked in seconds · before money moves",
  },
  {
    name: "Pipeline Truth Serum",
    oneLiner: "See which deals are real before forecast Friday.",
    stamp: "Reads sales calls · scores every deal · flags the soft ones",
  },
  {
    name: "Executive Time Machine",
    oneLiner: "Your calendar rebuilds itself when priorities change.",
    stamp: "Reads what matters · moves what doesn't · protects deep work",
  },
  {
    name: "Vendor Spend X-Ray",
    oneLiner: "Spot the duplicate software bill before it auto-renews.",
    stamp:
      "Reads every contract · maps every charge · cancels before you pay twice",
  },
  {
    name: "Incident Black Box",
    oneLiner: "When something breaks, the report writes itself by morning.",
    stamp: "Pulls the alerts · reads the chat · drafts the lesson",
  },
];

export function SampleMCPs() {
  const id = useId();

  return (
    <motion.section
      aria-label="Sample MCPs"
      className="w-full bg-[var(--color-ink)] mt-16 md:mt-24"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <h2
          className="font-display leading-[1.02] text-balance max-w-4xl mb-16 md:mb-24"
          style={{
            fontSize: "var(--font-xl)",
            color: "var(--color-paper)",
          }}
        >
          Six tools your team would build if they had the time. Already running.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {mcps.map((mcp, idx) => (
            <article
              key={`${id}-${mcp.name}`}
              className="group relative p-6 sm:p-8 flex flex-col gap-4 transition-colors duration-300"
              style={{
                borderTop: "1px solid rgba(250,250,250,0.12)",
                borderLeft:
                  idx % 3 !== 0
                    ? "1px solid rgba(250,250,250,0.12)"
                    : undefined,
                minHeight: "200px",
              }}
            >
              <h3
                className="font-display leading-[1.05]"
                style={{
                  fontSize: "var(--font-lg)",
                  color: "var(--color-paper)",
                }}
              >
                {mcp.name}
              </h3>
              <p
                className="flex-1"
                style={{
                  fontSize: "var(--font-sm)",
                  color: "rgba(250,250,250,0.75)",
                  lineHeight: 1.5,
                }}
              >
                {mcp.oneLiner}
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "rgba(250,250,250,0.4)" }}
              >
                {mcp.stamp}
              </p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
