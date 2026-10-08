import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, X } from "lucide-react";
import { FREE_SHIPPING, useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید شما | مدرنو" },
      { name: "description", content: "پیش از تسویه حساب، کالاهای سبد خرید خود را بررسی کنید." },
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
      <h1 className="display-lg">سبد خرید شما</h1>

      {lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">سبد خرید شما در این لحظه خالی است.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
          >
            شروع خرید
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
                      <h2 className="mt-1 text-base font-semibold">
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
                        aria-label={`کاهش تعداد ${product.name}`}
                        onClick={() => setQuantity(product.id, line.variant, line.quantity - 1)}
                        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label={`افزایش تعداد ${product.name}`}
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
                      className="flex items-center gap-2 text-[0.75rem] font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Heart className="size-3.5" strokeWidth={1.4} aria-hidden />
                      انتقال به علاقه‌مندی‌ها
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLine(product.id, line.variant)}
                      className="flex items-center gap-1.5 text-[0.75rem] font-medium text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" strokeWidth={1.4} aria-hidden />
                      حذف
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl bg-linen p-7 lg:sticky lg:top-28">
            <h2 className="display-md">خلاصه سفارش</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="جمع کالاها" value={formatPrice(subtotal)} />
              {discount > 0 && (
                <Row label={`تخفیف (${discountCode})`} value={`−${formatPrice(discount)}`} />
              )}
              <Row label="هزینه ارسال" value={shipping === 0 ? "رایگان" : formatPrice(shipping)} />
              <div className="flex items-baseline justify-between border-t border-border pt-4 text-base">
                <dt>مبلغ قابل پرداخت</dt>
                <dd className="font-semibold">{formatPrice(total)}</dd>
              </div>
            </dl>

            <form
              className="mt-7"
              onSubmit={(event) => {
                event.preventDefault();
                const ok = applyDiscount(code);
                setError(ok ? "" : "این کد معتبر نیست. WELCOME10 را امتحان کنید.");
                if (ok) setCode("");
              }}
            >
              <label htmlFor="cart-code" className="eyebrow">
                کد تخفیف
              </label>
              <div className="mt-3 flex items-center gap-3 rounded-full border border-input bg-background/70 pe-1.5 ps-4">
                <input
                  id="cart-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="WELCOME10"
                  className="w-full min-w-0 bg-transparent py-2.5 text-sm uppercase outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:bg-secondary"
                >
                  اعمال
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
              className="mt-8 block rounded-full bg-primary py-4 text-center text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-88"
            >
              تسویه حساب
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              ارسال رایگان برای سفارش‌های بالای {formatPrice(FREE_SHIPPING)}.
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
