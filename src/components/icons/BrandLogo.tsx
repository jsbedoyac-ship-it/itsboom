import { InterlockedRings } from "@/components/icons/InterlockedRings";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  variant?: "inline" | "stacked";
};

export function BrandLogo({ className, variant = "inline" }: BrandLogoProps) {
  const stacked = variant === "stacked";

  return (
    <div
      className={cn(
        "font-display italic -skew-x-6 select-none leading-none",
        stacked ? "flex flex-col gap-0.5" : "flex items-center gap-[0.18em]",
        className
      )}
    >
      <span className={stacked ? "text-[0.5em]" : ""}>IT&apos;S</span>
      <span className="flex items-center">
        B
        <InterlockedRings className="mx-[0.02em] h-[0.72em] w-[1.2em] translate-y-[0.02em]" />
        M
      </span>
    </div>
  );
}
