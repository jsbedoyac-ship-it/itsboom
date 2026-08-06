import type { Metadata } from "next";
import { Compass, Flame, HeartHandshake, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Nosotros | IT'S BOOM Energy Drink",
  description: "Conoce la historia y los valores detrás de IT'S BOOM, la bebida energizante sin azúcar.",
};

const values = [
  {
    icon: Flame,
    title: "Energía sin límites",
    description: "Creemos que la energía real no necesita azúcar para sostenerte todo el día.",
  },
  {
    icon: Sparkles,
    title: "Autenticidad",
    description: "Sabores reales, ingredientes claros, cero promesas vacías.",
  },
  {
    icon: HeartHandshake,
    title: "Comunidad",
    description: "Crecemos junto a quienes van por más: deportistas, creadores y emprendedores.",
  },
  {
    icon: Compass,
    title: "Sin excusas",
    description: "Free sugar, sin excusas: la misma filosofía en cada lata que sale de la línea.",
  },
];

const manifestoItems = [
  "SOMOS ENERGÍA",
  "SOMOS COMUNIDAD",
  "SOMOS BOOM",
  "VAMOS POR MÁS",
].map((text, i) => (
  <span
    key={i}
    className="font-display text-2xl font-black uppercase tracking-tight text-foreground/90 sm:text-3xl"
  >
    {text}
  </span>
));

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestra historia"
        title={
          <>
            Hecha para quienes <span className="text-gradient">van por más</span>
          </>
        }
        description="IT'S BOOM nació de una idea simple: la energía que necesitas para dar el siguiente paso no debería venir cargada de azúcar."
      />

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-pink">
            Nuestra misión
          </p>
          <h2 className="font-display mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Energía real, sin excusas
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Diseñamos IT&apos;S BOOM para las personas que exigen más de su día: entrenamientos,
              estudio, trabajo o la próxima gran idea. Nada de eso debería frenarse por una
              bajada de energía, y mucho menos por una lata cargada de azúcar.
            </p>
            <p>
              Por eso cada sabor de IT&apos;S BOOM combina ingredientes reales con la dosis exacta de
              energía, para que sigas en movimiento sin sacrificar lo que le pones a tu cuerpo.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface py-6">
        <Marquee items={manifestoItems} speed="fast" reverse />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-green">
            Lo que nos mueve
          </p>
          <h2 className="font-display mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Nuestros valores
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-pink/50">
                <Icon className="size-7 text-pink" aria-hidden="true" />
                <h3 className="font-display mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CTASection />
    </>
  );
}
