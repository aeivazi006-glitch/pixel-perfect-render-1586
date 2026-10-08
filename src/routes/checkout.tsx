import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Lock, Truck } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "تسویه حساب | مدرنو" },
      { name: "description", content: "یک فرایند پرداخت آرام و سه‌مرحله‌ای." },
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
  country: "ایران",
  card: "",
  expiry: "",
  cvc: "",
};

type Delivery = "standard" | "express";

const deliveryOptions: { value: Delivery; label: string; note: string; price: number }[] = [
  { value: "standard", label: "ارسال عادی", note: "۲ تا ۴ هفته، نصب‌شده", price: 0 },
  { value: "express", label: "ارسال سریع", note: "۵ تا ۷ روز کاری", price: 750000 },
];

/** Persian numerals are common on fa keyboards — normalise before validating. */
const normalizeDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));

function CheckoutPage() {
  const { lines, subtotal, discount, shipping, total, discountCode } = useStore();
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<"card" | "paypal">("card");
  const [placed, setPlaced] = useState(false);

  const expressFee = delivery === "express" ? 750000 : 0;
  const orderTotal = total + expressFee;

  const update = (key: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!form.email.includes("@")) next.email = "یک نشانی ایمیل معتبر وارد کنید.";
    if (!form.firstName.trim()) next.firstName = "وارد کردن نام الزامی است.";
    if (!form.lastName.trim()) next.lastName = "وارد کردن نام خانوادگی الزامی است.";
    if (!form.address.trim()) next.address = "وارد کردن نشانی الزامی است.";
    if (!form.city.trim()) next.city = "وارد کردن شهر الزامی است.";
    if (normalizeDigits(form.postcode).trim().length < 3)
      next.postcode = "کد پستی معتبر وارد کنید.";
    if (payment === "card") {
      if (normalizeDigits(form.card).replace(/\s/g, "").length < 15)
        next.card = "شماره کارت ۱۶ رقمی را وارد کنید.";
      if (!/^\d{2}\s?\/\s?\d{2}$/.test(normalizeDigits(form.expiry).trim()))
        next.expiry = "به شکل MM / YY وارد کنید.";
      if (normalizeDigits(form.cvc).trim().length < 3) next.cvc = "کد امنیتی ۳ رقمی.";
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
        <h1 className="display-lg mt-7">سپاسگزاریم — سفارش شما ثبت شد</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          تأییدیه سفارش را به {form.email} فرستادیم. تیم ارسال ما تا دو روز کاری با شما تماس می‌گیرد
          تا زمانی مناسب هماهنگ شود.
        </p>
        <Link
          to="/shop"
          className="mt-9 rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
        >
          ادامه خرید
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="display-lg">چیزی برای تسویه حساب نیست</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          یک قطعه به سبد خرید اضافه کنید و هر وقت آماده بودید برگردید.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
        >
          مشاهده مجموعه
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-10 md:py-14">
      <nav aria-label="مسیر صفحه" className="text-[0.75rem] text-muted-foreground">
        <Link to="/cart" className="hover:text-foreground">
          سبد خرید
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">تسویه حساب</span>
      </nav>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="display-lg">تسویه حساب</h1>
        <p className="flex items-center gap-2 text-[0.75rem] text-muted-foreground">
          <Lock className="size-3.5" strokeWidth={1.6} aria-hidden />
          پرداخت امن
        </p>
      </header>

      <form
        onSubmit={submit}
        noValidate
        className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16"
      >
        <div className="space-y-12">
          <fieldset>
            <legend className="display-sm">اطلاعات تماس</legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field
                label="نشانی ایمیل"
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
            <legend className="display-sm">نشانی تحویل</legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field
                label="نام"
                name="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={update("firstName")}
                error={errors.firstName}
              />
              <Field
                label="نام خانوادگی"
                name="lastName"
                autoComplete="family-name"
                value={form.lastName}
                onChange={update("lastName")}
                error={errors.lastName}
              />
              <Field
                label="نشانی"
                name="address"
                autoComplete="street-address"
                value={form.address}
                onChange={update("address")}
                error={errors.address}
                className="sm:col-span-2"
              />
              <Field
                label="شهر"
                name="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={update("city")}
                error={errors.city}
              />
              <Field
                label="کد پستی"
                name="postcode"
                autoComplete="postal-code"
                value={form.postcode}
                onChange={update("postcode")}
                error={errors.postcode}
              />
              <Field
                label="کشور"
                name="country"
                autoComplete="country-name"
                value={form.country}
                onChange={update("country")}
                className="sm:col-span-2"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="display-sm">روش ارسال</legend>
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
                    <span className="block text-sm font-medium">{option.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{option.note}</span>
                  </span>
                  <span className="text-sm">
                    {option.price === 0 ? "رایگان" : formatPrice(option.price)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="display-sm">روش پرداخت</legend>
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
                  <span className="text-sm font-medium">
                    {method === "card" ? "کارت بانکی" : "پی‌پال"}
                  </span>
                </label>
              ))}
            </div>

            {payment === "card" ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Field
                  label="شماره کارت"
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
                  label="تاریخ انقضا"
                  name="expiry"
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                  value={form.expiry}
                  onChange={update("expiry")}
                  error={errors.expiry}
                />
                <Field
                  label="کد امنیتی"
                  name="cvc"
                  inputMode="numeric"
                  placeholder="۱۲۳"
                  autoComplete="cc-csc"
                  value={form.cvc}
                  onChange={update("cvc")}
                  error={errors.cvc}
                />
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                برای تکمیل خرید به‌صورت امن به پی‌پال هدایت می‌شوید.
              </p>
            )}
          </fieldset>
        </div>

        <aside className="h-fit rounded-2xl bg-linen p-7 lg:sticky lg:top-28">
          <h2 className="display-md">خلاصه سفارش</h2>

          <ul className="mt-6 divide-y divide-border/70">
            {lines.map(({ line, product }) => (
              <li
                key={`${product.id}-${line.variant ?? ""}`}
                className="flex gap-3.5 py-4 first:pt-0"
              >
                <img
                  src={product.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="size-16 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{product.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {line.variant ? `${line.variant} · ` : ""}تعداد {line.quantity}
                  </span>
                </span>
                <span className="shrink-0 text-sm">
                  {formatPrice(product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            <Row label="جمع کالاها" value={formatPrice(subtotal)} />
            {discount > 0 && (
              <Row label={`تخفیف (${discountCode})`} value={`−${formatPrice(discount)}`} />
            )}
            <Row
              label="هزینه ارسال"
              value={
                delivery === "express"
                  ? formatPrice(750000)
                  : shipping === 0
                    ? "رایگان"
                    : formatPrice(shipping)
              }
            />
            <div className="flex items-baseline justify-between border-t border-border pt-4 text-base">
              <dt>مبلغ قابل پرداخت</dt>
              <dd className="font-semibold">{formatPrice(orderTotal)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-7 w-full rounded-full bg-primary py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity duration-500 hover:opacity-88"
          >
            ثبت سفارش
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            با ثبت این سفارش، شرایط استفاده و بازگشت کالا تا ۳۰ روز را می‌پذیرید.
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
      <label htmlFor={id} className="block text-[0.75rem] font-medium text-foreground">
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
