"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

const VIDEO_SRC = "/video-hero.mp4";
const POSTER_SRC = "/video-poster.jpg";
// Can sits right-of-center in the source frame; keep it in view once the
// full-bleed object-cover crops the sides on very wide or very narrow screens.
const OBJECT_POSITION = "74% center";

/**
 * Pinned, scroll-scrubbed hero: the section stays sticky for several
 * viewport-heights while the video's currentTime is driven directly by
 * scroll progress, so the can rotates in sync with the user's scroll
 * instead of on a timer. `poster` guarantees the can is visible even if
 * a browser defers loading the video itself (notably iOS Safari).
 */
export function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || shouldReduceMotion) return;

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

  if (shouldReduceMotion) {
    return (
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden bg-background sm:h-[85vh]">
        <video
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ objectPosition: OBJECT_POSITION }}
        />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ objectPosition: OBJECT_POSITION }}
        />
      </div>
    </section>
  );
}
