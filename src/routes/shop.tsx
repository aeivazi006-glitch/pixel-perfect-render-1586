import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";
import { categoryName, products, type CategorySlug } from "@/data/catalog";

const slugs: CategorySlug[] = ["living-room", "dining-room", "bedroom", "home-office", "outdoor"];

const isSlug = (value: unknown): value is CategorySlug =>
  typeof value === "string" && (slugs as string[]).includes(value);

export const Route = createFileRoute("/shop")({
  // Only carry values that differ from the defaults, so /shop stays /shop.
  validateSearch: (search: Record<string, unknown>) => {
    const next: { category?: CategorySlug; sale?: boolean } = {};
    if (isSlug(search.category)) next.category = search.category;
    if (search.sale === true || search.sale === "true") next.sale = true;
    return next;
  },
  head: () => ({
    meta: [
      { title: "فروشگاه — همه مبلمان و دکوراسیون | مدرنو" },
      {
        name: "description",
        content:
          "همه مجموعه مدرنو را ببینید — مبل، میز غذاخوری، تخت، میز کار، روشنایی و دکوراسیون، با فیلتر دسته‌بندی، قیمت، موجودی و تخفیف.",
      },
      { property: "og:title", content: "فروشگاه — مدرنو" },
      {
        property: "og:description",
        content: "همه مجموعه مبلمان و دکوراسیون مدرن، یک‌جا.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { category, sale = false } = Route.useSearch();
  const title = category ? categoryName(category) : "همه محصولات";
  const description = category
    ? `همه قطعه‌های مجموعه ${categoryName(category)} — با فیلتر قیمت، موجودی یا تخفیف.`
    : "هر چیزی که اکنون در خانه ما هست؛ از مبل‌های عمیق و میزهای بلوط یکدست تا روشنایی و اشیایی که یک فضا را کامل می‌کنند.";

  return (
    <CollectionView
      key={`${category ?? "all"}-${sale ? "sale" : "all"}`}
      title={title}
      description={description}
      products={products}
      initialCategory={category}
      initialSale={sale}
      crumb={category ? categoryName(category) : undefined}
      columns={4}
      showRating
    />
  );
}
