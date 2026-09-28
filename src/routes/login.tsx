import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { images } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login or Register — Maison Étage" },
      {
        name: "description",
        content: "Sign in to track orders and saved pieces, or create a Maison Étage account.",
      },
      { property: "og:title", content: "Login or Register — Maison Étage" },
      { property: "og:description", content: "Sign in or create your Maison Étage account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [note, setNote] = useState("");

  return (
    <div className="grid lg:grid-cols-2">
      <img
        src={images.accessories}
        alt="Flatlay of minimal accessories"
        loading="lazy"
        className="hidden h-full w-full object-cover lg:block"
      />
      <div className="shell flex flex-col justify-center py-16 md:py-24">
        <div className="mx-auto w-full max-w-sm">
          <p className="eyebrow">Your account</p>
          <h1 className="display-lg mt-4">{mode === "login" ? "Welcome back." : "Create account"}</h1>

          <div className="mt-8 flex gap-6 border-b border-border">
            {(["login", "register"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={cn(
                  "-mb-px border-b-2 pb-3 text-[0.7rem] tracking-[0.18em] uppercase transition-colors",
                  mode === value ? "border-foreground" : "border-transparent text-muted-foreground",
                )}
              >
                {value === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              setNote(
                mode === "login"
                  ? "Accounts aren't connected yet, so sign-in is a preview only."
                  : "Registration isn't connected yet — no account was created.",
              );
            }}
          >
            {mode === "register" && <Field label="Full name" name="name" />}
            <Field label="Email" name="email" type="email" />
            <Field label="Password" name="password" type="password" />
            {mode === "register" && (
              <Field label="Confirm password" name="confirm" type="password" />
            )}

            <button
              type="submit"
              className="w-full bg-primary py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          {note && (
            <p aria-live="polite" className="mt-5 text-xs text-muted-foreground">
              {note}
            </p>
          )}

          <p className="mt-8 text-sm text-muted-foreground">
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="link-underline text-foreground"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
          <p className="mt-3 text-sm">
            <Link to="/account" className="link-underline text-muted-foreground">
              Go to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
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
