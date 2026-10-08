import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Minus, Package, Plus, RefreshCcw, Ruler, Truck } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ReviewSection } from "@/components/ReviewSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Stars } from "@/components/Stars";
import { notifyCart, notifyWishlist } from "@/components/ToastNotification";
import {
  discountPercent,
  formatPrice,
  getProduct,
  getProductsByIds,
  products,
} from "@/data/catalog";
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
        meta: [{ title: "Product not found — MODERNO" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — MODERNO` },
        { name: "description", content: product.summary },
        { property: "og:title", content: `${product.name} — MODERNO` },
        { property: "og:description", content: product.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted, markViewed, recentlyViewed } = useStore();
  const navigate = useNavigate();
  const [variant, setVariant] = useState(product.options?.values[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const off = discountPercent(product);

  useEffect(() => {
    markViewed(product.id);
    setVariant(product.options?.values[0]);
    setQuantity(1);
  }, [product, markViewed]);

  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(products.filter((item) => item.id !== product.id && item.category !== product.category))
    .slice(0, 4);

  const seen = getProductsByIds(recentlyViewed.filter((id) => id !== product.id)).slice(0, 4);

  const add = (openCheckout = false) => {
    addToCart(product.id, variant, quantity);
    notifyCart(product.name, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    return openCheckout;
  };

  return (
    <div className="shell py-8 md:py-12">
      <nav
        aria-label="Breadcrumb"
        className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="px-2">/</span>
        <Link
          to="/shop"
          search={{ category: product.category }}
          className="hover:text-foreground"
        >
          {product.categoryName}
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <ProductGallery images={product.gallery} alt={product.name} />

        <div className="lg:pt-2">
          <p className="eyebrow">{product.categoryName}</p>
          <h1 className="display-lg mt-3">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className={cn("text-2xl", product.compareAt && "text-clay")}>
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAt)}
                </span>
                <span className="rounded-full bg-clay px-2.5 py-1 text-[0.58rem] tracking-[0.14em] uppercase text-clay-foreground">
                  Save {off}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {product.description}
          </p>

          {product.options && (
            <fieldset className="mt-8">
              <legend className="eyebrow">
                {product.options.label}
                {variant && <span className="ml-2 text-foreground normal-case">{variant}</span>}
              </legend>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {product.options.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setVariant(value)}
                    aria-pressed={value === variant}
                    className={cn(
                      "rounded-full border px-4 py-2.5 text-[0.66rem] tracking-[0.12em] uppercase transition-colors duration-500",
                      value === variant
                        ? "border-foreground bg-foreground text-background"
                        : "border-input hover:border-foreground",
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-input">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <Minus className="size-3.5" strokeWidth={1.6} aria-hidden />
              </button>
              <span className="w-8 text-center text-sm" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <Plus className="size-3.5" strokeWidth={1.6} aria-hidden />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                const saved = !isWishlisted(product.id);
                toggleWishlist(product.id);
                notifyWishlist(product.name, saved);
              }}
              aria-pressed={isWishlisted(product.id)}
              className="flex items-center gap-2 rounded-full border border-input px-5 py-3.5 text-[0.64rem] tracking-[0.14em] uppercase transition-colors duration-500 hover:border-foreground"
            >
              <Heart
                className={cn(
                  "size-4 transition-transform duration-500",
                  isWishlisted(product.id) && "scale-110 fill-clay text-clay",
                )}
                strokeWidth={1.4}
                aria-hidden
              />
              {isWishlisted(product.id) ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => add()}
              disabled={!product.inStock}
              className="w-full rounded-full bg-primary py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity duration-500 hover:opacity-88 disabled:opacity-45"
            >
              {!product.inStock ? "Made to order — 12 weeks" : added ? "Added to cart" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={() => {
                add();
                navigate({ to: "/checkout" });
              }}
              disabled={!product.inStock}
              className="fill-sweep w-full rounded-full border border-foreground/25 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-foreground transition-colors duration-500 hover:border-foreground hover:text-background disabled:pointer-events-none disabled:opacity-45"
            >
              Buy now
            </button>
          </div>

          <ul className="mt-9 space-y-3.5 border-t border-border pt-7 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Truck className="mt-0.5 size-4 shrink-0 text-umber" strokeWidth={1.4} aria-hidden />
              Free shipping on orders over $100 · assembled delivery in 2–4 weeks
            </li>
            <li className="flex items-start gap-3">
              <RefreshCcw className="mt-0.5 size-4 shrink-0 text-umber" strokeWidth={1.4} aria-hidden />
              Free returns within 30 days, collected from your home
            </li>
            <li className="flex items-start gap-3">
              <Package className="mt-0.5 size-4 shrink-0 text-umber" strokeWidth={1.4} aria-hidden />
              Plastic-free packaging, recycled board and paper tape
            </li>
          </ul>

          <div className="mt-9 border-t border-border">
            <Accordion title="Material & care" defaultOpen>
              <dl className="space-y-4">
                <Detail label="Material" value={product.material} />
                <Detail label="Care" value={product.care} />
              </dl>
            </Accordion>
            <Accordion title="Dimensions">
              <p className="flex items-start gap-3 text-sm text-muted-foreground">
                <Ruler className="mt-0.5 size-4 shrink-0 text-umber" strokeWidth={1.4} aria-hidden />
                {product.dimensions}
              </p>
            </Accordion>
            <Accordion title="Shipping & returns">
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>Dispatched from Lisbon in 1–2 working days.</li>
                <li>Assembled delivery in 2–4 weeks for made-to-order pieces.</li>
                <li>Free returns within 30 days, collection arranged by us.</li>
              </ul>
            </Accordion>
            <Accordion title="Why MODERNO">
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-24">
        <ReviewSection reviews={product.reviews} rating={product.rating} count={product.reviewCount} />
      </div>

      <section aria-label="Related products" className="mt-20 md:mt-24">
        <SectionHeading linkTo="/shop" linkLabel="Shop all" title="You may also like" />
        <ProductGrid products={related} columns={4} showRating />
      </section>

      {seen.length > 0 && (
        <section aria-label="Recently viewed" className="mt-20 border-t border-border pt-16 md:mt-24">
          <SectionHeading title="Recently viewed" />
          <ProductCarousel products={seen} ariaLabel="Recently viewed products" />
        </section>
      )}
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm tracking-[0.02em] [&::-webkit-details-marker]:hidden">
        <span className="font-sans text-[0.78rem] tracking-[0.12em] uppercase">{title}</span>
        <ChevronDown
          className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180"
          strokeWidth={1.5}
          aria-hidden
        />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm text-muted-foreground">{value}</dd>
    </div>
  );
}
