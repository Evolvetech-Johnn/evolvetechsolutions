import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}>
      {children}
    </div>
  );
}

