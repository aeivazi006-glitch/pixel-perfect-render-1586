import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, products } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — Maison Étage" },
      { name: "description", content: "Orders, saved pieces and delivery details." },
      { property: "og:title", content: "Your Account — Maison Étage" },
      { property: "og:description", content: "Orders, saved pieces and delivery details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

const tabs = ["Orders", "Wishlist", "Details"] as const;

const orders = [
  { id: "ME-10428", date: "12 March 2026", status: "Delivered", total: 363, items: 2 },
  { id: "ME-10311", date: "24 February 2026", status: "Delivered", total: 88, items: 1 },
  { id: "ME-10190", date: "06 January 2026", status: "Refunded", total: 42, items: 1 },
];

function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Orders");
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="shell py-12 md:py-16">
      <p className="eyebrow">Account</p>
      <h1 className="display-lg mt-3">Hello, Alireza</h1>
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
            className={cn(
              "-mb-px border-b-2 pb-3 text-[0.7rem] tracking-[0.18em] uppercase transition-colors",
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
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
              <div>
                <p>{order.id}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {order.date} · {order.items} {order.items === 1 ? "item" : "items"}
                </p>
              </div>
              <span className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
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
                    alt={product.name}
                    loading="lazy"
                    className="aspect-square w-14 object-cover"
                  />
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="link-underline flex-1"
                  >
                    {product.name}
                  </Link>
                  <span>{formatPrice(product.price)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "Details" && (
        <dl className="mt-10 grid max-w-2xl gap-6 text-sm sm:grid-cols-2">
          {[
            ["Name", "Alireza Eivazi"],
            ["Email", "alireza@example.com"],
            ["Phone", "+351 210 000 000"],
            ["Shipping address", "18 Rue des Arts, Lisbon, 1200-000"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-2 text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
