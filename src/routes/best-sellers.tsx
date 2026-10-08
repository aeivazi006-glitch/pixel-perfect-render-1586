import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { bestSellers } from "@/data/catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — MODERNO" },
      {
        name: "description",
        content:
          "Our most-loved furniture: the Sable leather sofa, the Astrid dining table, the Cove bed frame and the pieces our customers reorder.",
      },
      { property: "og:title", content: "Best Sellers — MODERNO" },
      { property: "og:description", content: "The pieces our customers keep coming back for." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="Best Sellers"
      description="The pieces that leave the workshop fastest — tried, reordered and recommended more than anything else in the collection."
      products={bestSellers}
      columns={4}
      showRating
    />
  ),
});
