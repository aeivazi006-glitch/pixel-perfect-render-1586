import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/wall-art")({
  head: () => ({
    meta: [
      { title: "Posters & Wall Art — Maison Étage" },
      {
        name: "description",
        content:
          "Framed art prints, triptychs and archival posters on cotton rag and heavy matte paper, in oak, walnut and black ash frames.",
      },
      { property: "og:title", content: "Posters & Wall Art — Maison Étage" },
      {
        property: "og:description",
        content: "Framed pieces and archival posters that give a room its centre of gravity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="Posters & Wall Art"
      description="Archival prints and framed pieces, from unframed A3 posters to oak-framed triptychs. Printed on cotton rag and heavy matte paper."
      products={products.filter((p) => p.category === "wall-art" || p.category === "posters")}
      lockCategories
    />
  ),
});
