import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Package, RefreshCcw, Truck } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewSection } from "@/components/ReviewSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Stars } from "@/components/Stars";
import { discountPercent, formatPrice, getProduct, products } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Maison Étage" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Maison Étage` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Maison Étage` },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [variant, setVariant] = useState(product.options?.values[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const off = discountPercent(product);
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  const add = () => {
    addToCart(product.id, variant, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="shell py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ProductGallery images={product.gallery} alt={product.name} />

        <div className="lg:pt-6">
          <p className="eyebrow">{product.categoryName}</p>
          <h1 className="display-lg mt-3">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className={cn("text-2xl", product.compareAt && "text-clay")}>
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAt)}
                </span>
                <span className="bg-clay px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-clay-foreground">
                  Save {off}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {product.options && (
            <div className="mt-8">
              <p className="eyebrow">{product.options.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.options.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setVariant(value)}
                    className={cn(
                      "border px-4 py-2.5 text-xs tracking-[0.1em] uppercase transition-colors",
                      value === variant
                        ? "border-foreground bg-foreground text-background"
                        : "border-input hover:border-foreground",
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-input">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="px-4 py-3 text-sm hover:bg-muted"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
                className="px-4 py-3 text-sm hover:bg-muted"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={isWishlisted(product.id)}
              className="flex items-center gap-2 border border-input px-5 py-3 text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:border-foreground"
            >
              <Heart
                className={cn("size-4", isWishlisted(product.id) && "fill-clay text-clay")}
                strokeWidth={1.4}
              />
              {isWishlisted(product.id) ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={add}
              disabled={!product.inStock}
              className="w-full bg-primary py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {!product.inStock ? "Sold out" : added ? "Added to bag" : "Add to bag"}
            </button>
            <Link
              to="/checkout"
              onClick={add}
              className={cn(
                "w-full border border-foreground/25 py-4 text-center text-[0.7rem] tracking-[0.2em] uppercase transition-colors hover:border-foreground hover:bg-foreground hover:text-background",
                !product.inStock && "pointer-events-none opacity-50",
              )}
            >
              Buy it now
            </Link>
          </div>

          <ul className="mt-9 space-y-3 border-t border-border pt-7 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Truck className="mt-0.5 size-4 shrink-0" strokeWidth={1.4} />
              Free carbon-neutral delivery over $120 · dispatched in 1–2 working days
            </li>
            <li className="flex items-start gap-3">
              <RefreshCcw className="mt-0.5 size-4 shrink-0" strokeWidth={1.4} />
              Free returns within 30 days, in original packaging
            </li>
            <li className="flex items-start gap-3">
              <Package className="mt-0.5 size-4 shrink-0" strokeWidth={1.4} />
              Framed pieces ship in reinforced, plastic-free boxes
            </li>
          </ul>

          <div className="mt-9 border-t border-border pt-7">
            <h2 className="eyebrow">Product details</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {product.details.map((detail) => (
                <li key={detail}>— {detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <ReviewSection
          reviews={product.reviews}
          rating={product.rating}
          count={product.reviewCount}
        />
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="You may also like" title="Related pieces" linkTo="/shop" linkLabel="Shop all" />
        <ProductGrid products={related} />
      </div>
    </div>
  );
}
