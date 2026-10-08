import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/catalog";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — MODERNO" },
      {
        name: "description",
        content:
          "Interiors, craft and guides from the MODERNO studio — notes on sourcing, lighting, proportion and living well with furniture.",
      },
      { property: "og:title", content: "Journal — MODERNO" },
      {
        property: "og:description",
        content: "Interiors, craft and guides from the MODERNO studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [lead, ...rest] = journalPosts;

  return (
    <div className="shell py-10 md:py-14">
      <nav
        aria-label="Breadcrumb"
        className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">Journal</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Journal</p>
        <h1 className="display-lg mt-3 text-balance">Notes on living well with furniture</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Slow writing from the studio: how we source, how we draw a room, and what we have learned
          from twenty years of making things that are meant to last.
        </p>
      </header>

      {lead && (
        <Reveal className="mt-12">
          <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen">
              <img
                src={lead.image}
                alt={lead.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="eyebrow">
                {lead.category} · {lead.readingTime}
              </p>
              <h2 className="display-md mt-3 text-balance">{lead.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {lead.excerpt}
              </p>
              <p className="mt-5 text-xs tracking-[0.14em] uppercase text-muted-foreground">
                {lead.date}
              </p>
            </div>
          </article>
        </Reveal>
      )}

      <ul className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-2 md:gap-12">
        {rest.map((post, index) => (
          <Reveal as="li" key={post.slug} delay={index * 90}>
            <article>
              <div className="aspect-3/2 overflow-hidden rounded-lg bg-linen">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                />
              </div>
              <p className="eyebrow mt-6">
                {post.category} · {post.readingTime}
              </p>
              <h2 className="display-sm mt-2.5">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <p className="mt-4 text-xs tracking-[0.14em] uppercase text-muted-foreground">
                {post.date}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
