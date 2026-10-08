import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { bestSellers } from "@/data/catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "پرفروش‌ها | مدرنو" },
      {
        name: "description",
        content:
          "محبوب‌ترین مبلمان ما: مبل چرمی سیبل، میز غذاخوری آسترید، تخت‌خواب کاو و قطعه‌هایی که مشتریان دوباره سفارش می‌دهند.",
      },
      { property: "og:title", content: "پرفروش‌ها | مدرنو" },
      { property: "og:description", content: "قطعه‌هایی که مشتریان ما دوباره سراغشان می‌آیند." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CollectionView
      title="پرفروش‌ها"
      description="قطعه‌هایی که سریع‌تر از همه از کارگاه بیرون می‌روند — آزموده‌شده، دوباره سفارش‌داده‌شده و بیشتر از هر چیز دیگری پیشنهادشده."
      products={bestSellers}
      columns={4}
      showRating
    />
  ),
});
