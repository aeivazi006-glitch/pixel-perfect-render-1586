import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

export function PromoBanner() {
  return (
    <section aria-labelledby="promo-heading" className="shell py-6 md:py-10">
      <Reveal>
        <div className="grid overflow-hidden rounded-2xl bg-sand/70 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="flex flex-col justify-center px-7 py-12 md:px-12 md:py-16 lg:px-16">
            <p className="eyebrow">مجموعه تابستان</p>
            <h2 id="promo-heading" className="display-lg mt-4">
              تا ۳۰٪ تخفیف
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              قطعه‌های منتخبی برای تازه کردن فضای شما.
            </p>
            <Link
              to="/shop"
              search={{ sale: true }}
              className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity duration-500 hover:opacity-88"
            >
              خرید از حراج
              <ArrowLeft
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
                strokeWidth={1.6}
                aria-hidden
              />
            </Link>
          </div>

          <div className="relative h-[clamp(15rem,38vh,26rem)] md:h-auto md:min-h-[24rem]">
            <img
              src={images.promo}
              alt="فضای بیژ گرم با صندلی مدرن، میز کنار و گلدان گیاه"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
