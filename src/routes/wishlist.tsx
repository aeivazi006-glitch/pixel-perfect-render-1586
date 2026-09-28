import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Maison Étage" },
      { name: "description", content: "The pieces you've saved for later." },
      { property: "og:title", content: "Wishlist — Maison Étage" },
      { property: "og:description", content: "The pieces you've saved for later." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="shell py-12 md:py-16">
      <h1 className="display-lg">Wishlist</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Saved pieces stay here on this device, so you can come back and decide slowly.
      </p>

      {saved.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Find something you love
          </Link>
        </div>
      ) : (
        <div className="mt-12">
          <ProductGrid products={saved} />
        </div>
      )}
    </div>
  );
}
