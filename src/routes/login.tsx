import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { images } from "@/data/catalog";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — MODERNO" },
      { name: "description", content: "Sign in to your MODERNO account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="shell grid gap-12 py-12 md:py-16 lg:grid-cols-2 lg:gap-20">
      <div className="max-w-md">
        <p className="eyebrow">Account</p>
        <h1 className="display-lg mt-4">Welcome back</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Sign in to follow orders, revisit your wishlist and keep your delivery details on file.
        </p>

        <form
          className="mt-9 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label htmlFor="login-email" className="eyebrow">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="eyebrow">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-4 text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-88"
          >
            Sign in
          </button>
          {sent && (
            <p aria-live="polite" className="text-sm text-muted-foreground">
              Check your inbox — we've sent a secure sign-in link.
            </p>
          )}
        </form>

        <p className="mt-7 text-sm text-muted-foreground">
          New to MODERNO?{" "}
          <Link to="/shop" className="link-underline text-foreground">
            Start with the collection
          </Link>
          .
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-lg bg-linen lg:block">
        <img
          src={images.editorialMain}
          alt="Neutral modern living room with layered natural light"
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
