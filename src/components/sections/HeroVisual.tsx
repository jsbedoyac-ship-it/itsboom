"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { flavors } from "@/lib/flavors";

const heroCans = [
  {
    ...flavors[0],
    src: "/can-kiwi-fresa.png",
    width: 1214,
    height: 1600,
    rotate: -13,
    hoverRotate: -7,
    floatDelay: 0,
    className: "left-0 top-16 w-[62%] sm:w-[64%] z-10",
  },
  {
    ...flavors[1],
    src: "/can-mora-azul.png",
    width: 1202,
    height: 1600,
    rotate: 11,
    hoverRotate: 6,
    floatDelay: 0.6,
    className: "right-0 top-0 w-[62%] sm:w-[64%]",
  },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const canRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(bgLayerRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, scrub: 0.6 },
      });

      canRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: i === 0 ? -14 : -22,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, scrub: 0.6 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex h-[32rem] justify-center overflow-visible py-6 sm:h-[40rem]"
    >
      <div
        ref={bgLayerRef}
        className="absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute left-[30%] top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/20 blur-[110px] motion-safe:animate-glow-pulse" />
        <div className="absolute left-[68%] top-[45%] size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/25 blur-[110px]" />
        <div className="absolute left-1/2 top-[55%] size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/15 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-lg sm:max-w-xl">
        {heroCans.map((can, i) => (
          <motion.div
            key={can.id}
            ref={(el) => {
              canRefs.current[i] = el;
            }}
            className={`absolute will-change-transform ${can.className}`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: can.rotate }}
            transition={{
              duration: 0.8,
              delay: 0.15 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { rotate: can.hoverRotate, scale: 1.06 }
            }
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -20, 0] }
              }
              transition={{
                duration: 5,
                delay: can.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
              style={{ aspectRatio: `${can.width} / ${can.height}` }}
            >
              <Image
                src={can.src}
                alt={`Lata IT'S BOOM sabor ${can.name}`}
                fill
                sizes="(min-width: 640px) 24rem, 65vw"
                className="object-contain"
                priority={i === 0}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
