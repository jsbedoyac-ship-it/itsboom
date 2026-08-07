"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 36, rotate: -4, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22, mass: 0.7 },
  },
};

const wordReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

function Words({
  text,
  shouldReduceMotion,
  wordClassName,
}: {
  text: string;
  shouldReduceMotion: boolean;
  wordClassName?: string;
}) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((w, i) => (
        // The space is a sibling text node after the span, not appended
        // inside it — a trailing space at the edge of an inline-block box
        // gets collapsed to zero width in some browsers instead of a gap.
        <span key={i}>
          <motion.span
            variants={shouldReduceMotion ? wordReduced : word}
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {w}
          </motion.span>
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const BLUE = "#2E9BFF";
const RED = "#FF3B4E";
const ORANGE = "#FF8A2B";
const PURPLE = "#9B5CF6";

type Segment = { d: string; layer: "back" | "front" };
type Bolt = { color: string; width: number; delay: string; segments: Segment[] };
type Spark = { cx: number; cy: number; r: number; color: string; delay: string };

// Four bolts are authored as one jagged vertex chain each, then cut into
// alternating segments — even ones in the "back" layer (behind the h1),
// odd ones in "front" (above it). Both layers share the same viewBox, so
// the halves line up into a continuous zigzag that keeps swapping which
// side of the text it draws on: it visibly dives under a letter and
// re-emerges past it, instead of sitting in one flat plane. Everything
// else (six thinner bolts + a handful of sparks) radiates outward from
// the headline past its edges, staggered across most of the 5s loop
// rather than bunched at the start, so it reads as a storm crackling
// continuously around the type instead of one clean pulse.
const BOLTS: Bolt[] = [
  {
    color: BLUE,
    width: 3.5,
    delay: "0ms",
    segments: [
      { d: "M244,-14 L288,52", layer: "back" },
      { d: "M288,52 L254,60", layer: "front" },
      { d: "M254,60 L318,120", layer: "back" },
      { d: "M318,120 L282,128", layer: "front" },
      { d: "M282,128 L332,152", layer: "back" },
      { d: "M332,152 L296,162", layer: "front" },
      { d: "M296,162 L258,228", layer: "back" },
      { d: "M258,228 L288,262", layer: "front" },
    ],
  },
  {
    color: RED,
    width: 2.5,
    delay: "60ms",
    segments: [
      { d: "M282,128 L250,145", layer: "back" },
      { d: "M250,145 L222,168", layer: "front" },
    ],
  },
  {
    color: ORANGE,
    width: 3.5,
    delay: "450ms",
    segments: [
      { d: "M398,-16 L352,54", layer: "back" },
      { d: "M352,54 L386,62", layer: "front" },
      { d: "M386,62 L322,120", layer: "back" },
      { d: "M322,120 L358,128", layer: "front" },
      { d: "M358,128 L308,154", layer: "back" },
      { d: "M308,154 L344,164", layer: "front" },
      { d: "M344,164 L384,228", layer: "back" },
      { d: "M384,228 L350,262", layer: "front" },
    ],
  },
  {
    color: PURPLE,
    width: 3,
    delay: "700ms",
    segments: [
      { d: "M172,-16 L208,46", layer: "back" },
      { d: "M208,46 L182,53", layer: "front" },
      { d: "M182,53 L222,116", layer: "back" },
    ],
  },
  {
    color: BLUE,
    width: 2,
    delay: "1000ms",
    segments: [
      { d: "M150,40 L96,-8 L124,-14 L54,-92", layer: "back" },
      { d: "M96,-8 L40,10", layer: "back" },
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
      { d: "M58,244 L10,230", layer: "back" },
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
      { d: "M36,98 L20,138", layer: "back" },
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
  { cx: 288, cy: 52, r: 3, color: "#ffffff", delay: "0ms" },
  { cx: 352, cy: 54, r: 3, color: ORANGE, delay: "450ms" },
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
// radiating around it.
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
          .map((seg, j) => (
            <path
              key={`${i}-${j}`}
              d={seg.d}
              stroke={bolt.color}
              strokeWidth={bolt.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="opacity-0 motion-safe:animate-bolt-flash"
              style={{
                animationDelay: bolt.delay,
                filter: `drop-shadow(0 0 3px ${bolt.color}) drop-shadow(0 0 10px ${bolt.color})`,
              }}
            />
          ))
      )}
      {segment === "back" &&
        SPARKS.map((spark, i) => (
          <circle
            key={i}
            cx={spark.cx}
            cy={spark.cy}
            r={spark.r}
            fill={spark.color}
            className="opacity-0 motion-safe:animate-bolt-flash"
            style={{
              animationDelay: spark.delay,
              filter: `drop-shadow(0 0 4px ${spark.color}) drop-shadow(0 0 8px ${spark.color})`,
            }}
          />
        ))}
    </svg>
  );
}

export function HeroHeadline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <motion.p
        variants={shouldReduceMotion ? wordReduced : word}
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
