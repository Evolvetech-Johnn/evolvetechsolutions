import type { Variants, Transition } from "framer-motion";

// ---------------------------------------------------------------------------
// Bar-chart "breathing" animation
// ---------------------------------------------------------------------------

/**
 * Per-bar config for the breathing animation.
 * scaleY oscillates between scaleMin and scaleMax (relative to the bar's
 * natural height) so each bar has its own rhythm.
 */
export interface BarAnimConfig {
  scaleMin: number;
  scaleMax: number;
  duration: number; // one half-cycle (seconds)
  delay: number;    // initial delay (seconds)
}

/**
 * Generate per-bar animation configs from an array of bar heights.
 * Taller bars get a narrower oscillation range so the visual hierarchy
 * of the chart is preserved (the tallest bar never dips below a shorter one).
 */
export function buildBarConfigs(heights: number[]): BarAnimConfig[] {
  const max = Math.max(...heights);
  return heights.map((h, idx) => {
    // Normalise height so shorter bars oscillate more than taller bars
    const ratio = h / max; // 0..1, 1 = tallest
    const swing = 0.12 + (1 - ratio) * 0.13; // 0.12 → 0.25 range
    return {
      scaleMin: 1 - swing,
      scaleMax: 1 + swing * 0.6, // asymmetric: bars mostly breathe down
      duration: 2.2 + (idx % 7) * 0.24, // 2.2s … 3.76s, no two same
      delay: idx * 0.15,
    };
  });
}

/**
 * Bar variant using custom props to dynamically set the animation.
 */
export const barVariants: Variants = {
  initial: (cfg: BarAnimConfig) => ({
    scaleY: cfg.scaleMin,
  }),
  animate: (cfg: BarAnimConfig) => ({
    scaleY: [cfg.scaleMin, cfg.scaleMax],
    transition: {
      duration: cfg.duration,
      delay: cfg.delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: [0.45, 0.0, 0.55, 1.0],
    },
  }),
};

// ---------------------------------------------------------------------------
// Number-ticker AnimatePresence variants
// ---------------------------------------------------------------------------

/**
 * A number value enters from slightly below and exits upward,
 * giving the impression of a counter ticking forward.
 */
export const numberTickerVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};

export const numberTickerTransition: Transition = {
  duration: 0.38,
  ease: "easeInOut",
};

// ---------------------------------------------------------------------------
// Mockup card entrance animation (one-shot, on mount)
// ---------------------------------------------------------------------------

export const mockupVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Shimmer sweep (the white glare that crosses the card)
// ---------------------------------------------------------------------------

export const shimmerTransition: Transition = {
  duration: 3.6,
  repeat: Infinity,
  ease: "easeInOut",
};
