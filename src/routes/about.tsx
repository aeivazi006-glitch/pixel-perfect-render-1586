import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره ما | مدرنو" },
      {
        name: "description",
        content:
          "مدرنو مبلمان مدرن و ممتاز را در سری‌های محدود طراحی و تولید می‌کند، با همکاری گروهی کوچک از کارگاه‌ها.",
      },
      { property: "og:title", content: "درباره مدرنو" },
      {
        property: "og:description",
        content: "مبلمانی با حسِ مکان — طراحی در استودیوی خودمان، ساخت در سری‌های محدود.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "تناسبات پیش از تزئین",
    body: "هر قطعه طوری طراحی شده که در کنار قطعه بعدی درست بنشیند؛ پس یک فضا در طول سال‌ها ساخته می‌شود، نه در یک آخر هفته.",
  },
  {
    title: "متریالی که می‌توانید ردیابی کنید",
    body: "بلوط مدیریت‌شده، چرم آنیلین، برنج بدون لاک و سفال دست‌ساز. هیچ متریال مصنوعی‌ای که خودش را چیز دیگری جا بزند.",
  },
  {
    title: "ساخته‌شده برای تعمیر",
    body: "روکش‌ها باز می‌شوند، نواره‌ها درمی‌آیند و یراق‌ها استانداردند. مبلمان باید بیشتر از مُدِ روز عمر کند.",
  },
];

function AboutPage() {
  return (
    <div className="pb-4">
      <section className="shell grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <p className="eyebrow">داستان ما</p>
          <h1 className="display-lg mt-4">خانه‌ای از مبلمان آرام، ساخته‌شده با صبر.</h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            مدرنو در یک کارگاه آفتاب‌گیر به دنیا آمد، در حالی که هر بار تنها یک مبل می‌ساخت؛ برای
            کسانی که هیچ‌چیز به‌قدر کافی کوتاه، به‌قدر کافی نرم و به‌قدر کافی ساده پیدا نمی‌کردند.
            بیست سال بعد، هنوز همان‌گونه کار می‌کنیم: چند کارگاه کوچک، سری‌های محدود و بدون تولید
            فصلی بی‌هدف.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            باور داریم مبلمان خوب باید بیشتر از پر کردن اتاق کار کند. باید فضا بسازد، زندگی روزمره
            را راحت‌تر کند و بخشی از خاطراتی شود که در خانه ساخته می‌شوند.
          </p>
          <Link
            to="/shop"
            className="mt-9 inline-flex rounded-full bg-primary px-8 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
          >
            مشاهده مجموعه
          </Link>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-lg bg-linen lg:aspect-4/5">
          <img
            src={images.story}
            alt="اتاق نشیمن آرام با نشیمن روشن، شومینه و نور ملایم بعدازظهر"
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
            alt="اتاق نشیمن خنثی با نور طبیعی لایه‌لایه و گیاهان"
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <div className="max-w-md">
          <p className="eyebrow">استودیو</p>
          <h2 className="display-lg mt-4">در تهران به دیدار ما بیایید</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            شوروم و کارگاه ما پنجشنبه‌ها و جمعه‌ها با هماهنگی قبلی باز است. نقشه اتاق‌تان را بیاورید
            تا در انتخاب اندازه، پرداخت و چیدمان کمک‌تان کنیم — بدون هیچ اجباری.
          </p>
          <Link
            to="/contact"
            className="link-underline mt-7 inline-flex text-[0.8rem] font-semibold"
          >
            رزرو بازدید
          </Link>
        </div>
      </section>
    </div>
  );
}
