import { Truck, ShieldCheck, Gem, Headset } from "lucide-react";
import { benefits } from "@/data/catalog";

const icons = { truck: Truck, shield: ShieldCheck, gem: Gem, headset: Headset } as const;

/** Four-column benefit bar. Two columns on mobile, four from the tablet breakpoint. */
export function TrustBar() {
  return (
    <section aria-label="چرا از مدرنو خرید کنیم" className="border-y border-border bg-linen/60">
      <ul className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {benefits.map((benefit) => {
          const Icon = icons[benefit.icon];
          return (
            <li key={benefit.title} className="flex items-start gap-3.5">
              <Icon className="mt-0.5 size-5 shrink-0 text-umber" strokeWidth={1.3} aria-hidden />
              <div>
                <h3 className="font-sans text-[0.9rem] font-semibold">{benefit.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{benefit.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
