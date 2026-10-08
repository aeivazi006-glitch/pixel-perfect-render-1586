import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial section heading. `align="split"` puts the link on the baseline,
 * `align="center"` centres the block for quieter sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  linkTo,
  linkSearch,
  linkLabel,
  align = "split",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkTo?: "/shop" | "/new-arrivals" | "/best-sellers" | "/categories" | "/journal";
  linkSearch?: Record<string, string | boolean>;
  linkLabel?: string;
  align?: "split" | "center";
  className?: string;
}) {
  const showLink = Boolean(linkTo && linkLabel);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-6 pb-10 md:pb-14",
        align === "center" ? "flex-col items-center text-center" : "items-end justify-between",
        className,
      )}
    >
      <div className={cn(align === "center" ? "max-w-2xl" : "max-w-xl")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display-lg mt-3">{title}</h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-sm leading-relaxed text-muted-foreground md:text-base",
              align === "center" && "mx-auto max-w-xl",
            )}
          >
            {description}
          </p>
        )}
      </div>

      {showLink && linkTo && linkLabel && (
        <Link
          to={linkTo}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          search={linkSearch as any}
          className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold"
        >
          {linkLabel}
          <ArrowLeft
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1.5"
            strokeWidth={1.6}
          />
        </Link>
      )}
    </div>
  );
}
