import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function TechSectionHead({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 flex items-center gap-2 text-xs font-bold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="display-lg">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-xl text-[0.975rem] leading-loose text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <a
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-soft"
        >
          {action.label}
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        </a>
      ) : null}
    </div>
  );
}
