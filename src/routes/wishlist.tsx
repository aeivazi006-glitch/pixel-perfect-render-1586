import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "علاقه‌مندی‌ها | مدرنو" },
      { name: "description", content: "قطعه‌هایی که برای بعد ذخیره کرده‌اید." },
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
      <h1 className="display-lg">علاقه‌مندی‌ها</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
        قطعه‌های ذخیره‌شده روی همین دستگاه می‌مانند تا هر وقت خواستید با آرامش تصمیم بگیرید.
      </p>

      {saved.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">هنوز چیزی ذخیره نشده است.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
          >
            چیزی پیدا کنید که دوستش دارید
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
