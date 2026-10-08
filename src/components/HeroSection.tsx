import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatPrice, getProduct, images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

export function HeroSection() {
  const [offset, setOffset] = useState(0);
  const frame = useRef<HTMLDivElement | null>(null);
  const featured = getProduct("luna-3-seater-sofa");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setOffset(Math.min(window.scrollY * 0.055, 40));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div className="shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 lg:py-20">
        <div className="max-w-xl lg:border-l lg:border-border lg:pl-8">
          <Reveal>
            <p className="eyebrow">Modern designs. Timeless comfort.</p>
          </Reveal>

          <Reveal delay={90}>
            <h1 id="hero-heading" className="display-xl mt-5 text-balance">
              Furniture That Defines Your Space
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
              Discover thoughtfully designed furniture and curated collections created to bring
              comfort, character and timeless style to every room.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity duration-500 hover:opacity-88"
              >
                Shop Collection
                <ArrowRight
                  className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </Link>
              <Link
                to="/new-arrivals"
                className="fill-sweep inline-flex items-center rounded-full border border-foreground/25 px-7 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-foreground transition-colors duration-500 hover:border-foreground hover:text-background"
              >
                Explore New Arrivals
              </Link>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-7">
              {[
                { label: "Made to order", value: "12 weeks" },
                { label: "Structural cover", value: "10 years" },
                { label: "Shipped from", value: "Lisbon" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="group relative">
          <div
            ref={frame}
            className="relative h-[clamp(19rem,48vh,32rem)] overflow-hidden rounded-2xl bg-linen lg:h-[clamp(28rem,72vh,44rem)]"
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.06)` }}
            >
              <img
                src={images.hero}
                alt="Sunlit modern living room with a pale modular sofa, oak panelling and a ceramic vase"
                width={1600}
                height={1067}
                fetchPriority="high"
                className="size-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>

            <span className="absolute top-4 right-4 rounded-full border border-background/25 bg-background/25 px-3.5 py-1.5 text-[0.58rem] tracking-[0.18em] text-background uppercase backdrop-blur-md md:top-6 md:right-6">
              Autumn 26 collection
            </span>

            {featured && (
              <Link
                to="/product/$slug"
                params={{ slug: featured.slug }}
                className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-background/20 bg-background/88 p-2.5 pr-4 shadow-soft backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 md:bottom-6 md:left-6"
              >
                <img
                  src={featured.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="size-12 rounded-lg object-cover"
                />
                <span className="min-w-[8.5rem]">
                  <span className="block text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground">
                    In this room
                  </span>
                  <span className="mt-0.5 block text-sm leading-tight">{featured.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {formatPrice(featured.price)}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
