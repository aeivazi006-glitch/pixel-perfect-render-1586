import { createFileRoute } from "@tanstack/react-router";

import { TechBenefits } from "@/components/TechBenefits";
import { TechCategoryRow } from "@/components/TechCategoryRow";
import { TechHero } from "@/components/TechHero";
import { TechIdeas } from "@/components/TechIdeas";
import { TechPromo } from "@/components/TechPromo";
import { TechTrending } from "@/components/TechTrending";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechVerse — Premium Tech Gadgets, Audio & Wearables" },
      {
        name: "description",
        content:
          "Shop premium tech gadgets: headphones, smartwatches, drones and accessories. Curated for people who upgrade their everyday.",
      },
      { property: "og:title", content: "TechVerse — Latest Tech That Upgrades Your Lifestyle" },
      {
        property: "og:description",
        content:
          "Cutting-edge gadgets, handpicked essentials and free express shipping over $99.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechVerseHome,
});

function TechVerseHome() {
  return (
    <>
      <TechHero />
      <TechCategoryRow />
      <TechTrending />
      <TechBenefits />
      <TechIdeas />
      <TechPromo />
    </>
  );
}
