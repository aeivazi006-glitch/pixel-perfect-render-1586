import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/catalog";

/**
 * Editorial category tile — image first, name and a small arrow glyph,
 * with a soft overlay that lifts on hover.
 */
export function CategoryCard({
  category,
  className,
  size = "default",
}: {
  category: Category;
  className?: string;
  size?: "default" | "tall" | "wide";
}) {
  const ratio =
    size === "tall" ? "aspect-4/5 lg:aspect-3/4" : size === "wide" ? "aspect-4/3" : "aspect-4/5";

  return (
    <Link
      to="/shop"
      search={{ category: category.slug }}
      className={cn(
        "group relative block overflow-hidden rounded-lg bg-linen",
        className,
      )}
    >
      <span className={cn("block w-full", ratio)}>
        <img
          src={category.image}
          alt={`${category.name} furniture at MODERNO`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </span>

      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/12 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95"
      />

      <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-background md:inset-x-7 md:bottom-7">
        <span>
          <span className="block text-[0.6rem] tracking-[0.18em] uppercase text-background/75">
            {category.tagline}
          </span>
          <span className="mt-1.5 block font-display text-2xl leading-tight md:text-[1.75rem]">
            {category.name}
          </span>
        </span>
        <span className="grid size-10 shrink-0 translate-y-1 place-items-center rounded-full border border-background/40 bg-background/10 opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
        </span>
      </span>
    </Link>
  );
}
