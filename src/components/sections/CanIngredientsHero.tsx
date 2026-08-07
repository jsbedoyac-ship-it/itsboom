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

const VIDEO_SRC = "/can-boom-reveal.mp4";
const POSTER_SRC = "/can-boom-reveal-poster.jpg";
// Native processed frame is 580x1050 — the can shot rotoscoped frame-by-frame
// (background/bokeh keyed out and repainted to the exact page background, so
// the rectangular frame edge is invisible rather than transparent) and
// played back-to-front so the IT'S BOOM face leads.
const VIDEO_ASPECT = "580/1050";
const FRAME_WIDTH = 580;
const FRAME_HEIGHT = 1050;
const FRAME_COUNT = 121;
const frameSrc = (n: number) => `/can-frames/f${String(n).padStart(3, "0")}.webp`;

const ICONS: LucideIcon[] = [Zap, Droplets, Flame, Waves, HeartPulse, Brain];

const accentCycle = ["text-pink", "text-gold", "text-green", "text-purple"] as const;

/**
 * Hero: the can stays pinned in view while scrolling scrubs through a
 * preloaded still-frame sequence (drawn to a canvas) and, in lockstep,
 * cycles through the ingredient benefits beside it. A canvas image
 * sequence is used instead of scrubbing a <video>'s currentTime because
 * rapid-fire seeks during fast scrolling can outrun the decoder — Safari
 * in particular can leave a torn, partially-decoded frame on screen
 * (reading as a black bite out of the can) instead of catching up or
 * erroring. Drawing an already-loaded HTMLImageElement is synchronous, so
 * every paint is a complete frame. Touch devices skip the pin/scrub
 * entirely and get a normal-height autoplaying video loop plus a static
 * ingredients grid instead — same bounded aspect-ratio box either way, so
 * the can is never cropped by its container.
 */
export function CanIngredientsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
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
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!scrubEnabled || !section || !canvas) return;

    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i + 1);
      return img;
    });
    framesRef.current = images;

    const ctx2d = canvas.getContext("2d");
    const drawFrame = (index: number) => {
      const img = images[index];
      if (!ctx2d || !img.complete || img.naturalWidth === 0) return;
      ctx2d.drawImage(img, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
    };

    if (images[0].complete) {
      drawFrame(0);
    } else {
      images[0].addEventListener("load", () => drawFrame(0), { once: true });
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + window.innerHeight * count,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const frameIdx = Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1)));
          drawFrame(frameIdx);
          const benefitIdx = Math.min(count - 1, Math.floor(self.progress * count));
          setActiveIndex(benefitIdx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [scrubEnabled, count]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (scrubEnabled || !video || !section) return;

    // Some mobile browsers only honor "muted" for autoplay purposes when
    // it's set as a JS property (not just the HTML attribute) before the
    // first play() call.
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    const timeouts = [50, 300, 1000, 2500].map((delay) =>
      window.setTimeout(() => {
        if (video.paused) tryPlay();
      }, delay)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && video.paused) tryPlay();
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    const retryEvents: Array<keyof WindowEventMap> = [
      "touchstart",
      "scroll",
      "click",
      "pointerdown",
    ];
    const retry = () => {
      if (video.paused) tryPlay();
      retryEvents.forEach((evt) => window.removeEventListener(evt, retry));
    };
    retryEvents.forEach((evt) => window.addEventListener(evt, retry, { once: true, passive: true }));

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      retryEvents.forEach((evt) => window.removeEventListener(evt, retry));
    };
  }, [scrubEnabled]);

  const active = ingredientBenefits[activeIndex];
  const ActiveIcon = ICONS[activeIndex % ICONS.length];
  const activeAccent = accentCycle[activeIndex % accentCycle.length];

  // Bounded box the can sits in — height-driven, aspect-ratio locked, so
  // the can is always shown in full (never cropped by a flex column) at a
  // size proportional to the viewport, on both desktop and mobile. The
  // scrub variant's height also caps at 72vw (→ ~40% viewport width once
  // the aspect ratio is applied): on a tall-but-narrow window a pure vh
  // height can demand more width than the pinned row has next to the
  // ingredient copy, and the row's overflow-hidden then silently clips
  // the can's edge — reading as a black bite taken out of it.
  const canBox = (
    <div
      className={cn(
        "relative shrink-0",
        !scrubEnabled &&
          "h-[52vh] max-h-[460px] w-full max-w-[300px] sm:h-[62vh] sm:max-h-[560px] sm:max-w-[340px]"
      )}
      style={{
        aspectRatio: VIDEO_ASPECT,
        ...(scrubEnabled ? { height: "min(78vh, 760px, 72vw)" } : {}),
      }}
    >
      {scrubEnabled ? (
        <canvas
          ref={canvasRef}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          className="h-full w-full object-contain"
        />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );

  return (
    <section ref={sectionRef} className="relative bg-background">
      {scrubEnabled ? (
        <div className="flex h-screen w-full flex-col overflow-hidden">
          {/* Clears the sticky navbar's own height so the centered row below
              never gets vertically centered into the space behind it — the
              navbar is semi-transparent (bg-background/80) and pinned above
              this section, so anything centered without this clearance could
              render partly hidden under it while the section is pinned. */}
          <div aria-hidden="true" className="h-24 shrink-0 sm:h-28" />
          <div className="flex flex-1 items-center justify-center gap-10 px-6 sm:gap-16 sm:px-12">
            {canBox}

            <div className="w-full max-w-sm sm:max-w-md">
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
          {canBox}

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
