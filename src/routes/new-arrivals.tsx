import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { newArrivals } from "@/data/catalog";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — MODERNO" },
      {
        name: "description",
        content:
          "The latest from the MODERNO studio: new sofas, coffee tables, accent chairs, sideboards and lighting for modern interiors.",
      },
      { property: "og:title", content: "New Arrivals — MODERNO" },
      {
        property: "og:description",
        content: "Fresh pieces for modern interiors, added this season.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="New Arrivals"
      description="Fresh pieces for modern interiors — the newest additions to the MODERNO collection, most of them made to order in our Lisbon workshop."
      products={newArrivals}
      columns={5}
      showRating
    />
  ),
});
