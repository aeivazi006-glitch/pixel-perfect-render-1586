import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Star, Truck } from "lucide-react";

import { heroSlides, regions } from "@/data/techverse";
import { cn } from "@/lib/utils";

/*
 * Scroll-driven 3D hero.
 *
 * The clip is SCRUBBED by the page scroll — it is never played. The hero viewport
 * is pinned (position: sticky) inside a tall section, and the scroll progress
 * through that section maps linearly onto the video timeline (0 → 0, 1 → duration,
 * both directions). `currentTime` is only ever written inside a single
 * requestAnimationFrame loop, after exponential smoothing, so the frame stays glued
 * to the scroll without jerking. Nothing here touches React state per scroll tick.
 *
 * Seeking performance is an encoding property, not a code property. Preferred:
 *   - frequent keyframes (short GOP, ideally all-intra) → any seek is O(1);
 *   - modest resolution/bitrate and browser-friendly H.264 with +faststart
 *     (moov atom first) so byte-range requests start instantly.
 * The supplied clip had ONE keyframe for all 96 frames, so every random seek had
 * to decode from frame 0 — guaranteed stutter. `public/hero-3d.mp4` is therefore
 * re-encoded all-intra (every frame an I-frame) at 720p, ~2 MB. A VP9/WebM variant
 * was also produced but came out larger (3.6 MB) and no faster to seek, so it was
 * dropped for the smaller, universally supported MP4.
 */

const SCROLL_VH = 300; // vertical scroll length of the pinned hero
const SMOOTHING = 0.16; // per-frame lerp factor toward the target progress
const TIME_EPSILON = 0.004; // min seek delta (s) before writing currentTime
const TEXT_FADE_END = 0.25; // progress by which the copy has fully faded
const POSTER = "/hero-3d-poster.jpg";
const VIDEO_SRC = "/hero-3d.mp4";

export function TechHero() {
  const slide = heroSlides[0];

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Rendered state only — changes a handful of times, never per scroll tick.
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Mutable, render-free state driving the animation loop.
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const lastApplied = useRef(-1);
  const readyRef = useRef(false);
  const runningRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  // --- Animation loop: smooth toward the target and write the video frame. ---
  useEffect(() => {
    const tick = () => {
      runningRef.current = 0;
      if (reducedRef.current) return;

      const target = targetProgress.current;
      let progress = smoothProgress.current;
      progress += (target - progress) * SMOOTHING;
      if (Math.abs(target - progress) < 0.0005) progress = target;
      smoothProgress.current = progress;

      const video = videoRef.current;
      if (video && readyRef.current && !failed && video.duration) {
        const time = progress * video.duration;
        // Only seek when the target moved meaningfully — avoids seek flooding.
        if (Math.abs(time - lastApplied.current) > TIME_EPSILON) {
          lastApplied.current = time;
          video.currentTime = time;
        }
      }

      const text = textRef.current;
      if (text) {
        const fade = Math.min(progress / TEXT_FADE_END, 1);
        text.style.opacity = (1 - fade).toFixed(3);
        text.style.transform = `translate3d(0, ${(-progress * 40).toFixed(2)}px, 0)`;
        text.style.pointerEvents = fade >= 1 ? "none" : "";
      }

      if (progress !== target) {
        runningRef.current = requestAnimationFrame(tick);
      }
    };

    const ensureLoop = () => {
      if (!runningRef.current) runningRef.current = requestAnimationFrame(tick);
    };

    const measure = () => {
      const section = sectionRef.current;
      if (!section) return;
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) {
        targetProgress.current = 0;
        return;
      }
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), total);
      targetProgress.current = scrolled / total;
      ensureLoop();
    };

    measure();

    if (reduced) {
      // Reduced motion: show a static first frame, no scroll scrubbing.
      smoothProgress.current = 0;
      lastApplied.current = 0;
      const video = videoRef.current;
      if (video && readyRef.current) video.currentTime = 0;
      const text = textRef.current;
      if (text) {
        text.style.opacity = "1";
        text.style.transform = "";
        text.style.pointerEvents = "";
      }
      return;
    }

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (runningRef.current) cancelAnimationFrame(runningRef.current);
      runningRef.current = 0;
    };
  }, [reduced, failed, ready]);

  // --- Video readiness / failure, and the initial reveal. ---
  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      setReady(true);
      if (reducedRef.current) {
        video.pause();
        video.currentTime = 0;
      }
    };

    if (video.readyState >= 3) markReady();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", () => setFailed(true));

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [failed]);

  // --- prefers-reduced-motion ---
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <section
        id="top"
        ref={sectionRef}
        className="relative"
        style={reduced ? undefined : { height: `${SCROLL_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-surface">
          {/* Fallback / first paint. Doubles as the poster so there is never a blank frame. */}
          <img
            src={POSTER}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {!failed ? (
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                ready ? "opacity-100" : "opacity-0",
              )}
              src={VIDEO_SRC}
              poster={POSTER}
              preload="auto"
              muted
              playsInline
              // Intentionally NO autoPlay and NO loop: scrolling is the only driver.
            />
          ) : null}

          {/* Very light scrim, weighted to the copy's side (start = right in RTL). */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-background/80 via-background/30 to-transparent" />

          <div
            ref={textRef}
            className="relative z-10 shell flex h-full flex-col justify-center will-change-transform"
          >
            <div
              className="max-w-xl"
              style={{ textShadow: "0 2px 22px rgba(255,255,255,0.6)" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-1.5 text-xs font-bold text-primary shadow-soft backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {slide.eyebrow}
              </span>

              <h1 className="display-xl mt-6 text-ink">
                {slide.title}
                <br />
                <span className="text-primary">{slide.titleAccent}</span>
                {slide.titleRest}
              </h1>

              <p className="mt-6 max-w-lg text-[1.0625rem] leading-loose text-body">
                {slide.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#trending"
                  className="group inline-flex h-13 items-center gap-2 rounded-full bg-primary px-7 text-sm font-bold text-primary-foreground shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  خرید کنید
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </a>
                <a
                  href="#categories"
                  className="inline-flex h-13 items-center rounded-full border border-border bg-background px-7 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
                >
                  مشاهده محصولات
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <Star key={dot} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </span>
                <span className="font-semibold text-ink">۴٫۹</span>
                <span className="text-muted-foreground">{slide.stats}</span>
              </div>
            </div>
          </div>

          {/* Minimal loading state — no large spinner. */}
          {!ready && !failed ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 flex justify-center">
              <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-4 py-2 text-xs font-semibold text-body shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                در حال آماده‌سازی تجربه سه‌بعدی…
              </span>
            </div>
          ) : null}
        </div>
      </section>

      <div className="shell relative py-8">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[24px] border border-border bg-background/85 px-5 py-4 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center gap-2.5">
            {regions.map((item) => (
              <span
                key={item.code}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink"
              >
                <span aria-hidden="true">{item.flag}</span>
                {item.label}
              </span>
            ))}
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              ارسال به بیش از ۴۰ کشور جهان
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-ink">
            <Truck className="h-5 w-5 text-primary" />
            ارسال سریع
          </span>
        </div>
      </div>
    </>
  );
}
