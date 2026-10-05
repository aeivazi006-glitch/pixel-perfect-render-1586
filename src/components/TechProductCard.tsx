import { useState } from "react";
import { Heart, Star } from "lucide-react";

import { formatNumber, formatPrice, formatRating, type Product } from "@/data/techverse";
import { cn } from "@/lib/utils";

export function TechProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);

  return (
    <article className="group relative flex h-full flex-col rounded-[22px] border border-border bg-background p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift">
      <div className="relative overflow-hidden rounded-[16px] bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {product.tag ? (
          <span className="absolute top-3 start-3 rounded-full bg-primary px-2.5 py-1 text-[0.7rem] font-bold text-primary-foreground">
            {product.tag}
          </span>
        ) : null}

        <button
          type="button"
          aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          aria-pressed={wished}
          onClick={() => setWished((value) => !value)}
          className={cn(
            "absolute top-2.5 end-2.5 grid h-9 w-9 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur transition-all duration-300 hover:scale-105 hover:text-primary lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            wished && "text-primary lg:translate-y-0 lg:opacity-100",
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            className="h-10 w-full rounded-full bg-ink text-[0.78rem] font-bold text-background transition-colors duration-300 hover:bg-primary"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-bold text-ink">{formatRating(product.rating)}</span>
          <span className="text-muted-foreground">({formatNumber(product.reviews)})</span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed font-semibold text-ink">
          {product.name}
        </h3>

        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
          <span className="text-[1.02rem] font-extrabold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
