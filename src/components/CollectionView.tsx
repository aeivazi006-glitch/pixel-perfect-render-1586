import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { defaultFilters, FilterSidebar, type Filters } from "@/components/FilterSidebar";
import { ProductGrid } from "@/components/ProductGrid";
import type { Product } from "@/data/catalog";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function CollectionView({
  title,
  description,
  products,
  lockCategories = false,
}: {
  title: string;
  description: string;
  products: Product[];
  lockCategories?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (query && !`${product.name} ${product.description}`.toLowerCase().includes(query))
        return false;
      if (filters.categories.length && !filters.categories.includes(product.category)) return false;
      if (product.price > filters.maxPrice) return false;
      if (filters.inStockOnly && !product.inStock) return false;
      if (filters.onSale && !product.compareAt) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      sorted.sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")));
    return sorted;
  }, [products, filters, sort]);

  return (
    <div className="shell py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{title}</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="display-lg">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </header>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
          {visible.length} {visible.length === 1 ? "product" : "products"}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase lg:hidden"
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.4} />
            Filters
          </button>
          <label className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase">
            <span className="text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="border-b border-input bg-transparent py-1 pr-1 text-xs tracking-[0.1em] uppercase outline-none focus:border-foreground"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
        <FilterSidebar
          className="hidden lg:block"
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
          lockCategories={lockCategories}
        />
        <ProductGrid products={visible} />
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-60 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="ml-auto h-full w-[86%] max-w-sm overflow-y-auto bg-background p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-8">
              <h2 className="font-display text-xl">Filters</h2>
              <button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)}>
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
              lockCategories={lockCategories}
            />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-10 w-full bg-primary py-3.5 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground"
            >
              Show {visible.length} products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
