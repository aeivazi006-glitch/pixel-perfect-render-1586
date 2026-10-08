import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { label: "خانه", to: "/" },
  { label: "فروشگاه", to: "/shop" },
  { label: "دسته‌بندی‌ها", to: "/categories" },
  { label: "درباره ما", to: "/about" },
  { label: "مجله", to: "/journal" },
  { label: "تماس با ما", to: "/contact" },
] as const;

export function Header() {
  const { cartCount, wishlist, openCart, openSearch } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const previousCount = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (cartCount > previousCount.current) {
      setBump(true);
      const timer = window.setTimeout(() => setBump(false), 500);
      previousCount.current = cartCount;
      return () => window.clearTimeout(timer);
    }
    previousCount.current = cartCount;
    return undefined;
  }, [cartCount]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-border/70 bg-background/90 py-2 shadow-soft"
            : "border-transparent bg-background/70 py-4 md:py-5",
        )}
      >
        <div className="shell flex items-center gap-4">
          {/* Brand sits at the inline start — the right edge in RTL. */}
          <Link to="/" aria-label="مدرنو — صفحه اصلی" className="shrink-0 lg:flex-1">
            <span
              className={cn(
                "block font-sans leading-none font-semibold tracking-[0.34em] uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled ? "text-[0.95rem]" : "text-[1.05rem]",
              )}
            >
              Moderno
            </span>
          </Link>

          {/* Navigation flows from the brand leftwards. */}
          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="link-underline text-[0.85rem] font-medium transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Utility cluster on the opposite edge. */}
          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1.5 lg:flex-none">
            <button
              type="button"
              aria-label="جستجو در محصولات"
              onClick={openSearch}
              className="grid size-11 place-items-center transition-opacity hover:opacity-60"
            >
              <Search className="size-[1.15rem]" strokeWidth={1.4} />
            </button>
            <Link
              to="/account"
              aria-label="حساب کاربری"
              className="hidden size-11 place-items-center transition-opacity hover:opacity-60 sm:grid"
            >
              <User className="size-[1.15rem]" strokeWidth={1.4} />
            </Link>
            <Link
              to="/wishlist"
              aria-label={`علاقه‌مندی‌ها، ${wishlist.length} مورد ذخیره شده`}
              className="hidden size-11 place-items-center transition-opacity hover:opacity-60 sm:grid"
            >
              <span className="relative grid place-items-center">
                <Heart className="size-[1.15rem]" strokeWidth={1.4} />
                {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
              </span>
            </Link>
            <button
              type="button"
              aria-label={`باز کردن سبد خرید، ${cartCount} کالا`}
              onClick={openCart}
              className="grid size-11 place-items-center transition-opacity hover:opacity-60"
            >
              <span className="relative grid place-items-center">
                <ShoppingBag className="size-[1.15rem]" strokeWidth={1.4} />
                {cartCount > 0 && <Badge bump={bump}>{cartCount}</Badge>}
              </span>
            </button>

            <button
              type="button"
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="-me-2 grid size-11 place-items-center text-foreground transition-opacity hover:opacity-60 lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {cartCount} کالا در سبد خرید شما
        </p>
      </div>

      {/* Mobile menu — slides in from the right edge. */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی"
        >
          <button
            type="button"
            aria-label="بستن منو"
            onClick={closeMenu}
            className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-[3px]"
          />
          <div className="drawer-in absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-e border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-sans text-[1rem] font-semibold tracking-[0.34em] uppercase">
                Moderno
              </span>
              <button
                type="button"
                aria-label="بستن منو"
                onClick={closeMenu}
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary"
              >
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>

            <nav aria-label="منوی موبایل" className="flex-1 overflow-y-auto px-6 pb-10">
              <ul>
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className="block border-b border-border/60 py-4 font-display text-2xl font-semibold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-start gap-4 text-[0.85rem]">
                <Link to="/wishlist" onClick={closeMenu} className="text-muted-foreground">
                  علاقه‌مندی‌ها ({wishlist.length})
                </Link>
                <Link to="/account" onClick={closeMenu} className="text-muted-foreground">
                  حساب کاربری
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    openCart();
                  }}
                  className="text-muted-foreground"
                >
                  سبد خرید ({cartCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate({ to: "/shop" });
                  }}
                  className="text-muted-foreground"
                >
                  همه محصولات
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ children, bump }: { children: React.ReactNode; bump?: boolean }) {
  return (
    <span
      className={cn(
        "absolute -top-1.5 -end-2 grid min-w-4 place-items-center rounded-full bg-clay px-1 text-[0.72rem] leading-4 font-medium text-clay-foreground",
        bump && "count-bump",
      )}
    >
      {children}
    </span>
  );
}
