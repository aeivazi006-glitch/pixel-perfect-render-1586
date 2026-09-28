import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { byCategory } from "@/data/catalog";

export const Route = createFileRoute("/home-decor")({
  head: () => ({
    meta: [
      { title: "Home Decor — Maison Étage" },
      {
        name: "description",
        content:
          "Hand-thrown stoneware, travertine trays and unlacquered brass — small decorative objects for shelves, tables and entryways.",
      },
      { property: "og:title", content: "Home Decor — Maison Étage" },
      {
        property: "og:description",
        content: "Ceramics, stone and brass objects for shelves and tables.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="Home Decor"
      description="Small objects that finish a room: speckled stoneware, open-grain travertine and brass left to age on its own terms."
      products={byCategory("home-decor")}
      lockCategories
    />
  ),
});
