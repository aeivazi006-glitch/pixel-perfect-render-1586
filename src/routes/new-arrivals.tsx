import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { newArrivals } from "@/data/catalog";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "محصولات جدید | مدرنو" },
      {
        name: "description",
        content:
          "تازه‌ترین‌های استودیو مدرنو: مبل، میز جلومبلی، صندلی، کنسول و روشنایی تازه برای فضاهای مدرن.",
      },
      { property: "og:title", content: "محصولات جدید | مدرنو" },
      {
        property: "og:description",
        content: "قطعه‌های تازه برای فضاهای مدرن، اضافه‌شده در این فصل.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="محصولات جدید"
      description="قطعه‌های تازه برای فضاهای مدرن — جدیدترین افزوده‌ها به مجموعه مدرنو، که بیشترشان به‌سفارش ساخته می‌شوند."
      products={newArrivals}
      columns={5}
      showRating
    />
  ),
});
