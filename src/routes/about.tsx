import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Maison Étage" },
      {
        name: "description",
        content:
          "Maison Étage is a small curated house of art and objects, working with independent studios on short runs made to live with for years.",
      },
      { property: "og:title", content: "About Maison Étage" },
      {
        property: "og:description",
        content: "A small curated house of art and objects, made in short runs with independent studios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-8">
      <section className="shell grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="max-w-lg">
          <p className="eyebrow">Our story</p>
          <h1 className="display-lg mt-4">A house of art, objects and quiet detail.</h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Maison Étage began in a single sunlit apartment in Lisbon, framing prints for friends and
            running out of wall. Today we work with a small group of independent studios across
            Portugal, Spain and Denmark on short runs of art, ceramics and accessories.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We keep collections small on purpose. Each piece has to earn its place on a shelf or a
            wall — and be good enough that you never think about replacing it.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Shop the collection
          </Link>
        </div>
        <img
          src={images.editorial}
          alt="Hanging a framed print in a sunlit room"
          loading="lazy"
          className="aspect-4/3 w-full object-cover"
        />
      </section>

      <Reveal as="section" className="bg-linen">
        <div className="shell grid gap-10 py-20 md:grid-cols-3">
          {[
            {
              title: "Made in short runs",
              body: "Fifty pieces or fewer per release, produced by the studios themselves rather than a factory floor.",
            },
            {
              title: "Materials you can trace",
              body: "Cotton rag paper, vegetable-tanned leather, unlacquered brass, stoneware and stone — nothing synthetic pretending otherwise.",
            },
            {
              title: "Packed without plastic",
              body: "Recycled board, paper tape and reinforced corners for framed pieces. Carbon-neutral delivery as standard.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="display-md">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="shell grid items-center gap-12 py-20 md:grid-cols-2">
        <img
          src={images.lifestyle}
          alt="Styled desk with brass objects and a small framed print"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <div className="max-w-md">
          <p className="eyebrow">The studio</p>
          <h2 className="display-lg mt-4">Visit us in Lisbon</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Our framing studio is open by appointment on Thursdays and Fridays. Bring a photograph of
            your wall and we'll help you choose sizes, frames and spacing.
          </p>
          <Link to="/contact" className="mt-7 inline-flex link-underline text-[0.7rem] tracking-[0.2em] uppercase">
            Book a visit
          </Link>
        </div>
      </section>
    </div>
  );
}
