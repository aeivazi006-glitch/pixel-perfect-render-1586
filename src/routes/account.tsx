import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, products } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — MODERNO" },
      { name: "description", content: "Orders, saved pieces and delivery details." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

const tabs = ["Orders", "Wishlist", "Details"] as const;

const orders = [
  { id: "MD-10428", date: "12 September 2026", status: "Delivered", total: 1098, items: 2 },
  { id: "MD-10311", date: "24 August 2026", status: "In transit", total: 299, items: 1 },
  { id: "MD-10190", date: "06 July 2026", status: "Delivered", total: 189, items: 1 },
];

function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Orders");
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="shell py-10 md:py-14">
      <p className="eyebrow">Account</p>
      <h1 className="display-lg mt-3">Hello, Alex</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Not you?{" "}
        <Link to="/login" className="link-underline text-foreground">
          Sign in to another account
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
              "-mb-px border-b-2 pb-3 text-[0.68rem] tracking-[0.16em] uppercase transition-colors",
              tab === item ? "border-foreground" : "border-transparent text-muted-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Orders" && (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm"
            >
              <div>
                <p>{order.id}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {order.date} · {order.items} {order.items === 1 ? "item" : "items"}
                </p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
                {order.status}
              </span>
              <span>{formatPrice(order.total)}</span>
            </li>
          ))}
        </ul>
      )}

      {tab === "Wishlist" && (
        <div className="mt-10">
          {saved.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing saved yet —{" "}
              <Link to="/shop" className="link-underline text-foreground">
                browse the collection
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-4 text-sm">
              {saved.map((product) => (
                <li key={product.id} className="flex items-center gap-4 border-b border-border pb-4">
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

      {tab === "Details" && (
        <dl className="mt-10 grid max-w-lg gap-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="eyebrow">Name</dt>
            <dd className="mt-2">Alex Moreau</dd>
          </div>
          <div>
            <dt className="eyebrow">Email</dt>
            <dd className="mt-2">alex@example.com</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="eyebrow">Delivery address</dt>
            <dd className="mt-2 text-muted-foreground">
              24 Fitzroy Street, London W1T 4BQ, United Kingdom
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
