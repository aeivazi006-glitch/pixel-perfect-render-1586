import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { Newsletter } from "@/components/Newsletter";
import { Reveal } from "@/components/Reveal";
import {
  bestSellers,
  categories,
  galleryImages,
  images,
  moods,
  newArrivals,
} from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Étage — Art, Objects & Accessories for Modern Spaces" },
      {
        name: "description",
        content:
          "Curated wall art, framed posters, ceramics and minimal accessories. Make your space your own with limited-run pieces from independent studios.",
      },
      { property: "og:title", content: "Maison Étage — Make Your Space Your Own" },
      {
        property: "og:description",
        content: "Curated accessories, art and decor for spaces with personality.",
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

      <section className="shell py-20 md:py-28">
        <SectionHeading
          eyebrow="Shop by category"
          title="Five ways to change a room"
          description="From a single framed print to the small objects that finish a shelf."
          linkTo="/shop"
          linkLabel="Shop all"
        />
        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-3 lg:col-span-2">
            <CategoryCard {...categories[1]} tall />
          </Reveal>
          <Reveal className="md:col-span-3 lg:col-span-2" delay={80}>
            <CategoryCard {...categories[0]} tall />
          </Reveal>
          <Reveal className="md:col-span-6 lg:col-span-2" delay={160}>
            <div className="grid h-full gap-4">
              <CategoryCard {...categories[3]} />
              <CategoryCard {...categories[4]} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-24">
        <SectionHeading
          eyebrow="Loved most"
          title="Best sellers"
          description="The pieces our customers keep coming back for, and gifting on."
          linkTo="/best-sellers"
          linkLabel="View all best sellers"
        />
        <ProductGrid products={bestSellers.slice(0, 4)} />
      </section>

      <Reveal as="section" className="bg-linen">
        <div className="shell grid items-center gap-10 py-20 md:grid-cols-2 md:py-24">
          <div className="max-w-md">
            <p className="eyebrow">The spring edit</p>
            <h2 className="display-lg mt-4">
              Art for the walls.
              <br />
              Details for the life.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Every season we work with a handful of studios on short runs — archival prints,
              hand-thrown ceramics, quiet metalwork. Made slowly, in small numbers, to live with for
              years.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              Explore Collection
            </Link>
          </div>
          <img
            src={images.editorial}
            alt="Hanging a framed landscape print in a sunlit room"
            loading="lazy"
            width={1408}
            height={1008}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </Reveal>

      <section className="shell py-24">
        <SectionHeading
          eyebrow="Just landed"
          title="New arrivals"
          description="Fresh from the studio, usually in runs of fifty or fewer."
          linkTo="/new-arrivals"
          linkLabel="See everything new"
        />
        <ProductGrid products={newArrivals.slice(0, 4)} />
      </section>

      <section className="shell pb-24">
        <SectionHeading eyebrow="Curated" title="Shop by mood" />
        <ul className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {moods.map((mood, index) => (
            <Reveal as="li" key={mood.slug} delay={index * 60} className="w-[62%] shrink-0 md:w-auto">
              <Link to="/shop" className="group block">
                <span className="block aspect-3/4 overflow-hidden bg-linen">
                  <img
                    src={mood.image}
                    alt={mood.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                </span>
                <span className="mt-3 block text-center font-display text-lg">{mood.name}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="shell pb-24">
        <SectionHeading eyebrow="@maisonetage" title="From our rooms and yours" />
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {galleryImages.map((image, index) => (
            <Reveal as="li" key={index} delay={(index % 6) * 50}>
              <a href="https://instagram.com" className="group block overflow-hidden bg-linen">
                <span className="block aspect-square">
                  <img
                    src={image}
                    alt="Lifestyle photograph from the Maison Étage community"
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal as="section" className="border-t border-border bg-sand/60">
        <div className="shell flex flex-col items-center py-20 text-center md:py-24">
          <h2 className="display-lg">Get inspired.</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            New collections, design inspiration and special offers delivered to your inbox.
          </p>
          <Newsletter />
        </div>
      </Reveal>
    </>
  );
}
