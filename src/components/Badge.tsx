import type { PropsWithChildren } from "react";

export default function Badge({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10 backdrop-blur",
        className
      ].join(" ")}
    >
      {children}
    </span>
  );
}

