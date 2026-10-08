import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Lock, Truck } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — MODERNO" },
      { name: "description", content: "A calm, three-step checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type Form = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  card: string;
  expiry: string;
  cvc: string;
};

const emptyForm: Form = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postcode: "",
  country: "United Kingdom",
  card: "",
  expiry: "",
  cvc: "",
};

type Delivery = "standard" | "express";

const deliveryOptions: { value: Delivery; label: string; note: string; price: number }[] = [
  { value: "standard", label: "Standard delivery", note: "2–4 weeks, assembled", price: 0 },
  { value: "express", label: "Express delivery", note: "5–7 working days", price: 29 },
];

function CheckoutPage() {
  const { lines, subtotal, discount, shipping, total, discountCode } = useStore();
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<"card" | "paypal">("card");
  const [placed, setPlaced] = useState(false);

  const expressFee = delivery === "express" ? 29 : 0;
  const orderTotal = total + expressFee;

  const update = (key: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!form.email.includes("@")) next.email = "Enter a valid email address.";
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.address.trim()) next.address = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (form.postcode.trim().length < 3) next.postcode = "Enter a valid postcode.";
    if (payment === "card") {
      if (form.card.replace(/\s/g, "").length < 15) next.card = "Enter a 16-digit card number.";
      if (!/^\d{2}\s?\/\s?\d{2}$/.test(form.expiry.trim())) next.expiry = "Use MM / YY.";
      if (form.cvc.trim().length < 3) next.cvc = "3-digit security code.";
    }
    return next;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="shell flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-secondary">
          <Check className="size-6" strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="display-lg mt-7">Thank you — your order is confirmed</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          We've emailed a confirmation to {form.email}. Our delivery team will be in touch within two
          working days to arrange a time that suits you.
        </p>
        <Link
          to="/shop"
          className="mt-9 rounded-full bg-primary px-8 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="display-lg">Nothing to check out</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Add a piece to your cart and come back when you're ready.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
        >
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-10 md:py-14">
      <nav
        aria-label="Breadcrumb"
        className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground"
      >
        <Link to="/cart" className="hover:text-foreground">
          Cart
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">Checkout</span>
      </nav>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="display-lg">Checkout</h1>
        <p className="flex items-center gap-2 text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground">
          <Lock className="size-3.5" strokeWidth={1.6} aria-hidden />
          Secure payment
        </p>
      </header>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <div className="space-y-12">
          <fieldset>
            <legend className="display-sm">Contact information</legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update("email")}
                error={errors.email}
                className="sm:col-span-2"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="display-sm">Shipping address</legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field
                label="First name"
                name="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={update("firstName")}
                error={errors.firstName}
              />
              <Field
                label="Last name"
                name="lastName"
                autoComplete="family-name"
                value={form.lastName}
                onChange={update("lastName")}
                error={errors.lastName}
              />
              <Field
                label="Street address"
                name="address"
                autoComplete="street-address"
                value={form.address}
                onChange={update("address")}
                error={errors.address}
                className="sm:col-span-2"
              />
              <Field
                label="City"
                name="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={update("city")}
                error={errors.city}
              />
              <Field
                label="Postcode"
                name="postcode"
                autoComplete="postal-code"
                value={form.postcode}
                onChange={update("postcode")}
                error={errors.postcode}
              />
              <Field
                label="Country"
                name="country"
                autoComplete="country-name"
                value={form.country}
                onChange={update("country")}
                className="sm:col-span-2"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="display-sm">Delivery method</legend>
            <div className="mt-6 grid gap-3">
              {deliveryOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors duration-500",
                    delivery === option.value
                      ? "border-foreground bg-secondary/40"
                      : "border-border hover:border-foreground/30",
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={option.value}
                    checked={delivery === option.value}
                    onChange={() => setDelivery(option.value)}
                    className="size-4 accent-clay"
                  />
                  <Truck className="size-4 shrink-0 text-umber" strokeWidth={1.4} aria-hidden />
                  <span className="flex-1">
                    <span className="block text-sm">{option.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{option.note}</span>
                  </span>
                  <span className="text-sm">
                    {option.price === 0 ? "Free" : formatPrice(option.price)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="display-sm">Payment method</legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(["card", "paypal"] as const).map((method) => (
                <label
                  key={method}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors duration-500",
                    payment === method
                      ? "border-foreground bg-secondary/40"
                      : "border-border hover:border-foreground/30",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                    className="size-4 accent-clay"
                  />
                  <CreditCard className="size-4 text-umber" strokeWidth={1.4} aria-hidden />
                  <span className="text-sm">{method === "card" ? "Card" : "PayPal"}</span>
                </label>
              ))}
            </div>

            {payment === "card" ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Card number"
                  name="card"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  autoComplete="cc-number"
                  value={form.card}
                  onChange={update("card")}
                  error={errors.card}
                  className="sm:col-span-2"
                />
                <Field
                  label="Expiry"
                  name="expiry"
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                  value={form.expiry}
                  onChange={update("expiry")}
                  error={errors.expiry}
                />
                <Field
                  label="Security code"
                  name="cvc"
                  inputMode="numeric"
                  placeholder="123"
                  autoComplete="cc-csc"
                  value={form.cvc}
                  onChange={update("cvc")}
                  error={errors.cvc}
                />
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                You'll be redirected to PayPal to complete your purchase securely.
              </p>
            )}
          </fieldset>
        </div>

        <aside className="h-fit rounded-2xl bg-linen p-7 lg:sticky lg:top-28">
          <h2 className="display-md">Order summary</h2>

          <ul className="mt-6 divide-y divide-border/70">
            {lines.map(({ line, product }) => (
              <li key={`${product.id}-${line.variant ?? ""}`} className="flex gap-3.5 py-4 first:pt-0">
                <img
                  src={product.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="size-16 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{product.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {line.variant ? `${line.variant} · ` : ""}Qty {line.quantity}
                  </span>
                </span>
                <span className="shrink-0 text-sm">
                  {formatPrice(product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            {discount > 0 && (
              <Row label={`Discount (${discountCode})`} value={`−${formatPrice(discount)}`} />
            )}
            <Row label="Delivery" value={delivery === "express" ? formatPrice(29) : shipping === 0 ? "Free" : formatPrice(shipping)} />
            <div className="flex items-baseline justify-between border-t border-border pt-4 text-base">
              <dt>Total</dt>
              <dd className="font-medium">{formatPrice(orderTotal)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-7 w-full rounded-full bg-primary py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity duration-500 hover:opacity-88"
          >
            Place order
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            By placing this order you agree to our terms and 30-day returns policy.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string | undefined;
}) {
  const id = `checkout-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.62rem] tracking-[0.16em] uppercase text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2.5 w-full rounded-xl border bg-background/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground",
          error ? "border-destructive" : "border-input",
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
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
