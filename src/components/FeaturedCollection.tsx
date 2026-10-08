import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

/** Asymmetrical editorial block: one lead image, two supporting frames, one story. */
export function FeaturedCollection() {
  return (
    <section aria-labelledby="featured-heading" className="shell py-20 md:py-28">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5 lg:self-center lg:pr-8">
          <Reveal>
            <p className="eyebrow">Featured collection</p>
            <h2 id="featured-heading" className="display-lg mt-4 text-balance">
              Designed for Modern Living
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              A collection built around proportion rather than ornament: low seating, generous
              surfaces, warm timber and fabrics that soften with the years. Every piece is drawn to
              work with the ones beside it.
            </p>
            <Link
              to="/shop"
              className="group mt-8 inline-flex items-center gap-2.5 text-[0.68rem] tracking-[0.18em] uppercase"
            >
              Explore Collection
              <ArrowRight
                className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                strokeWidth={1.5}
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-7">
          <div className="h-[clamp(17rem,44vh,30rem)] overflow-hidden rounded-lg bg-linen lg:h-[clamp(24rem,58vh,36rem)]">
            <img
              src={images.editorialMain}
              alt="Neutral living room with a grey sofa, plants and layered natural light"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:col-start-1">
          <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen">
            <img
              src={images.editorialSide}
              alt="Low lounge seating and a timber floor in an open-plan interior"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-5 lg:col-start-8 lg:-mt-20 xl:-mt-24">
          <div className="aspect-3/4 overflow-hidden rounded-lg bg-linen">
            <img
              src={images.editorialDetail}
              alt="Open oak shelving styled with ceramics and books"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
