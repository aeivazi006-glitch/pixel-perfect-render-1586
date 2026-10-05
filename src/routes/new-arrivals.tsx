import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { newArrivals } from "@/data/catalog";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Maison Étage" },
      {
        name: "description",
        content:
          "The latest short runs from our studios: new framed prints, ceramics, gift sets and accessories, usually fifty pieces or fewer.",
      },
      { property: "og:title", content: "New Arrivals — Maison Étage" },
      { property: "og:description", content: "Fresh from the studio, in runs of fifty or fewer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="New Arrivals"
      description="Just landed. Each piece is produced in a short run with an independent studio, so quantities are genuinely limited."
      products={newArrivals}
    />
  ),
});
