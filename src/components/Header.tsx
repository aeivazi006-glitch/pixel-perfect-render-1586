import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Accessories", to: "/accessories" },
  { label: "Wall Art", to: "/wall-art" },
  { label: "Home Decor", to: "/home-decor" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "About", to: "/about" },
] as const;

export function Header() {
  const { cartCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="sticky top-0 z-50">
      <p className="bg-primary px-4 py-2 text-center text-[0.7rem] tracking-[0.18em] uppercase text-primary-foreground">
        Complimentary carbon-neutral shipping over $120
      </p>
      <div
        className={cn(
          "border-b border-border/70 bg-background/85 backdrop-blur-md transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="shell flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="-ml-2 p-2 text-foreground transition-opacity hover:opacity-60"
            >
              <Menu className="size-5" strokeWidth={1.4} />
            </button>
          </div>

          <Link to="/" className="shrink-0 text-center lg:flex-1 lg:text-left">
            <span className="font-display text-xl leading-none tracking-tight sm:text-2xl">
              Maison Étage
            </span>
            <span className="mt-0.5 hidden text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground sm:block">
              Art &amp; Objects
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="link-underline text-[0.78rem] tracking-[0.12em] uppercase transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen((open) => !open)}
              className="p-2 transition-opacity hover:opacity-60"
            >
              <Search className="size-[1.15rem]" strokeWidth={1.4} />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden p-2 transition-opacity hover:opacity-60 sm:block"
            >
              <User className="size-[1.15rem]" strokeWidth={1.4} />
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden p-2 transition-opacity hover:opacity-60 sm:block"
            >
              <Heart className="size-[1.15rem]" strokeWidth={1.4} />
              {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2 transition-opacity hover:opacity-60">
              <ShoppingBag className="size-[1.15rem]" strokeWidth={1.4} />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="shell pt-4">
            <form onSubmit={submitSearch} className="flex items-center gap-3 border-b border-input pb-3">
              <Search className="size-4 text-muted-foreground" strokeWidth={1.4} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search prints, ceramics, accessories…"
                aria-label="Search"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="eyebrow hover:text-foreground">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="shell flex items-center justify-between py-5">
            <span className="font-display text-xl">Maison Étage</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="p-2"
            >
              <X className="size-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="shell flex flex-col gap-1 pt-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-4 font-display text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3 text-sm tracking-[0.12em] uppercase">
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/account" onClick={() => setMenuOpen(false)}>
                Account
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart ({cartCount})
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-0.5 right-0 flex size-4 items-center justify-center rounded-full bg-clay text-[0.6rem] font-medium text-clay-foreground">
      {children}
    </span>
  );
}
