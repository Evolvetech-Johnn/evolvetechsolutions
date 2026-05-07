import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-white/80 ring-1 ring-white/10 shadow-glow backdrop-blur">
        <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-balance text-base leading-relaxed text-white/70 md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

