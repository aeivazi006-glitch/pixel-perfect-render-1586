import { categories, type CategorySlug } from "@/data/catalog";
import { cn } from "@/lib/utils";

export type Filters = {
  query: string;
  categories: CategorySlug[];
  maxPrice: number;
  inStockOnly: boolean;
  onSale: boolean;
};

export const defaultFilters: Filters = {
  query: "",
  categories: [],
  maxPrice: 300,
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
    <aside className={cn("space-y-9", className)} aria-label="Product filters">
      <div>
        <h3 className="eyebrow">Search</h3>
        <input
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Search this collection"
          className="mt-4 w-full border-b border-input bg-transparent pb-2 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
        />
      </div>

      {!lockCategories && (
        <div>
          <h3 className="eyebrow">Category</h3>
          <ul className="mt-4 space-y-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.slug)}
                    onChange={() => toggleCategory(category.slug)}
                    className="size-3.5 accent-clay"
                  />
                  <span className="text-muted-foreground transition-colors hover:text-foreground">
                    {category.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="eyebrow">Price</h3>
        <input
          type="range"
          min={30}
          max={300}
          step={10}
          value={filters.maxPrice}
          onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
          aria-label="Maximum price"
          className="mt-4 w-full accent-clay"
        />
        <p className="mt-2 text-sm text-muted-foreground">Up to ${filters.maxPrice}</p>
      </div>

      <div>
        <h3 className="eyebrow">Availability</h3>
        <div className="mt-4 space-y-3 text-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(event) => onChange({ ...filters, inStockOnly: event.target.checked })}
              className="size-3.5 accent-clay"
            />
            <span className="text-muted-foreground">In stock only</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(event) => onChange({ ...filters, onSale: event.target.checked })}
              className="size-3.5 accent-clay"
            />
            <span className="text-muted-foreground">On sale</span>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-[0.68rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
      >
        Clear all filters
      </button>
    </aside>
  );
}
