import type { Metadata } from "next";
import { ChevronDown, Store } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { INSTAGRAM_HANDLE, INSTAGRAM_LINK, WHATSAPP_LINK } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto | IT'S BOOM Energy Drink",
  description: "Escríbenos por WhatsApp o Instagram. Resuelve tus dudas sobre pedidos y distribución.",
};

const faqs = [
  {
    question: "¿Cómo hago un pedido?",
    answer:
      "Escríbenos por WhatsApp indicando el sabor y la cantidad que necesitas. Te confirmamos disponibilidad, precio y forma de entrega.",
  },
  {
    question: "¿Cómo puedo ser distribuidor?",
    answer:
      "Contáctanos por WhatsApp o Instagram contándonos sobre tu negocio (tienda, gimnasio, evento). Te compartimos condiciones y precios por volumen.",
  },
  {
    question: "¿IT'S BOOM tiene azúcar?",
    answer: "No. IT'S BOOM es una bebida energizante free sugar: toda la energía, sin azúcar añadida.",
  },
  {
    question: "¿Qué sabores tienen disponibles?",
    answer: "Actualmente tenemos Kiwi y Fresa, y Mora Azul Açaí, con más sabores en camino.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos"
        description="¿Tienes dudas, quieres hacer un pedido o unirte como distribuidor? Estamos a un mensaje de distancia."
      />

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <StaggerGroup className="grid gap-6 sm:grid-cols-3">
          <StaggerItem>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-whatsapp/60 cursor-pointer"
            >
              <WhatsAppIcon className="size-7 text-whatsapp" />
              <h3 className="font-display mt-4 text-lg font-bold">WhatsApp</h3>
              <p className="mt-2 text-sm text-muted">
                La forma más rápida de pedir o resolver dudas.
              </p>
              <span className="mt-4 text-sm font-semibold text-whatsapp">Escribir ahora →</span>
            </a>
          </StaggerItem>

          <StaggerItem>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-pink/60 cursor-pointer"
            >
              <InstagramIcon className="size-7 text-pink" />
              <h3 className="font-display mt-4 text-lg font-bold">Instagram</h3>
              <p className="mt-2 text-sm text-muted">
                Síguenos en {INSTAGRAM_HANDLE} para novedades y lanzamientos.
              </p>
              <span className="mt-4 text-sm font-semibold text-pink">Ver perfil →</span>
            </a>
          </StaggerItem>

          <StaggerItem>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-green/60 cursor-pointer"
            >
              <Store className="size-7 text-green" aria-hidden="true" />
              <h3 className="font-display mt-4 text-lg font-bold">Distribuidores</h3>
              <p className="mt-2 text-sm text-muted">
                ¿Quieres vender IT&apos;S BOOM en tu negocio? Hablemos de condiciones.
              </p>
              <span className="mt-4 text-sm font-semibold text-green">Aplicar ahora →</span>
            </a>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="border-t border-border bg-surface-2/40 py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-green">
              Preguntas frecuentes
            </p>
            <h2 className="font-display mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ¿Tienes dudas?
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-surface px-5 py-4 open:border-green/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground marker:content-none">
                  {faq.question}
                  <ChevronDown
                    className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
