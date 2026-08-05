import { fullIngredientsList, ingredientBenefits } from "@/lib/flavors";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const accentCycle = ["text-pink", "text-gold", "text-green", "text-purple"] as const;
const borderCycle = [
  "hover:border-pink/50",
  "hover:border-gold/50",
  "hover:border-green/50",
  "hover:border-purple/50",
] as const;

export function IngredientsPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-surface p-6 sm:p-8",
        className
      )}
    >
      <p className="font-display text-lg font-black uppercase tracking-tight">
        Ingredientes
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{fullIngredientsList}</p>

      <StaggerGroup className="mt-6 grid gap-3 sm:grid-cols-3">
        {ingredientBenefits.map((item, i) => (
          <StaggerItem key={item.label}>
            <div
              className={cn(
                "h-full rounded-2xl border border-border bg-background/40 p-4 transition-colors duration-300",
                borderCycle[i % borderCycle.length]
              )}
            >
              <p
                className={cn(
                  "font-display text-sm font-black uppercase tracking-tight",
                  accentCycle[i % accentCycle.length]
                )}
              >
                {item.label}
              </p>
              <p className="text-xs text-muted">{item.value}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <p className="mt-6 text-xs text-muted/70">
        Contiene edulcorante y tartrazina. No recomendado para niños ni mujeres en
        embarazo o lactancia.
      </p>
    </div>
  );
}
