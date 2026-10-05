/**
 * Static demo content for the TechVerse storefront (Persian / RTL).
 * Visual prototype only — no backend, no real catalog/ordering.
 * All imagery is remote photography (verified URLs), sized per breakpoint.
 */

export const photo = (id: string, w = 900, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ""}`;

export const brandTagline = "تکنولوژی برای زندگی بهتر";

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
  { label: "خانه", href: "#top" },
  { label: "امروز", href: "#trending" },
  { label: "دنبال‌شده‌ها", href: "#ideas" },
  { label: "فروشگاه", href: "#categories" },
];

export const categoryNav: NavLink[] = [
  { label: "گجت‌ها", href: "#trending" },
  { label: "خانه هوشمند", href: "#categories" },
  { label: "صوتی", href: "#categories" },
  { label: "پوشیدنی‌ها", href: "#categories" },
  { label: "لوازم جانبی", href: "#categories" },
  { label: "تخفیف‌ها", href: "#deals" },
];

export const regions = [
  { code: "US", label: "آمریکا", flag: "🇺🇸" },
  { code: "UK", label: "انگلستان", flag: "🇬🇧" },
  { code: "UAE", label: "امارات", flag: "🇦🇪" },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "gadgets",
    eyebrow: "کشف کنید، خرید کنید، ارتقا دهید",
    title: "جدیدترین",
    titleAccent: "گجت‌های",
    titleRest: " تکنولوژی",
    description:
      "جدیدترین محصولات دیجیتال را برای تجربه‌ای هوشمندتر و لذت‌بخش‌تر کشف کنید؛ انتخاب‌شده، تست‌شده و آماده ارسال.",
    badge: "محصولات جدید",
    stats: "میانگین ۴٫۹ از ۱۲٬۴۰۰ نظر ثبت‌شده",
    gallery: [
      {
        src: photo("1505740420928-5e560c06d30e", 900),
        alt: "هدفون حرفه‌ای",
        className: "start-0 top-[6%] h-[52%] w-[52%]",
        frame: "float-slow",
      },
      {
        src: photo("1511707171634-5f897ff02aa9", 700),
        alt: "گوشی هوشمند مدرن",
        className: "end-0 top-0 h-[42%] w-[38%]",
        frame: "float-slower",
      },
      {
        src: photo("1523275335684-37898b6baf30", 600),
        alt: "ساعت هوشمند",
        className: "bottom-[4%] start-[10%] h-[38%] w-[36%]",
        frame: "float-slower",
      },
      {
        src: photo("1600294037681-c80b4cb5b434", 600),
        alt: "هدفون بی‌سیم",
        className: "bottom-0 end-[6%] h-[34%] w-[30%]",
        frame: "float-slow",
      },
    ],
  },
  {
    id: "audio",
    eyebrow: "صدای بی‌نقص",
    title: "محصولات",
    titleAccent: "صوتی",
    titleRest: " بدون مصالحه",
    description:
      "هدفون‌های استودیویی، ایربادهای بی‌سیم و اسپیکرهایی که برای همان‌طور که واقعاً گوش می‌دهید تنظیم شده‌اند.",
    badge: "پرفروش‌ترین‌ها",
    stats: "تا ۴۰ ساعت پخش مداوم با هر بار شارژ",
    gallery: [
      {
        src: photo("1546435770-a3e426bf472b", 900),
        alt: "هدفون استودیویی",
        className: "start-0 top-[10%] h-[48%] w-[48%]",
        frame: "float-slower",
      },
      {
        src: photo("1590658268037-6bf12165a8df", 700),
        alt: "ایرباد بی‌سیم",
        className: "end-0 top-0 h-[40%] w-[36%]",
        frame: "float-slow",
      },
      {
        src: photo("1608043152269-423dbba4e7e1", 700),
        alt: "اسپیکر قابل حمل",
        className: "bottom-[6%] start-[12%] h-[36%] w-[34%]",
        frame: "float-slow",
      },
      {
        src: photo("1583394838336-acd977736f90", 600),
        alt: "هدفون روی میز کار",
        className: "bottom-0 end-[8%] h-[32%] w-[28%]",
        frame: "float-slower",
      },
    ],
  },
  {
    id: "wearables",
    eyebrow: "بسنج، پیش برو، تکرار کن",
    title: "پوشیدنی‌های",
    titleAccent: "هوشمند",
    titleRest: " برای زندگی پرتحرک",
    description:
      "ساعت‌ها و مچ‌بندهای هوشمندی که همراه تمرین، سفر و همه لحظه‌های روز شما می‌مانند.",
    badge: "تازه رسیده",
    stats: "بازگشت رایگان کالا تا ۳۰ روز",
    gallery: [
      {
        src: photo("1434494878577-86c23bcb06b9", 900),
        alt: "ساعت هوشمند روی دست",
        className: "start-0 top-[8%] h-[50%] w-[50%]",
        frame: "float-slow",
      },
      {
        src: photo("1546868871-7041f2a55e12", 700),
        alt: "صفحه ساعت هوشمند",
        className: "end-0 top-0 h-[40%] w-[36%]",
        frame: "float-slower",
      },
      {
        src: photo("1579586337278-3befd40fd17a", 700),
        alt: "ساعت و لوازم جانبی",
        className: "bottom-[5%] start-[14%] h-[36%] w-[34%]",
        frame: "float-slower",
      },
      {
        src: photo("1585338107529-13afc5f02586", 600),
        alt: "شارژر بی‌سیم",
        className: "bottom-0 end-[10%] h-[32%] w-[28%]",
        frame: "float-slow",
      },
    ],
  },
];

export const categories: Category[] = [
  {
    id: "audio",
    title: "محصولات صوتی",
    subtitle: "صدای باکیفیت",
    image: photo("1546435770-a3e426bf472b", 700),
    href: "#trending",
  },
  {
    id: "smart-devices",
    title: "خانه هوشمند",
    subtitle: "زندگی هوشمندتر",
    image: photo("1558002038-1055907df827", 700),
    href: "#trending",
  },
  {
    id: "wearables",
    title: "پوشیدنی‌ها",
    subtitle: "بسنج و پیش برو",
    image: photo("1434494878577-86c23bcb06b9", 700),
    href: "#trending",
  },
  {
    id: "accessories",
    title: "لوازم جانبی",
    subtitle: "طراحی‌شده برای شما",
    image: photo("1526170375885-4d8ecf77b99f", 700),
    href: "#trending",
  },
  {
    id: "deals",
    title: "تخفیف‌ها",
    subtitle: "بهترین پیشنهادهای امروز",
    image: photo("1607083206968-13611e3d76db", 700),
    href: "#deals",
  },
];

export const trendingProducts: Product[] = [
  {
    id: "watch-s9",
    name: "ساعت هوشمند سری ۹",
    price: 2999000,
    oldPrice: 3599000,
    rating: 4.9,
    reviews: 1284,
    image: photo("1546868871-7041f2a55e12", 600),
    tag: "۱۷٪ تخفیف",
  },
  {
    id: "earbuds-pro",
    name: "هدفون بی‌سیم پرو",
    price: 1890000,
    rating: 4.8,
    reviews: 968,
    image: photo("1590658268037-6bf12165a8df", 600),
    tag: "جدید",
  },
  {
    id: "speaker-mini",
    name: "اسپیکر بلوتوثی قابل حمل",
    price: 990000,
    rating: 4.7,
    reviews: 742,
    image: photo("1608043152269-423dbba4e7e1", 600),
  },
  {
    id: "charger-3in1",
    name: "شارژر بی‌سیم ۳ در ۱",
    price: 599000,
    oldPrice: 790000,
    rating: 4.6,
    reviews: 511,
    image: photo("1585338107529-13afc5f02586", 600),
    tag: "۲۴٪ تخفیف",
  },
  {
    id: "drone-4k",
    name: "پهپاد دوربین‌دار ۴K",
    price: 49900000,
    rating: 4.9,
    reviews: 386,
    image: photo("1473968512647-3e447244af8f", 600),
    tag: "حرفه‌ای",
  },
  {
    id: "gimbal",
    name: "گیمبال هوشمند موبایل",
    price: 1250000,
    rating: 4.5,
    reviews: 274,
    image: photo("1533228100845-08145b01de14", 600),
  },
];

export const benefits: Benefit[] = [
  { id: "shipping", title: "ارسال سریع", text: "تحویل سریع در سراسر ایران" },
  { id: "payments", title: "پرداخت امن", text: "پرداخت ۱۰۰٪ امن و مطمئن" },
  { id: "returns", title: "ضمانت بازگشت ۳۰ روزه", text: "بازگشت کالا بدون هیچ دردسر" },
  { id: "support", title: "پشتیبانی حرفه‌ای", text: "پاسخگویی ۲۴ ساعته، ۷ روز هفته" },
];

export const ideaCards: IdeaCard[] = [
  {
    id: "tech-setup",
    title: "ایده‌های میز کار دیجیتال",
    count: 128,
    image: photo("1593062096033-9a26b09da705", 700),
  },
  {
    id: "travel-tech",
    title: "لوازم ضروری سفر",
    count: 96,
    image: photo("1553062407-98eeb64c6a62", 700),
  },
  {
    id: "smart-home",
    title: "خانه هوشمند",
    count: 74,
    image: photo("1585771724684-38269d6639fd", 700),
  },
  {
    id: "gaming",
    title: "تجهیزات گیمینگ",
    count: 155,
    image: photo("1542751371-adc38448a05e", 700),
  },
  {
    id: "minimal-desk",
    title: "میز کار مینیمال",
    count: 87,
    image: photo("1547082299-de196ea013d6", 700),
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "فروشگاه",
    links: [
      { label: "همه محصولات", href: "#trending" },
      { label: "محصولات جدید", href: "#trending" },
      { label: "پرفروش‌ترین‌ها", href: "#trending" },
      { label: "تخفیف‌ها", href: "#deals" },
      { label: "لوازم جانبی", href: "#categories" },
    ],
  },
  {
    title: "دسته‌بندی‌ها",
    links: [
      { label: "صوتی", href: "#categories" },
      { label: "پوشیدنی‌ها", href: "#categories" },
      { label: "خانه هوشمند", href: "#categories" },
      { label: "گجت‌ها", href: "#trending" },
      { label: "گیمینگ", href: "#ideas" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "تماس با ما", href: "#newsletter" },
      { label: "شیوه ارسال", href: "#benefits" },
      { label: "بازگشت کالا", href: "#benefits" },
      { label: "گارانتی", href: "#benefits" },
      { label: "سوالات متداول", href: "#newsletter" },
    ],
  },
  {
    title: "شرکت",
    links: [
      { label: "درباره ما", href: "#top" },
      { label: "داستان ما", href: "#top" },
      { label: "فرصت‌های شغلی", href: "#top" },
      { label: "وبلاگ", href: "#ideas" },
      { label: "تماس", href: "#newsletter" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "حریم خصوصی", href: "#top" },
  { label: "قوانین و مقررات", href: "#top" },
  { label: "سیاست کوکی‌ها", href: "#top" },
];

export const trustBadges = [
  { id: "authentic", label: "۱۰۰٪ اصل و اورجینال" },
  { id: "trusted", label: "مورد اعتماد هزاران کاربر" },
  { id: "rated", label: "فروشگاه برتر" },
  { id: "price", label: "تضمین بهترین قیمت" },
];

export const socials = [
  { id: "instagram", label: "اینستاگرام" },
  { id: "facebook", label: "فیسبوک" },
  { id: "youtube", label: "یوتیوب" },
  { id: "tiktok", label: "تیک‌تاک" },
  { id: "x", label: "ایکس" },
];

const faNumbers = new Intl.NumberFormat("fa-IR");

export const formatNumber = (value: number) => faNumbers.format(value);

export const formatPrice = (value: number) => `${faNumbers.format(value)} تومان`;

export const formatRating = (value: number) =>
  value.toLocaleString("fa-IR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
