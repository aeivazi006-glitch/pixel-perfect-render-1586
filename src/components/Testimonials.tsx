import { BadgeCheck } from "lucide-react";
import { testimonials } from "@/data/catalog";
import { Stars } from "@/components/Stars";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-heading" className="shell py-20 md:py-28">
      <SectionHeading
        align="center"
        eyebrow="Customer reviews"
        title="Loved By Modern Homes"
        description="Over 2,400 rooms furnished since 2019. Here is what a few of them say."
        className="pb-12 md:pb-16"
      />

      <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
        {testimonials.map((testimonial, index) => (
          <Reveal as="li" key={testimonial.id} delay={index * 90}>
            <figure className="flex h-full flex-col rounded-lg border border-border/80 bg-card p-7 shadow-soft">
              <Stars rating={testimonial.rating} />
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-balance">
                “{testimonial.body}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-[0.62rem] tracking-[0.06em] text-secondary-foreground">
                  {testimonial.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm">{testimonial.author}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
                    {testimonial.verified && (
                      <BadgeCheck className="size-3.5 text-clay" strokeWidth={1.6} aria-hidden />
                    )}
                    {testimonial.verified ? "Verified purchase" : testimonial.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
