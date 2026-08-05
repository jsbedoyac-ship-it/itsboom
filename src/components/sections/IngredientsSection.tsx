import { nutritionFacts } from "@/lib/flavors";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export function IngredientsSection() {
  return (
    <section className="border-t border-border bg-surface-2/40 py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-xs font-semibold uppercase tracking-[0.3em] text-pink">
            Fórmula
          </p>
          <h2 className="font-display mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Lo que hay adentro
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            La misma fórmula funcional en los dos sabores, por cada lata de 310 mL.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-3">
          {nutritionFacts.map((fact) => (
            <StaggerItem key={fact.label}>
              <div className="h-full rounded-2xl border border-border bg-surface p-5 text-center transition-colors duration-300 hover:border-gold/50">
                <p className="font-display text-2xl font-black text-gold">{fact.value}</p>
                <p className="mt-1 text-sm text-muted">{fact.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-8 text-center text-xs text-muted/70">
          Contiene edulcorante. No recomendado para niños ni mujeres en embarazo o lactancia.
        </p>
      </div>
    </section>
  );
}
