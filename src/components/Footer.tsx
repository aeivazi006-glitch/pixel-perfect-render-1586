import { Link } from "@tanstack/react-router";

const aboutLinks = [
  { label: "Our Story", to: "/about" as const },
  { label: "Journal", to: "/journal" as const },
  { label: "Design Philosophy", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

const careLinks = ["Shipping", "Returns", "FAQ", "Support", "Track Order"];
const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

const linkClass = "text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-linen md:mt-28">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
        <div className="max-w-xs">
          <span className="block font-sans text-[1.05rem] font-medium tracking-[0.34em] uppercase">
            Moderno
          </span>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Premium modern furniture and home decor, designed in-house and made to order for rooms
            that are lived in rather than styled.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            18 Rue des Arts, Lisbon
            <br />
            hello@moderno.com
          </p>
        </div>

        <nav aria-label="Shop" className="text-sm">
          <h2 className="eyebrow">Shop</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/new-arrivals" className={linkClass}>
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/best-sellers" className={linkClass}>
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "living-room" }} className={linkClass}>
                Living Room
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "bedroom" }} className={linkClass}>
                Bedroom
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "dining-room" }} className={linkClass}>
                Dining
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "home-office" }} className={linkClass}>
                Office
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ sale: true }} className={linkClass}>
                Sale
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="About" className="text-sm">
          <h2 className="eyebrow">About</h2>
          <ul className="mt-5 space-y-3">
            {aboutLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid content-start gap-10">
          <nav aria-label="Customer care" className="text-sm">
            <h2 className="eyebrow">Customer Care</h2>
            <ul className="mt-5 space-y-3">
              {careLinks.map((label) => (
                <li key={label}>
                  <Link to="/contact" className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <h2 className="eyebrow">Social</h2>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-6 border-t border-border py-7 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs text-muted-foreground">© 2026 MODERNO. All rights reserved.</p>

        <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
          {paymentMethods.map((method) => (
            <li
              key={method}
              className="rounded-md border border-border bg-background/70 px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase text-muted-foreground"
            >
              {method}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
          <li>
            <Link to="/contact" className="link-underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-underline">
              Cookie Preferences
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-underline">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
