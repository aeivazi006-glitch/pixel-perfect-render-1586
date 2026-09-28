/**
 * Content layer. All store content lives here so it can later be swapped for a
 * WooCommerce/WordPress REST source without touching UI components.
 */
import accessoriesImg from "@/assets/cat-accessories.jpg";
import wallArtImg from "@/assets/cat-wallart.jpg";
import decorImg from "@/assets/cat-decor.jpg";
import postersImg from "@/assets/cat-posters.jpg";
import giftsImg from "@/assets/cat-gifts.jpg";
import editorialImg from "@/assets/editorial-banner.jpg";
import lifestyleImg from "@/assets/lifestyle-1.jpg";
import heroImg from "@/assets/hero-editorial.jpg";

export const images = {
  hero: heroImg,
  editorial: editorialImg,
  lifestyle: lifestyleImg,
  accessories: accessoriesImg,
  wallArt: wallArtImg,
  posters: postersImg,
  decor: decorImg,
  gifts: giftsImg,
};

export type CategorySlug = "accessories" | "wall-art" | "posters" | "home-decor" | "gifts";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "accessories",
    name: "Accessories",
    description: "Quiet jewellery, leather and eyewear made to be worn daily.",
    image: accessoriesImg,
  },
  {
    slug: "wall-art",
    name: "Wall Art",
    description: "Framed pieces that give a room its centre of gravity.",
    image: wallArtImg,
  },
  {
    slug: "posters",
    name: "Posters",
    description: "Archival prints on heavy matte paper, unframed.",
    image: postersImg,
  },
  {
    slug: "home-decor",
    name: "Home Decor",
    description: "Ceramics, stone and brass objects for shelves and tables.",
    image: decorImg,
  },
  {
    slug: "gifts",
    name: "Gifts",
    description: "Considered sets, wrapped by hand and ready to give.",
    image: giftsImg,
  },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
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
  description: string;
  details: string[];
  options?: { label: string; values: string[] };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badges?: string[];
  tags: ("new" | "best-seller")[];
  mood: "minimal" | "bold" | "urban" | "warm" | "monochrome";
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
    "March 2026",
    "Better than the photos",
    "Arrived beautifully packaged and the quality is genuinely lovely. It has changed the whole corner of the room.",
  ),
  review(
    "r2",
    "Jonas P.",
    4,
    "February 2026",
    "Warm and understated",
    "Exactly the muted tone I hoped for. Shipping took a few days longer than expected, still worth it.",
  ),
  review(
    "r3",
    "Priya R.",
    5,
    "January 2026",
    "Gifted twice already",
    "I bought one for myself and two as gifts. Everyone assumed it came from a gallery shop.",
  ),
];

type Seed = {
  name: string;
  category: CategorySlug;
  price: number;
  compareAt?: number;
  image: string;
  hoverImage: string;
  description: string;
  options?: { label: string; values: string[] };
  mood: Product["mood"];
  tags: Product["tags"];
  rating: number;
  reviewCount: number;
  inStock?: boolean;
};

const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? "Shop";

const seeds: Seed[] = [
  {
    name: "Hammered Coin Pendant",
    category: "accessories",
    price: 68,
    compareAt: 85,
    image: accessoriesImg,
    hoverImage: lifestyleImg,
    description:
      "A hand-hammered brass coin on a fine chain. The surface catches light differently through the day, so it never reads flat.",
    options: { label: "Length", values: ['16"', '18"', '20"'] },
    mood: "minimal",
    tags: ["best-seller"],
    rating: 4.8,
    reviewCount: 126,
  },
  {
    name: "Soft Leather Card Holder",
    category: "accessories",
    price: 54,
    image: accessoriesImg,
    hoverImage: giftsImg,
    description:
      "Four slots, one slim profile. Vegetable-tanned leather that darkens into its own patina after a few weeks in a pocket.",
    options: { label: "Colour", values: ["Chestnut", "Black", "Sand"] },
    mood: "warm",
    tags: ["best-seller"],
    rating: 4.7,
    reviewCount: 88,
  },
  {
    name: "Tortoise Frame Sunglasses",
    category: "accessories",
    price: 128,
    compareAt: 150,
    image: accessoriesImg,
    hoverImage: lifestyleImg,
    description:
      "An oval acetate frame with warm tortoise marbling and gradient lenses. Light enough to forget you are wearing them.",
    mood: "urban",
    tags: ["new"],
    rating: 4.6,
    reviewCount: 41,
  },
  {
    name: "Arches Triptych, Framed",
    category: "wall-art",
    price: 295,
    compareAt: 340,
    image: wallArtImg,
    hoverImage: editorialImg,
    description:
      "Three abstract panels in sand, ink and bone, framed in solid light oak with museum-grade glazing. Sold as a set of three.",
    options: { label: "Frame", values: ["Light oak", "Walnut", "Black ash"] },
    mood: "minimal",
    tags: ["best-seller"],
    rating: 4.9,
    reviewCount: 212,
  },
  {
    name: "Pastoral Study, Framed Print",
    category: "wall-art",
    price: 165,
    image: editorialImg,
    hoverImage: wallArtImg,
    description:
      "A soft-focus landscape in sepia, printed on cotton rag and framed behind glass with a generous mat.",
    options: { label: "Size", values: ['12 × 16"', '18 × 24"', '24 × 36"'] },
    mood: "warm",
    tags: ["new", "best-seller"],
    rating: 4.8,
    reviewCount: 97,
  },
  {
    name: "Quiet Forms No. 4",
    category: "posters",
    price: 42,
    image: postersImg,
    hoverImage: wallArtImg,
    description:
      "Archival pigment print on 240gsm matte paper. Unframed, with a 15mm border for easy framing at home.",
    options: { label: "Size", values: ["A3", "A2", "50 × 70cm"] },
    mood: "monochrome",
    tags: ["new"],
    rating: 4.7,
    reviewCount: 64,
  },
  {
    name: "Ink Horizon Poster",
    category: "posters",
    price: 38,
    compareAt: 48,
    image: postersImg,
    hoverImage: editorialImg,
    description:
      "A single charcoal horizon over warm paper. Understated on its own, excellent in a pair.",
    options: { label: "Size", values: ["A3", "A2", "50 × 70cm"] },
    mood: "monochrome",
    tags: ["best-seller"],
    rating: 4.5,
    reviewCount: 52,
  },
  {
    name: "Speckled Stoneware Vase",
    category: "home-decor",
    price: 74,
    image: decorImg,
    hoverImage: lifestyleImg,
    description:
      "Thrown by hand in a small studio, glazed in a speckled oat white. Holds water; perfect for one dramatic stem.",
    options: { label: "Size", values: ["Small", "Tall"] },
    mood: "minimal",
    tags: ["best-seller"],
    rating: 4.9,
    reviewCount: 148,
  },
  {
    name: "Travertine Catch Tray",
    category: "home-decor",
    price: 92,
    compareAt: 110,
    image: decorImg,
    hoverImage: giftsImg,
    description:
      "Solid travertine with an unfilled, open grain. For keys and rings by the door, or candles on a table.",
    mood: "warm",
    tags: ["new"],
    rating: 4.8,
    reviewCount: 73,
  },
  {
    name: "Brass Tealight Holder",
    category: "home-decor",
    price: 34,
    image: lifestyleImg,
    hoverImage: decorImg,
    description:
      "Turned solid brass, left unlacquered so it ages into a deeper tone. Sold individually; best in threes.",
    mood: "bold",
    tags: ["best-seller"],
    rating: 4.6,
    reviewCount: 61,
    inStock: false,
  },
  {
    name: "Calm Hours Gift Set",
    category: "gifts",
    price: 88,
    compareAt: 105,
    image: giftsImg,
    hoverImage: decorImg,
    description:
      "A ceramic soy candle, a dried bouquet and a letterpress card in a hand-tied linen ribbon box. Gift note included.",
    mood: "warm",
    tags: ["new", "best-seller"],
    rating: 4.9,
    reviewCount: 183,
  },
  {
    name: "Studio Desk Gift Box",
    category: "gifts",
    price: 116,
    image: lifestyleImg,
    hoverImage: giftsImg,
    description:
      "Brass pen, linen-bound notebook and a small framed print, boxed together for someone who works beautifully.",
    mood: "urban",
    tags: ["new"],
    rating: 4.7,
    reviewCount: 39,
  },
];

export const products: Product[] = seeds.map((seed, index) => {
  const slug = seed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return {
    id: `p-${index + 1}`,
    slug,
    name: seed.name,
    category: seed.category,
    categoryName: categoryName(seed.category),
    price: seed.price,
    compareAt: seed.compareAt,
    image: seed.image,
    hoverImage: seed.hoverImage,
    gallery: [seed.image, seed.hoverImage, editorialImg, lifestyleImg],
    description: seed.description,
    details: [
      "Made in small batches by independent studios",
      "Materials responsibly sourced and fully traceable",
      "Ships in plastic-free, recycled packaging",
      "Free carbon-neutral delivery on orders over $120",
    ],
    options: seed.options,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    inStock: seed.inStock !== false,
    tags: seed.tags,
    mood: seed.mood,
    reviews: baseReviews,
  };
});

export const moods = [
  { slug: "minimal", name: "Minimal", image: postersImg },
  { slug: "bold", name: "Bold", image: wallArtImg },
  { slug: "urban", name: "Urban", image: lifestyleImg },
  { slug: "warm", name: "Warm", image: editorialImg },
  { slug: "monochrome", name: "Monochrome", image: decorImg },
] as const;

export const galleryImages = [
  lifestyleImg,
  editorialImg,
  decorImg,
  accessoriesImg,
  postersImg,
  giftsImg,
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);

export const newArrivals = products.filter((p) => p.tags.includes("new"));

export const bestSellers = products.filter((p) => p.tags.includes("best-seller"));

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.categoryName, p.description, p.mood].join(" ").toLowerCase().includes(q),
  );
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export const discountPercent = (product: Product) =>
  product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
