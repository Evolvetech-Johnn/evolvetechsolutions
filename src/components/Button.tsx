import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

function classesForVariant(variant: Variant) {
  if (variant === "primary") {
    return "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-ink-950 shadow-glowStrong hover:brightness-110";
  }
  if (variant === "secondary") {
    return "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20";
  }
  return "bg-transparent text-white/90 hover:text-white";
}

function classesForSize(size: Size) {
  if (size === "sm") return "h-10 px-4 text-sm";
  if (size === "lg") return "h-12 px-6 text-base";
  return "h-11 px-5 text-sm md:text-base";
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
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neon-cyan/40",
        classesForVariant(variant),
        classesForSize(size),
        className
      ].join(" ")}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neon-cyan/40",
        classesForVariant(variant),
        classesForSize(size),
        className
      ].join(" ")}
    />
  );
}

