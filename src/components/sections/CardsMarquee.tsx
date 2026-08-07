import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

// Each slide is a fully designed graphic (its own text/branding baked in),
// so the card is just an image frame — no title/category overlay on top
// of it. Waiting on the 8 real files to fill this in, in the order given:
// 1. Energía + enfoque + resistencia
// 2. Diseñado para altos rendimientos
// 3. Un impulso para cada disciplina
// 4. Boxeo
// 5. Bici cross
// 6. Moto cross
// 7. CrossFit / Hyrox / Artes marciales
// 8. Un solo impulso, infinitas posibilidades
const SLIDE_COUNT = 8;

function SlideCard({ index }: { index: number }) {
  return (
    <div className="flex h-[440px] w-[320px] shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface sm:h-[500px] sm:w-[360px]">
      <span className="font-mono-brand text-xs uppercase tracking-[0.3em] text-muted">
        Imagen {index + 1}
      </span>
    </div>
  );
}

export function CardsMarquee() {
  const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => <SlideCard key={i} index={i} />);

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
        <Marquee items={slides} duration={42} pauseOnHover={false} />
      </div>
    </section>
  );
}
