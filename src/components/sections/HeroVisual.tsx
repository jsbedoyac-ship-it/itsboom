"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanIllustration } from "@/components/icons/CanIllustration";

export function HeroVisual() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const canLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(bgLayerRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 0.6,
        },
      });

      gsap.to(canLayerRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative flex justify-center overflow-hidden py-6">
      <div
        ref={bgLayerRef}
        className="absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/25 blur-[110px] motion-safe:animate-glow-pulse" />
        <div className="absolute left-[60%] top-[35%] size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/25 blur-[100px]" />
      </div>

      <div ref={canLayerRef} className="relative will-change-transform motion-safe:animate-float">
        <CanIllustration
          id="hero"
          colorFrom="#EC1E6E"
          colorTo="#4B2E9E"
          label="Lata IT'S BOOM Energy Drink"
          className="h-[26rem] w-auto drop-shadow-[0_0_50px_rgba(236,30,110,0.35)] sm:h-[32rem]"
        />
      </div>
    </div>
  );
}
