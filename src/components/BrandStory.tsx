import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

export function BrandStory() {
  return (
    <section aria-labelledby="story-heading" className="border-y border-border bg-linen/70">
      <div className="shell grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen md:aspect-16/11">
            <img
              src={images.story}
              alt="Calm living room with a fireplace, pale seating and soft afternoon light"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        <Reveal delay={80} className="order-1 max-w-xl lg:order-2">
          <p className="eyebrow">Our story</p>
          <h2 id="story-heading" className="display-lg mt-4 text-balance">
            Furniture with a sense of place.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            We believe great furniture should do more than fill a room. It should create atmosphere,
            support everyday living and become part of the stories made at home.
          </p>
          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2.5 text-[0.68rem] tracking-[0.18em] uppercase"
          >
            Discover Our Story
            <ArrowRight
              className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
