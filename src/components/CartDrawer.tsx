import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice, products } from "@/data/catalog";
import { FREE_SHIPPING, useStore } from "@/lib/store";
import { notifyCart } from "@/components/ToastNotification";
import { cn } from "@/lib/utils";

/** Right-hand glass-veil cart drawer. Opens from the header cart icon. */
export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    lines,
    setQuantity,
    removeLine,
    subtotal,
    discount,
    shipping,
    total,
    applyDiscount,
    discountCode,
    addToCart,
  } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!cartOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  const pairs = products.filter((product) => !lines.some(({ product: p }) => p.id === product.id)).slice(0, 4);
  const remaining = Math.max(0, FREE_SHIPPING - (subtotal - discount));

  return (
    <div className="fixed inset-0 z-70 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 cursor-default bg-foreground/35 backdrop-blur-[3px]"
      />

      <div className="relative flex h-full w-full max-w-[27rem] flex-col border-l border-border bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="flex items-center gap-2.5 font-display text-xl">
            <ShoppingBag className="size-4" strokeWidth={1.5} aria-hidden />
            Your Cart
            {lines.length > 0 && (
              <span className="text-sm text-muted-foreground">({lines.length})</span>
            )}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <X className="size-5" strokeWidth={1.4} aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty for now.</p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="rounded-full bg-primary px-7 py-3.5 text-[0.66rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="divide-y divide-border">
                {lines.map(({ line, product }) => (
                  <li key={`${product.id}-${line.variant ?? ""}`} className="flex gap-4 py-5 first:pt-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      onClick={closeCart}
                      className="shrink-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="aspect-4/5 w-20 rounded-lg object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm">
                            <Link
                              to="/product/$slug"
                              params={{ slug: product.slug }}
                              onClick={closeCart}
                              className="link-underline"
                            >
                              {product.name}
                            </Link>
                          </h3>
                          {line.variant && (
                            <p className="mt-1 text-xs text-muted-foreground">{line.variant}</p>
                          )}
                        </div>
                        <p className="shrink-0 text-sm">
                          {formatPrice(product.price * line.quantity)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <div className="flex items-center rounded-full border border-input">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => setQuantity(product.id, line.variant, line.quantity - 1)}
                            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                          >
                            <Minus className="size-3.5" strokeWidth={1.6} aria-hidden />
                          </button>
                          <span className="w-7 text-center text-sm" aria-live="polite">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => setQuantity(product.id, line.variant, line.quantity + 1)}
                            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                          >
                            <Plus className="size-3.5" strokeWidth={1.6} aria-hidden />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(product.id, line.variant)}
                          className="text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {pairs.length > 0 && (
                <section className="mt-6 border-t border-border pt-6" aria-label="Frequently paired with">
                  <h3 className="eyebrow">Frequently paired with</h3>
                  <ul className="mt-4 space-y-3">
                    {pairs.slice(0, 3).map((product) => (
                      <li key={product.id} className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="size-12 shrink-0 rounded-lg object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm">{product.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatPrice(product.price)}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product.id, product.options?.values[0]);
                            notifyCart(product.name);
                          }}
                          className="shrink-0 rounded-full border border-input px-3.5 py-2 text-[0.6rem] tracking-[0.14em] uppercase transition-colors hover:border-foreground hover:bg-primary hover:text-primary-foreground"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="border-t border-border bg-linen/60 px-6 py-5">
              {remaining > 0 && (
                <p className="mb-4 rounded-lg bg-secondary/70 px-3.5 py-2.5 text-xs text-secondary-foreground">
                  Add {formatPrice(remaining)} more for free shipping.
                </p>
              )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const ok = applyDiscount(code);
                  setError(ok ? "" : "That code isn't valid.");
                  if (ok) setCode("");
                }}
              >
                <label htmlFor="drawer-code" className="sr-only">
                  Promo code
                </label>
                <div className="flex items-center gap-3 rounded-full border border-input bg-background/70 pr-1.5 pl-4">
                  <input
                    id="drawer-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Promo code"
                    className="w-full min-w-0 bg-transparent py-2.5 text-sm uppercase outline-none placeholder:text-muted-foreground placeholder:normal-case"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full px-3 py-1.5 text-[0.6rem] tracking-[0.14em] uppercase transition-colors hover:bg-secondary"
                  >
                    Apply
                  </button>
                </div>
                {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
              </form>

              <dl className="mt-5 space-y-2.5 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                {discount > 0 && (
                  <Row
                    label={`Discount (${discountCode})`}
                    value={`−${formatPrice(discount)}`}
                    highlight
                  />
                )}
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
                <div className="flex items-baseline justify-between border-t border-border pt-3.5 text-base">
                  <dt>Total</dt>
                  <dd className="font-medium">{formatPrice(total)}</dd>
                </div>
              </dl>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-5 block rounded-full bg-primary py-4 text-center text-[0.66rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-88"
              >
                Checkout
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="mt-3 block text-center text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn(highlight && "text-clay")}>{value}</dd>
    </div>
  );
}
