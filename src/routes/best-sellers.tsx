import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { bestSellers } from "@/data/catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — Maison Étage" },
      {
        name: "description",
        content:
          "Our most-loved pieces: the framed triptych, the speckled stoneware vase, the coin pendant and the gift sets people buy twice.",
      },
      { property: "og:title", content: "Best Sellers — Maison Étage" },
      { property: "og:description", content: "The pieces our customers keep coming back for." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="Best Sellers"
      description="The pieces that leave fastest — reordered, restocked and gifted more than anything else in the house."
      products={bestSellers}
    />
  ),
});
