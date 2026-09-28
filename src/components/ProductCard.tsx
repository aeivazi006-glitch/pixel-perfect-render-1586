import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, Heart, Plus, X } from "lucide-react";
import { discountPercent, formatPrice, type Product } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/Stars";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quickView, setQuickView] = useState(false);
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const off = discountPercent(product);

  const add = () => {
    addToCart(product.id, product.options?.values[0]);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-linen">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <span className="block aspect-4/5 w-full">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="size-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-0"
            />
            <img
              src={product.hoverImage}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 size-full scale-[1.04] object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          </span>
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {off > 0 && (
            <span className="bg-clay px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-clay-foreground">
              −{off}%
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="bg-background/90 px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-foreground/85 px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-background">
              Sold out
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="grid size-9 place-items-center bg-background/90 transition-colors hover:bg-background"
          >
            <Heart
              className={cn("size-4", wishlisted && "fill-clay text-clay")}
              strokeWidth={1.4}
            />
          </button>
          <button
            type="button"
            onClick={() => setQuickView(true)}
            aria-label="Quick view"
            className="grid size-9 place-items-center bg-background/90 transition-colors hover:bg-background"
          >
            <Eye className="size-4" strokeWidth={1.4} />
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          <button
            type="button"
            onClick={add}
            disabled={!product.inStock}
            className="flex w-full items-center justify-center gap-2 bg-foreground/92 py-3 text-[0.68rem] tracking-[0.18em] uppercase text-background transition-colors hover:bg-foreground disabled:cursor-not-allowed disabled:bg-muted-foreground/70"
          >
            <Plus className="size-3.5" strokeWidth={1.6} />
            {!product.inStock ? "Sold out" : added ? "Added to bag" : "Quick add"}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="eyebrow">{product.categoryName}</p>
        <h3 className="mt-1.5 text-[0.95rem] leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2 text-sm">
          <span className={cn(product.compareAt && "text-clay")}>{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>

      {quickView && (
        <div
          className="fixed inset-0 z-60 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} quick view`}
          onClick={() => setQuickView(false)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-background sm:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-4/5 size-full object-cover"
              loading="lazy"
            />
            <div className="p-7">
              <button
                type="button"
                onClick={() => setQuickView(false)}
                aria-label="Close quick view"
                className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
              <p className="eyebrow">{product.categoryName}</p>
              <h3 className="display-md mt-2">{product.name}</h3>
              <div className="mt-3 flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-xs text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-5 text-lg">{formatPrice(product.price)}</p>
              <button
                type="button"
                onClick={add}
                disabled={!product.inStock}
                className="mt-6 w-full bg-primary py-3.5 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {product.inStock ? "Add to bag" : "Sold out"}
              </button>
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="mt-4 block text-center text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
              >
                View full details
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
