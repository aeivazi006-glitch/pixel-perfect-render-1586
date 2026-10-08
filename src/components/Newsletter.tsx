import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  };

  return (
    <form onSubmit={submit} className={cn("w-full max-w-lg", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <div className="flex items-center gap-2 rounded-full border border-input bg-background/70 pr-1.5 pl-5 transition-colors focus-within:border-foreground">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.64rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
        >
          Subscribe
          <ArrowRight
            className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      </div>
      <p
        aria-live="polite"
        className={cn(
          "mt-3 text-xs text-muted-foreground transition-opacity duration-500",
          done ? "opacity-100" : "opacity-0",
        )}
      >
        Thank you — look for our next edit in your inbox.
      </p>
    </form>
  );
}
