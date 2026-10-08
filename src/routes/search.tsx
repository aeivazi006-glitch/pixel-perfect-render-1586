import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { searchProducts } from "@/data/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "جستجو | مدرنو" },
      { name: "description", content: "جستجو در مجموعه مبلمان و دکوراسیون مدرن مدرنو." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = q.trim() ? searchProducts(q, 24) : [];

  return (
    <div className="shell py-10 md:py-14">
      <SectionHeading
        eyebrow="جستجو"
        title={q.trim() ? `نتایج برای «${q}»` : "جستجو در مجموعه"}
        description={
          q.trim()
            ? `${results.length} کالا با جستجوی شما هم‌خوان بود.`
            : "از آیکن جستجو در سربرگ استفاده کنید تا میان مبل‌ها، میزها، روشنایی و دکوراسیون بگردید."
        }
      />

      {q.trim() && results.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center">
          <p className="text-sm text-muted-foreground">
            چیزی با «{q}» هم‌خوان نبود. نام یک اتاق، یک متریال یا یک محصول را امتحان کنید.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-full bg-primary px-7 py-3.5 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      ) : (
        <ProductGrid products={results} columns={4} showRating />
      )}
    </div>
  );
}
