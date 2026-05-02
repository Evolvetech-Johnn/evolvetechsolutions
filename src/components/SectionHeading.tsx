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
      <div className="mb-3 text-sm font-semibold tracking-wide text-white/70">
        {eyebrow}
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-balance text-base leading-relaxed text-white/70 md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

