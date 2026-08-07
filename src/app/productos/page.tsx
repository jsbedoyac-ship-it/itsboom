import type { Metadata } from "next";
import { MessageSquare, PackageCheck, ShoppingBag } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FlavorsGrid } from "@/components/sections/FlavorsGrid";
import { CardsMarquee, PACK_SLIDES } from "@/components/sections/CardsMarquee";
import { IngredientsPanel } from "@/components/sections/IngredientsPanel";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Productos | IT'S BOOM Energy Drink",
  description: "Conoce los sabores de IT'S BOOM: Kiwi y Fresa, Mora Azul Açaí. Bebida energizante.",
};

const steps = [
  {
    icon: ShoppingBag,
    title: "1. Elige tu sabor",
    description: "Kiwi y Fresa o Mora Azul Açaí: escoge el que más te represente.",
  },
  {
    icon: MessageSquare,
    title: "2. Escríbenos",
    description: "Contáctanos por WhatsApp y te confirmamos disponibilidad y precio.",
  },
  {
    icon: PackageCheck,
    title: "3. Recíbelo",
    description: "Coordina entrega o recógelo con uno de nuestros distribuidores.",
  },
];

export default function ProductosPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Nuestros productos"
        description="Dos sabores, una misma energía real. Sin excusas."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FlavorsGrid withCta />
      </section>

      <CardsMarquee slides={PACK_SLIDES} showHeading={false} />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <IngredientsPanel />
        </div>
      </section>

      <section className="border-t border-border bg-surface-2/40 py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-green">
              Cómo comprar
            </p>
            <h2 className="font-display mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Pedir IT&apos;S BOOM es fácil
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-background">
                    <Icon className="size-6 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-base font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
}
