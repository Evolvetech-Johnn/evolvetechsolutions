import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

function classesForVariant(variant: Variant) {
  if (variant === "primary") {
    return [
      "text-ink-950 shadow-glowStrong",
      "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple",
      "hover:brightness-110"
    ].join(" ");
  }
  if (variant === "secondary") {
    return [
      "text-white",
      "bg-white/5 ring-1 ring-white/10",
      "hover:bg-white/[0.08] hover:ring-white/20"
    ].join(" ");
  }
  return "bg-transparent text-white/80 hover:text-white";
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
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-semibold transition will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neon-cyan/40",
        "before:absolute before:inset-0 before:opacity-0 before:transition before:duration-300 hover:before:opacity-100",
        "before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.18),transparent_50%)]",
        "after:absolute after:-left-1/2 after:top-0 after:h-full after:w-1/2 after:skew-x-[-20deg] after:bg-white/20 after:opacity-0 after:transition after:duration-500 group-hover:after:translate-x-[240%] group-hover:after:opacity-100",
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
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-semibold transition will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neon-cyan/40",
        "before:absolute before:inset-0 before:opacity-0 before:transition before:duration-300 hover:before:opacity-100",
        "before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.18),transparent_50%)]",
        "after:absolute after:-left-1/2 after:top-0 after:h-full after:w-1/2 after:skew-x-[-20deg] after:bg-white/20 after:opacity-0 after:transition after:duration-500 group-hover:after:translate-x-[240%] group-hover:after:opacity-100",
        classesForVariant(variant),
        classesForSize(size),
        className
      ].join(" ")}
    />
  );
}

