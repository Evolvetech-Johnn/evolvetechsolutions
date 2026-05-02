import type { PropsWithChildren } from "react";

export default function Container({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={["mx-auto w-full max-w-7xl px-4 md:px-6", className].join(" ")}>
      {children}
    </div>
  );
}

