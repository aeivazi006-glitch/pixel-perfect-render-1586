import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — MODERNO" },
      {
        name: "description",
        content:
          "MODERNO designs and makes premium modern furniture in short runs, working with a small group of workshops across Portugal, Spain and Denmark.",
      },
      { property: "og:title", content: "About MODERNO" },
      {
        property: "og:description",
        content: "Furniture with a sense of place — designed in-house, made in short runs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "Proportion before ornament",
    body: "Every piece is drawn to sit well beside the next one, so a room can be built over years rather than bought in a weekend.",
  },
  {
    title: "Materials you can trace",
    body: "Managed European oak, aniline-dyed leather, unlacquered brass and stoneware. Nothing synthetic pretending otherwise.",
  },
  {
    title: "Made to be repaired",
    body: "Covers unzip, slats lift out and hardware is standard. Furniture should outlast the trend that sold it to you.",
  },
];

function AboutPage() {
  return (
    <div className="pb-4">
      <section className="shell grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <p className="eyebrow">Our story</p>
          <h1 className="display-lg mt-4 text-balance">
            A house of quiet furniture, made slowly.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            MODERNO began in a single sunlit workshop in Lisbon, making one sofa at a time for people
            who could not find anything low enough, soft enough and simple enough. Twenty years on,
            we still work the same way: a small group of workshops in Portugal, Spain and Denmark,
            short runs, and no seasonal churn.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            We believe great furniture should do more than fill a room. It should create atmosphere,
            support everyday living and become part of the stories made at home.
          </p>
          <Link
            to="/shop"
            className="mt-9 inline-flex rounded-full bg-primary px-8 py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Shop the collection
          </Link>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen lg:aspect-4/5">
          <img
            src={images.story}
            alt="Calm living room with pale seating, a fireplace and soft afternoon light"
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
      </section>

      <Reveal as="section" className="border-y border-border bg-linen/70">
        <div className="shell grid gap-10 py-20 md:grid-cols-3 md:py-24">
          {principles.map((item) => (
            <div key={item.title}>
              <h2 className="display-md">{item.title}</h2>
              <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="shell grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen">
          <img
            src={images.editorialMain}
            alt="Neutral living room styled with layered natural light and greenery"
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <div className="max-w-md">
          <p className="eyebrow">The studio</p>
          <h2 className="display-lg mt-4">Visit us in Lisbon</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Our showroom and workshop are open by appointment on Thursdays and Fridays. Bring a plan
            of your room and we will help you with sizes, finishes and spacing — no obligation, no
            showroom theatre.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex text-[0.68rem] tracking-[0.18em] uppercase link-underline"
          >
            Book a visit
          </Link>
        </div>
      </section>
    </div>
  );
}
