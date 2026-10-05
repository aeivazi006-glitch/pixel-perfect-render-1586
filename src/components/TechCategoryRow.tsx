import { ArrowLeft } from "lucide-react";

import { categories } from "@/data/techverse";
import { Reveal } from "@/components/Reveal";
import { TechSectionHead } from "@/components/TechSectionHead";

export function TechCategoryRow() {
  return (
    <section id="categories" className="shell py-14 lg:py-20">
      <TechSectionHead
        eyebrow="خرید بر اساس دسته‌بندی"
        title="برای هر سلیقه، یک ارتقای تازه"
        description="پنج دسته‌ی منتخب؛ از صدای حرفه‌ای تا لوازم جانبی‌ای که تکمیل‌کننده‌ی میز کار شماست."
        action={{ label: "مشاهده همه دسته‌بندی‌ها", href: "#trending" }}
      />

      <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-2 no-scrollbar lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0">
        {categories.map((category, i) => (
          <Reveal
            key={category.id}
            delay={i * 70}
            className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-auto"
          >
            <a
              href={category.href}
              className="group flex h-full flex-col rounded-[24px] border border-border bg-surface p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/15 hover:bg-background hover:shadow-lift"
            >
              <div className="aspect-square overflow-hidden rounded-[18px] bg-background">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
              </div>
              <div className="flex flex-1 items-end justify-between gap-3 px-1 pt-4 pb-1">
                <div>
                  <h3 className="text-base font-bold text-ink">{category.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{category.subtitle}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45">
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
