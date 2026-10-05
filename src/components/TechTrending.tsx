import { trendingProducts } from "@/data/techverse";
import { Reveal } from "@/components/Reveal";
import { TechProductCard } from "@/components/TechProductCard";
import { TechSectionHead } from "@/components/TechSectionHead";

export function TechTrending() {
  return (
    <section id="trending" className="shell py-14 lg:py-20">
      <TechSectionHead
        eyebrow="Most wanted this week"
        title="Trending Products"
        description="The gadgets our customers keep coming back for — rated by thousands of verified buyers."
        action={{ label: "View all", href: "#categories" }}
      />

      <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
        {trendingProducts.map((product, i) => (
          <Reveal key={product.id} delay={i * 60} className="h-full">
            <TechProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
