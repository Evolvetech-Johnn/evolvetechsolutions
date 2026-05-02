import type { PropsWithChildren, ReactNode } from "react";

export default function Card({
  children,
  className,
  icon,
  title,
  description
}: PropsWithChildren<{
  className?: string;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}>) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl bg-white/3 ring-1 ring-white/10 shadow-glow backdrop-blur transition hover:ring-white/20",
        className
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-neon-cyan/10 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 h-56 w-56 rounded-full bg-neon-purple/10 blur-3xl" />
      </div>
      <div className="relative p-6 md:p-7">
        {(icon || title || description) && (
          <div className="mb-5 flex items-start gap-4">
            {icon && (
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <div className="text-lg font-semibold tracking-tight text-white">
                  {title}
                </div>
              )}
              {description && (
                <div className="mt-1 text-sm leading-relaxed text-white/70">
                  {description}
                </div>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

