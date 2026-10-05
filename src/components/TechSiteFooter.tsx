import { useState } from "react";
import {
  BadgeCheck,
  Facebook,
  Instagram,
  Mail,
  Music2,
  Package,
  Star,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";

import { footerColumns, legalLinks } from "@/data/techverse";

const trust = [
  { icon: BadgeCheck, label: "100% Authentic" },
  { icon: Package, label: "Trusted by Thousands" },
  { icon: Star, label: "Top Rated Store" },
  { icon: Zap, label: "Price Match Guarantee" },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "YouTube" },
  { icon: Music2, label: "TikTok" },
  { icon: Twitter, label: "X" },
];

export function TechSiteFooter() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-ink text-background/70">
      <div className="shell border-b border-background/10 py-9">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-background/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-background">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shell grid gap-10 py-14 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.35fr] lg:gap-8">
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-[0.78rem] font-bold tracking-[0.14em] text-background uppercase">
              {column.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="rounded-[24px] bg-background/5 p-6">
          <h3 className="text-[0.78rem] font-bold tracking-[0.14em] text-background uppercase">
            Newsletter
          </h3>
          <p className="mt-4 text-sm leading-relaxed">Stay ahead of the tech curve.</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <span className="relative flex flex-1 items-center">
              <Mail className="pointer-events-none absolute left-4 h-4 w-4 text-background/40" />
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Email address"
                className="h-11 w-full rounded-full border border-background/15 bg-background/5 pr-4 pl-11 text-sm text-background transition-all duration-300 outline-none placeholder:text-background/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/15"
              />
            </span>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-3 text-xs text-background/50">
            {sent ? "Subscribed — thanks for joining." : "Product drops, no noise."}
          </p>

          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-background/10 text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
            <span className="text-xs font-semibold tracking-[0.14em] text-background/50 uppercase">
              Follow us
            </span>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-background/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 TechVerse. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors duration-300 hover:text-primary">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
