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

// Sits behind the headline (see the z-0/z-10 split below) so each bolt
// visually disappears under a solid letter stroke and reappears in the
// gaps between and inside letters — real z-index stacking rather than a
// mask, which is what reads as electricity arcing "through" the type.
// preserveAspectRatio="none" lets the 600x260 layout stretch to whatever
// box the headline actually occupies at each breakpoint; these are jagged
// organic bolts, not a logo, so the stretch is imperceptible.
function LightningBolts() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-6 -inset-y-8 sm:-inset-x-16 sm:-inset-y-12"
    >
      <g
        className="opacity-0 motion-safe:animate-bolt-flash"
        style={{ filter: "drop-shadow(0 0 4px var(--gold)) drop-shadow(0 0 14px var(--pink))" }}
      >
        <path
          d="M244,-14 L288,52 L254,60 L318,120 L282,128 L332,152 L296,162 L258,228 L288,262"
          stroke="var(--gold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M282,128 L222,168"
          stroke="var(--gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <path
        d="M398,-16 L352,54 L386,62 L322,120 L358,128 L308,154 L344,164 L384,228 L350,262"
        stroke="var(--pink)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="opacity-0 motion-safe:animate-bolt-flash [animation-delay:180ms]"
        style={{ filter: "drop-shadow(0 0 4px var(--pink)) drop-shadow(0 0 14px var(--purple-soft))" }}
      />

      <path
        d="M172,-16 L208,46 L182,53 L222,116"
        stroke="var(--purple-soft)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="opacity-0 motion-safe:animate-bolt-flash [animation-delay:340ms]"
        style={{ filter: "drop-shadow(0 0 4px var(--purple-soft)) drop-shadow(0 0 12px var(--pink))" }}
      />
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
        <div
          aria-hidden="true"
          className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-[999px] bg-gold/20 blur-3xl motion-safe:animate-glow-pulse sm:-inset-x-10"
        />
        <div className="absolute inset-0 z-0">
          <LightningBolts />
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
      </div>
    </motion.div>
  );
}
