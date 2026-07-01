import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

function classesForVariant(variant: Variant) {
  if (variant === "primary") {
    return "bg-brand-500 hover:bg-brand-600 text-white shadow-[0_0_40px_rgba(14,165,233,0.4)]";
  }
  if (variant === "secondary") {
    return "bg-white border border-border hover:bg-ink-50 text-primary";
  }
  return "bg-transparent hover:bg-ink-50 text-primary";
}

function classesForSize(size: Size) {
  if (size === "sm") return "h-10 px-4 text-sm rounded-xl";
  if (size === "lg") return "h-14 px-8 text-base rounded-xl";
  return "h-12 px-6 text-sm rounded-xl";
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
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
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
  return (
    <a
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
        classesForVariant(variant),
        classesForSize(size),
        className
      )}
    />
  );
}

