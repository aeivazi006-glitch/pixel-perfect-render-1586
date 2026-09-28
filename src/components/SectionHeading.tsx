import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkTo?: "/shop" | "/new-arrivals" | "/best-sellers" | "/wall-art";
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-10">
      <div className="max-w-xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display-lg mt-3">{title}</h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase"
        >
          {linkLabel}
          <ArrowRight
            className="size-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
            strokeWidth={1.5}
          />
        </Link>
      )}
    </div>
  );
}
