import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

/** Asymmetrical editorial block: one lead image, two supporting frames, one story. */
export function FeaturedCollection() {
  return (
    <section aria-labelledby="featured-heading" className="shell py-20 md:py-28">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5 lg:self-center lg:pe-8">
          <Reveal>
            <p className="eyebrow">مجموعه منتخب</p>
            <h2 id="featured-heading" className="display-lg mt-4">
              طراحی‌شده برای زندگی مدرن
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              مجموعه‌ای که حول تناسبات ساخته شده، نه تزئینات: نشیمن کوتاه، سطوح راحت، چوب گرم و
              پارچه‌هایی که با گذر سال‌ها لطیف‌تر می‌شوند. هر قطعه طوری طراحی شده که با قطعه کنار
              خود بنشیند.
            </p>
            <Link
              to="/shop"
              className="group mt-8 inline-flex items-center gap-2.5 text-[0.8rem] font-semibold"
            >
              مشاهده مجموعه
              <ArrowLeft
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1.5"
                strokeWidth={1.6}
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-7">
          <div className="h-[clamp(17rem,44vh,30rem)] overflow-hidden rounded-lg bg-linen lg:h-[clamp(24rem,58vh,36rem)]">
            <img
              src={images.editorialMain}
              alt="اتاق نشیمن روشن با مبل خاکستری، گیاهان و نور طبیعی لایه‌لایه"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:col-start-1">
          <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen">
            <img
              src={images.editorialSide}
              alt="نشیمن کوتاه و کف چوبی در فضایی باز و یکپارچه"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-5 lg:col-start-8 lg:-mt-20 xl:-mt-24">
          <div className="aspect-3/4 overflow-hidden rounded-lg bg-linen">
            <img
              src={images.editorialDetail}
              alt="شلف باز بلوط با سفال و کتاب‌ها"
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
