import Image from "next/image";
import { flavors } from "@/lib/flavors";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WHATSAPP_LINK } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { IngredientsPanel } from "@/components/sections/IngredientsPanel";

export function FlavorsGrid({ withCta = false }: { withCta?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl">
      <StaggerGroup className="grid gap-6 sm:grid-cols-2">
        {flavors.map((flavor) => (
          <StaggerItem key={flavor.id}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-gold/50">
              <div
                className="absolute -top-16 right-0 size-40 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background: `radial-gradient(circle, ${flavor.colorFrom}, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              <div className="relative flex justify-center py-2">
                <div className="relative h-56 w-[60%] transition-transform duration-300 group-hover:-translate-y-1 sm:h-64">
                  <Image
                    src={flavor.photo}
                    alt={`Lata IT'S BOOM sabor ${flavor.name}`}
                    fill
                    sizes="(min-width: 640px) 16rem, 50vw"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>

              <div className="relative mt-2">
                <div className="flex items-center justify-between">
                  <p className="font-mono-brand text-xs uppercase tracking-widest text-muted">
                    Sabor
                  </p>
                  <p className="font-mono-brand text-xs text-muted">
                    {flavor.netContent} · {flavor.servings} porción
                  </p>
                </div>
                <h3 className="font-display mt-1 text-2xl font-black tracking-tight">
                  {flavor.name}
                </h3>

                {withCta && (
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground transition-colors duration-200 hover:border-gold hover:text-gold cursor-pointer"
                  >
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                    Pedir {flavor.name}
                  </a>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <IngredientsPanel className="mt-6" />
    </div>
  );
}
