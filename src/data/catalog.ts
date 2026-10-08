/**
 * Content layer — MODERNO.
 * Every piece of storefront content lives here in a structured model so it can
 * later be swapped for a CMS / commerce API without touching the UI components.
 *
 * The interface is Persian (fa-IR) with RTL layout. Product `slug` values stay
 * latin so URLs, deep links and analytics remain stable.
 */
import heroImg from "@/assets/moderno/hero.jpg";
import catLivingImg from "@/assets/moderno/cat-living-room.jpg";
import catDiningImg from "@/assets/moderno/cat-dining-room.jpg";
import catBedroomImg from "@/assets/moderno/cat-bedroom.jpg";
import catOfficeImg from "@/assets/moderno/cat-home-office.jpg";
import catOutdoorImg from "@/assets/moderno/cat-outdoor.jpg";
import editorialMainImg from "@/assets/moderno/editorial-main.jpg";
import editorialSide1Img from "@/assets/moderno/editorial-side-1.jpg";
import editorialSide2Img from "@/assets/moderno/editorial-side-2.jpg";
import promoImg from "@/assets/moderno/promo.jpg";
import storyImg from "@/assets/moderno/story.jpg";
import roomSceneImg from "@/assets/moderno/room-scene.jpg";
import pSofaImg from "@/assets/moderno/p-sofa.jpg";
import pSofa2Img from "@/assets/moderno/p-sofa-2.jpg";
import pCoffeeTableImg from "@/assets/moderno/p-coffee-table.jpg";
import pAccentChairImg from "@/assets/moderno/p-accent-chair.jpg";
import pAccentChair2Img from "@/assets/moderno/p-accent-chair-2.jpg";
import pPendantImg from "@/assets/moderno/p-pendant.jpg";
import pPendant2Img from "@/assets/moderno/p-pendant-2.jpg";
import pDiningTableImg from "@/assets/moderno/p-dining-table.jpg";
import pLeatherSofaImg from "@/assets/moderno/p-leather-sofa.jpg";
import pBedImg from "@/assets/moderno/p-bed.jpg";
import pBed2Img from "@/assets/moderno/p-bed-2.jpg";
import pDeskImg from "@/assets/moderno/p-desk.jpg";
import pLampImg from "@/assets/moderno/p-lamp.jpg";
import pVaseImg from "@/assets/moderno/p-vase.jpg";
import pShelvesImg from "@/assets/moderno/p-shelves.jpg";
import journalImg from "@/assets/moderno/journal-1.jpg";

export const images = {
  hero: heroImg,
  editorialMain: editorialMainImg,
  editorialSide: editorialSide1Img,
  editorialDetail: editorialSide2Img,
  promo: promoImg,
  story: storyImg,
  room: roomSceneImg,
  journal: journalImg,
};

/** Hero showcase video (re-encoded with a keyframe every 4 frames for scrubbing). */
export const heroVideo = {
  src: "/video/hero-3d.mp4",
  poster: "/video/hero-3d-poster.jpg",
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export type CategorySlug = "living-room" | "dining-room" | "bedroom" | "home-office" | "outdoor";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "living-room",
    name: "اتاق نشیمن",
    tagline: "مبل، میز و نور",
    description: "نشیمن عمیق، میزهای کوتاه و نور ملایم — قطعاتی که هر فضا حول آن‌ها شکل می‌گیرد.",
    image: catLivingImg,
  },
  {
    slug: "dining-room",
    name: "اتاق غذاخوری",
    tagline: "میز و کنسول",
    description: "میزهای چوب یکدست و کمدهای سنجیده، ساخته‌شده برای شب‌های طولانی و دورهمی‌ها.",
    image: catDiningImg,
  },
  {
    slug: "bedroom",
    name: "اتاق خواب",
    tagline: "آرامشی ساده",
    description:
      "تخت‌های روکش‌دار و مبلمان چوبی گرم، با پارچه‌های لطیفی که با گذر زمان دلنشین‌تر می‌شوند.",
    image: catBedroomImg,
  },
  {
    slug: "home-office",
    name: "دفتر کار",
    tagline: "میز و شلف",
    description: "سطوح کار و قفسه‌های باز که در خانه بی‌دردسر می‌نشینند، نه در فضای اداری.",
    image: catOfficeImg,
  },
  {
    slug: "outdoor",
    name: "فضای باز",
    tagline: "تراس و حیاط",
    description:
      "نشیمن مقاوم در برابر آب‌وهوا، با همان پالت رنگ داخل خانه تا زبان طراحی یکدست بماند.",
    image: catOutdoorImg,
  },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((category) => category.slug === slug)?.name ?? "MODERNO";

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  compareAt?: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  summary: string;
  description: string;
  material: string;
  dimensions: string;
  care: string;
  details: string[];
  options?: { label: string; values: string[] };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: ("new" | "best-seller")[];
  reviews: Review[];
};

const review = (
  id: string,
  author: string,
  rating: number,
  date: string,
  title: string,
  body: string,
): Review => ({ id, author, rating, date, title, body });

const baseReviews: Review[] = [
  review(
    "r1",
    "الهام م.",
    5,
    "مهر ۱۴۰۵",
    "از نزدیک بهتر هم هست",
    "تناسباتش در فضای کوچک بی‌نقص است و پرداخت نهایی واقعاً دلنشین. حس کل فضا را عوض کرده.",
  ),
  review(
    "r2",
    "یونس پ.",
    4,
    "شهریور ۱۴۰۵",
    "محکم و بی‌ادعا",
    "دقیقاً همان تن رنگ آرامی که می‌خواستم. تحویل کمی بیشتر از زمان اعلامی طول کشید، اما ارزش انتظار را داشت.",
  ),
  review(
    "r3",
    "پریا ر.",
    5,
    "مرداد ۱۴۰۵",
    "ارزش هر ریالش را دارد",
    "ساخت بسیار خوب و رنگی که بی‌دردسر با هر فضایی می‌سازد. خیلی گران‌تر از قیمتش به نظر می‌رسد.",
  ),
];

type Seed = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAt?: number;
  image: string;
  hoverImage: string;
  summary: string;
  description: string;
  material: string;
  dimensions: string;
  care: string;
  options?: { label: string; values: string[] };
  rating: number;
  reviewCount: number;
  tags: ("new" | "best-seller")[];
  inStock?: boolean;
};

const seeds: Seed[] = [
  {
    slug: "luna-3-seater-sofa",
    name: "مبل سه‌نفره لونا",
    category: "living-room",
    price: 48900000,
    compareAt: 58900000,
    image: pSofaImg,
    hoverImage: pSofa2Img,
    summary: "کوتاه، عمیق و با روکش پارچه‌ای لطیف و پرحجم.",
    description:
      "مبل لونا کوتاه و عمیق طراحی شده و پشتی آن با ترکیب پَر پر شده است؛ هرچه بیشتر استفاده شود، نرم‌تر و دلنشین‌تر می‌شود. بدنه از راش کوره‌خشک، پایه‌ها از بلوط یکدست و روکش از پارچه پشم و ویسکوز است که فرم خود را حفظ می‌کند و سخت به نظر نمی‌رسد.",
    material: "پارچه پشم و ویسکوز براشد · بدنه راش کوره‌خشک · پایه بلوط یکدست",
    dimensions: "عرض ۲۱۸ × عمق ۹۲ × ارتفاع ۷۸ سانتی‌متر · ارتفاع نشیمن ۴۲ سانتی‌متر",
    care: "هفته‌ای یک‌بار با برس نرم جاروبرقی بکشید. هر ماه کوسن‌ها را جابه‌جا کنید. شست‌وشو فقط به‌صورت خشک.",
    options: { label: "روکش", values: ["بوکل شیری", "کتان سنگی", "مخمل بلوطی"] },
    rating: 4.9,
    reviewCount: 214,
    tags: ["new", "best-seller"],
  },
  {
    slug: "nova-coffee-table",
    name: "میز جلومبلی نوا",
    category: "living-room",
    price: 18500000,
    image: pCoffeeTableImg,
    hoverImage: editorialSide1Img,
    summary: "صفحه‌ای از بلوط بازیافتی روی پایه‌ای باریک و دست‌ساز.",
    description:
      "صفحه میز نوا از بلوط بازیافتی بریده شده، پس هر قطعه رگه و پتینه خودش را دارد. پایه از فولاد دست‌ساز با روکش گرافیتی گرم است و پوشش پودری، سطحی مات و تقریباً گچی می‌سازد.",
    material: "بلوط بازیافتی یکدست · پایه فولادی با پوشش پودری",
    dimensions: "عرض ۱۲۰ × عمق ۶۰ × ارتفاع ۳۸ سانتی‌متر",
    care: "با پارچه نمدار پاک کنید. سالی یک‌بار سطح را با روغن شفاف مبلمان بازسازی کنید.",
    options: { label: "رنگ", values: ["بلوط طبیعی", "بلوط دودی"] },
    rating: 4.8,
    reviewCount: 96,
    tags: ["new"],
  },
  {
    slug: "elle-accent-chair",
    name: "صندلی ال",
    category: "living-room",
    price: 21900000,
    image: pAccentChairImg,
    hoverImage: pAccentChair2Img,
    summary: "بدنه منحنی روی پایه‌های مخروطی — شیک، بدون تشریفات.",
    description:
      "صندلی ال یک بدنه منحنی است که با دست روکش شده و روی پایه‌های مخروطی بلوط یکدست نشسته است. به‌قدری باریک است که گوشه مطالعه را زیبا کند و به‌قدری محکم که انتهای یک میز بلند را تکیه‌گاه باشد.",
    material: "ترکیب پنبه و کتان · بدنه قالب‌گیری‌شده · پایه بلوط یکدست",
    dimensions: "عرض ۶۸ × عمق ۷۲ × ارتفاع ۷۶ سانتی‌متر · ارتفاع نشیمن ۴۵ سانتی‌متر",
    care: "لکه‌ها را با شوینده ملایم پاک کنید. از نور مستقیم خورشید دور نگه دارید.",
    options: { label: "روکش", values: ["کتان جویرنگ", "بافت ذغالی", "بوکل رسی"] },
    rating: 4.7,
    reviewCount: 138,
    tags: ["new", "best-seller"],
  },
  {
    slug: "haven-sideboard",
    name: "کنسول هِیوِن",
    category: "living-room",
    price: 36500000,
    image: editorialSide2Img,
    hoverImage: pShelvesImg,
    summary: "درهای شیاردار بلوط با قفل فشاری و طبقه‌های تنظیم‌شدنی.",
    description:
      "هیون از بلوط شیاردار ساخته شده، با دست پرداخت شده و روی پلینتی فرورفته نشسته تا بیشتر مبلمان به نظر برسد تا کابینت. درهای قفل فشاری جلوی آن را کاملاً یکدست نگه می‌دارند و طبقه‌های داخلی برای صفحه، پارچه یا ظرف شیشه‌ای تنظیم می‌شوند.",
    material: "بلوط یکدست و روکش بلوط · یراق برنجی",
    dimensions: "عرض ۱۶۰ × عمق ۴۵ × ارتفاع ۷۲ سانتی‌متر",
    care: "با پارچه خشک گردگیری کنید. از شوینده‌های حلّال روی سطح شیاردار پرهیز کنید.",
    options: { label: "رنگ", values: ["بلوط روشن", "رنگ گردویی"] },
    rating: 4.8,
    reviewCount: 87,
    tags: ["new"],
  },
  {
    slug: "woven-pendant-light",
    name: "آویز حصیری",
    category: "living-room",
    price: 7900000,
    image: pPendantImg,
    hoverImage: pPendant2Img,
    summary: "حصیر بامبو دست‌باف روی نور گرم و قابل تنظیم.",
    description:
      "یک آباژور بافته‌شده که با دست از بامبوی شکافته ساخته شده و از سیم پارچه‌ای آویزان است. این بافت پس از تاریکی سایه‌ای نرم و راه‌راه روی سقف می‌اندازد؛ گرم، نه پرنور.",
    material: "بامبوی دست‌باف · سیم پارچه‌ای · لامپ کم‌مصرف قابل تنظیم",
    dimensions: "قطر ۴۲ × ارتفاع ۳۴ سانتی‌متر · سیم ۲۰۰ سانتی‌متر",
    care: "با برس نرم گردگیری کنید. قابل شست‌وشو نیست.",
    options: { label: "رنگ", values: ["طبیعی", "مشکی‌شده"] },
    rating: 4.6,
    reviewCount: 64,
    tags: ["new"],
  },
  {
    slug: "sable-leather-sofa",
    name: "مبل چرمی سیبل",
    category: "living-room",
    price: 79500000,
    compareAt: 92000000,
    image: pLeatherSofaImg,
    hoverImage: heroImg,
    summary: "چرم تمام‌دانه که به پتینه خودش می‌رسد.",
    description:
      "چرم آنیلین تمام‌دانه روی بدنه چوب سخت، با پشتی کوتاه که دید باز فضا را حفظ می‌کند. سیبل ابتدا محکم است و در یک فصل به فرم اتاق درمی‌آید.",
    material: "چرم آنیلین تمام‌دانه · بدنه چوب سخت کوره‌خشک",
    dimensions: "عرض ۲۲۶ × عمق ۹۶ × ارتفاع ۷۴ سانتی‌متر · ارتفاع نشیمن ۴۱ سانتی‌متر",
    care: "سالی دو بار چرم را تغذیه کنید. ریختگی‌ها را فوراً با پارچه خشک بردارید.",
    options: { label: "چرم", values: ["بلوطی", "قهوه‌ای تیره", "مشکی"] },
    rating: 4.8,
    reviewCount: 187,
    tags: ["best-seller"],
  },
  {
    slug: "astrid-dining-table",
    name: "میز غذاخوری آسترید",
    category: "dining-room",
    price: 55000000,
    image: catDiningImg,
    hoverImage: pDiningTableImg,
    summary: "صفحه بلوط یکدست با لبه گرد و نرم.",
    description:
      "آسترید یک صفحه یکپارچه روی پایه‌های خرک است، با لبه‌ای گرد که تکیه دادن به آن راحت است. برای شش نفر بی‌دردسر جا دارد و در مهمانی‌ها برای هشت نفر.",
    material: "بلوط اروپایی یکدست · روغن سخت موم دست‌مالی‌شده",
    dimensions: "عرض ۲۰۰ × عمق ۹۵ × ارتفاع ۷۵ سانتی‌متر · مناسب ۶ تا ۸ نفر",
    care: "با پارچه نمدار پاک کنید. سالی یک‌بار یا هر زمان سطح کدر شد روغن بزنید.",
    options: { label: "رنگ", values: ["بلوط طبیعی", "بلوط دودی", "گچی"] },
    rating: 4.7,
    reviewCount: 142,
    tags: ["best-seller"],
  },
  {
    slug: "cove-bed-frame",
    name: "تخت‌خواب کاو",
    category: "bedroom",
    price: 46900000,
    compareAt: 56000000,
    image: pBedImg,
    hoverImage: pBed2Img,
    summary: "پشتی بلند روکش‌دار با پایه نواره‌ای بلوط.",
    description:
      "کاو یک پشتی بلند روکش‌دار را با پایه‌ای نواره‌ای و سنجیده ترکیب می‌کند؛ بدون نیاز به تشک فنری. روکش تا کف ادامه دارد، پس تخت به‌صورت یک حجم آرام و یکپارچه دیده می‌شود.",
    material: "روکش ترکیب پنبه و کتان · نواره‌های بلوط یکدست",
    dimensions: "دو نفره · عرض ۱۶۵ × طول ۲۱۵ × ارتفاع ۱۲۰ سانتی‌متر",
    care: "پشتی را با سری مخصوص مبلمان جاروبرقی بکشید.",
    options: { label: "اندازه", values: ["دو نفره", "کوئین", "کینگ"] },
    rating: 4.9,
    reviewCount: 168,
    tags: ["best-seller"],
  },
  {
    slug: "marlowe-desk",
    name: "میز کار مارلو",
    category: "home-office",
    price: 28500000,
    image: pDeskImg,
    hoverImage: catOfficeImg,
    summary: "سطح کار باریک بلوط با مسیر مخفی کابل.",
    description:
      "مارلو عمداً کم‌عمق طراحی شده تا اتاق تناسبات خود را حفظ کند. یک کشوی آستردار و مسیری پنهان در لبه پشتی، کابل‌ها را از کف جمع می‌کند.",
    material: "بلوط یکدست و روکش بلوط · کشوی آستردار",
    dimensions: "عرض ۱۴۰ × عمق ۶۰ × ارتفاع ۷۴ سانتی‌متر",
    care: "مرتب گردگیری کنید. نوشیدنی گرم را روی سطح چوب نگذارید.",
    options: { label: "رنگ", values: ["بلوط روشن", "گرافیتی"] },
    rating: 4.6,
    reviewCount: 91,
    tags: ["best-seller"],
  },
  {
    slug: "terrace-lounge-set",
    name: "ست نشیمن تراس",
    category: "outdoor",
    price: 69000000,
    image: catOutdoorImg,
    hoverImage: promoImg,
    summary: "آلومینیوم رنگ‌پودری با کوسن‌های زودخشک.",
    description:
      "دو صندلی، یک میز کوتاه و یک نیمکت ماژولار از آلومینیوم رنگ‌پودری با تناژ شن گرم. کوسن‌ها زودخشک‌اند و با اکریلیک رنگ‌شده پوشیده شده‌اند که در برابر آفتاب و باران مقاوم است.",
    material: "آلومینیوم رنگ‌پودری · کوسن اکریلیک رنگ‌شده",
    dimensions:
      "نیمکت عرض ۱۸۰ × عمق ۷۸ × ارتفاع ۷۲ سانتی‌متر · میز عرض ۹۰ × عمق ۵۵ × ارتفاع ۳۴ سانتی‌متر",
    care: "بدنه را با شلنگ بشویید. کوسن‌ها را در زمستان داخل خانه نگه دارید.",
    options: { label: "بدنه", values: ["شنی", "گرافیتی"] },
    rating: 4.8,
    reviewCount: 76,
    tags: ["best-seller"],
  },
  {
    slug: "solene-floor-lamp",
    name: "چراغ ایستاده سلن",
    category: "living-room",
    price: 11900000,
    image: pLampImg,
    hoverImage: storyImg,
    summary: "میله برنج براشد با آباژور کتان.",
    description:
      "سلن بدون لاک رها شده تا برنج براشد با گذر زمان عمیق‌تر شود. آباژور کتان نور را پایین و گسترده پخش می‌کند؛ دقیقاً همان چیزی که یک گوشه پس از تاریکی لازم دارد.",
    material: "برنج براشد بدون لاک · آباژور کتان",
    dimensions: "قطر ۳۸ × ارتفاع ۱۵۲ سانتی‌متر",
    care: "با پارچه خشک گردگیری کنید. برنج را پولیش نکنید؛ پتینه بخشی از طرح است.",
    rating: 4.5,
    reviewCount: 63,
    tags: ["best-seller"],
  },
  {
    slug: "ember-ceramic-vase",
    name: "گلدان سرامیکی اِمبر",
    category: "living-room",
    price: 5400000,
    image: pVaseImg,
    hoverImage: editorialMainImg,
    summary: "سفال دست‌ساز با لعاب جویرنگ دانه‌دار.",
    description:
      "روی چرخ و در تیراژ کم ساخته می‌شود، پس هیچ دو تایی کاملاً یکسان نیست. لعاب جویرنگ دانه‌دار روی شانه گلدان، جایی که دیواره نازک‌تر است، گرم‌تر می‌شکند.",
    material: "سفال دست‌ساز · لعاب جویرنگ دانه‌دار",
    dimensions: "قطر ۲۲ × ارتفاع ۳۴ سانتی‌متر",
    care: "با دست بشویید. ضد‌نشت است و به لایه داخلی نیاز ندارد.",
    options: { label: "اندازه", values: ["کوچک", "بلند"] },
    rating: 4.7,
    reviewCount: 118,
    tags: ["best-seller"],
  },
  {
    slug: "arc-wall-shelf",
    name: "شلف دیواری آرک",
    category: "home-office",
    price: 9800000,
    compareAt: 12400000,
    image: pShelvesImg,
    hoverImage: editorialSide2Img,
    summary: "دو قوس بلوط یکدست روی بست‌های پنهان.",
    description:
      "آرک دو شلف منحنی از بلوط است که کتاب، سفال یا اشیای روزمره‌ای را نگه می‌دارند که دوست دارید دیده شوند. بست‌های پنهان خط دیوار را یکدست نگه می‌دارند.",
    material: "بلوط یکدست · بست‌های فولادی پنهان",
    dimensions: "هر شلف عرض ۹۰ × عمق ۲۰ × ارتفاع ۵ سانتی‌متر",
    care: "با پارچه خشک گردگیری کنید. سالی دو بار بست‌ها را بررسی کنید.",
    options: { label: "رنگ", values: ["بلوط طبیعی", "بلوط مشکی‌شده"] },
    rating: 4.6,
    reviewCount: 54,
    tags: ["best-seller"],
    inStock: false,
  },
];

export const products: Product[] = seeds.map((seed, index) => ({
  id: `m-${index + 1}`,
  slug: seed.slug,
  name: seed.name,
  category: seed.category,
  categoryName: categoryName(seed.category),
  price: seed.price,
  compareAt: seed.compareAt,
  image: seed.image,
  hoverImage: seed.hoverImage,
  gallery: [seed.image, seed.hoverImage, editorialMainImg, storyImg],
  summary: seed.summary,
  description: seed.description,
  material: seed.material,
  dimensions: seed.dimensions,
  care: seed.care,
  details: [
    "طراحی در استودیوی خودمان و ساخت به‌سفارش در سری‌های محدود",
    "بدنه و پرداخت نهایی با ۱۰ سال ضمانت ساختاری",
    "تحویل به‌صورت بسته‌بندی‌شده یا نصب‌شده توسط تیم خودمان",
    "مرجوعی رایگان تا ۳۰ روز، با هماهنگی جمع‌آوری از خانه شما",
  ],
  options: seed.options,
  rating: seed.rating,
  reviewCount: seed.reviewCount,
  inStock: seed.inStock !== false,
  tags: seed.tags,
  reviews: baseReviews,
}));

export const productsByCategory = (slug: CategorySlug) =>
  products.filter((product) => product.category === slug);

export const newArrivals = products.filter((product) => product.tags.includes("new"));

export const bestSellers = products.filter((product) => product.tags.includes("best-seller"));

export const onSale = products.filter((product) => product.compareAt);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const getProductsByIds = (ids: string[]) =>
  ids.map((id) => products.find((product) => product.id === id)).filter((p): p is Product => !!p);

export const searchProducts = (query: string, limit = 6) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter((product) =>
      [product.name, product.categoryName, product.summary, product.material]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
    .slice(0, limit);
};

/* ------------------------------------------------------------------ */
/* Home page content                                                   */
/* ------------------------------------------------------------------ */

export const benefits = [
  {
    title: "ارسال رایگان",
    body: "برای سفارش‌های بالای ۵ میلیون تومان",
    icon: "truck" as const,
  },
  {
    title: "پرداخت امن",
    body: "پرداخت کاملاً ایمن و مطمئن",
    icon: "shield" as const,
  },
  {
    title: "کیفیت ممتاز",
    body: "انتخاب شده با دقت و وسواس",
    icon: "gem" as const,
  },
  {
    title: "پشتیبانی ۲۴/۷",
    body: "همیشه در کنار شما هستیم",
    icon: "headset" as const,
  },
];

export const testimonials: Review[] = [
  {
    id: "t1",
    author: "سارا محمدی",
    rating: 5,
    date: "تهران",
    title: "فضا را دگرگون کرد",
    body: "کیفیت فوق‌العاده و از نزدیک بهتر از تصویر. این مبل حال کل اتاق نشیمن ما را عوض کرد.",
    verified: true,
  },
  {
    id: "t2",
    author: "امیر رضایی",
    rating: 5,
    date: "اصفهان",
    title: "خدمات بی‌دردسر",
    body: "طراحی چشمگیر، ارسال سریع و پشتیبانی بسیار خوب.",
    verified: true,
  },
  {
    id: "t3",
    author: "نگار کریمی",
    rating: 5,
    date: "شیراز",
    title: "فروشگاه موردعلاقه‌مان",
    body: "دقت در جزئیات شگفت‌انگیز است. مدرنو به فروشگاه موردعلاقه ما تبدیل شده.",
    verified: true,
  },
];

export type Hotspot = {
  id: string;
  label: string;
  productSlug: string;
  x: number;
  y: number;
};

/** Percentage positions over the room photograph. */
export const roomHotspots: Hotspot[] = [
  { id: "h1", label: "مبل", productSlug: "luna-3-seater-sofa", x: 27, y: 56 },
  { id: "h2", label: "میز جلومبلی", productSlug: "nova-coffee-table", x: 55, y: 74 },
  { id: "h3", label: "چراغ ایستاده", productSlug: "solene-floor-lamp", x: 84, y: 33 },
  { id: "h4", label: "صندلی", productSlug: "elle-accent-chair", x: 13, y: 45 },
];

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "the-quiet-power-of-negative-space",
    title: "قدرت آرام فضای خالی",
    excerpt:
      "چرا آرامش‌بخش‌ترین اتاق‌ها خلوت‌ترین‌اند — و چطور تصمیم بگیریم چه چیزی را برداریم، نه چه چیزی را اضافه کنیم.",
    category: "معماری داخلی",
    date: "۱۰ مهر ۱۴۰۵",
    readingTime: "۵ دقیقه مطالعه",
    image: editorialMainImg,
  },
  {
    slug: "sourcing-oak-a-note-from-the-workshop",
    title: "تأمین بلوط؛ یادداشتی از کارگاه",
    excerpt:
      "هر تخته چوبی که می‌خریم تا یک جنگل مدیریت‌شده اروپایی ردیابی می‌شود. این برای رگه‌ای که می‌بینید یعنی چه.",
    category: "صنعتگری",
    date: "۲۷ شهریور ۱۴۰۵",
    readingTime: "۷ دقیقه مطالعه",
    image: journalImg,
  },
  {
    slug: "layering-light-in-a-modern-living-room",
    title: "لایه‌های نور در نشیمن مدرن",
    excerpt: "سه منبع، سه ارتفاع، یک دیمر. چارچوبی ساده برای نورپردازی اتاقی که تمام روز کار کند.",
    category: "راهنما",
    date: "۱۳ شهریور ۱۴۰۵",
    readingTime: "۴ دقیقه مطالعه",
    image: storyImg,
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Persian numerals with the Toman suffix, e.g. «۴۸٬۹۰۰٬۰۰۰ تومان». */
export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(Math.round(value))} تومان`;

export const discountPercent = (product: Product) =>
  product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
