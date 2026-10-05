import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";

import { benefits } from "@/data/techverse";

const icons = {
  shipping: Truck,
  payments: ShieldCheck,
  returns: RotateCcw,
  support: Headset,
} as const;

export function TechBenefits() {
  return (
    <section id="benefits" className="shell pb-14 lg:pb-20">
      <div className="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = icons[benefit.id as keyof typeof icons] ?? Truck;
          return (
            <div
              key={benefit.id}
              className="group flex items-center gap-4 bg-background px-6 py-7 transition-colors duration-500 hover:bg-surface"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-primary transition-transform duration-500 group-hover:-translate-y-1">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-[0.95rem] font-bold text-ink">{benefit.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{benefit.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
