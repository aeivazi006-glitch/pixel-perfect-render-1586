import { categories, formatPrice, type CategorySlug } from "@/data/catalog";
import { cn } from "@/lib/utils";

export type Filters = {
  query: string;
  categories: CategorySlug[];
  maxPrice: number;
  inStockOnly: boolean;
  onSale: boolean;
};

/** Prices are quoted in Toman, so the ceiling is seven figures. */
export const PRICE_CEILING = 100000000;
export const PRICE_FLOOR = 5000000;

export const defaultFilters: Filters = {
  query: "",
  categories: [],
  maxPrice: PRICE_CEILING,
  inStockOnly: false,
  onSale: false,
};

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  lockCategories = false,
  className,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  lockCategories?: boolean;
  className?: string;
}) {
  const toggleCategory = (slug: CategorySlug) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(slug)
        ? filters.categories.filter((item) => item !== slug)
        : [...filters.categories, slug],
    });
  };

  return (
    <div className={cn("space-y-9", className)}>
      <div>
        <h3 className="eyebrow">جستجو</h3>
        <label htmlFor="filter-search" className="sr-only">
          جستجو در این مجموعه
        </label>
        <input
          id="filter-search"
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="جستجو در این مجموعه"
          className="mt-4 w-full rounded-full border border-input bg-background/70 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
      </div>

      {!lockCategories && (
        <fieldset>
          <legend className="eyebrow">دسته‌بندی</legend>
          <ul className="mt-4 space-y-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.slug)}
                    onChange={() => toggleCategory(category.slug)}
                    className="size-4 accent-clay"
                  />
                  <span className="text-muted-foreground transition-colors hover:text-foreground">
                    {category.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      <div>
        <h3 className="eyebrow">قیمت</h3>
        <input
          type="range"
          min={PRICE_FLOOR}
          max={PRICE_CEILING}
          step={1000000}
          value={filters.maxPrice}
          onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
          aria-label="حداکثر قیمت"
          className="mt-4 w-full accent-clay"
        />
        <p className="mt-2 text-sm text-muted-foreground">تا {formatPrice(filters.maxPrice)}</p>
      </div>

      <fieldset>
        <legend className="eyebrow">موجودی</legend>
        <div className="mt-4 space-y-3 text-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(event) => onChange({ ...filters, inStockOnly: event.target.checked })}
              className="size-4 accent-clay"
            />
            <span className="text-muted-foreground">فقط کالاهای موجود</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(event) => onChange({ ...filters, onSale: event.target.checked })}
              className="size-4 accent-clay"
            />
            <span className="text-muted-foreground">فقط کالاهای تخفیف‌دار</span>
          </label>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onReset}
        className="text-[0.78rem] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        پاک کردن همه فیلترها
      </button>
    </div>
  );
}
