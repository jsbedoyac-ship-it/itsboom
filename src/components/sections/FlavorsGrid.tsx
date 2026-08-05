import { flavors } from "@/lib/flavors";
import { CanIllustration } from "@/components/icons/CanIllustration";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WHATSAPP_LINK } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function FlavorsGrid({ withCta = false }: { withCta?: boolean }) {
  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

            <div className="relative flex justify-center py-4">
              <CanIllustration
                id={flavor.id}
                colorFrom={flavor.colorFrom}
                colorTo={flavor.colorTo}
                label={`Lata BOOM sabor ${flavor.name}`}
                className="h-48 w-auto transition-transform duration-300 group-hover:-translate-y-1"
              />
            </div>

            <div className="relative mt-2">
              <p className="font-mono-brand text-xs uppercase tracking-widest text-muted">
                Sabor
              </p>
              <h3 className="font-display mt-1 text-2xl font-black tracking-tight">
                {flavor.name}
              </h3>
              <p
                className="mt-1 text-sm font-semibold"
                style={{ color: flavor.colorFrom }}
              >
                {flavor.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {flavor.description}
              </p>

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
  );
}
