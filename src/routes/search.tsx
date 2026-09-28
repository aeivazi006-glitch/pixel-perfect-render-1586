import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ProductGrid } from "@/components/ProductGrid";
import { searchProducts } from "@/data/catalog";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search — Maison Étage" },
      { name: "description", content: "Search prints, ceramics, gifts and accessories." },
      { property: "og:title", content: "Search — Maison Étage" },
      { property: "og:description", content: "Search prints, ceramics, gifts and accessories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [term, setTerm] = useState(q ?? "");
  const results = searchProducts(q ?? "");

  return (
    <div className="shell py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">Search</span>
      </nav>

      <h1 className="display-lg mt-6">Search results</h1>

      <form
        className="mt-7 flex max-w-xl items-center gap-3 border-b border-input pb-3"
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/search", search: { q: term.trim() } });
        }}
      >
        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          aria-label="Search products"
          placeholder="Search prints, ceramics, accessories…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="eyebrow hover:text-foreground">
          Search
        </button>
      </form>

      <p className="mt-6 text-xs tracking-[0.14em] uppercase text-muted-foreground">
        {q ? `${results.length} results for “${q}”` : "Type something to begin"}
      </p>

      <div className="mt-10">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}
