"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion, type Variants } from "framer-motion";
import { Flame } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // A duration-based tween rather than a spring on purpose: springs
    // are physics-driven and must tick on the main thread every frame,
    // which a page that mounts while its tab is backgrounded (common
    // when several tabs load at once) can stall indefinitely — no
    // main-thread frame ever runs to advance it, so it never reaches
    // "visible" and the hero text stays invisible. A tween this simple
    // (opacity/y/scale) is one the browser can hand off to its own
    // compositor, the same way the rest of the site's Reveal-based
    // entrances already do, so it keeps progressing regardless.
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const reduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

type DrawnLineProps = {
  text: string;
  y: number;
  fontSize: number;
  stroke: string;
  delay: number;
  shouldReduceMotion: boolean;
};

// Each line is neon outline only — no fill, ever — traced on by a gradient
// stroke counting stroke-dashoffset down from the text's own measured
// length to 0. A <text> element has no getTotalLength() (only real
// path/shape elements implement that), so the dasharray value can't be
// hardcoded the way it can for a <path> — getComputedTextLength() measures
// this specific string at this specific size instead, in a layout effect
// so it's applied before the browser's first paint and there's no flash
// of unstyled text.
function DrawnLine({ text, y, fontSize, stroke, delay, shouldReduceMotion }: DrawnLineProps) {
  const ref = useRef<SVGTextElement>(null);
  const [length, setLength] = useState(0);

  // Measured once on mount isn't enough: a tab opened in the background
  // (common on iOS Safari when several tabs load at once) can report a
  // computed text length of 0 because WebKit skips layout for hidden
  // documents — and since the effect never reruns, that 0 would stick
  // forever, permanently hiding the text (see the `: text` fallback
  // below, which keeps it visible — just undrawn — while that happens).
  // Re-measuring on visibility/font-load recovers once the tab is
  // actually rendering.
  useLayoutEffect(() => {
    const measure = () => {
      const measured = ref.current?.getComputedTextLength() ?? 0;
      if (measured > 0) setLength(measured);
    };

    measure();
    document.addEventListener("visibilitychange", measure);
    document.fonts?.ready?.then(measure);

    return () => document.removeEventListener("visibilitychange", measure);
  }, [text, fontSize]);

  const base = {
    x: "50%" as const,
    y,
    textAnchor: "middle" as const,
    className: "font-display",
    fontSize,
    fontWeight: 900,
    fill: "none",
    stroke,
    strokeWidth: 2.5,
    strokeLinejoin: "round" as const,
  };

  if (shouldReduceMotion) {
    return <text {...base}>{text}</text>;
  }

  // Until the length is known the text still renders — fully drawn,
  // just without the dash animation — instead of staying invisible.
  return (
    <text
      ref={ref}
      {...base}
      style={
        length
          ? {
              strokeDasharray: length,
              strokeDashoffset: length,
              animation: `text-draw 4.2s ${delay}s cubic-bezier(0.65,0,0.35,1) infinite alternate`,
            }
          : undefined
      }
    >
      {text}
    </text>
  );
}

export function HeroHeadline() {
  const shouldReduceMotion = !!useReducedMotion();
  const controls = useAnimation();

  // Belt-and-suspenders alongside the tween-over-spring change above:
  // `animate="visible"` only ever fires once, at mount. If that mount
  // happens while the tab is backgrounded, the browser can withhold
  // every frame this animation would need, so it never reaches
  // "visible" no matter how long the tab stays open — the hero text
  // and pill are then invisible for the rest of that page view. Driving
  // it through explicit controls means the same "visible" animation
  // can be re-fired the moment the tab is actually rendering.
  useEffect(() => {
    const play = () => controls.start("visible");
    play();
    document.addEventListener("visibilitychange", play);
    return () => document.removeEventListener("visibilitychange", play);
  }, [controls]);

  return (
    <motion.div initial="hidden" animate={controls} variants={container}>
      <motion.p
        variants={shouldReduceMotion ? reduced : pop}
        className="font-mono-brand inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green"
      >
        <motion.span
          className="inline-flex"
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: [0, -10, 8, -6, 0], scale: [1, 1.15, 1, 1.1, 1] }
          }
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
        >
          <Flame className="size-3.5" aria-hidden="true" />
        </motion.span>
        Bebida energizante
      </motion.p>

      <motion.h1 variants={shouldReduceMotion ? reduced : pop} className="relative mt-6">
        <span className="sr-only">ENERGÍA SIN EXCUSAS.</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 760 260"
          className="mx-auto w-full max-w-[760px] overflow-visible"
        >
          <defs>
            <linearGradient id="neonMono" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#8a8a8a" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          <DrawnLine
            text="ENERGÍA"
            y={100}
            fontSize={92}
            stroke="url(#neonMono)"
            delay={0.15}
            shouldReduceMotion={shouldReduceMotion}
          />
          <DrawnLine
            text="SIN EXCUSAS."
            y={232}
            fontSize={80}
            stroke="url(#neonMono)"
            delay={0.6}
            shouldReduceMotion={shouldReduceMotion}
          />
        </svg>
      </motion.h1>
    </motion.div>
  );
}
