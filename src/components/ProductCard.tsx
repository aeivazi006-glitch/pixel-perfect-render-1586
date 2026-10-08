import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { discountPercent, formatPrice, type Product } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/Stars";
import { notifyCart, notifyWishlist } from "@/components/ToastNotification";

export function ProductCard({
  product,
  showRating = false,
  className,
}: {
  product: Product;
  showRating?: boolean;
  className?: string;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const off = discountPercent(product);

  const quickAdd = () => {
    if (!product.inStock) return;
    addToCart(product.id, product.options?.values[0]);
    notifyCart(product.name);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const onWishlist = () => {
    const saved = !wishlisted;
    toggleWishlist(product.id);
    notifyWishlist(product.name, saved);
  };

  return (
    <article className={cn("group/card relative flex h-full flex-col", className)}>
      <div className="relative overflow-hidden rounded-lg bg-linen">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <span className="block aspect-4/5 w-full">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="size-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03] group-hover/card:opacity-0"
            />
            <img
              src={product.hoverImage}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 size-full scale-[1.03] object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-100 group-hover/card:opacity-100"
            />
          </span>
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {off > 0 && (
            <span className="rounded-full bg-clay px-2.5 py-1 text-[0.58rem] tracking-[0.14em] uppercase text-clay-foreground">
              −{off}%
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="rounded-full bg-background/92 px-2.5 py-1 text-[0.58rem] tracking-[0.14em] uppercase backdrop-blur-sm">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-foreground/88 px-2.5 py-1 text-[0.58rem] tracking-[0.14em] uppercase text-background">
              Made to order
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onWishlist}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-border/70 bg-background/88 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-background focus-visible:bg-background"
        >
          <Heart
            className={cn(
              "size-4 transition-transform duration-500",
              wishlisted ? "scale-110 fill-clay text-clay" : "text-foreground",
            )}
            strokeWidth={1.4}
            aria-hidden
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-3 lg:opacity-0 lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100 lg:focus-within:translate-y-0 lg:focus-within:opacity-100">
          <button
            type="button"
            onClick={quickAdd}
            disabled={!product.inStock}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-background/85 py-3 text-[0.64rem] tracking-[0.16em] uppercase backdrop-blur-md transition-colors duration-500 hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-background/85 disabled:hover:text-foreground"
          >
            <Plus className="size-3.5" strokeWidth={1.6} aria-hidden />
            {!product.inStock ? "Made to order" : added ? "Added" : "Quick add"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow">{product.categoryName}</p>
        <h3 className="mt-1.5 text-[0.95rem] leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="link-underline">
            {product.name}
          </Link>
        </h3>

        {showRating && (
          <div className="mt-2.5 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        )}

        <div className="mt-auto flex items-baseline gap-2 pt-3 text-sm">
          <span className={cn("font-medium", product.compareAt && "text-clay")}>
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
