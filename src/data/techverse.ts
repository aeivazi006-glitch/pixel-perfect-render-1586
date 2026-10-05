/**
 * Static demo content for the TechVerse storefront.
 * Visual prototype only — no backend, no real catalog/ordering.
 * All imagery is remote photography (verified URLs), sized per breakpoint.
 */

export const photo = (id: string, w = 900, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}`;

export type NavLink = { label: string; href: string };

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleRest: string;
  description: string;
  badge: string;
  stats: string;
  gallery: { src: string; alt: string; className: string; frame: string }[];
};

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
};

export type Benefit = {
  id: string;
  title: string;
  text: string;
};

export type IdeaCard = {
  id: string;
  title: string;
  count: number;
  image: string;
};

export const topNav: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Today", href: "#trending" },
  { label: "Following", href: "#ideas" },
  { label: "Shop", href: "#categories" },
];

export const categoryNav: NavLink[] = [
  { label: "Gadgets", href: "#trending" },
  { label: "Smart Home", href: "#categories" },
  { label: "Audio", href: "#categories" },
  { label: "Wearables", href: "#categories" },
  { label: "Accessories", href: "#categories" },
  { label: "Sale", href: "#deals" },
];

export const regions = ["US", "UK", "UAE"];

export const heroSlides: HeroSlide[] = [
  {
    id: "gadgets",
    eyebrow: "Discover. Shop. Upgrade.",
    title: "Latest Tech",
    titleAccent: "That Upgrades",
    titleRest: " Your Lifestyle",
    description:
      "Explore cutting-edge gadgets that upgrade your everyday lifestyle — handpicked, tested and delivered fast.",
    badge: "New Arrivals",
    stats: "4.9 average from 12,400+ reviews",
    gallery: [
      {
        src: photo("1505740420928-5e560c06d30e", 900),
        alt: "Premium over-ear headphones",
        className: "left-0 top-[6%] h-[52%] w-[52%]",
        frame: "float-slow",
      },
      {
        src: photo("1511707171634-5f897ff02aa9", 700),
        alt: "Modern smartphone",
        className: "right-0 top-0 h-[42%] w-[38%]",
        frame: "float-slower",
      },
      {
        src: photo("1523275335684-37898b6baf30", 600),
        alt: "Smartwatch",
        className: "bottom-[4%] left-[10%] h-[38%] w-[36%]",
        frame: "float-slower",
      },
      {
        src: photo("1600294037681-c80b4cb5b434", 600),
        alt: "Wireless earbuds",
        className: "bottom-0 right-[6%] h-[34%] w-[30%]",
        frame: "float-slow",
      },
    ],
  },
  {
    id: "audio",
    eyebrow: "Sound, perfected.",
    title: "",
    titleAccent: "Audio",
    titleRest: " Without Compromise",
    description:
      "Studio-grade headphones, true-wireless earbuds and speakers tuned for the way you actually listen.",
    badge: "Best Sellers",
    stats: "Up to 40 hours of playback per charge",
    gallery: [
      {
        src: photo("1546435770-a3e426bf472b", 900),
        alt: "Studio headphones",
        className: "left-0 top-[10%] h-[48%] w-[48%]",
        frame: "float-slower",
      },
      {
        src: photo("1590658268037-6bf12165a8df", 700),
        alt: "Wireless earbuds in case",
        className: "right-0 top-0 h-[40%] w-[36%]",
        frame: "float-slow",
      },
      {
        src: photo("1608043152269-423dbba4e7e1", 700),
        alt: "Portable speaker",
        className: "bottom-[6%] left-[12%] h-[36%] w-[34%]",
        frame: "float-slow",
      },
      {
        src: photo("1583394838336-acd977736f90", 600),
        alt: "Headphones on a desk",
        className: "bottom-0 right-[8%] h-[32%] w-[28%]",
        frame: "float-slower",
      },
    ],
  },
  {
    id: "wearables",
    eyebrow: "Track. Achieve. Repeat.",
    title: "",
    titleAccent: "Wearables",
    titleRest: " Built For Motion",
    description:
      "Smartwatches and health trackers that keep pace with training, travel and everything in between.",
    badge: "Just Landed",
    stats: "Free returns for 30 days",
    gallery: [
      {
        src: photo("1434494878577-86c23bcb06b9", 900),
        alt: "Smartwatch on a wrist",
        className: "left-0 top-[8%] h-[50%] w-[50%]",
        frame: "float-slow",
      },
      {
        src: photo("1546868871-7041f2a55e12", 700),
        alt: "Smartwatch face",
        className: "right-0 top-0 h-[40%] w-[36%]",
        frame: "float-slower",
      },
      {
        src: photo("1579586337278-3befd40fd17a", 700),
        alt: "Watch and accessories",
        className: "bottom-[5%] left-[14%] h-[36%] w-[34%]",
        frame: "float-slower",
      },
      {
        src: photo("1585338107529-13afc5f02586", 600),
        alt: "Wireless charging pad",
        className: "bottom-0 right-[10%] h-[32%] w-[28%]",
        frame: "float-slow",
      },
    ],
  },
];

export const categories: Category[] = [
  {
    id: "audio",
    title: "Audio",
    subtitle: "Premium Sound",
    image: photo("1546435770-a3e426bf472b", 700),
    href: "#trending",
  },
  {
    id: "smart-devices",
    title: "Smart Devices",
    subtitle: "Smarter Living",
    image: photo("1558002038-1055907df827", 700),
    href: "#trending",
  },
  {
    id: "wearables",
    title: "Wearables",
    subtitle: "Track. Achieve.",
    image: photo("1434494878577-86c23bcb06b9", 700),
    href: "#trending",
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "Designed for You",
    image: photo("1526170375885-4d8ecf77b99f", 700),
    href: "#trending",
  },
  {
    id: "deals",
    title: "Deals",
    subtitle: "Top Deals Today",
    image: photo("1607083206968-13611e3d76db", 700),
    href: "#deals",
  },
];

export const trendingProducts: Product[] = [
  {
    id: "watch-s9",
    name: "Smart Watch Series 9",
    price: 299.99,
    oldPrice: 359.99,
    rating: 4.9,
    reviews: 1284,
    image: photo("1546868871-7041f2a55e12", 600),
    tag: "-17%",
  },
  {
    id: "earbuds-pro",
    name: "Wireless Earbuds Pro",
    price: 129.99,
    rating: 4.8,
    reviews: 968,
    image: photo("1590658268037-6bf12165a8df", 600),
    tag: "New",
  },
  {
    id: "speaker-mini",
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    rating: 4.7,
    reviews: 742,
    image: photo("1608043152269-423dbba4e7e1", 600),
  },
  {
    id: "charger-3in1",
    name: "3-in-1 Wireless Charger",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.6,
    reviews: 511,
    image: photo("1585338107529-13afc5f02586", 600),
    tag: "-29%",
  },
  {
    id: "drone-4k",
    name: "4K Camera Drone",
    price: 499.99,
    rating: 4.9,
    reviews: 386,
    image: photo("1473968512647-3e447244af8f", 600),
    tag: "Pro",
  },
  {
    id: "gimbal",
    name: "Smartphone Gimbal",
    price: 89.99,
    rating: 4.5,
    reviews: 274,
    image: photo("1533228100845-08145b01de14", 600),
  },
];

export const benefits: Benefit[] = [
  { id: "shipping", title: "Worldwide Shipping", text: "Fast delivery to US, UK & UAE" },
  { id: "payments", title: "Secure Payments", text: "100% safe & secure checkout" },
  { id: "returns", title: "30-Day Returns", text: "Hassle-free returns guaranteed" },
  { id: "support", title: "Premium Support", text: "24/7 customer support" },
];

export const ideaCards: IdeaCard[] = [
  {
    id: "tech-setup",
    title: "Tech Setup Ideas",
    count: 128,
    image: photo("1593062096033-9a26b09da705", 700),
  },
  {
    id: "travel-tech",
    title: "Travel Tech Essentials",
    count: 96,
    image: photo("1553062407-98eeb64c6a62", 700),
  },
  {
    id: "smart-home",
    title: "Smart Home Inspiration",
    count: 74,
    image: photo("1585771724684-38269d6639fd", 700),
  },
  {
    id: "gaming",
    title: "Gaming Gear",
    count: 155,
    image: photo("1542751371-adc38448a05e", 700),
  },
  {
    id: "minimal-desk",
    title: "Minimal Desk Setup",
    count: 87,
    image: photo("1547082299-de196ea013d6", 700),
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "#trending" },
      { label: "New Arrivals", href: "#trending" },
      { label: "Best Sellers", href: "#trending" },
      { label: "Deals", href: "#deals" },
      { label: "Accessories", href: "#categories" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Audio", href: "#categories" },
      { label: "Wearables", href: "#categories" },
      { label: "Smart Home", href: "#categories" },
      { label: "Gadgets", href: "#trending" },
      { label: "Gaming", href: "#ideas" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "#newsletter" },
      { label: "Shipping", href: "#benefits" },
      { label: "Returns", href: "#benefits" },
      { label: "Warranty", href: "#benefits" },
      { label: "FAQ", href: "#newsletter" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#top" },
      { label: "Our Story", href: "#top" },
      { label: "Careers", href: "#top" },
      { label: "Blog", href: "#ideas" },
      { label: "Contact", href: "#newsletter" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "#top" },
  { label: "Terms & Conditions", href: "#top" },
  { label: "Cookie Policy", href: "#top" },
];

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
