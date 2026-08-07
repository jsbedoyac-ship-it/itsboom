import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

// Each slide is a fully designed graphic (its own text/branding baked in),
// so the card is just an image frame — no title/category overlay on top
// of it. All 8 are ~1290x1280 (near-square), so a square frame with
// object-cover fits every one without a custom aspect per slide.
const SLIDES = [
  { src: "/Igamenes/slide-energia-enfoque-resistencia.jpg", alt: "Energía, enfoque y resistencia" },
  { src: "/Igamenes/slide-altos-rendimientos.jpg", alt: "Diseñado para altos rendimientos" },
  { src: "/Igamenes/slide-impulso-cada-disciplina.jpg", alt: "Un impulso para cada disciplina" },
  { src: "/Igamenes/slide-boxeo.jpg", alt: "IT'S BOOM para boxeo" },
  { src: "/Igamenes/slide-bici-cross.jpg", alt: "IT'S BOOM para bici cross" },
  { src: "/Igamenes/slide-moto-cross.jpg", alt: "IT'S BOOM para moto cross" },
  { src: "/Igamenes/slide-crossfit-hyrox-artes-marciales.jpg", alt: "IT'S BOOM para CrossFit, Hyrox y artes marciales" },
  { src: "/Igamenes/slide-infinitas-posibilidades.jpg", alt: "Un solo impulso, infinitas posibilidades" },
];

function SlideCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-[320px] shrink-0 overflow-hidden rounded-3xl border border-border sm:w-[380px]">
      <Image src={src} alt={alt} fill sizes="(min-width: 640px) 380px, 320px" className="object-cover" />
    </div>
  );
}

export function CardsMarquee() {
  const slides = SLIDES.map((slide, i) => <SlideCard key={i} {...slide} />);

  return (
    <section className="overflow-hidden border-t border-border bg-surface-2/40 py-20">
      <Reveal className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-pink">
          Destacados
        </p>
        <h2 className="font-display mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          ¿Por qué IT&apos;S BOOM es para todos los deportes?
        </h2>
      </Reveal>

      <div className="mt-14">
        <Marquee items={slides} duration={100} pauseOnHover={false} />
      </div>
    </section>
  );
}
