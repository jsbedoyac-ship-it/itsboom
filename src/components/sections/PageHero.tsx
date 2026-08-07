import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BrandWordmark } from "@/components/sections/BrandWordmark";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-purple/25 blur-[100px] motion-safe:animate-glow-pulse"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal className="mb-8 sm:mb-12">
          <BrandWordmark />
        </Reveal>
        <Reveal>
          <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-green">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
            {description}
          </p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
