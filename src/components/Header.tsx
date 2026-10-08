import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "About Us", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
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
        <div className="shell flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="-ml-2 grid size-11 place-items-center text-foreground transition-opacity hover:opacity-60"
            >
              <Menu className="size-5" strokeWidth={1.4} />
            </button>
          </div>

          <Link
            to="/"
            aria-label="MODERNO — home"
            className="shrink-0 text-center lg:flex-1 lg:text-left"
          >
            <span
              className={cn(
                "block font-sans leading-none font-medium tracking-[0.34em] uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled ? "text-[0.95rem]" : "text-[1.05rem]",
              )}
            >
              Moderno
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="link-underline text-[0.72rem] tracking-[0.16em] uppercase transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1.5">
            <button
              type="button"
              aria-label="Search products"
              onClick={openSearch}
              className="grid size-11 place-items-center transition-opacity hover:opacity-60"
            >
              <Search className="size-[1.15rem]" strokeWidth={1.4} />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden size-11 place-items-center transition-opacity hover:opacity-60 sm:grid"
            >
              <User className="size-[1.15rem]" strokeWidth={1.4} />
            </Link>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} saved`}
              className="hidden size-11 place-items-center transition-opacity hover:opacity-60 sm:grid"
            >
              <span className="relative grid place-items-center">
                <Heart className="size-[1.15rem]" strokeWidth={1.4} />
                {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
              </span>
            </Link>
            <button
              type="button"
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              onClick={openCart}
              className="grid size-11 place-items-center transition-opacity hover:opacity-60"
            >
              <span className="relative grid place-items-center">
                <ShoppingBag className="size-[1.15rem]" strokeWidth={1.4} />
                {cartCount > 0 && <Badge bump={bump}>{cartCount}</Badge>}
              </span>
            </button>
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="shell flex items-center justify-between py-5">
            <span className="font-sans text-[1rem] font-medium tracking-[0.34em] uppercase">
              Moderno
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="grid size-11 place-items-center"
            >
              <X className="size-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto pb-10">
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className="block border-b border-border/60 py-4 font-display text-3xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 text-[0.72rem] tracking-[0.16em] uppercase">
              <Link to="/wishlist" onClick={closeMenu} className="text-muted-foreground">
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/account" onClick={closeMenu} className="text-muted-foreground">
                Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openCart();
                }}
                className="text-left text-muted-foreground"
              >
                Cart ({cartCount})
              </button>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate({ to: "/shop" });
                }}
                className="text-left text-muted-foreground"
              >
                Shop all
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Badge({ children, bump }: { children: React.ReactNode; bump?: boolean }) {
  return (
    <span
      className={cn(
        "absolute -top-1.5 -right-2 grid min-w-4 place-items-center rounded-full bg-clay px-1 text-[0.6rem] leading-4 font-medium text-clay-foreground",
        bump && "count-bump",
      )}
    >
      {children}
    </span>
  );
}
