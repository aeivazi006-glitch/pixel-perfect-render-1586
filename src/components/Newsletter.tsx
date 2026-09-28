import { useState } from "react";
import { cn } from "@/lib/utils";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  };

  return (
    <form onSubmit={submit} className={cn(compact ? "mt-5" : "mt-8 w-full max-w-md")}>
      <label htmlFor={compact ? "footer-email" : "news-email"} className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-3 border-b border-input pb-2">
        <input
          id={compact ? "footer-email" : "news-email"}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="shrink-0 text-[0.7rem] tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
        >
          Subscribe
        </button>
      </div>
      <p
        aria-live="polite"
        className={cn(
          "mt-3 text-xs text-muted-foreground transition-opacity",
          done ? "opacity-100" : "opacity-0",
        )}
      >
        Thank you — look for our next edit in your inbox.
      </p>
    </form>
  );
}
