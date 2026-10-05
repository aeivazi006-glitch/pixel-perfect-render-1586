import { ArrowUpRight, Play } from "lucide-react";

import { ideaCards } from "@/data/techverse";
import { Reveal } from "@/components/Reveal";
import { TechSectionHead } from "@/components/TechSectionHead";

export function TechIdeas() {
  return (
    <section id="ideas" className="shell py-14 lg:py-20">
      <TechSectionHead
        eyebrow="Editorial"
        title="Ideas for Your Next Upgrade"
        description="Setups, travel kits and inspiration pulled together by our editors."
        action={{ label: "See more ideas", href: "#deals" }}
      />

      <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-2 no-scrollbar lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0">
        {ideaCards.map((idea, i) => (
          <Reveal
            key={idea.id}
            delay={i * 70}
            className="w-[76%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
          >
            <a
              href="#trending"
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[24px] border border-border bg-ink p-4 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <img
                src={idea.image}
                alt={idea.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

              <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-ink uppercase backdrop-blur">
                <Play className="h-3 w-3 fill-primary text-primary" />
                {idea.count} Ideas
              </span>

              <div className="relative flex items-end justify-between gap-3">
                <h3 className="max-w-[9rem] text-[1.05rem] leading-snug font-bold text-background">
                  {idea.title}
                </h3>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
