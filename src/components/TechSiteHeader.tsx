import { useEffect, useState } from "react";
import {
  ChevronDown,
  Globe,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

import { brandTagline, categoryNav, regions, topNav } from "@/data/techverse";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("flex shrink-0 items-center gap-2", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-brand">
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <path d="M16 3.5 29 27.5H3z" fill="currentColor" />
          <path d="M16 13.5 22.5 25h-13z" fill="var(--color-primary)" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.3rem] font-extrabold text-ink">
          Tech<span className="text-primary">Verse</span>
        </span>
        <span className="mt-0.5 text-[0.65rem] font-medium text-muted-foreground">
          {brandTagline}
        </span>
      </span>
    </a>
  );
}

function IconButton({
  label,
  children,
  badge,
  className,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors duration-300 hover:bg-brand-soft hover:text-primary",
        className,
      )}
    >
      {children}
      {badge ? (
        <span className="absolute -top-0.5 -end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.7rem] font-bold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export function TechSiteHeader() {
  const [active, setActive] = useState("خانه");
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState("US");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const searchBar = (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="group relative flex w-full items-center"
    >
      <Search className="pointer-events-none absolute start-4 h-4.5 w-4.5 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
        type="search"
        aria-label="جستجو در محصولات"
        placeholder="جستجو بین محصولات و لوازم دیجیتال..."
        className="h-11 w-full rounded-full border border-border bg-surface pe-4 ps-11 text-sm text-ink transition-all duration-300 outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/10"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="shell">
        <div className="flex h-16 items-center gap-4 md:h-18 lg:gap-8">
          <Logo />

          <div className="hidden min-w-0 flex-1 lg:block">{searchBar}</div>

          <nav className="hidden items-center gap-7 xl:flex">
            {topNav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={cn(
                  "relative py-1 text-sm font-semibold transition-colors duration-300",
                  active === link.label ? "text-primary" : "text-body hover:text-primary",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 start-0 h-0.5 rounded-full bg-primary transition-all duration-300",
                    active === link.label ? "w-full" : "w-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1 lg:ms-0">
            <button
              type="button"
              aria-label="جستجو"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((value) => !value)}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 lg:hidden",
                searchOpen
                  ? "bg-brand-soft text-primary"
                  : "text-ink hover:bg-brand-soft hover:text-primary",
              )}
            >
              <Search className="h-5 w-5" />
            </button>
            <IconButton label="حساب کاربری" className="hidden sm:grid">
              <User className="h-5 w-5" />
            </IconButton>
            <IconButton label="علاقه‌مندی‌ها" className="hidden sm:grid">
              <Heart className="h-5 w-5" />
            </IconButton>
            <IconButton label="سبد خرید" badge="۳">
              <ShoppingCart className="h-5 w-5" />
            </IconButton>
            <button
              type="button"
              aria-label="باز کردن منو"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-brand-soft hover:text-primary xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {searchOpen ? <div className="shell pb-3 lg:hidden">{searchBar}</div> : null}

      {/* Second level: categories + region */}
      <div className="hidden border-t border-border bg-background md:block">
        <div className="shell flex h-13 items-center justify-between gap-6">
          <nav className="flex items-center gap-1">
            {categoryNav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-body transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-soft hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-border p-0.5">
              {regions.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setRegion(item.code)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300",
                    region === item.code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <IconButton label="زبان">
              <Globe className="h-4.5 w-4.5" />
            </IconButton>
            <IconButton label="علاقه‌مندی‌ها">
              <Heart className="h-4.5 w-4.5" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile menu — slides in from the inline-end edge (left in RTL) */}
      <div
        className={cn(
          "fixed inset-0 z-50 overflow-hidden xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
          className="absolute inset-y-0 end-0 flex h-full w-[86%] max-w-sm flex-col bg-background shadow-lift transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Logo />
            <button
              type="button"
              aria-label="بستن منو"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-brand-soft hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="lg:hidden">{searchBar}</div>

            <p className="eyebrow mt-7 mb-3">دسته‌بندی‌ها</p>
            <nav className="grid gap-1">
              {categoryNav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-soft hover:text-primary"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </a>
              ))}
            </nav>

            <p className="eyebrow mt-7 mb-3">منوی اصلی</p>
            <nav className="grid gap-3">
              {topNav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-body transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="eyebrow mt-7 mb-3">منطقه</p>
            <div className="flex flex-wrap items-center gap-2">
              {regions.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setRegion(item.code)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                    region === item.code
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground",
                  )}
                >
                  <span aria-hidden="true" className="me-1">
                    {item.flag}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-border px-5 py-4">
            {[
              { icon: User, label: "حساب کاربری" },
              { icon: Heart, label: "علاقه‌مندی" },
              { icon: ShoppingCart, label: "سبد خرید" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-surface py-3 text-[0.72rem] font-semibold text-body transition-colors hover:bg-brand-soft hover:text-primary"
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
