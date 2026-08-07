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
        <motion.span
          key={i}
          variants={shouldReduceMotion ? wordReduced : word}
          className={cn("inline-block will-change-transform", wordClassName)}
        >
          {w}
          {i < parts.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
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

      <h1 className="font-display mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
        <span className="block overflow-hidden">
          <Words text="ENERGÍA REAL." shouldReduceMotion={!!shouldReduceMotion} />
        </span>
        <span className="mt-1 block overflow-hidden">
          <Words
            text="SIN EXCUSAS."
            shouldReduceMotion={!!shouldReduceMotion}
            wordClassName="text-gradient-shimmer"
          />
        </span>
      </h1>
    </motion.div>
  );
}
