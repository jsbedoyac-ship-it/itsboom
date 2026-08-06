"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Brain, Droplets, Flame, HeartPulse, Waves, Zap, type LucideIcon } from "lucide-react";
import { ingredientBenefits } from "@/lib/flavors";
import { cn } from "@/lib/utils";

const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

const VIDEO_SRC = "/video-can-clean.mp4";
const POSTER_SRC = "/video-can-poster.jpg";
const VIDEO_WIDTH = 520;
const VIDEO_HEIGHT = 1280;

// Fades the video's own black backdrop toward the edges so only the can
// (plus a soft glow) reads against the page background.
const BACKDROP_MASK =
  "radial-gradient(ellipse 62% 70% at 45% 48%, black 45%, transparent 84%)";

const ICONS: LucideIcon[] = [Zap, Droplets, Flame, Waves, HeartPulse, Brain];

const accentCycle = ["text-pink", "text-gold", "text-green", "text-purple"] as const;

/**
 * Hero: the can stays pinned in view while scrolling scrubs the product
 * video's currentTime and, in lockstep, cycles through the ingredient
 * benefits beside it (one per scroll segment) — same beat as a
 * scroll-scrubbed benefits hero. Touch devices skip the pin/scrub (same
 * currentTime-seek issue documented below) and get a normal-height video
 * plus a static ingredients grid instead.
 */
export function CanIngredientsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const scrubEnabled = hasFinePointer && !shouldReduceMotion;
  const count = ingredientBenefits.length;

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (!scrubEnabled) {
      const tryPlay = () => video.play().catch(() => {});
      tryPlay();

      // The very first autoplay attempt can silently fail on some mobile
      // browsers (notably Safari in Private Browsing) even though it's
      // muted+inline — retry a few times shortly after in case it was just
      // a startup race, and again on the first real interaction, which
      // reliably unlocks playback if it was actually policy-blocked.
      const timeouts = [100, 500, 1500].map((delay) =>
        window.setTimeout(() => {
          if (video.paused) tryPlay();
        }, delay)
      );

      const retryEvents: Array<keyof WindowEventMap> = ["touchstart", "scroll", "click"];
      const retry = () => {
        if (video.paused) tryPlay();
        retryEvents.forEach((evt) => window.removeEventListener(evt, retry));
      };
      retryEvents.forEach((evt) => window.addEventListener(evt, retry, { once: true, passive: true }));

      return () => {
        timeouts.forEach((id) => window.clearTimeout(id));
        retryEvents.forEach((evt) => window.removeEventListener(evt, retry));
      };
    }

    video.pause();
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + window.innerHeight * count,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
          const idx = Math.min(count - 1, Math.floor(self.progress * count));
          setActiveIndex(idx);
        },
      });

      if (video.readyState < 1) {
        video.addEventListener("loadedmetadata", () => trigger.refresh(), { once: true });
      }
    }, section);

    return () => ctx.revert();
  }, [scrubEnabled, count]);

  const active = ingredientBenefits[activeIndex];
  const ActiveIcon = ICONS[activeIndex % ICONS.length];
  const activeAccent = accentCycle[activeIndex % accentCycle.length];

  const video = (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      poster={POSTER_SRC}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      muted
      loop={!scrubEnabled}
      autoPlay={!scrubEnabled}
      playsInline
      preload="auto"
      className={cn(
        "w-auto max-w-none object-contain",
        scrubEnabled ? "h-full" : "mx-auto h-[52vh] sm:h-[60vh]"
      )}
      style={{
        maskImage: BACKDROP_MASK,
        WebkitMaskImage: BACKDROP_MASK,
      }}
    />
  );

  return (
    <section ref={sectionRef} className="relative bg-background">
      {scrubEnabled ? (
        <div className="flex h-screen w-full items-center overflow-hidden">
          <div className="flex h-full w-1/2 items-center justify-center sm:w-2/5">
            {video}
          </div>

          <div className="w-1/2 px-5 sm:w-3/5 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                    Ingrediente {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </p>
                  <ActiveIcon className={cn("mt-5 size-9", activeAccent)} aria-hidden="true" />
                  <h3 className="font-display mt-4 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                    {active.label}
                  </h3>
                  <p className={cn("mt-1 text-lg font-bold", activeAccent)}>{active.value}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex gap-2">
                {ingredientBenefits.map((item, i) => (
                  <span
                    key={item.label}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      i === activeIndex ? "bg-gold" : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-10 py-14">
          {video}

          <div className="grid w-full grid-cols-2 gap-3 px-5 sm:px-8">
            {ingredientBenefits.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-surface p-4"
                >
                  <Icon
                    className={cn("size-5", accentCycle[i % accentCycle.length])}
                    aria-hidden="true"
                  />
                  <p className="font-display mt-3 text-sm font-black uppercase tracking-tight">
                    {item.label}
                  </p>
                  <p className={cn("text-xs font-bold", accentCycle[i % accentCycle.length])}>
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
