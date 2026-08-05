import { MessageCircle, Store } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { WHATSAPP_LINK } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, var(--pink) 0%, transparent 45%), radial-gradient(circle at 80% 80%, var(--purple) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
            <Store className="size-3.5" aria-hidden="true" />
            Distribuidores
          </div>
          <h2 className="font-display mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            ¿Quieres vender <span className="text-gradient">BOOM</span> en tu negocio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Súmate como distribuidor y lleva la energía de BOOM a tu tienda, gimnasio o evento.
            Escríbenos y te contamos cómo empezar.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-background transition-transform duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Quiero ser distribuidor
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
