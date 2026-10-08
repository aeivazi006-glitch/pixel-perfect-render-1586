import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, products } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حساب کاربری شما | مدرنو" },
      { name: "description", content: "سفارش‌ها، کالاهای ذخیره‌شده و اطلاعات ارسال." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

const tabs = ["سفارش‌ها", "علاقه‌مندی‌ها", "اطلاعات من"] as const;

const orders = [
  { id: "MD-10428", date: "۲۱ شهریور ۱۴۰۵", status: "تحویل شده", total: 48900000, items: 2 },
  { id: "MD-10311", date: "۲ مرداد ۱۴۰۵", status: "در مسیر", total: 18500000, items: 1 },
  { id: "MD-10190", date: "۱۵ تیر ۱۴۰۵", status: "تحویل شده", total: 11900000, items: 1 },
];

function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("سفارش‌ها");
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="shell py-10 md:py-14">
      <p className="eyebrow">حساب کاربری</p>
      <h1 className="display-lg mt-3">سلام، الکس</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        شما نیستید؟{" "}
        <Link to="/login" className="link-underline text-foreground">
          ورود با حساب دیگر
        </Link>
      </p>

      <div className="mt-10 flex gap-7 border-b border-border">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            aria-pressed={tab === item}
            className={cn(
              "-mb-px border-b-2 pb-3 text-[0.85rem] font-medium transition-colors",
              tab === item ? "border-foreground" : "border-transparent text-muted-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "سفارش‌ها" && (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm"
            >
              <div>
                <p>{order.id}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {order.date} · {order.items} قلم کالا
                </p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-[0.72rem] text-muted-foreground">
                {order.status}
              </span>
              <span>{formatPrice(order.total)}</span>
            </li>
          ))}
        </ul>
      )}

      {tab === "علاقه‌مندی‌ها" && (
        <div className="mt-10">
          {saved.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              هنوز چیزی ذخیره نشده —{" "}
              <Link to="/shop" className="link-underline text-foreground">
                مجموعه را ببینید
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-4 text-sm">
              {saved.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-4 border-b border-border pb-4"
                >
                  <img
                    src={product.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="size-14 rounded-lg object-cover"
                  />
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="link-underline flex-1"
                  >
                    {product.name}
                  </Link>
                  <span className="text-muted-foreground">{formatPrice(product.price)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "اطلاعات من" && (
        <dl className="mt-10 grid max-w-lg gap-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="eyebrow">نام</dt>
            <dd className="mt-2">الکس مرادی</dd>
          </div>
          <div>
            <dt className="eyebrow">ایمیل</dt>
            <dd className="mt-2">alex@example.com</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="eyebrow">نشانی تحویل</dt>
            <dd className="mt-2 text-muted-foreground">
              تهران، خیابان ونک، کوچه ۲۴، پلاک ۳، واحد ۷
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
