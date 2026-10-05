import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Maison Étage" },
      { name: "description", content: "Complete your Maison Étage order." },
      { property: "og:title", content: "Checkout — Maison Étage" },
      { property: "og:description", content: "Complete your Maison Étage order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const shippingMethods = [
  { id: "standard", label: "Standard · 3–6 working days", price: 0 },
  { id: "express", label: "Express · 1–2 working days", price: 18 },
  { id: "white-glove", label: "White glove framed delivery", price: 39 },
];

function CheckoutPage() {
  const { lines, subtotal, discount, shipping, total, applyDiscount, discountCode, clearCart } =
    useStore();
  const [method, setMethod] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [code, setCode] = useState("");
  const [placed, setPlaced] = useState(false);

  const methodFee = shippingMethods.find((item) => item.id === method)?.price ?? 0;
  const grandTotal = total + methodFee;

  if (placed) {
    return (
      <div className="shell py-24 text-center">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="display-lg mt-4">Thank you — it's on its way.</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          We've emailed your receipt and tracking details. Framed pieces are packed by hand, so they
          leave the studio within two working days.
        </p>
        <Link
          to="/shop"
          className="mt-9 inline-flex bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-12 md:py-16">
      <h1 className="display-lg">Checkout</h1>

      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">There's nothing to check out yet.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <form
          className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16"
          onSubmit={(event) => {
            event.preventDefault();
            clearCart();
            setPlaced(true);
          }}
        >
          <div className="space-y-12">
            <Fieldset legend="Customer information">
              <Field label="Email" type="email" name="email" placeholder="you@email.com" />
              <Field label="Phone" type="tel" name="phone" placeholder="+351 000 000 000" />
            </Fieldset>

            <Fieldset legend="Shipping address">
              <Field label="First name" name="first" />
              <Field label="Last name" name="last" />
              <Field label="Address" name="address" className="sm:col-span-2" />
              <Field label="City" name="city" />
              <Field label="Postal code" name="postal" />
              <Field label="Country" name="country" />
            </Fieldset>

            <fieldset>
              <legend className="display-md">Shipping method</legend>
              <div className="mt-5 space-y-3">
                {shippingMethods.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between border px-5 py-4 text-sm transition-colors",
                      method === item.id ? "border-foreground" : "border-input hover:border-foreground/50",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={item.id}
                        checked={method === item.id}
                        onChange={() => setMethod(item.id)}
                        className="accent-clay"
                      />
                      {item.label}
                    </span>
                    <span>{item.price === 0 ? "Included" : formatPrice(item.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="display-md">Payment method</legend>
              <div className="mt-5 space-y-3">
                {[
                  { id: "card", label: "Credit or debit card" },
                  { id: "paypal", label: "PayPal" },
                  { id: "transfer", label: "Bank transfer" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 border px-5 py-4 text-sm transition-colors",
                      payment === option.id
                        ? "border-foreground"
                        : "border-input hover:border-foreground/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                      className="accent-clay"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {payment === "card" && (
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="Card number" name="card" placeholder="0000 0000 0000 0000" className="sm:col-span-2" />
                  <Field label="Expiry" name="expiry" placeholder="MM / YY" />
                  <Field label="CVC" name="cvc" placeholder="123" />
                </div>
              )}
            </fieldset>
          </div>

          <aside className="h-fit bg-linen p-7">
            <h2 className="display-md">Order summary</h2>
            <ul className="mt-6 space-y-4">
              {lines.map(({ line, product }) => (
                <li key={`${product.id}-${line.variant ?? ""}`} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-square w-16 object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <p>{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.variant ? `${line.variant} · ` : ""}Qty {line.quantity}
                    </p>
                  </div>
                  <p className="text-sm">{formatPrice(product.price * line.quantity)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-border pt-5">
              <label htmlFor="checkout-code" className="eyebrow">
                Discount code
              </label>
              <div className="mt-3 flex items-center gap-3 border-b border-input pb-2">
                <input
                  id="checkout-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="WELCOME10"
                  className="w-full bg-transparent text-sm uppercase outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (applyDiscount(code)) setCode("");
                  }}
                  className="text-[0.68rem] tracking-[0.16em] uppercase"
                >
                  Apply
                </button>
              </div>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Discount ({discountCode})</dt>
                  <dd>−{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping + methodFee === 0 ? "Free" : formatPrice(shipping + methodFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(grandTotal)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-8 w-full bg-primary py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              Place order
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              This is a demonstration checkout — no payment is taken.
            </p>
          </aside>
        </form>
      )}
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="display-md">{legend}</legend>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full border-b border-input bg-transparent pb-2 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
      />
    </div>
  );
}
