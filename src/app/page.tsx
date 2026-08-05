import Link from "next/link";
import { Camera, Droplet, Flame, Leaf, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { FlavorsGrid } from "@/components/sections/FlavorsGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { InterlockedRings } from "@/components/icons/InterlockedRings";
import { INSTAGRAM_HANDLE, INSTAGRAM_LINK, WHATSAPP_LINK } from "@/lib/utils";

const marqueeItems = [
  "SIN AZÚCAR",
  "ENERGÍA REAL",
  "MORA · FRESA · KIWI",
  "HECHA PARA QUIENES VAN POR MÁS",
  "FREE SUGGAR, SIN EXCUSAS",
].map((text, i) => (
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
    icon: Droplet,
    title: "Free sugar",
    description: "Cero azúcar añadida. Todo el sabor, ninguna excusa.",
  },
  {
    icon: Zap,
    title: "Energía real",
    description: "Cafeína y taurina en dosis pensadas para rendir todo el día.",
  },
  {
    icon: Leaf,
    title: "Sabor a fruta",
    description: "Mora, fresa y kiwi: sabores frescos, no jarabes artificiales.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad certificada",
    description: "Producción controlada y distribuidores oficiales en todo el país.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-4 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-2 lg:gap-6">
          <Reveal>
            <p className="font-mono-brand inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green">
              <Flame className="size-3.5" aria-hidden="true" />
              Bebida energizante
            </p>
            <h1 className="font-display mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              ENERGÍA REAL.
              <br />
              <span className="text-gradient">SIN EXCUSAS.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              BOOM es la bebida energizante hecha para quienes van por más. Sin azúcar,
              con sabor real y la energía que tu día exige.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-background transition-transform duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Pedir por WhatsApp
              </a>
              <Link
                href="#sabores"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-bold text-foreground transition-colors duration-200 hover:border-green hover:text-green cursor-pointer"
              >
                Ver sabores
              </Link>
            </div>
          </Reveal>

          <HeroVisual />
        </div>

        <div className="border-y border-border bg-surface py-5">
          <Marquee items={marqueeItems} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              Tres sabores, una sola energía. Encuentra el que más va contigo.
            </p>
          </Reveal>

          <div className="mt-14">
            <FlavorsGrid withCta />
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
            Contenido, lanzamientos y la comunidad BOOM en{" "}
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
