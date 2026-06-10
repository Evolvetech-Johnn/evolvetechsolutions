import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700 border border-border",
        className
      )}
    >
      {children}
    </span>
  );
}

