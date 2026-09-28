import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { byCategory } from "@/data/catalog";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Maison Étage" },
      {
        name: "description",
        content:
          "Minimal fashion accessories: hammered brass jewellery, vegetable-tanned leather and warm acetate eyewear, made in small runs.",
      },
      { property: "og:title", content: "Accessories — Maison Étage" },
      {
        property: "og:description",
        content: "Quiet jewellery, leather and eyewear made to be worn daily.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="Accessories"
      description="Quiet pieces for every day — hammered brass, soft leather and warm acetate. Nothing loud, everything made to last."
      products={byCategory("accessories")}
      lockCategories
    />
  ),
});
