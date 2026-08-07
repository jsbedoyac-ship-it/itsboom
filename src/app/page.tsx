import { Camera, CandyOff, Gauge, Sparkles, Zap } from "lucide-react";
import { CanIngredientsHero } from "@/components/sections/CanIngredientsHero";
import { HeroHeadline } from "@/components/sections/HeroHeadline";
import { FlavorsGrid } from "@/components/sections/FlavorsGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { InterlockedRings } from "@/components/icons/InterlockedRings";
import { INSTAGRAM_HANDLE, INSTAGRAM_LINK } from "@/lib/utils";

const marqueeItems = ["HECHA PARA QUIENES VAN POR MÁS"].map((text, i) => (
  <span
    key={i}
    className="font-display flex items-center gap-3 text-2xl font-black uppercase tracking-tight text-foreground/90 sm:text-3xl"
  >
    {text}
    <InterlockedRings className="h-4 w-7 text-gold sm:h-5 sm:w-8" />
  </span>
));

const values = [
  {
    icon: Zap,
    title: "Energía Explosiva",
    description: "Cafeína, taurina y beta-alanina en dosis pensadas para rendir todo el día.",
  },
  {
    icon: Gauge,
    title: "Resistencia",
    description: "L-Citrulina y L-Arginina para sostener el ritmo cuando más lo necesitas.",
  },
  {
    icon: Sparkles,
    title: "Sabor Único",
    description: "Kiwi y Fresa, Mora Azul Açaí: sabores reales, levemente gasificados.",
  },
  {
    icon: CandyOff,
    title: "Cero Azúcar",
    description: "Toda la energía, sin azúcar añadida.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 pb-6 pt-16 text-center sm:px-8 sm:pt-24">
          <HeroHeadline />
        </div>

        <CanIngredientsHero />

        <div className="border-y border-border bg-surface py-5">
          <Marquee items={marqueeItems} speed="rapid" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <StaggerGroup className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-gold/50">
                <Icon className="size-7 text-gold" aria-hidden="true" />
                <h3 className="font-display mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section id="sabores" className="scroll-mt-24 border-t border-border bg-surface-2/40 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-pink">
              Sabores
            </p>
            <h2 className="font-display mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Elige tu boom
            </h2>
            <p className="mt-4 text-muted">
              Dos sabores, una sola energía. Encuentra el que más va contigo.
            </p>
          </Reveal>

          <div className="mt-14">
            <FlavorsGrid />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-surface to-surface-2 p-10 text-center sm:p-16">
          <Camera className="mx-auto size-8 text-pink" aria-hidden="true" />
          <h2 className="font-display mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            Síguenos en Instagram
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Contenido, lanzamientos y la comunidad IT&apos;S BOOM en{" "}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline decoration-pink underline-offset-4 cursor-pointer"
            >
              {INSTAGRAM_HANDLE}
            </a>
            .
          </p>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors duration-200 hover:border-pink hover:text-pink cursor-pointer"
          >
            <Camera className="size-4" aria-hidden="true" />
            Ver perfil
          </a>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
