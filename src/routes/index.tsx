import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { CategoryCard } from "@/components/CategoryCard";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { PromoBanner } from "@/components/PromoBanner";
import { BrandStory } from "@/components/BrandStory";
import { ShopTheRoom } from "@/components/ShopTheRoom";
import { Testimonials } from "@/components/Testimonials";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductCarousel } from "@/components/ProductCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { Newsletter } from "@/components/Newsletter";
import { Reveal } from "@/components/Reveal";
import { bestSellers, categories, newArrivals } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مدرنو — مبلمانی برای تعریف فضای شما" },
      {
        name: "description",
        content:
          "مجموعه‌ای از مبلمان مدرن و باکیفیت را کشف کنید؛ طراحی شده برای ایجاد آرامش، زیبایی و شخصیت در هر گوشه از خانه شما.",
      },
      { property: "og:title", content: "مدرنو — مبلمانی برای تعریف فضای شما" },
      {
        property: "og:description",
        content: "مبلمان و دکوراسیون مدرن و ممتاز، طراحی‌شده برای زندگی امروز.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />

      <section aria-label="خرید بر اساس دسته‌بندی" className="shell py-20 md:py-28">
        <SectionHeading
          eyebrow="دسته‌بندی‌ها"
          title="خرید بر اساس اتاق"
          description="مبلمانی که برای هر گوشه از خانه شما انتخاب شده است."
          linkTo="/categories"
          linkLabel="مشاهده همه دسته‌بندی‌ها"
        />

        <ul className="no-scrollbar snap-row -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0">
          {categories.map((category, index) => (
            <Reveal
              as="li"
              key={category.slug}
              delay={index * 70}
              className={cn(
                "w-[74%] shrink-0 md:w-auto",
                index < 2 ? "md:col-span-3" : "md:col-span-2",
              )}
            >
              <CategoryCard category={category} size={index < 2 ? "default" : "wide"} />
            </Reveal>
          ))}
        </ul>
      </section>

      <FeaturedCollection />

      <PromoBanner />

      <section aria-label="محصولات جدید" className="shell py-20 md:py-28">
        <SectionHeading
          eyebrow="تازه رسیده"
          title="محصولات جدید"
          description="قطعه‌های تازه برای فضاهای مدرن."
          linkTo="/new-arrivals"
          linkLabel="همه محصولات جدید را ببینید"
        />
        <ProductGrid products={newArrivals} columns={5} />
      </section>

      <section aria-label="پرفروش‌ها" className="border-y border-border bg-linen/60">
        <div className="shell py-20 md:py-28">
          <SectionHeading
            eyebrow="محبوب‌ترین‌ها"
            title="پرفروش‌ها"
            description="قطعه‌هایی که مشتریان ما دوباره و دوباره سراغشان می‌آیند و به دیگران معرفی می‌کنند."
            linkTo="/best-sellers"
            linkLabel="مشاهده همه پرفروش‌ها"
          />
          <ProductCarousel products={bestSellers} ariaLabel="مبلمان و دکوراسیون پرفروش" />
        </div>
      </section>

      <BrandStory />

      <ShopTheRoom />

      <Testimonials />

      <section aria-labelledby="newsletter-heading" className="border-t border-border bg-sand/50">
        <div className="shell grid gap-8 py-20 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">خبرنامه</p>
            <h2 id="newsletter-heading" className="display-lg mt-4">
              طراحی بهتر را به خانه بیاورید.
            </h2>
          </div>
          <div className="lg:ps-6">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              از مجموعه‌های تازه، پیشنهادهای خصوصی و الهام‌های دکوراسیون زودتر از همه باخبر شوید.
            </p>
            <Newsletter className="mt-7" />
            <p className="mt-5 text-xs text-muted-foreground">
              ترجیح می‌دهید اول بگردید؟{" "}
              <Link to="/shop" className="link-underline text-foreground">
                همه محصولات را ببینید
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
