"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

const CAN_SRC = "/can-mora-azul-cutout.png";
const CAN_WIDTH = 504;
const CAN_HEIGHT = 934;
const ROTATION_RANGE = 42; // degrees swept from scroll-in to scroll-out

/**
 * Hero visual: the can as an isolated cutout (no video, no background
 * plate, no floor reflection) so nothing reads as a cropped rectangle —
 * just the product, floating with a soft glow. It turns on its own axis
 * as the section scrolls through view, driven directly by scroll
 * position (no pin — the page never locks up, it's just a transform).
 */
export function CanHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLImageElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const can = canRef.current;
    if (!section || !can || shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          const rotation = -ROTATION_RANGE / 2 + self.progress * ROTATION_RANGE;
          gsap.set(can, { rotateY: rotation });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <div ref={sectionRef} className="relative flex justify-center py-6 sm:py-10">
      <div
        aria-hidden="true"
        className="animate-glow-pulse absolute top-1/2 left-1/2 h-[38vh] w-[38vh] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/30 blur-[90px]"
      />
      <Image
        ref={canRef}
        src={CAN_SRC}
        alt="Lata IT'S BOOM sabor Mora Azul Açaí"
        width={CAN_WIDTH}
        height={CAN_HEIGHT}
        priority
        className="relative h-[48vh] max-h-[440px] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)] [transform-style:preserve-3d] will-change-transform sm:h-[62vh] sm:max-h-[600px]"
        style={{ perspective: "1200px" }}
      />
    </div>
  );
}
