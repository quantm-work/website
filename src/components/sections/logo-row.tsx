"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { logoRowFade } from "@/lib/animation";

type LogoShape = {
  name: string;
  render: () => React.ReactElement;
};

const logos: LogoShape[] = [
  {
    name: "Client Logo 1",
    render: () => <circle cx="24" cy="24" r="20" />,
  },
  {
    name: "Client Logo 2",
    render: () => <rect x="4" y="4" width="40" height="40" />,
  },
  {
    name: "Client Logo 3",
    render: () => <polygon points="24,4 44,44 4,44" />,
  },
  {
    name: "Client Logo 4",
    render: () => <polygon points="24,2 44,14 44,34 24,46 4,34 4,14" />,
  },
  {
    name: "Client Logo 5",
    render: () => <polygon points="24,2 44,24 24,46 4,24" />,
  },
];

export function LogoRow() {
  const id = useId();

  return (
    <section aria-label="Client logos" className="pt-16 pb-32 px-8">
      <motion.div
        className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-8 md:gap-16"
        variants={logoRowFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {logos.map((logo) => (
          <svg
            key={`${id}-${logo.name}`}
            role="img"
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="var(--color-ink)"
            className="min-w-[44px] min-h-[44px] opacity-30 hover:opacity-70"
            style={{ transition: "var(--transition-base)" }}
          >
            <title>{logo.name}</title>
            {logo.render()}
          </svg>
        ))}
      </motion.div>
    </section>
  );
}
