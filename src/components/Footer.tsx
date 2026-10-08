import { Link } from "@tanstack/react-router";

const aboutLinks = [
  { label: "داستان ما", to: "/about" as const },
  { label: "مجله", to: "/journal" as const },
  { label: "فلسفه طراحی", to: "/about" as const },
  { label: "تماس با ما", to: "/contact" as const },
];

const careLinks = ["ارسال کالا", "بازگشت کالا", "پرسش‌های متداول", "پشتیبانی", "پیگیری سفارش"];
const socialLinks = [
  { label: "اینستاگرام", href: "https://instagram.com" },
  { label: "پینترست", href: "https://pinterest.com" },
  { label: "فیسبوک", href: "https://facebook.com" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

const linkClass = "text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-linen md:mt-28">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
        <div className="max-w-xs">
          <span className="block font-sans text-[1.05rem] font-semibold tracking-[0.34em] uppercase">
            Moderno
          </span>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            مبلمان و دکوراسیون مدرن و باکیفیت؛ طراحی‌شده در استودیوی خودمان و ساخته‌شده به‌سفارش
            برای خانه‌هایی که در آن‌ها زندگی می‌شود، نه فقط چیده می‌شوند.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            تهران، خیابان ولی‌عصر، پلاک ۱۸
            <br />
            hello@moderno.com
          </p>
        </div>

        <nav aria-label="فروشگاه" className="text-sm">
          <h2 className="eyebrow">فروشگاه</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/new-arrivals" className={linkClass}>
                محصولات جدید
              </Link>
            </li>
            <li>
              <Link to="/best-sellers" className={linkClass}>
                پرفروش‌ها
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "living-room" }} className={linkClass}>
                اتاق نشیمن
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "bedroom" }} className={linkClass}>
                اتاق خواب
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "dining-room" }} className={linkClass}>
                اتاق غذاخوری
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "home-office" }} className={linkClass}>
                دفتر کار
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ sale: true }} className={linkClass}>
                حراج
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="درباره ما" className="text-sm">
          <h2 className="eyebrow">درباره</h2>
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
          <nav aria-label="خدمات مشتریان" className="text-sm">
            <h2 className="eyebrow">خدمات مشتریان</h2>
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
            <h2 className="eyebrow">شبکه‌های اجتماعی</h2>
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
        <p className="text-xs text-muted-foreground">© ۱۴۰۵ مدرنو. همه حقوق محفوظ است.</p>

        <ul className="flex flex-wrap items-center gap-2" aria-label="روش‌های پرداخت">
          {paymentMethods.map((method) => (
            <li
              key={method}
              className="rounded-md border border-border bg-background/70 px-2.5 py-1 text-[0.68rem] tracking-[0.04em] text-muted-foreground"
            >
              {method}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
          <li>
            <Link to="/contact" className="link-underline">
              حریم خصوصی
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-underline">
              تنظیمات کوکی
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-underline">
              شرایط استفاده
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
