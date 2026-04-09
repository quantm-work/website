import type { Variants } from "framer-motion";

export const headerFadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const heroWordReveal: Variants = {
  hidden: { y: 40 },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
    },
  }),
};

export const heroContainerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const logoRowFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.4 },
  },
};

export const sectionReveal: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export const ctaReveal: Variants = {
  hidden: { scale: 0.97, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export const footerFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};
