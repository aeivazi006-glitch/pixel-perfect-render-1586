import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={cn(
            "size-3.5",
            index <= Math.round(rating) ? "fill-clay text-clay" : "text-border",
          )}
          strokeWidth={1.4}
        />
      ))}
    </span>
  );
}
