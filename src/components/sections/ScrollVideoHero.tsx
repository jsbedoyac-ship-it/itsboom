"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

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
 * Pinned, scroll-scrubbed hero: the section stays sticky for several
 * viewport-heights while the video's currentTime is driven directly by
 * scroll progress, so the can rotates in sync with the user's scroll
 * instead of on a timer. `poster` plus a single, unbranched render tree
 * keep the can visible immediately on every browser (notably iOS Safari,
 * which was rendering this section blank).
 */
export function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (shouldReduceMotion) {
      video.play().catch(() => {});
      return;
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
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={shouldReduceMotion ? "relative h-[85vh]" : "relative h-[280vh]"}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          muted
          loop={shouldReduceMotion ?? undefined}
          playsInline
          preload="auto"
          className="max-h-[85vh] w-full max-w-5xl object-contain"
          style={{
            maskImage: BACKDROP_MASK,
            WebkitMaskImage: BACKDROP_MASK,
          }}
        />
      </div>
    </section>
  );
}
