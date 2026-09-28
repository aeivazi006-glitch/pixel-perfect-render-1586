import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Maison Étage" },
      {
        name: "description",
        content:
          "Browse the full Maison Étage collection: wall art, posters, ceramics, gifts and minimal accessories, filterable by category and price.",
      },
      { property: "og:title", content: "Shop All — Maison Étage" },
      {
        property: "og:description",
        content: "The full collection of art, objects and accessories, in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="Shop all"
      description="Everything currently in the house — art for the walls, objects for the shelves and accessories for everyday. Filter by category, price or availability."
      products={products}
    />
  ),
});
