import type { Variants, Transition } from "framer-motion";

export const numberTickerVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};

export const numberTickerTransition: Transition = {
  duration: 0.38,
  ease: "easeInOut",
};

export const barVariants: Variants = {
  initial: (idx: number) => ({
    scaleY: 1,
  }),
  animate: (idx: number) => {
    // Generate organic oscillation parameters based on index
    const swing = 0.15;
    const min = 1 - swing;
    const max = 1 + swing;
    const duration = 2.2 + (idx % 7) * 0.24;
    const delay = idx * 0.15;

    return {
      scaleY: [min, max],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.45, 0.0, 0.55, 1.0],
      },
    };
  },
};
