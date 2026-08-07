import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { WHATSAPP_LINK } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type Slide = { src: string; alt: string };

// Each slide is a fully designed graphic (its own text/branding baked in),
// so the card is just an image frame — no title/category overlay on top
// of it. All 8 are ~1290x1280 (near-square), so a square frame with
// object-cover fits every one without a custom aspect per slide.
const SPORTS_SLIDES: Slide[] = [
  { src: "/Igamenes/slide-energia-enfoque-resistencia.jpg", alt: "Energía, enfoque y resistencia" },
  { src: "/Igamenes/slide-altos-rendimientos.jpg", alt: "Diseñado para altos rendimientos" },
  { src: "/Igamenes/slide-impulso-cada-disciplina.jpg", alt: "Un impulso para cada disciplina" },
  { src: "/Igamenes/slide-boxeo.jpg", alt: "IT'S BOOM para boxeo" },
  { src: "/Igamenes/slide-bici-cross.jpg", alt: "IT'S BOOM para bici cross" },
  { src: "/Igamenes/slide-moto-cross.jpg", alt: "IT'S BOOM para moto cross" },
  { src: "/Igamenes/slide-crossfit-hyrox-artes-marciales.jpg", alt: "IT'S BOOM para CrossFit, Hyrox y artes marciales" },
  { src: "/Igamenes/slide-infinitas-posibilidades.jpg", alt: "Un solo impulso, infinitas posibilidades" },
];

export const PACK_SLIDES: Slide[] = [
  { src: "/Igamenes/6_pack_kiwi.webp", alt: "Six pack IT'S BOOM Kiwi y Fresa" },
  { src: "/Igamenes/six_pack_mora_azul_acai.webp", alt: "Six pack IT'S BOOM Mora Azul Açaí" },
  { src: "/Igamenes/24pack_kiwi_web.webp", alt: "24 pack IT'S BOOM Kiwi y Fresa" },
  { src: "/Igamenes/24pack_mora_azil_web.webp", alt: "24 pack IT'S BOOM Mora Azul Açaí" },
];

function SlideCard({ src, alt }: Slide) {
  return (
    <div className="relative aspect-square w-[320px] shrink-0 overflow-hidden rounded-3xl border border-border sm:w-[380px]">
      <Image src={src} alt={alt} fill sizes="(min-width: 640px) 380px, 320px" className="object-cover" />
    </div>
  );
}

type CardsMarqueeProps = {
  slides?: Slide[];
  showHeading?: boolean;
  ctaLabel?: string;
};

export function CardsMarquee({ slides = SPORTS_SLIDES, showHeading = true, ctaLabel }: CardsMarqueeProps) {
  const items = slides.map((slide, i) => <SlideCard key={i} {...slide} />);

  return (
    <section className="overflow-hidden border-t border-border bg-surface-2/40 py-20">
      {showHeading && (
        <Reveal className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-pink">
            Destacados
          </p>
          <h2 className="font-display mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            ¿Por qué IT&apos;S BOOM es para todos los deportes?
          </h2>
        </Reveal>
      )}

      <div className={showHeading ? "mt-14" : undefined}>
        <Marquee items={items} duration={100} pauseOnHover={false} />
      </div>

      {ctaLabel && (
        <Reveal className="mt-10 flex justify-center px-5">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-colors duration-200 hover:border-whatsapp hover:text-whatsapp cursor-pointer"
          >
            <WhatsAppIcon className="size-4" />
            {ctaLabel}
          </a>
        </Reveal>
      )}
    </section>
  );
}
