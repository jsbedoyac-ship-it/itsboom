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

// Each bolt is authored as a single jagged vertex chain, then cut into
// alternating segments: the even ones render in the "back" layer (z-0,
// behind the h1) and the odd ones in the "front" layer (z-20, above it).
// Both layers share the exact same viewBox/inset, so the two halves line
// up into one continuous zigzag — but because it keeps swapping which
// side of the text it's drawn on, the bolt visibly dives under a letter
// and re-emerges past it, instead of just sitting in a flat plane behind
// everything. That alternation is what actually reads as the electricity
// weaving through the type, rather than a backdrop that happens to have
// letters in front of it.
const BOLTS = [
  {
    color: "#2E9BFF",
    width: 3.5,
    delay: "0ms",
    back: "M244,-14 L288,52 M254,60 L318,120 M282,128 L332,152 M296,162 L258,228",
    front: "M288,52 L254,60 M318,120 L282,128 M332,152 L296,162 M258,228 L288,262",
  },
  {
    color: "#FF3B4E",
    width: 2.5,
    delay: "60ms",
    back: "M282,128 L250,145",
    front: "M250,145 L222,168",
  },
  {
    color: "#FF8A2B",
    width: 3.5,
    delay: "180ms",
    back: "M398,-16 L352,54 M386,62 L322,120 M358,128 L308,154 M344,164 L384,228",
    front: "M352,54 L386,62 M322,120 L358,128 M308,154 L344,164 M384,228 L350,262",
  },
  {
    color: "#9B5CF6",
    width: 3,
    delay: "340ms",
    back: "M172,-16 L208,46 M182,53 L222,116",
    front: "M208,46 L182,53",
  },
] as const;

// preserveAspectRatio="none" lets the 600x260 layout stretch to whatever
// box the headline actually occupies at each breakpoint; these are jagged
// organic bolts, not a logo, so the stretch is imperceptible.
function LightningLayer({ segment }: { segment: "back" | "front" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-6 -inset-y-8 sm:-inset-x-16 sm:-inset-y-12"
    >
      {BOLTS.map((bolt, i) => (
        <path
          key={i}
          d={bolt[segment]}
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
