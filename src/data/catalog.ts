/**
 * Content layer — MODERNO.
 * Every piece of storefront content lives here in a structured model so it can
 * later be swapped for a CMS / commerce API without touching the UI components.
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

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export type CategorySlug =
  | "living-room"
  | "dining-room"
  | "bedroom"
  | "home-office"
  | "outdoor";

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
    name: "Living Room",
    tagline: "Sofas, tables, light",
    description:
      "Deep seating, low tables and quiet lighting — the pieces a room organises itself around.",
    image: catLivingImg,
  },
  {
    slug: "dining-room",
    name: "Dining Room",
    tagline: "Tables & sideboards",
    description:
      "Solid timber tables and considered storage, sized for long evenings rather than quick meals.",
    image: catDiningImg,
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Rest, quietly made",
    description:
      "Upholstered beds and warm casegoods, finished in tactile fabrics that soften with use.",
    image: catBedroomImg,
  },
  {
    slug: "home-office",
    name: "Home Office",
    tagline: "Desks & shelving",
    description:
      "Work surfaces and open storage that live comfortably inside a home, not a corporate floor.",
    image: catOfficeImg,
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Terraces & gardens",
    description:
      "Weather-ready lounging in the same palette as our interiors, so the house keeps its voice outside.",
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
    "Elena M.",
    5,
    "September 2026",
    "Even better in person",
    "The proportions are perfect in a small room and the finish is genuinely lovely. It has changed how the whole space feels.",
  ),
  review(
    "r2",
    "Jonas P.",
    4,
    "August 2026",
    "Solid and understated",
    "Exactly the muted tone I hoped for. Delivery took a few days longer than estimated — still worth the wait.",
  ),
  review(
    "r3",
    "Priya R.",
    5,
    "July 2026",
    "Worth every penny",
    "Beautifully made and effortlessly neutral. It reads far more expensive than it was.",
  ),
];

type Seed = {
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
    name: "Luna 3-Seater Sofa",
    category: "living-room",
    price: 799,
    compareAt: 949,
    image: pSofaImg,
    hoverImage: pSofa2Img,
    summary: "Low, deep and generously upholstered in a soft brushed weave.",
    description:
      "Luna sits low and deep, with a feather-blend back that softens the more you use it. The frame is kiln-dried beech, the legs solid oak, and the cover is a brushed wool-viscose weave that holds its shape without feeling stiff.",
    material: "Brushed wool-viscose weave · kiln-dried beech frame · solid oak legs",
    dimensions: "W 218 × D 92 × H 78 cm · seat height 42 cm",
    care: "Vacuum weekly with a soft brush head. Rotate cushions monthly. Professional clean only.",
    options: { label: "Upholstery", values: ["Ivory boucle", "Stone linen", "Oak velvet"] },
    rating: 4.9,
    reviewCount: 214,
    tags: ["new", "best-seller"],
  },
  {
    name: "Nova Coffee Table",
    category: "living-room",
    price: 299,
    image: pCoffeeTableImg,
    hoverImage: editorialSide1Img,
    summary: "A reclaimed-oak slab on a slim, hand-welded base.",
    description:
      "Nova is cut from reclaimed oak, so every top carries its own grain and patina. The base is hand-welded steel in a warm graphite finish, powder-coated for a matte, almost chalky surface.",
    material: "Reclaimed solid oak · powder-coated steel base",
    dimensions: "W 120 × D 60 × H 38 cm",
    care: "Wipe with a damp cloth. Re-oil the top once a year with a clear furniture oil.",
    options: { label: "Finish", values: ["Natural oak", "Smoked oak"] },
    rating: 4.8,
    reviewCount: 96,
    tags: ["new"],
  },
  {
    name: "Elle Accent Chair",
    category: "living-room",
    price: 349,
    image: pAccentChairImg,
    hoverImage: pAccentChair2Img,
    summary: "A curved shell on tapered legs — elegant without being formal.",
    description:
      "Elle is a single curved shell, upholstered by hand and set on tapered solid oak legs. It is narrow enough for a reading corner and sturdy enough to anchor the end of a long table.",
    material: "Cotton-linen blend · moulded shell · solid oak legs",
    dimensions: "W 68 × D 72 × H 76 cm · seat height 45 cm",
    care: "Spot clean with a mild detergent. Keep out of direct sunlight.",
    options: { label: "Upholstery", values: ["Oat linen", "Charcoal weave", "Clay boucle"] },
    rating: 4.7,
    reviewCount: 138,
    tags: ["new", "best-seller"],
  },
  {
    name: "Haven Sideboard",
    category: "living-room",
    price: 599,
    image: editorialSide2Img,
    hoverImage: pShelvesImg,
    summary: "Reeded oak doors with push-latch hardware and adjustable shelves.",
    description:
      "Haven is reeded oak, finished by hand and set on a recessed plinth so it reads as furniture rather than cabinetry. Push-latch doors keep the front perfectly clean, and the interior shelves adjust to take records, linen or glassware.",
    material: "Solid oak and oak veneer · brass hardware",
    dimensions: "W 160 × D 45 × H 72 cm",
    care: "Dust with a dry cloth. Avoid solvent cleaners on the reeded surface.",
    options: { label: "Finish", values: ["Pale oak", "Walnut stain"] },
    rating: 4.8,
    reviewCount: 87,
    tags: ["new"],
  },
  {
    name: "Woven Pendant Light",
    category: "living-room",
    price: 129,
    image: pPendantImg,
    hoverImage: pPendant2Img,
    summary: "Hand-woven bamboo over a warm, dimmable LED core.",
    description:
      "A single woven shade, made by hand from split bamboo and hung on a braided fabric cord. The weave throws a soft, striped shadow across the ceiling after dark — warm rather than bright.",
    material: "Hand-woven bamboo · braided cotton cord · dimmable LED",
    dimensions: "Ø 42 × H 34 cm · 200 cm cord",
    care: "Dust with a soft brush. Do not wash.",
    options: { label: "Finish", values: ["Natural", "Blackened"] },
    rating: 4.6,
    reviewCount: 64,
    tags: ["new"],
  },
  {
    name: "Sable Leather Sofa",
    category: "living-room",
    price: 1299,
    compareAt: 1499,
    image: pLeatherSofaImg,
    hoverImage: heroImg,
    summary: "Full-grain leather that softens into its own patina.",
    description:
      "Aniline-dyed full-grain leather over a hardwood frame, with a low back that keeps sightlines open. Sable starts firm and settles into the shape of the room within a season.",
    material: "Aniline full-grain leather · kiln-dried hardwood frame",
    dimensions: "W 226 × D 96 × H 74 cm · seat height 41 cm",
    care: "Condition twice a year. Wipe spills immediately with a dry cloth.",
    options: { label: "Leather", values: ["Chestnut", "Espresso", "Black"] },
    rating: 4.8,
    reviewCount: 187,
    tags: ["best-seller"],
  },
  {
    name: "Astrid Dining Table",
    category: "dining-room",
    price: 899,
    image: catDiningImg,
    hoverImage: pDiningTableImg,
    summary: "A solid oak top with a softly rounded bullnose edge.",
    description:
      "Astrid is a single plank top on trestle legs, with a bullnose edge that is comfortable to lean on. It seats six without crowding and eight when the occasion calls for it.",
    material: "Solid European oak · hand-rubbed hardwax oil",
    dimensions: "W 200 × D 95 × H 75 cm · seats 6–8",
    care: "Wipe with a damp cloth. Re-oil annually or when the surface dulls.",
    options: { label: "Finish", values: ["Natural oak", "Smoked oak", "Chalk"] },
    rating: 4.7,
    reviewCount: 142,
    tags: ["best-seller"],
  },
  {
    name: "Cove Bed Frame",
    category: "bedroom",
    price: 749,
    compareAt: 899,
    image: pBedImg,
    hoverImage: pBed2Img,
    summary: "A tall upholstered headboard with a slatted oak base.",
    description:
      "Cove pairs a deep upholstered headboard with a quietly engineered slatted base — no box spring needed. The upholstery runs to the floor, so the bed reads as a single, calm volume.",
    material: "Cotton-linen blend upholstery · solid oak slats",
    dimensions: "Queen · W 165 × L 215 × H 120 cm",
    care: "Vacuum the headboard with an upholstery attachment.",
    options: { label: "Size", values: ["Double", "Queen", "King"] },
    rating: 4.9,
    reviewCount: 168,
    tags: ["best-seller"],
  },
  {
    name: "Marlowe Desk",
    category: "home-office",
    price: 459,
    image: pDeskImg,
    hoverImage: catOfficeImg,
    summary: "A slim oak work surface with a discreet cable channel.",
    description:
      "Marlowe is deliberately shallow, so a room keeps its proportions. A felt-lined drawer and a hidden channel under the back edge keep cables off the floor.",
    material: "Solid oak and oak veneer · felt-lined drawer",
    dimensions: "W 140 × D 60 × H 74 cm",
    care: "Dust regularly. Keep hot drinks off the timber surface.",
    options: { label: "Finish", values: ["Pale oak", "Graphite"] },
    rating: 4.6,
    reviewCount: 91,
    tags: ["best-seller"],
  },
  {
    name: "Terrace Lounge Set",
    category: "outdoor",
    price: 1149,
    image: catOutdoorImg,
    hoverImage: promoImg,
    summary: "Powder-coated aluminium with quick-dry cushions.",
    description:
      "Two chairs, a low table and a modular bench in powder-coated aluminium, finished in a warm sand tone. Cushions are quick-dry and covered in a solution-dyed acrylic that shrugs off sun and rain.",
    material: "Powder-coated aluminium · solution-dyed acrylic cushions",
    dimensions: "Bench W 180 × D 78 × H 72 cm · table W 90 × D 55 × H 34 cm",
    care: "Hose down the frame. Store cushions indoors through winter.",
    options: { label: "Frame", values: ["Sand", "Graphite"] },
    rating: 4.8,
    reviewCount: 76,
    tags: ["best-seller"],
  },
  {
    name: "Solene Floor Lamp",
    category: "living-room",
    price: 189,
    image: pLampImg,
    hoverImage: storyImg,
    summary: "A brushed brass stem with a linen drum shade.",
    description:
      "Solene is left unlacquered, so the brushed brass deepens with time. The linen shade diffuses light low and wide — exactly what a corner needs after dark.",
    material: "Unlacquered brushed brass · linen shade",
    dimensions: "Ø 38 × H 152 cm",
    care: "Dust with a dry cloth. Do not polish the brass — it is meant to patinate.",
    rating: 4.5,
    reviewCount: 63,
    tags: ["best-seller"],
  },
  {
    name: "Ember Ceramic Vase",
    category: "living-room",
    price: 89,
    image: pVaseImg,
    hoverImage: editorialMainImg,
    summary: "Hand-thrown stoneware in a speckled oat glaze.",
    description:
      "Thrown on the wheel in small batches, so no two are quite the same. The speckled oat glaze breaks warmer over the shoulder where the wall is thinnest.",
    material: "Hand-thrown stoneware · speckled oat glaze",
    dimensions: "Ø 22 × H 34 cm",
    care: "Hand wash. Watertight — no liner required.",
    options: { label: "Size", values: ["Small", "Tall"] },
    rating: 4.7,
    reviewCount: 118,
    tags: ["best-seller"],
  },
  {
    name: "Arc Wall Shelf",
    category: "home-office",
    price: 159,
    compareAt: 199,
    image: pShelvesImg,
    hoverImage: editorialSide2Img,
    summary: "Two arcs of solid oak, mounted on concealed brackets.",
    description:
      "Arc is a pair of curved oak shelves that hold books, ceramics or the everyday objects you actually want on show. Concealed brackets keep the wall line uninterrupted.",
    material: "Solid oak · concealed steel brackets",
    dimensions: "Each shelf W 90 × D 20 × H 5 cm",
    care: "Dust with a dry cloth. Check fixings twice a year.",
    options: { label: "Finish", values: ["Natural oak", "Blackened oak"] },
    rating: 4.6,
    reviewCount: 54,
    tags: ["best-seller"],
    inStock: false,
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = seeds.map((seed, index) => ({
  id: `m-${index + 1}`,
  slug: slugify(seed.name),
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
    "Designed in-house and made to order in short runs",
    "Frame and finishes covered by a 10-year structural guarantee",
    "Delivered flat-packed or assembled by our own team",
    "Free returns within 30 days, collection arranged for you",
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
    title: "Free Shipping",
    body: "On orders over $100",
    icon: "truck" as const,
  },
  {
    title: "Secure Payment",
    body: "100% secure checkout",
    icon: "shield" as const,
  },
  {
    title: "Premium Quality",
    body: "Crafted with care",
    icon: "gem" as const,
  },
  {
    title: "24/7 Support",
    body: "We're here to help",
    icon: "headset" as const,
  },
];

export const testimonials: Review[] = [
  {
    id: "t1",
    author: "Sofia Lindqvist",
    rating: 5,
    date: "Copenhagen",
    title: "Transformed the room",
    body: "Beautiful quality and even better in person. The sofa completely transformed our living room.",
    verified: true,
  },
  {
    id: "t2",
    author: "Daniel Reyes",
    rating: 5,
    date: "London",
    title: "Faultless service",
    body: "Exceptional design, fast delivery and excellent customer service.",
    verified: true,
  },
  {
    id: "t3",
    author: "Amara Kone",
    rating: 5,
    date: "Lyon",
    title: "Our favourite store",
    body: "The attention to detail is incredible. MODERNO has become our favorite furniture store.",
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
  { id: "h1", label: "Sofa", productSlug: "luna-3-seater-sofa", x: 27, y: 56 },
  { id: "h2", label: "Coffee Table", productSlug: "nova-coffee-table", x: 55, y: 74 },
  { id: "h3", label: "Floor Lamp", productSlug: "solene-floor-lamp", x: 84, y: 33 },
  { id: "h4", label: "Accent Chair", productSlug: "elle-accent-chair", x: 13, y: 45 },
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
    title: "The quiet power of negative space",
    excerpt:
      "Why the most restful rooms are the least crowded — and how to decide what to take out rather than what to add.",
    category: "Interiors",
    date: "02 October 2026",
    readingTime: "5 min read",
    image: editorialMainImg,
  },
  {
    slug: "sourcing-oak-a-note-from-the-workshop",
    title: "Sourcing oak: a note from the workshop",
    excerpt:
      "Every plank we buy is traced to a managed European forest. Here is what that actually means for the grain you see.",
    category: "Craft",
    date: "18 September 2026",
    readingTime: "7 min read",
    image: journalImg,
  },
  {
    slug: "layering-light-in-a-modern-living-room",
    title: "Layering light in a modern living room",
    excerpt:
      "Three sources, three heights, one dimmer. A simple framework for lighting a room so it works all day.",
    category: "Guides",
    date: "04 September 2026",
    readingTime: "4 min read",
    image: storyImg,
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

export const discountPercent = (product: Product) =>
  product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
