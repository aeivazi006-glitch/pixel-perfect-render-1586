import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  defaultFilters,
  FilterSidebar,
  PRICE_CEILING,
  type Filters,
} from "@/components/FilterSidebar";
import { FilterDrawer } from "@/components/FilterDrawer";
import { ProductGrid } from "@/components/ProductGrid";
import { categoryName, formatPrice, type CategorySlug, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "منتخب" },
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "قیمت: کم به زیاد" },
  { value: "price-desc", label: "قیمت: زیاد به کم" },
  { value: "rating", label: "بیشترین امتیاز" },
];

const PAGE_SIZE = 12;

export function CollectionView({
  title,
  description,
  products,
  initialCategory,
  initialSale = false,
  lockCategories = false,
  columns = 4,
  showRating = false,
  crumb,
}: {
  title: string;
  description: string;
  products: Product[];
  initialCategory?: CategorySlug | undefined;
  initialSale?: boolean;
  lockCategories?: boolean;
  columns?: 3 | 4 | 5;
  showRating?: boolean;
  crumb?: string | undefined;
}) {
  const [filters, setFilters] = useState<Filters>(() => ({
    ...defaultFilters,
    categories: initialCategory ? [initialCategory] : [],
    onSale: initialSale,
  }));
  const [sort, setSort] = useState<SortKey>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setFilters({
      ...defaultFilters,
      categories: initialCategory ? [initialCategory] : [],
      onSale: initialSale,
    });
    setVisibleCount(PAGE_SIZE);
  }, [initialCategory, initialSale]);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const list = products.filter((product) => {
      if (
        query &&
        !`${product.name} ${product.categoryName} ${product.summary}`.toLowerCase().includes(query)
      )
        return false;
      if (filters.categories.length && !filters.categories.includes(product.category)) return false;
      if (product.price > filters.maxPrice) return false;
      if (filters.inStockOnly && !product.inStock) return false;
      if (filters.onSale && !product.compareAt) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      sorted.sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")));
    return sorted;
  }, [products, filters, sort]);

  const visible = filtered.slice(0, visibleCount);

  const activeChips: { label: string; clear: () => void }[] = [
    ...filters.categories.map((slug) => ({
      label: categoryName(slug),
      clear: () =>
        setFilters((prev) => ({
          ...prev,
          categories: prev.categories.filter((item) => item !== slug),
        })),
    })),
    ...(filters.maxPrice < PRICE_CEILING
      ? [
          {
            label: `تا ${formatPrice(filters.maxPrice)}`,
            clear: () => setFilters((prev) => ({ ...prev, maxPrice: PRICE_CEILING })),
          },
        ]
      : []),
    ...(filters.inStockOnly
      ? [{ label: "موجود", clear: () => setFilters((prev) => ({ ...prev, inStockOnly: false })) }]
      : []),
    ...(filters.onSale
      ? [{ label: "تخفیف‌دار", clear: () => setFilters((prev) => ({ ...prev, onSale: false })) }]
      : []),
  ];

  const filterProps = {
    filters,
    onChange: setFilters,
    onReset: () =>
      setFilters({ ...defaultFilters, categories: initialCategory ? [initialCategory] : [] }),
    lockCategories,
  };

  return (
    <div className="shell py-10 md:py-14">
      <nav aria-label="مسیر صفحه" className="text-[0.75rem] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          خانه
        </Link>
        <span className="px-2">/</span>
        {crumb ? (
          <>
            <Link to="/shop" className="hover:text-foreground">
              فروشگاه
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground">{crumb}</span>
          </>
        ) : (
          <span className="text-foreground">{title}</span>
        )}
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="display-lg">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </header>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <p className="text-xs text-muted-foreground">{filtered.length} کالا</p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 text-xs font-medium lg:hidden"
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.4} aria-hidden />
            فیلترها
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-muted-foreground">
              مرتب‌سازی
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="rounded-full border border-input bg-background/70 px-3.5 py-2 text-xs outline-none focus:border-foreground"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {activeChips.length > 0 && (
        <ul className="mt-5 flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <li key={chip.label}>
              <button
                type="button"
                onClick={chip.clear}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors hover:border-foreground/30"
              >
                {chip.label}
                <X className="size-3" strokeWidth={1.8} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={cn("mt-9 grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14")}>
        <FilterSidebar className="hidden lg:block" {...filterProps} />
        <div>
          <ProductGrid
            products={visible}
            columns={columns}
            showRating={showRating}
            emptyMessage="هیچ کالایی با این فیلترها هم‌خوان نیست — محدوده قیمت را بازتر کنید یا یک دسته‌بندی را بردارید."
          />
          {visibleCount < filtered.length && (
            <div className="mt-14 flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground">
                نمایش {visible.length} از {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-full border border-foreground/25 px-8 py-3.5 text-[0.8rem] font-semibold transition-colors duration-500 hover:border-foreground hover:bg-primary hover:text-primary-foreground"
              >
                نمایش بیشتر
              </button>
            </div>
          )}
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        footer={
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="w-full rounded-full bg-primary py-3.5 text-[0.8rem] font-semibold text-primary-foreground"
          >
            نمایش {filtered.length} کالا
          </button>
        }
      >
        <FilterSidebar {...filterProps} />
      </FilterDrawer>
    </div>
  );
}
