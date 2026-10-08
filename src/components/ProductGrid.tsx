import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Responsive product grid: 2 across on mobile, 3 on tablet,
 * 4–5 on desktop depending on the row density requested.
 */
export function ProductGrid({
  products,
  columns = 4,
  showRating = false,
  className,
  emptyMessage = "Nothing matches those filters yet — try widening your selection.",
}: {
  products: Product[];
  columns?: 3 | 4 | 5;
  showRating?: boolean;
  className?: string;
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3",
        columns === 5 ? "xl:grid-cols-5 lg:grid-cols-4" : columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <Reveal as="li" key={product.id} delay={(index % 5) * 70}>
          <ProductCard product={product} showRating={showRating} />
        </Reveal>
      ))}
    </ul>
  );
}
