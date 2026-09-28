import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Étage" },
      {
        name: "description",
        content:
          "Questions about framing, sizing, delivery or a studio visit? Contact the Maison Étage team in Lisbon.",
      },
      { property: "og:title", content: "Contact — Maison Étage" },
      { property: "og:description", content: "Talk to our team about framing, sizing and delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="shell grid gap-14 py-14 md:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="display-lg mt-4">We answer within one working day.</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Framing questions, sizing advice, delivery timelines or a wholesale enquiry — write to us
          and a real person will reply.
        </p>

        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} />
            hello@maisonetage.com
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} />
            +351 210 000 000
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} />
            Studio 4, 18 Rue des Arts, Lisbon
          </li>
          <li className="flex items-start gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-clay" strokeWidth={1.5} />
            Monday to Friday, 9:00–18:00 WET
          </li>
        </ul>
      </div>

      <form
        className="bg-linen p-7 md:p-10"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <h2 className="display-md">Send a message</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <Field label="Name" name="name" />
          <Field label="Email" name="email" type="email" />
          <Field label="Subject" name="subject" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label htmlFor="message" className="eyebrow">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-2 w-full border-b border-input bg-transparent pb-2 text-sm outline-none focus:border-foreground"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-9 bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
        >
          Send message
        </button>
        {sent && (
          <p aria-live="polite" className="mt-5 text-sm text-muted-foreground">
            Thank you — your message is with the studio. We'll reply within one working day.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  className,
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border-b border-input bg-transparent pb-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
