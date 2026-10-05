import { useState } from "react";
import { ArrowRight, Gift, Mail, Sparkles } from "lucide-react";

export function TechPromo() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="deals" className="shell pb-14 lg:pb-20">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,var(--color-primary)_0%,oklch(0.42_0.19_26)_100%)] p-8 text-primary-foreground lg:p-10">
          <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-background/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-background/10 blur-3xl" />

          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-background/15 backdrop-blur">
              <Gift className="h-7 w-7" />
            </span>

            <h2 className="display-lg mt-7 text-primary-foreground">
              Exclusive Deals
              <br />
              For You!
            </h2>
            <p className="mt-4 max-w-sm text-[0.975rem] leading-relaxed text-primary-foreground/80">
              Save more on top-rated gadgets handpicked just for you — new markdowns added every
              Friday.
            </p>

            <a
              href="#trending"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Shop Deals
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div
          id="newsletter"
          className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-8 lg:p-10"
        >
          <span className="absolute top-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-background text-primary shadow-soft">
            <Mail className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary" />
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-primary uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Newsletter
          </span>

          <h2 className="display-lg mt-6 max-w-sm">Get the Latest Tech &amp; Deals</h2>
          <p className="mt-4 max-w-sm text-[0.975rem] leading-relaxed text-muted-foreground">
            Join our newsletter and never miss an update — drops, reviews and private sales.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm text-ink transition-all duration-300 outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-3 text-xs text-muted-foreground">
            {sent ? "You're on the list — welcome to TechVerse." : "No spam. Unsubscribe anytime."}
          </p>
        </div>
      </div>
    </section>
  );
}
