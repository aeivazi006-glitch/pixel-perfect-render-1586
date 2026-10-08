import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { categoryName, products, type CategorySlug } from "@/data/catalog";

const slugs: CategorySlug[] = ["living-room", "dining-room", "bedroom", "home-office", "outdoor"];

const isSlug = (value: unknown): value is CategorySlug =>
  typeof value === "string" && (slugs as string[]).includes(value);

export const Route = createFileRoute("/shop")({
  // Only carry values that differ from the defaults, so /shop stays /shop.
  validateSearch: (search: Record<string, unknown>) => {
    const next: { category?: CategorySlug; sale?: boolean } = {};
    if (isSlug(search.category)) next.category = search.category;
    if (search.sale === true || search.sale === "true") next.sale = true;
    return next;
  },
  head: () => ({
    meta: [
      { title: "Shop All Furniture & Home Decor — MODERNO" },
      {
        name: "description",
        content:
          "Browse the full MODERNO collection — sofas, dining tables, beds, desks, lighting and decor, filterable by category, price, availability and sale.",
      },
      { property: "og:title", content: "Shop All — MODERNO" },
      {
        property: "og:description",
        content: "The full collection of modern furniture and home decor, in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { category, sale = false } = Route.useSearch();
  const title = category ? categoryName(category) : "Shop All";
  const description = category
    ? `Every piece in our ${categoryName(category).toLowerCase()} collection — filter by price, availability or sale.`
    : "Everything currently in the house, from deep sofas and solid oak tables to lighting and the objects that finish a room.";

  return (
    <CollectionView
      key={`${category ?? "all"}-${sale ? "sale" : "all"}`}
      title={title}
      description={description}
      products={products}
      initialCategory={category}
      initialSale={sale}
      crumb={category ? categoryName(category) : undefined}
      columns={4}
      showRating
    />
  );
}
