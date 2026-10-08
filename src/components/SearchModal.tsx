import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Clock, Search, X } from "lucide-react";
import { categories, formatPrice, searchProducts } from "@/data/catalog";
import { useStore } from "@/lib/store";

/** Full-width search overlay: live results, category shortcuts and recent searches. */
export function SearchModal() {
  const { searchOpen, closeSearch, recentSearches, pushSearch, clearSearches } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchProducts(query), [query]);
  const suggestions = useMemo(
    () => [
      { label: "محصولات جدید", to: "/new-arrivals" as const },
      { label: "پرفروش‌ها", to: "/best-sellers" as const },
      { label: "کالاهای تخفیف‌دار", to: "/shop" as const },
    ],
    [],
  );

  const wasOpen = useRef(false);
  useEffect(() => {
    if (searchOpen) {
      wasOpen.current = true;
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 60);
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") closeSearch();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      setQuery("");
    }
    return undefined;
  }, [searchOpen, closeSearch]);

  if (!searchOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    pushSearch(term);
    closeSearch();
    navigate({ to: "/search", search: { q: term } });
  };

  return (
    <div className="fixed inset-0 z-70" role="dialog" aria-modal="true" aria-label="جستجوی محصولات">
      <button
        type="button"
        aria-label="بستن جستجو"
        onClick={closeSearch}
        className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-[3px]"
      />

      <div className="drawer-in relative max-h-[92vh] overflow-y-auto border-b border-border bg-background/97 backdrop-blur-xl">
        <div className="shell py-7 md:py-10">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">جستجو در مدرنو</p>
            <button
              type="button"
              onClick={closeSearch}
              aria-label="بستن جستجو"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
            >
              <X className="size-5" strokeWidth={1.4} aria-hidden />
            </button>
          </div>

          <form onSubmit={submit} className="mt-6">
            <label htmlFor="search-overlay-input" className="sr-only">
              جستجوی مبلمان و دکوراسیون
            </label>
            <div className="flex items-center gap-4 border-b border-input pb-4 focus-within:border-foreground">
              <Search
                className="size-5 shrink-0 text-muted-foreground"
                strokeWidth={1.4}
                aria-hidden
              />
              <input
                id="search-overlay-input"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="مبل، میز غذاخوری، روشنایی…"
                autoComplete="off"
                className="w-full bg-transparent font-display text-xl font-medium outline-none placeholder:text-muted-foreground md:text-3xl"
              />
            </div>
          </form>

          {query.trim().length > 0 ? (
            <div className="mt-8">
              {results.length > 0 ? (
                <>
                  <p className="eyebrow">{results.length} نتیجه</p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => {
                            pushSearch(query.trim());
                            closeSearch();
                            navigate({ to: "/product/$slug", params: { slug: product.slug } });
                          }}
                          className="group flex w-full items-center gap-4 rounded-lg border border-border/70 bg-card p-3 text-start transition-colors hover:border-foreground/30"
                        >
                          <img
                            src={product.image}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="size-16 shrink-0 rounded-lg object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.72rem] text-muted-foreground">
                              {product.categoryName}
                            </span>
                            <span className="mt-1 block truncate text-sm font-medium">
                              {product.name}
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              {formatPrice(product.price)}
                            </span>
                          </span>
                          <ArrowLeft
                            className="size-4 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-x-1"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  چیزی با «{query.trim()}» هم‌خوان نبود. یک اتاق، یک متریال یا نام محصول را امتحان
                  کنید.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-10 md:grid-cols-3">
              <div>
                <p className="eyebrow">خرید بر اساس دسته‌بندی</p>
                <ul className="mt-5 space-y-2.5">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          navigate({ to: "/shop", search: { category: category.slug } });
                        }}
                        className="link-underline text-sm text-muted-foreground hover:text-foreground"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow">پرجستجو</p>
                <ul className="mt-5 space-y-2.5">
                  {suggestions.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          navigate({ to: item.to });
                        }}
                        className="link-underline text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">جستجوهای اخیر</p>
                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      onClick={clearSearches}
                      className="text-[0.75rem] font-medium text-muted-foreground hover:text-foreground"
                    >
                      پاک کردن
                    </button>
                  )}
                </div>
                {recentSearches.length === 0 ? (
                  <p className="mt-5 text-sm text-muted-foreground">
                    هنوز چیزی نیست — جستجوهای اخیر شما اینجا نمایش داده می‌شود.
                  </p>
                ) : (
                  <ul className="mt-5 space-y-2.5">
                    {recentSearches.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Clock className="size-3.5" strokeWidth={1.5} aria-hidden />
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
