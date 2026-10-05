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
      { title: "TechVerse | جدیدترین گجت‌های تکنولوژی" },
      {
        name: "description",
        content:
          "جدیدترین محصولات دیجیتال را برای تجربه‌ای هوشمندتر کشف کنید: هدفون، ساعت هوشمند، پهپاد و لوازم جانبی با ارسال سریع.",
      },
      { property: "og:title", content: "TechVerse | تکنولوژی برای زندگی بهتر" },
      {
        property: "og:description",
        content: "گجت‌های پیشرفته، دست‌چین‌شده و آماده ارسال سریع به سراسر ایران.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fa_IR" },
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
