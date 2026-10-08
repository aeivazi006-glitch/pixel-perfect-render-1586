import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { Reveal } from "@/components/Reveal";
import { categories, productsByCategory } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Furniture Categories — MODERNO" },
      {
        name: "description",
        content:
          "Shop MODERNO by room: living room, dining room, bedroom, home office and outdoor furniture, curated for modern interiors.",
      },
      { property: "og:title", content: "Furniture Categories — MODERNO" },
      {
        property: "og:description",
        content: "Living room, dining room, bedroom, home office and outdoor — shop by room.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="shell py-10 md:py-14">
      <nav
        aria-label="Breadcrumb"
        className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">Categories</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Shop by room</p>
        <h1 className="display-lg mt-3 text-balance">Furniture for every part of the home</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Five collections, drawn to work together. Start with the room you are furnishing and we
          will keep the palette and proportions consistent as you go.
        </p>
      </header>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {categories.map((category, index) => (
          <Reveal as="li" key={category.slug} delay={index * 70}>
            <CategoryCard category={category} size="wide" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <p className="mt-3 text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">
              {productsByCategory(category.slug).length} pieces
            </p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-10">
        <p className="text-sm text-muted-foreground">
          Not sure where to start? Browse everything in one place.
        </p>
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2.5 text-[0.68rem] tracking-[0.18em] uppercase"
        >
          Shop all furniture
          <ArrowRight
            className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
