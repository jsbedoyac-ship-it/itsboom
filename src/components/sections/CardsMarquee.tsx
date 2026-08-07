import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

type MarqueeCardData = {
  category: string;
  title: string;
  description: string;
  source: string;
  gradientFrom: string;
  gradientTo: string;
};

// Placeholder set — structure only for now. Swap this array for the real
// content (photos, categories, copy, source links) once it's ready; the
// card shape and marquee mechanics won't need to change.
const CARDS: MarqueeCardData[] = [
  {
    category: "Categoría",
    title: "Título del recuadro 1",
    description: "Aquí va el contenido que compartas más adelante: noticia, testimonio o logro.",
    source: "Fuente",
    gradientFrom: "#EC1E6E",
    gradientTo: "#4B2E9E",
  },
  {
    category: "Categoría",
    title: "Título del recuadro 2",
    description: "Este espacio queda listo para recibir el texto y la imagen definitivos.",
    source: "Fuente",
    gradientFrom: "#F5A623",
    gradientTo: "#EC1E6E",
  },
  {
    category: "Categoría",
    title: "Título del recuadro 3",
    description: "Estructura de prueba — se reemplaza fácilmente por el contenido real.",
    source: "Fuente",
    gradientFrom: "#7AC142",
    gradientTo: "#4B2E9E",
  },
  {
    category: "Categoría",
    title: "Título del recuadro 4",
    description: "Cada tarjeta puede tener su propia imagen, categoría y enlace de origen.",
    source: "Fuente",
    gradientFrom: "#4B2E9E",
    gradientTo: "#EC1E6E",
  },
  {
    category: "Categoría",
    title: "Título del recuadro 5",
    description: "El carrusel se desliza en bucle continuo a velocidad constante.",
    source: "Fuente",
    gradientFrom: "#F5A623",
    gradientTo: "#7AC142",
  },
  {
    category: "Categoría",
    title: "Título del recuadro 6",
    description: "Listo para el contenido final que nos compartas.",
    source: "Fuente",
    gradientFrom: "#EC1E6E",
    gradientTo: "#F5A623",
  },
];

function Card({ category, title, description, source, gradientFrom, gradientTo }: MarqueeCardData) {
  return (
    <article
      className="relative flex h-[420px] w-[280px] flex-col justify-end overflow-hidden rounded-3xl border border-border p-6 sm:h-[460px] sm:w-[320px]"
      style={{ background: `linear-gradient(160deg, ${gradientFrom}, ${gradientTo})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"
      />
      <div className="relative">
        <span className="font-mono-brand inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          {category}
        </span>
        <h3 className="font-display mt-4 text-xl font-black uppercase tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
          {source}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

export function CardsMarquee() {
  return (
    <section className="overflow-hidden border-t border-border bg-surface-2/40 py-20">
      <Reveal className="mx-auto max-w-xl px-5 text-center sm:px-8">
        <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-pink">
          Destacados
        </p>
        <h2 className="font-display mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Lo último de IT&apos;S BOOM
        </h2>
      </Reveal>

      <div className="mt-14">
        <Marquee items={CARDS.map((card, i) => <Card key={i} {...card} />)} duration={42} />
      </div>
    </section>
  );
}
