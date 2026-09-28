import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const routeFor: Record<string, string> = {
  accessories: "/accessories",
  "wall-art": "/wall-art",
  posters: "/wall-art",
  "home-decor": "/home-decor",
  gifts: "/shop",
};

export function CategoryCard({
  slug,
  name,
  description,
  image,
  className,
  tall = false,
}: {
  slug: string;
  name: string;
  description: string;
  image: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      to={routeFor[slug] ?? "/shop"}
      className={cn("group relative block overflow-hidden bg-linen", className)}
    >
      <span className={cn("block w-full", tall ? "aspect-3/4 lg:aspect-2/3" : "aspect-4/5")}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </span>
      <span className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
      <span className="absolute inset-x-6 bottom-6 text-background">
        <span className="font-display text-2xl leading-tight">{name}</span>
        <span className="mt-1.5 block max-w-[22rem] text-sm leading-relaxed text-background/80">
          {description}
        </span>
        <span className="mt-3 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase">
          Shop now
          <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.5} />
        </span>
      </span>
    </Link>
  );
}
