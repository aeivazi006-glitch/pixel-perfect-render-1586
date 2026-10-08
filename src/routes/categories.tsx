import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { Reveal } from "@/components/Reveal";
import { categories, productsByCategory } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "دسته‌بندی‌ها | مدرنو" },
      {
        name: "description",
        content:
          "خرید مدرنو بر اساس فضا: اتاق نشیمن، اتاق غذاخوری، اتاق خواب، دفتر کار و فضای باز — انتخاب‌شده برای فضاهای مدرن.",
      },
      { property: "og:title", content: "دسته‌بندی‌ها | مدرنو" },
      {
        property: "og:description",
        content: "اتاق نشیمن، اتاق غذاخوری، اتاق خواب، دفتر کار و فضای باز — خرید بر اساس فضا.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="shell py-10 md:py-14">
      <nav aria-label="مسیر صفحه" className="text-[0.75rem] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          خانه
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">دسته‌بندی‌ها</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">خرید بر اساس فضا</p>
        <h1 className="display-lg mt-3">مبلمانی برای هر گوشه از خانه</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          پنج مجموعه که برای هماهنگی با یکدیگر طراحی شده‌اند. از فضایی شروع کنید که می‌خواهید مبله
          کنید و ما پالت رنگ و تناسبات را تا انتها یکدست نگه می‌داریم.
        </p>
      </header>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {categories.map((category, index) => (
          <Reveal as="li" key={category.slug} delay={index * 70}>
            <CategoryCard category={category} size="wide" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <p className="mt-3 text-[0.75rem] text-muted-foreground">
              {productsByCategory(category.slug).length} قطعه
            </p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-10">
        <p className="text-sm text-muted-foreground">
          نمی‌دانید از کجا شروع کنید؟ همه‌چیز را یک‌جا ببینید.
        </p>
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2.5 text-[0.8rem] font-semibold"
        >
          مشاهده همه مبلمان
          <ArrowLeft
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1.5"
            strokeWidth={1.6}
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
