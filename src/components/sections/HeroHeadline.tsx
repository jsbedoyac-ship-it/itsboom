"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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
    transition: { type: "spring", stiffness: 280, damping: 22, mass: 0.7 },
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

  useLayoutEffect(() => {
    if (ref.current) setLength(ref.current.getComputedTextLength());
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
          : { opacity: 0 }
      }
    >
      {text}
    </text>
  );
}

export function HeroHeadline() {
  const shouldReduceMotion = !!useReducedMotion();

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
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
