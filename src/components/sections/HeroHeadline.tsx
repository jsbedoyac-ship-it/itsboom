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
  fill: string;
  stroke: string;
  delay: number;
  shouldReduceMotion: boolean;
};

// Each line "draws" itself: a gradient stroke traces the letterforms
// (stroke-dashoffset counting down from the text's own measured length to
// 0), the fill fades in right after, then the stroke settles down to a
// thin rim instead of vanishing, so the type keeps a bit of glow at rest.
// A <text> element has no getTotalLength() (only real path/shape elements
// implement that), so the dasharray value can't be hardcoded the way it
// can for a <path> — getComputedTextLength() measures this specific
// string at this specific size instead, in a layout effect so it's
// applied before the browser's first paint and there's no flash of
// unstyled text.
function DrawnLine({ text, y, fontSize, fill, stroke, delay, shouldReduceMotion }: DrawnLineProps) {
  const ref = useRef<SVGTextElement>(null);
  const [length, setLength] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setLength(ref.current.getComputedTextLength());
  }, [text, fontSize]);

  if (shouldReduceMotion) {
    return (
      <text x="50%" y={y} textAnchor="middle" className="font-display" fontSize={fontSize} fontWeight={900} fill={fill}>
        {text}
      </text>
    );
  }

  return (
    <text
      ref={ref}
      x="50%"
      y={y}
      textAnchor="middle"
      className="font-display"
      fontSize={fontSize}
      fontWeight={900}
      fill={fill}
      stroke={stroke}
      strokeWidth={2.5}
      strokeLinejoin="round"
      style={
        length
          ? {
              strokeDasharray: length,
              strokeDashoffset: length,
              fillOpacity: 0,
              animation: [
                `text-draw 1.4s ${delay}s cubic-bezier(0.65,0,0.35,1) forwards`,
                `text-fill-in 0.6s ${delay + 0.85}s ease-out forwards`,
                `text-stroke-settle 0.9s ${delay + 1.4}s ease-out forwards`,
              ].join(", "),
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
            <linearGradient id="lineOneStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#EC1E6E" />
            </linearGradient>
            <linearGradient id="lineTwoStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC1E6E" />
              <stop offset="50%" stopColor="#7C5CE0" />
              <stop offset="100%" stopColor="#EC1E6E" />
            </linearGradient>
          </defs>

          <DrawnLine
            text="ENERGÍA"
            y={100}
            fontSize={92}
            fill="#ffffff"
            stroke="url(#lineOneStroke)"
            delay={0.15}
            shouldReduceMotion={shouldReduceMotion}
          />
          <DrawnLine
            text="SIN EXCUSAS."
            y={232}
            fontSize={80}
            fill="url(#lineTwoStroke)"
            stroke="url(#lineTwoStroke)"
            delay={0.4}
            shouldReduceMotion={shouldReduceMotion}
          />
        </svg>
      </motion.h1>
    </motion.div>
  );
}
