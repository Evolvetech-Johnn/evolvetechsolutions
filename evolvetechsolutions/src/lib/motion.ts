"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export const EASINGS = {
  enter: [0.16, 1, 0.3, 1] as const,
  exit: [0.16, 1, 0.3, 1] as const,
};

export const SPRING_CONFIG = {
  stiffness: 300,
  damping: 20,
} as const;

export function useMotionConfig() {
  const shouldReduceMotion = useReducedMotion();

  return {
    enabled: !shouldReduceMotion,
    staggerDelay: 0.1,
    enterDuration: 0.7,
    microDuration: 0.15,
  };
}

export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASINGS.enter } },
};

export const BUTTON_VARIANTS: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const CARD_VARIANTS: Variants = {
  idle: { y: 0 },
  hover: { y: -4, transition: { ...SPRING_CONFIG } },
};

export const SECTION_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASINGS.enter } },
};
