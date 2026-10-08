import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { formatPrice, getProduct, heroVideo, images } from "@/data/catalog";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven 3D hero.
 *
 * The section is a 300vh runway with a sticky, full-viewport stage. Vertical
 * scroll position maps 0→100% onto the video timeline (scrubbed through
 * `video.currentTime` — the video is never played and never loops, so stopping
 * the scroll freezes the exact frame and reversing the scroll rewinds it).
 *
 * Performance contract:
 *  - one passive scroll listener that only records a target progress;
 *  - all seeking happens inside requestAnimationFrame, with exponential
 *    smoothing so the motion never snaps;
 *  - seeks are gated on `video.seeking` and a minimum timeline delta so the
 *    browser's seek queue can never back up (which is what causes stutter);
 *  - text fade + progress bar are written straight to the DOM via refs, so
 *    scrolling never triggers a React re-render.
 *
 * The clip ships re-encoded with a keyframe every 4 frames specifically for
 * random-access seeking (`public/video/hero-3d.mp4`).
 */

/** Share of the remaining distance applied per frame — higher is snappier. */
const SMOOTHING = 0.14;
/** Minimum timeline delta (share of duration) before a new seek is issued. */
const MIN_SEEK = 0.0012;
/** Share of the scroll used to fade the hero copy away. */
const TEXT_FADE_END = 0.3;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

export function HeroSection() {
  const runway = useRef<HTMLElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const copy = useRef<HTMLDivElement | null>(null);
  const hint = useRef<HTMLDivElement | null>(null);
  const progressBar = useRef<HTMLSpanElement | null>(null);

  const duration = useRef(0);
  const target = useRef(0);
  const shown = useRef(0);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  const featured = getProduct("luna-3-seater-sofa");

  const paint = useCallback(
    (progress: number) => {
      const el = video.current;
      if (el && !failed && duration.current > 0) {
        const time = progress * Math.max(0, duration.current - 0.05);
        if (!el.seeking && Math.abs(el.currentTime - time) > duration.current * MIN_SEEK) {
          el.currentTime = time;
        }
      }

      const copyEl = copy.current;
      if (copyEl) {
        const fade = clamp01(1 - progress / TEXT_FADE_END);
        copyEl.style.opacity = String(fade);
        copyEl.style.transform = `translate3d(${(1 - fade) * -30}px, 0, 0)`;
        copyEl.style.visibility = fade < 0.02 ? "hidden" : "visible";
      }

      if (hint.current) hint.current.style.opacity = String(clamp01(1 - progress * 5));
      if (progressBar.current) progressBar.current.style.transform = `scaleX(${progress})`;
    },
    [failed],
  );

  /* Respect prefers-reduced-motion — a static frame replaces the cinematic scrub. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Video bootstrapping: metadata, first frame, readiness and failure. */
  useEffect(() => {
    const el = video.current;
    if (!el) return;

    const onMetadata = () => {
      duration.current = Number.isFinite(el.duration) ? el.duration : 0;
      // Forces the browser to decode and paint frame 0 rather than the poster.
      try {
        el.currentTime = 0.001;
      } catch {
        /* ignore — some browsers reject an early seek */
      }
    };
    const onData = () => setReady(true);
    const onError = () => {
      setFailed(true);
      setReady(true);
    };

    el.addEventListener("loadedmetadata", onMetadata);
    el.addEventListener("loadeddata", onData);
    el.addEventListener("error", onError);

    /* The <video> is server-rendered, so it can already be past these events by
       the time hydration attaches the listeners. Catch up on the state it has
       reached — readiness gates scrubbing only, never a visible loader. */
    if (el.readyState >= 1) onMetadata();
    if (el.readyState >= 2) onData();

    return () => {
      el.removeEventListener("loadedmetadata", onMetadata);
      el.removeEventListener("loadeddata", onData);
      el.removeEventListener("error", onError);
    };
  }, []);

  /* The scrub engine: passive scroll → target progress → rAF → currentTime. */
  useEffect(() => {
    const section = runway.current;
    if (!section) return;

    if (reduced) {
      paint(0);
      return;
    }

    let frame = 0;
    let running = false;

    const step = () => {
      const distance = target.current - shown.current;
      if (Math.abs(distance) < 0.0005) {
        shown.current = target.current;
        paint(shown.current);
        running = false;
        frame = 0;
        return;
      }
      shown.current += distance * SMOOTHING;
      paint(shown.current);
      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(step);
    };

    const measure = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      target.current =
        scrollable > 0 ? clamp01(-section.getBoundingClientRect().top / scrollable) : 0;
      start();
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [paint, reduced]);

  return (
    <section
      ref={runway}
      aria-labelledby="hero-heading"
      className={cn("relative isolate", reduced ? "h-[100svh]" : "hero-runway")}
    >
      <div className="hero-stage bg-linen">
        {/* Showcase frame — decorative, the copy carries the meaning. */}
        {!failed ? (
          <video
            ref={video}
            className="absolute inset-0 size-full object-cover"
            src={heroVideo.src}
            poster={heroVideo.poster}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden
          />
        ) : (
          <img
            src={images.hero}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
        )}

        {/* Whisper-thin veil so the Persian copy stays legible over the furniture. */}
        <div aria-hidden className="hero-veil absolute inset-0" />

        <div className="relative z-10 flex h-full items-center">
          <div className="shell w-full">
            <div
              ref={copy}
              className="max-w-xl will-change-transform lg:border-s lg:border-foreground/15 lg:ps-8"
            >
              <Reveal>
                <p className="eyebrow">مجموعه پاییز ۱۴۰۵</p>
              </Reveal>

              <Reveal delay={90}>
                <h1 id="hero-heading" className="display-xl mt-4">
                  مبلمانی برای
                  <br />
                  تعریف فضای
                  <br />
                  شما
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
                  مجموعه‌ای از مبلمان مدرن و باکیفیت را کشف کنید؛ طراحی شده برای ایجاد آرامش، زیبایی
                  و شخصیت در هر گوشه از خانه شما.
                </p>
              </Reveal>

              <Reveal delay={260}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to="/shop"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-4 text-[0.8rem] font-semibold text-primary-foreground transition-opacity duration-500 hover:opacity-88"
                  >
                    مشاهده محصولات
                    <ArrowLeft
                      className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </Link>
                  <Link
                    to="/new-arrivals"
                    className="fill-sweep inline-flex items-center rounded-full border border-foreground/25 px-7 py-4 text-[0.8rem] font-semibold text-foreground transition-colors duration-500 hover:border-foreground hover:text-background"
                  >
                    محصولات جدید
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={340}>
                <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-foreground/15 pt-6">
                  {[
                    { label: "ساخت به‌سفارش", value: "۱۲ هفته" },
                    { label: "ضمانت ساختاری", value: "۱۰ سال" },
                    { label: "ارسال از", value: "تهران" },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className="text-[0.72rem] text-muted-foreground">{item.label}</dt>
                      <dd className="mt-1.5 font-display text-lg font-semibold">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Featured piece, bottom inline-end corner. */}
        {featured && ready && !failed && (
          <Link
            to="/product/$slug"
            params={{ slug: featured.slug }}
            className="absolute bottom-6 start-6 z-20 hidden items-center gap-3 rounded-xl border border-background/20 bg-background/88 p-2.5 ps-4 shadow-soft backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 md:flex"
          >
            <img
              src={featured.image}
              alt=""
              aria-hidden
              loading="lazy"
              className="size-12 rounded-lg object-cover"
            />
            <span className="min-w-[8.5rem]">
              <span className="block text-[0.7rem] text-muted-foreground">در این صحنه</span>
              <span className="mt-0.5 block text-sm leading-tight">{featured.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {formatPrice(featured.price)}
              </span>
            </span>
          </Link>
        )}

        {/* Scroll hint + scrub progress. */}
        {!reduced && (
          <div
            ref={hint}
            className="hero-hint pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2 text-center"
          >
            <span className="text-[0.75rem] text-muted-foreground">
              برای حرکت دوربین اسکرول کنید
            </span>
            <ChevronDown className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          </div>
        )}

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-px bg-foreground/10">
          <span
            ref={progressBar}
            className="block h-px origin-right bg-clay"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
