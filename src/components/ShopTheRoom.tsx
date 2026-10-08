import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { formatPrice, getProduct, images, roomHotspots } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { notifyCart } from "@/components/ToastNotification";
import { cn } from "@/lib/utils";

/**
 * Interactive room photograph: hotspots reveal a quick-view card per piece.
 * Hotspot coordinates stay physical (the photograph itself is never mirrored).
 */
export function ShopTheRoom() {
  const [active, setActive] = useState<string | null>(roomHotspots[0]?.id ?? null);
  const { addToCart } = useStore();

  const activeHotspot = roomHotspots.find((hotspot) => hotspot.id === active) ?? null;
  const activeProduct = activeHotspot ? getProduct(activeHotspot.productSlug) : undefined;

  return (
    <section aria-labelledby="room-heading" className="shell py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-12">
        <div className="max-w-xl">
          <p className="eyebrow">از دل فضا خرید کنید</p>
          <h2 id="room-heading" className="display-lg mt-3">
            همه قطعه‌ها، در یک نگاه
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            روی نشانگرها بزنید تا ببینید در این فضا چه چیزی به کار رفته — و هر قطعه را جداگانه به
            خانه ببرید.
          </p>
        </div>
        <p className="text-[0.75rem] text-muted-foreground">
          {roomHotspots.length} قطعه در این فضا
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linen">
        <img
          src={images.room}
          alt="نشیمن مدرن و باز با مبل ماژولار، میز جلومبلی بلوط، چراغ ایستاده و صندلی"
          loading="lazy"
          className="h-[clamp(19rem,52vh,34rem)] w-full object-cover md:h-[clamp(26rem,64vh,40rem)]"
        />

        {roomHotspots.map((hotspot) => {
          const product = getProduct(hotspot.productSlug);
          if (!product) return null;
          const isActive = hotspot.id === active;
          return (
            <button
              key={hotspot.id}
              type="button"
              aria-label={`مشاهده جزئیات ${product.name}`}
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : hotspot.id)}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
            >
              <span className="relative grid size-6 place-items-center">
                {!isActive && (
                  <span
                    aria-hidden
                    className="hotspot-ring absolute inset-0 rounded-full bg-background/70"
                  />
                )}
                <span
                  className={cn(
                    "relative size-3 rounded-full border border-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "scale-150 bg-primary" : "bg-umber/85",
                  )}
                />
              </span>
              <span
                className={cn(
                  "pointer-events-none absolute bottom-full mb-1.5 rounded-full bg-background/92 px-2.5 py-1 text-[0.7rem] font-medium whitespace-nowrap backdrop-blur-sm transition-opacity duration-400",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                {hotspot.label}
              </span>
            </button>
          );
        })}

        {activeProduct && (
          <div className="toast-in absolute inset-x-3 bottom-3 rounded-xl border border-border/60 bg-background/93 p-3.5 backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-auto md:top-1/2 md:w-[19rem] md:-translate-y-1/2 md:p-4">
            <div className="flex items-start gap-3.5">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                loading="lazy"
                className="size-20 shrink-0 rounded-lg object-cover md:size-24"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[0.72rem] text-muted-foreground">{activeProduct.categoryName}</p>
                <h3 className="mt-1 text-sm font-semibold leading-snug">{activeProduct.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {formatPrice(activeProduct.price)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(activeProduct.id, activeProduct.options?.values[0]);
                      notifyCart(activeProduct.name);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-[0.7rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
                  >
                    <Plus className="size-3" strokeWidth={1.8} aria-hidden />
                    افزودن به سبد
                  </button>
                  <Link
                    to="/product/$slug"
                    params={{ slug: activeProduct.slug }}
                    className="group inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-muted-foreground hover:text-foreground"
                  >
                    مشاهده
                    <ArrowLeft
                      className="size-3 transition-transform duration-500 group-hover:-translate-x-1"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
              <button
                type="button"
                aria-label="بستن پیش‌نمایش محصول"
                onClick={() => setActive(null)}
                className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" strokeWidth={1.4} aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
