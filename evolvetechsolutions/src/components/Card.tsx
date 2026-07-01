import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "rounded-2xl border border-border bg-surface-2 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="p-6 md:p-8">
        {(icon || title || description) && (
          <div className="mb-6">
            {icon && <div className="mb-4">{icon}</div>}
            {title && <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>}
            {description && <p className="text-text-secondary">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

