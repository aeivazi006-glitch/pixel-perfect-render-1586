import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ما | مدرنو" },
      {
        name: "description",
        content:
          "پرسشی درباره اندازه، ارسال، بازگشت کالا یا بازدید از شوروم دارید؟ با تیم مدرنو در تماس باشید.",
      },
      { property: "og:title", content: "تماس با ما | مدرنو" },
      {
        property: "og:description",
        content: "درباره اندازه، ارسال و بازگشت کالا با تیم ما صحبت کنید.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="shell grid gap-14 py-12 md:py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <p className="eyebrow">تماس با ما</p>
        <h1 className="display-lg mt-4">حداکثر تا یک روز کاری پاسخ می‌دهیم.</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          مشاوره اندازه، نمونه پارچه، زمان تحویل یا سفارش عمده — برای ما بنویسید و یک انسان واقعی
          پاسخ می‌دهد.
        </p>

        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
            hello@moderno.com
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
            ۰۲۱ ۰۰۰۰ ۰۰۰۰
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
            تهران، خیابان ولی‌عصر، پلاک ۱۸
          </li>
          <li className="flex items-start gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
            شنبه تا چهارشنبه، ۹:۰۰ تا ۱۸:۰۰
          </li>
        </ul>
      </div>

      <form
        className="rounded-2xl bg-linen p-7 md:p-10"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <h2 className="display-md">ارسال پیام</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <Field label="نام" name="name" />
          <Field label="ایمیل" name="email" type="email" />
          <Field label="موضوع" name="subject" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label htmlFor="message" className="eyebrow">
              متن پیام
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-9 rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
        >
          ارسال پیام
        </button>
        {sent && (
          <p aria-live="polite" className="mt-5 text-sm text-muted-foreground">
            سپاسگزاریم — پیام شما به دست استودیو رسید. حداکثر تا یک روز کاری پاسخ می‌دهیم.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  className,
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
