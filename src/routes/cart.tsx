import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, X } from "lucide-react";
import { FREE_SHIPPING, useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — MODERNO" },
      { name: "description", content: "Review the pieces in your cart before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const {
    lines,
    setQuantity,
    removeLine,
    toggleWishlist,
    subtotal,
    discount,
    shipping,
    total,
    applyDiscount,
    discountCode,
  } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="shell py-10 md:py-14">
      <h1 className="display-lg">Your Cart</h1>

      {lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">Your cart is empty for now.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map(({ line, product }) => (
              <li key={`${product.id}-${line.variant ?? ""}`} className="flex gap-4 py-6 sm:gap-6">
                <Link to="/product/$slug" params={{ slug: product.slug }} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-4/5 w-24 rounded-lg object-cover sm:w-28"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="eyebrow">{product.categoryName}</p>
                      <h2 className="mt-1 text-base">
                        <Link
                          to="/product/$slug"
                          params={{ slug: product.slug }}
                          className="link-underline"
                        >
                          {product.name}
                        </Link>
                      </h2>
                      {line.variant && (
                        <p className="mt-1 text-xs text-muted-foreground">{line.variant}</p>
                      )}
                    </div>
                    <p className="shrink-0 text-sm">{formatPrice(product.price * line.quantity)}</p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-4">
                    <div className="flex items-center rounded-full border border-input">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, line.variant, line.quantity - 1)}
                        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, line.variant, line.quantity + 1)}
                        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toggleWishlist(product.id);
                        removeLine(product.id, line.variant);
                      }}
                      className="flex items-center gap-2 text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground"
                    >
                      <Heart className="size-3.5" strokeWidth={1.4} aria-hidden />
                      Move to wishlist
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLine(product.id, line.variant)}
                      className="flex items-center gap-1.5 text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" strokeWidth={1.4} aria-hidden />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl bg-linen p-7 lg:sticky lg:top-28">
            <h2 className="display-md">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              {discount > 0 && (
                <Row label={`Discount (${discountCode})`} value={`−${formatPrice(discount)}`} />
              )}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <div className="flex items-baseline justify-between border-t border-border pt-4 text-base">
                <dt>Total</dt>
                <dd className="font-medium">{formatPrice(total)}</dd>
              </div>
            </dl>

            <form
              className="mt-7"
              onSubmit={(event) => {
                event.preventDefault();
                const ok = applyDiscount(code);
                setError(ok ? "" : "That code isn't valid. Try WELCOME10.");
                if (ok) setCode("");
              }}
            >
              <label htmlFor="cart-code" className="eyebrow">
                Promo code
              </label>
              <div className="mt-3 flex items-center gap-3 rounded-full border border-input bg-background/70 pr-1.5 pl-4">
                <input
                  id="cart-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="WELCOME10"
                  className="w-full min-w-0 bg-transparent py-2.5 text-sm uppercase outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full px-3 py-1.5 text-[0.62rem] tracking-[0.14em] uppercase transition-colors hover:bg-secondary"
                >
                  Apply
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-destructive" role="alert">
                  {error}
                </p>
              )}
            </form>

            <Link
              to="/checkout"
              className="mt-8 block rounded-full bg-primary py-4 text-center text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-88"
            >
              Checkout
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Free shipping on orders over {formatPrice(FREE_SHIPPING)}.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
