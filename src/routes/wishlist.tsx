import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — MODERNO" },
      { name: "description", content: "The pieces you've saved for later." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="shell py-10 md:py-14">
      <h1 className="display-lg">Wishlist</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Saved pieces stay here on this device, so you can come back and decide slowly.
      </p>

      {saved.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Find something you love
          </Link>
        </div>
      ) : (
        <div className="mt-12">
          <ProductGrid products={saved} columns={4} showRating />
        </div>
      )}
    </div>
  );
}
