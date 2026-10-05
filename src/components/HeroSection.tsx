import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-editorial.jpg";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-linen">
      <img
        src={heroImg}
        alt="Sunlit living room with a gallery wall of framed art prints"
        width={1600}
        height={1104}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent" />
      <div className="shell relative flex min-h-[78svh] flex-col justify-end py-16 md:min-h-[86svh] md:justify-center md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">New season · Spring edit</p>
          <h1 className="display-xl mt-5">Make Your Space Your Own</h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Curated accessories, art and decor for spaces with personality.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              Shop Collection
            </Link>
            <Link
              to="/wall-art"
              className="border border-foreground/25 px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Explore Wall Art
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
