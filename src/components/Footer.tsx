import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";

const shopLinks = [
  { label: "Shop all", to: "/shop" },
  { label: "Accessories", to: "/accessories" },
  { label: "Wall Art", to: "/wall-art" },
  { label: "Home Decor", to: "/home-decor" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-sellers" },
] as const;

const serviceLinks = [
  { label: "Contact us", to: "/contact" },
  { label: "Your account", to: "/account" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Cart", to: "/cart" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-linen">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <span className="font-display text-2xl">Maison Étage</span>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A small curated house of art, objects and accessories — made in limited runs with
            independent studios, chosen for rooms with personality.
          </p>
          <div className="mt-6 flex gap-4 text-muted-foreground">
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-foreground">
              <Instagram className="size-[1.1rem]" strokeWidth={1.4} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-foreground">
              <Facebook className="size-[1.1rem]" strokeWidth={1.4} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="size-[1.1rem]" strokeWidth={1.4} />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" className="hover:text-foreground">
              <Youtube className="size-[1.1rem]" strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <nav aria-label="Shop" className="text-sm">
          <h3 className="eyebrow">Shop</h3>
          <ul className="mt-5 space-y-3">
            {shopLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer service" className="text-sm">
          <h3 className="eyebrow">Customer care</h3>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="text-muted-foreground">Delivery in 3–6 working days</li>
            <li className="text-muted-foreground">Free returns within 30 days</li>
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow">Newsletter</h3>
          <Newsletter compact />
          <p className="mt-6 text-sm text-muted-foreground">
            <Link to="/about" className="link-underline">
              Our story
            </Link>
            {" · "}
            <Link to="/contact" className="link-underline">
              Studio visits
            </Link>
          </p>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Maison Étage. All rights reserved.</p>
        <p>Studio 4, 18 Rue des Arts, Lisbon · hello@maisonetage.com</p>
      </div>
    </footer>
  );
}
