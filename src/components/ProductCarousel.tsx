import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

/**
 * Horizontal, snap-scrolling product rail with accessible prev/next controls.
 * Used for the best sellers carousel and the cart's pairing suggestions.
 */
export function ProductCarousel({
  products,
  showRating = true,
  ariaLabel,
  className,
}: {
  products: Product[];
  showRating?: boolean;
  ariaLabel: string;
  className?: string;
}) {
  const rail = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = rail.current;
    if (!node) return;
    setAtStart(node.scrollLeft <= 4);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const node = rail.current;
    if (!node) return;
    node.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      node.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const node = rail.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.round(node.clientWidth * 0.72), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={rail}
        aria-label={ariaLabel}
        className="no-scrollbar snap-row -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:gap-6 md:px-0"
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[62%] shrink-0 sm:w-[44%] md:w-[36%] lg:w-[27%] xl:w-[22%]"
          >
            <ProductCard product={product} showRating={showRating} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
          {atEnd ? "End of selection" : "Scroll for more"}
        </p>
        <div className="flex gap-2">
          <CarouselButton label="Previous products" disabled={atStart} onClick={() => nudge(-1)}>
            <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
          </CarouselButton>
          <CarouselButton label="Next products" disabled={atEnd} onClick={() => nudge(1)}>
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-input transition-colors duration-500 hover:border-foreground hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
