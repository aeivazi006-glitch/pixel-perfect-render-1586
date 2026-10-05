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

import { brandTagline, footerColumns, legalLinks, socials, trustBadges } from "@/data/techverse";

const trustIcons = {
  authentic: BadgeCheck,
  trusted: Package,
  rated: Star,
  price: Zap,
} as const;

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: Music2,
  x: Twitter,
} as const;

export function TechSiteFooter() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-ink text-background/70">
      <div className="shell border-b border-background/10 py-9">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge) => {
            const Icon = trustIcons[badge.id as keyof typeof trustIcons] ?? BadgeCheck;
            return (
              <div key={badge.id} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-background/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-background">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shell grid gap-10 py-14 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.35fr] lg:gap-8">
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-[0.85rem] font-bold text-background">{column.title}</h3>
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
          <h3 className="text-[0.85rem] font-bold text-background">خبرنامه</h3>
          <p className="mt-4 text-sm leading-loose">از جدیدترین محصولات باخبر شوید.</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <span className="relative flex flex-1 items-center">
              <Mail className="pointer-events-none absolute start-4 h-4 w-4 text-background/40" />
              <input
                type="email"
                required
                aria-label="ایمیل شما"
                placeholder="ایمیل خود را وارد کنید"
                className="h-11 w-full rounded-full border border-background/15 bg-background/5 pe-4 ps-11 text-sm text-background transition-all duration-300 outline-none placeholder:text-background/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/15"
              />
            </span>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              عضویت
            </button>
          </form>

          <p className="mt-3 text-xs text-background/50">
            {sent ? "عضویت شما ثبت شد. ممنون که همراه ما هستید." : brandTagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.id as keyof typeof socialIcons] ?? Instagram;
                return (
                  <a
                    key={social.id}
                    href="#top"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-background/10 text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-background/50">ما را دنبال کنید</span>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-background/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© ۲۰۲۶ TechVerse — {brandTagline}</p>
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
