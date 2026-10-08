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
      { title: "MODERNO — Furniture That Defines Your Space" },
      {
        name: "description",
        content:
          "Discover thoughtfully designed furniture and curated collections created to bring comfort, character and timeless style to every room.",
      },
      { property: "og:title", content: "MODERNO — Furniture That Defines Your Space" },
      {
        property: "og:description",
        content: "Premium modern furniture and home decor, designed for modern living.",
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

      <section aria-label="Shop by category" className="shell py-20 md:py-28">
        <SectionHeading
          eyebrow="Shop by category"
          title="Shop By Category"
          description="Explore furniture curated for every part of your home."
          linkTo="/categories"
          linkLabel="View all categories"
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

      <section aria-label="New arrivals" className="shell py-20 md:py-28">
        <SectionHeading
          eyebrow="Just landed"
          title="New Arrivals"
          description="Fresh pieces for modern interiors."
          linkTo="/new-arrivals"
          linkLabel="See everything new"
        />
        <ProductGrid products={newArrivals} columns={5} />
      </section>

      <section aria-label="Best sellers" className="border-y border-border bg-linen/60">
        <div className="shell py-20 md:py-28">
          <SectionHeading
            eyebrow="Loved most"
            title="Best Sellers"
            description="The pieces our customers keep coming back for, and recommending on."
            linkTo="/best-sellers"
            linkLabel="View all best sellers"
          />
          <ProductCarousel products={bestSellers} ariaLabel="Best selling furniture and decor" />
        </div>
      </section>

      <BrandStory />

      <ShopTheRoom />

      <Testimonials />

      <section aria-labelledby="newsletter-heading" className="border-t border-border bg-sand/50">
        <div className="shell grid gap-8 py-20 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2 id="newsletter-heading" className="display-lg mt-4 text-balance">
              Bring better design home.
            </h2>
          </div>
          <div className="lg:pl-6">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Get early access to new collections, private offers and interior inspiration.
            </p>
            <Newsletter className="mt-7" />
            <p className="mt-5 text-xs text-muted-foreground">
              Prefer to browse first?{" "}
              <Link to="/shop" className="link-underline text-foreground">
                Shop the full collection
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
