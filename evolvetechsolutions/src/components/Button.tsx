"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BUTTON_VARIANTS, useMotionConfig } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

function classesForVariant(variant: Variant) {
  if (variant === "primary") {
    return "bg-brand-action hover:bg-brand-action/90 text-white shadow-soft";
  }
  if (variant === "secondary") {
    return "bg-brand-surface border border-brand-border hover:bg-brand-surface-alt text-brand-text";
  }
  return "bg-transparent hover:bg-brand-surface text-brand-text";
}

function classesForSize(size: Size) {
  if (size === "sm") return "h-10 px-4 text-sm rounded-lg";
  if (size === "lg") return "h-14 px-8 text-base rounded-lg";
  return "h-12 px-6 text-sm rounded-lg";
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { enabled } = useMotionConfig();

  return (
    <motion.button
      {...(props as any)}
      variants={enabled ? BUTTON_VARIANTS : undefined}
      initial={enabled ? "idle" : false}
      whileHover={enabled ? "hover" : undefined}
      whileTap={enabled ? "tap" : undefined}
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:ring-offset-2 focus:ring-offset-brand-base",
        classesForVariant(variant),
        classesForSize(size),
        className
      )}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { enabled } = useMotionConfig();

  return (
    <motion.a
      {...(props as any)}
      variants={enabled ? BUTTON_VARIANTS : undefined}
      initial={enabled ? "idle" : false}
      whileHover={enabled ? "hover" : undefined}
      whileTap={enabled ? "tap" : undefined}
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:ring-offset-2 focus:ring-offset-brand-base",
        classesForVariant(variant),
        classesForSize(size),
        className
      )}
    />
  );
}

