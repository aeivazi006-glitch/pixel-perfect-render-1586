import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { images } from "@/data/catalog";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "ورود | مدرنو" },
      { name: "description", content: "به حساب کاربری مدرنو وارد شوید." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="shell grid gap-12 py-12 md:py-16 lg:grid-cols-2 lg:gap-20">
      <div className="max-w-md">
        <p className="eyebrow">حساب کاربری</p>
        <h1 className="display-lg mt-4">خوش آمدید</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          وارد شوید تا سفارش‌ها را پیگیری کنید، علاقه‌مندی‌هایتان را ببینید و اطلاعات ارسال را ذخیره
          نگه دارید.
        </p>

        <form
          className="mt-9 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label htmlFor="login-email" className="eyebrow">
              نشانی ایمیل
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="eyebrow">
              گذرواژه
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-88"
          >
            ورود
          </button>
          {sent && (
            <p aria-live="polite" className="text-sm text-muted-foreground">
              ایمیل خود را ببینید — پیوند ورود امن را برای شما فرستادیم.
            </p>
          )}
        </form>

        <p className="mt-7 text-sm text-muted-foreground">
          تازه با مدرنو آشنا شده‌اید؟{" "}
          <Link to="/shop" className="link-underline text-foreground">
            از مجموعه شروع کنید
          </Link>
          .
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-lg bg-linen lg:block">
        <img
          src={images.editorialMain}
          alt="اتاق نشیمن مدرن و خنثی با نور طبیعی لایه‌لایه"
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
