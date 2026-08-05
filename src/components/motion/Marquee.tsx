import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  speed?: "fast" | "normal";
  reverse?: boolean;
};

export function Marquee({ items, className, speed = "normal", reverse = false }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-8 will-change-transform motion-safe:animate-marquee",
          speed === "fast" && "motion-safe:animate-marquee-fast",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {track.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
