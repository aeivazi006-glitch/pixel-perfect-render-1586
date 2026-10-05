import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  columns = 4,
  className,
}: {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-muted-foreground">
        Nothing matches those filters yet — try widening your selection.
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <Reveal as="li" key={product.id} delay={(index % 4) * 70}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </ul>
  );
}
