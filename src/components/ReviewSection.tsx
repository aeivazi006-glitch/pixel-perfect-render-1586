import type { Review } from "@/data/catalog";
import { Stars } from "@/components/Stars";

export function ReviewSection({
  reviews,
  rating,
  count,
}: {
  reviews: Review[];
  rating: number;
  count: number;
}) {
  return (
    <section aria-labelledby="reviews-heading" className="border-t border-border pt-14">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-10">
        <div>
          <h2 id="reviews-heading" className="display-md">
            Customer reviews
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={rating} />
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} · {count} reviews
            </span>
          </div>
        </div>
        <button
          type="button"
          className="border border-input px-6 py-3 text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:border-foreground"
        >
          Write a review
        </button>
      </div>

      <ul className="grid gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id} className="border-t border-border pt-5">
            <Stars rating={review.rating} />
            <h3 className="mt-3 text-base">{review.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
            <p className="mt-4 text-xs tracking-[0.12em] uppercase text-muted-foreground">
              {review.author} · {review.date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
