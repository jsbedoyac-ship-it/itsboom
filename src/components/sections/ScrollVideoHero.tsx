"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

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

const VIDEO_SRC = "/video-hero.mp4";
const POSTER_SRC = "/video-poster.jpg";
const VIDEO_WIDTH = 744;
const VIDEO_HEIGHT = 448;

// Fades the video's own backdrop out toward the edges so only the can (plus
// a soft glow) reads against the page background, instead of a hard-edged
// rectangle of the source footage's own purple backdrop.
const BACKDROP_MASK =
  "radial-gradient(ellipse 42% 62% at 50% 50%, black 40%, transparent 78%)";

/**
 * Hero video of the can. On desktop (fine pointer, no reduced-motion) it
 * pins for several viewport-heights and scrubs the video's currentTime
 * from scroll progress. Touch devices skip the scrub entirely and just
 * autoplay+loop the video in a normal-height section instead — scrubbing
 * currentTime on scroll reliably left the video stuck on a black frame on
 * iOS Safari (the poster gets dismissed the moment a seek is attempted,
 * and the seek never resolves to a visible frame there), so this trades
 * the scroll-linked effect for the can simply always being visible.
 */
export function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const scrubEnabled = hasFinePointer && !shouldReduceMotion;

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
        end: "bottom bottom",
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });

      if (video.readyState < 1) {
        video.addEventListener("loadedmetadata", () => trigger.refresh(), { once: true });
      }
    }, section);

    return () => ctx.revert();
  }, [scrubEnabled]);

  return (
    <section
      ref={sectionRef}
      className={scrubEnabled ? "relative h-[280vh]" : "relative h-[85vh]"}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-background">
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
          className="h-full w-full object-cover sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-5xl sm:object-contain"
          style={{
            maskImage: BACKDROP_MASK,
            WebkitMaskImage: BACKDROP_MASK,
          }}
        />
      </div>
    </section>
  );
}
