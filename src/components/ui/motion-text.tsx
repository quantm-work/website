"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useId } from "react";

type MotionTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerDelay?: number;
  once?: boolean;
};

const wordVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export function MotionText({
  text,
  className,
  as: Tag = "p",
  staggerDelay = 0.08,
  once = true,
}: MotionTextProps) {
  const id = useId();
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(/\s+/);

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const staggerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      role="presentation"
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={staggerVariants}
    >
      <Tag aria-hidden="true">
        {words.map((word, i) => (
          <motion.span
            key={`${id}-w-${word}-${i}`}
            variants={wordVariants}
            style={{ display: "inline-block", marginRight: "0.3em" }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
