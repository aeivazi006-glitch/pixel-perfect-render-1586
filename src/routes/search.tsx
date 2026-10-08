import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { searchProducts } from "@/data/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search — MODERNO" },
      { name: "description", content: "Search the MODERNO collection of modern furniture and home decor." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = q.trim() ? searchProducts(q, 24) : [];

  return (
    <div className="shell py-10 md:py-14">
      <SectionHeading
        eyebrow="Search"
        title={q.trim() ? `Results for “${q}”` : "Search the collection"}
        description={
          q.trim()
            ? `${results.length} ${results.length === 1 ? "piece" : "pieces"} matched your search.`
            : "Use the search icon in the header to browse sofas, tables, lighting and decor."
        }
      />

      {q.trim() && results.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center">
          <p className="text-sm text-muted-foreground">
            Nothing matched “{q}”. Try a room, a material or a product name.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-full bg-primary px-7 py-3.5 text-[0.66rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Browse everything
          </Link>
        </div>
      ) : (
        <ProductGrid products={results} columns={4} showRating />
      )}
    </div>
  );
}
