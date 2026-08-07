"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.12 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 26, rotate: -8, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 20, mass: 0.6 },
  },
};

const reduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// Split per letter (not per word) so the entrance reads as a rapid,
// electric cascade rather than three calm blocks dropping in. Each word
// still gets its own non-breaking wrapper so a line only wraps between
// words, and the space between words is a plain sibling text node — a
// trailing space at the edge of an inline-block box collapses to zero
// width in some browsers instead of a gap.
function Words({
  text,
  shouldReduceMotion,
  wordClassName,
}: {
  text: string;
  shouldReduceMotion: boolean;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {w.split("").map((char, ci) => (
              <motion.span
                key={ci}
                variants={shouldReduceMotion ? reduced : letter}
                className={cn("inline-block will-change-transform", wordClassName)}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const BLUE = "#2E9BFF";
const RED = "#FF3B4E";
const ORANGE = "#FF8A2B";
const PURPLE = "#9B5CF6";

type Segment = { d: string; layer: "back" | "front"; width?: number };
type Bolt = { color: string; width: number; delay: string; segments: Segment[] };
type Spark = { cx: number; cy: number; r: number; color: string; delay: string };

// Four bolts are authored as one jagged vertex chain each, then cut into
// alternating segments — even ones in the "back" layer (behind the h1),
// odd ones in "front" (above it), each with its own width tapering from
// thick at the top down to a fine point at the tip, the way a real
// strike's channel narrows. Both layers share the same viewBox, so the
// halves line up into a continuous zigzag that keeps swapping which side
// of the text it draws on: it visibly dives under a letter and re-emerges
// past it. Everything else (six thinner bolts + a handful of sparks)
// radiates outward from the headline past its edges, staggered across
// most of the 5s loop rather than bunched at the start, so it reads as a
// storm crackling continuously around the type instead of one pulse.
const BOLTS: Bolt[] = [
  {
    color: BLUE,
    width: 4.2,
    delay: "0ms",
    segments: [
      { d: "M244,-14 L291,49", layer: "back", width: 4.2 },
      { d: "M291,49 L251,63", layer: "front", width: 3.8 },
      { d: "M251,63 L321,116", layer: "back", width: 3.6 },
      { d: "M321,116 L279,131", layer: "front", width: 3.3 },
      { d: "M279,131 L336,148", layer: "back", width: 3.0 },
      { d: "M336,148 L293,166", layer: "front", width: 2.7 },
      { d: "M293,166 L261,224", layer: "back", width: 2.4 },
      { d: "M261,224 L285,266", layer: "front", width: 2.1 },
    ],
  },
  {
    color: RED,
    width: 2.6,
    delay: "60ms",
    segments: [
      { d: "M279,131 L246,143", layer: "back", width: 2.6 },
      { d: "M246,143 L222,168", layer: "front", width: 1.9 },
    ],
  },
  {
    color: ORANGE,
    width: 4.2,
    delay: "450ms",
    segments: [
      { d: "M398,-16 L349,58", layer: "back", width: 4.2 },
      { d: "M349,58 L389,65", layer: "front", width: 3.8 },
      { d: "M389,65 L317,117", layer: "back", width: 3.6 },
      { d: "M317,117 L361,132", layer: "front", width: 3.3 },
      { d: "M361,132 L304,151", layer: "back", width: 3.0 },
      { d: "M304,151 L347,167", layer: "front", width: 2.7 },
      { d: "M347,167 L379,231", layer: "back", width: 2.4 },
      { d: "M379,231 L350,262", layer: "front", width: 2.1 },
    ],
  },
  {
    color: PURPLE,
    width: 3.4,
    delay: "700ms",
    segments: [
      { d: "M172,-16 L211,43", layer: "back", width: 3.4 },
      { d: "M211,43 L179,56", layer: "front", width: 2.8 },
      { d: "M179,56 L222,116", layer: "back", width: 2.2 },
    ],
  },
  {
    color: BLUE,
    width: 2,
    delay: "1000ms",
    segments: [
      { d: "M150,40 L96,-8 L124,-14 L54,-92", layer: "back" },
      { d: "M96,-8 L40,10", layer: "back", width: 1.5 },
    ],
  },
  {
    color: RED,
    width: 2,
    delay: "1350ms",
    segments: [{ d: "M462,26 L522,-32 L492,-38 L566,-102", layer: "back" }],
  },
  {
    color: ORANGE,
    width: 2,
    delay: "1700ms",
    segments: [
      { d: "M118,192 L58,244 L88,250 L16,318", layer: "back" },
      { d: "M58,244 L10,230", layer: "back", width: 1.5 },
    ],
  },
  {
    color: PURPLE,
    width: 2,
    delay: "2100ms",
    segments: [{ d: "M502,202 L572,252 L540,258 L608,320", layer: "back" }],
  },
  {
    color: BLUE,
    width: 1.8,
    delay: "2500ms",
    segments: [
      { d: "M136,118 L36,98 L66,106 L-40,84", layer: "back" },
      { d: "M36,98 L20,138", layer: "back", width: 1.4 },
    ],
  },
  {
    color: ORANGE,
    width: 1.8,
    delay: "2900ms",
    segments: [{ d: "M472,142 L572,158 L542,152 L648,172", layer: "back" }],
  },
];

const SPARKS: Spark[] = [
  { cx: 291, cy: 49, r: 3, color: "#ffffff", delay: "0ms" },
  { cx: 349, cy: 58, r: 3, color: ORANGE, delay: "450ms" },
  { cx: 54, cy: -92, r: 2.5, color: BLUE, delay: "1000ms" },
  { cx: 566, cy: -102, r: 2.5, color: RED, delay: "1350ms" },
  { cx: 502, cy: 202, r: 2.5, color: PURPLE, delay: "2100ms" },
  { cx: -40, cy: 84, r: 2.5, color: BLUE, delay: "2500ms" },
];

// preserveAspectRatio="none" lets the 600x260 layout stretch to whatever
// box the headline occupies at each breakpoint, and overflow-visible lets
// the radiating bolts' coordinates (well outside 0–600/0–260) bleed past
// that box instead of being clipped at the svg's own edge — that outward
// bleed is what turns four bolts crossing the type into a full burst
// radiating around it. Each segment is drawn twice: once in the bolt's
// color at full width with a soft colored glow, then again in near-white
// at less than half that width with no glow — a blinding core with
// color bleeding around it is what actually reads as lightning instead
// of a neon tube; a single flat-colored stroke never does.
function LightningLayer({ segment }: { segment: "back" | "front" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-6 -inset-y-8 overflow-visible sm:-inset-x-16 sm:-inset-y-12"
    >
      {BOLTS.map((bolt, i) =>
        bolt.segments
          .filter((seg) => seg.layer === segment)
          .map((seg, j) => {
            const width = seg.width ?? bolt.width;
            return (
              <g
                key={`${i}-${j}`}
                className="opacity-0 motion-safe:animate-bolt-flash"
                style={{ animationDelay: bolt.delay }}
              >
                <path
                  d={seg.d}
                  stroke={bolt.color}
                  strokeWidth={width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ filter: `drop-shadow(0 0 3px ${bolt.color}) drop-shadow(0 0 10px ${bolt.color})` }}
                />
                <path
                  d={seg.d}
                  stroke="#fff7ec"
                  strokeWidth={Math.max(0.9, width * 0.38)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            );
          })
      )}
      {segment === "back" &&
        SPARKS.map((spark, i) => (
          <g key={i} className="opacity-0 motion-safe:animate-bolt-flash" style={{ animationDelay: spark.delay }}>
            <circle
              cx={spark.cx}
              cy={spark.cy}
              r={spark.r}
              fill={spark.color}
              style={{ filter: `drop-shadow(0 0 4px ${spark.color}) drop-shadow(0 0 8px ${spark.color})` }}
            />
            <circle cx={spark.cx} cy={spark.cy} r={Math.max(0.8, spark.r * 0.4)} fill="#fff7ec" />
          </g>
        ))}
    </svg>
  );
}

export function HeroHeadline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <motion.p
        variants={shouldReduceMotion ? reduced : letter}
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

      <div className="relative mt-6">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <LightningLayer segment="back" />
        </div>

        <h1 className="font-display relative z-10 text-5xl font-black leading-[0.95] tracking-tight motion-safe:animate-text-surge sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden">
            <Words text="ENERGÍA" shouldReduceMotion={!!shouldReduceMotion} />
          </span>
          <span className="mt-1 block overflow-hidden">
            <Words
              text="SIN EXCUSAS."
              shouldReduceMotion={!!shouldReduceMotion}
              wordClassName="text-gradient-shimmer"
            />
          </span>
        </h1>

        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <LightningLayer segment="front" />
        </div>
      </div>
    </motion.div>
  );
}
