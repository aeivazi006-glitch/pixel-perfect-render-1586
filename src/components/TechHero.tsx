import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Truck } from "lucide-react";

import { heroSlides, regions } from "@/data/techverse";
import { cn } from "@/lib/utils";

const flags: Record<string, string> = { US: "🇺🇸", UK: "🇬🇧", UAE: "🇦🇪" };

export function TechHero() {
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  useEffect(() => {
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % heroSlides.length),
      7000,
    );
    return () => window.clearTimeout(timer);
  }, [index]);

  const go = (step: number) =>
    setIndex((current) => (current + step + heroSlides.length) % heroSlides.length);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-primary/12 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-brand-soft/30 to-surface" />

      <div className="shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:py-16 xl:py-20">
        <div key={slide.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-primary uppercase shadow-soft backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {slide.eyebrow}
          </span>

          <h1 className="display-xl mt-6 text-ink">
            {slide.title}
            <br />
            <span className="text-primary">{slide.titleAccent}</span>
            {slide.titleRest}
          </h1>

          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-body">
            {slide.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#trending"
              className="group inline-flex h-13 items-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#categories"
              className="inline-flex h-13 items-center rounded-full border border-border bg-background px-7 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
            >
              Browse Collection
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((dot) => (
                <Star key={dot} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </span>
            <span className="font-semibold text-ink">4.9</span>
            <span className="text-muted-foreground">{slide.stats}</span>
          </div>

          <div className="mt-9 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
            <div className="flex items-center gap-2 pl-2">
              {heroSlides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === index ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/5.1] w-full max-w-[34rem]">
          <div className="absolute inset-x-3 top-5 bottom-5 rounded-[42px] bg-[linear-gradient(140deg,var(--color-primary)_0%,oklch(0.62_0.2_28)_52%,oklch(0.93_0.06_22)_100%)] shadow-brand" />
          <div className="absolute -top-2 -right-6 h-40 w-40 rounded-full bg-background/40 blur-3xl" />
          <div className="absolute bottom-6 -left-8 h-32 w-32 rounded-full bg-background/60 blur-2xl" />

          {slide.gallery.map((item, i) => (
            <div
              key={`${slide.id}-${i}`}
              className={cn(
                "absolute rounded-[26px] border border-background/70 bg-background p-1.5 shadow-lift",
                item.className,
                item.frame,
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full rounded-[20px] object-cover"
              />
            </div>
          ))}

          <div className="absolute -top-1 right-2 grid h-24 w-24 place-items-center rounded-full border border-border bg-background shadow-lift">
            <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1.2"
                strokeDasharray="3 7"
                opacity="0.55"
              />
            </svg>
            <span className="px-3 text-center text-[0.62rem] leading-tight font-bold tracking-[0.14em] text-primary uppercase">
              {slide.badge}
            </span>
          </div>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-xs font-semibold text-ink shadow-soft backdrop-blur">
            <Truck className="h-4 w-4 text-primary" />
            Free express shipping over $99
          </div>
        </div>
      </div>

      <div className="shell relative pb-10 lg:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[24px] border border-border bg-background/85 px-5 py-4 shadow-soft backdrop-blur">
          <div className="flex items-center gap-2.5">
            {regions.map((code) => (
              <span
                key={code}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink"
              >
                <span aria-hidden="true">{flags[code]}</span>
                {code}
              </span>
            ))}
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              Delivering to 40+ countries
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-ink">
            <Truck className="h-5 w-5 text-primary" />
            Fast Shipping
          </span>
        </div>
      </div>
    </section>
  );
}
