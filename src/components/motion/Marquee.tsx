import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  speed?: "fast" | "normal" | "rapid";
  /** Seconds for one full loop, overriding the speed preset — for item
   * types (e.g. cards) much wider than the presets were tuned for. */
  duration?: number;
  reverse?: boolean;
  /** Pause the track while hovered — on by default so a row someone might
   * want to read (cards) doesn't slide away mid-read. Set false for a
   * strip that should never stop, hover or not. */
  pauseOnHover?: boolean;
};

// Base duration (seconds) each --animate-marquee* keyframe uses for a single
// pass of the source items — see globals.css.
const BASE_DURATION: Record<NonNullable<MarqueeProps["speed"]>, number> = {
  normal: 26,
  fast: 14,
  rapid: 9,
};

// Minimum number of source-item copies per half-track, so short item lists
// (e.g. a single phrase) still render wider than any real viewport and never
// show a gap while looping.
const MIN_COPIES = 10;

export function Marquee({
  items,
  className,
  speed = "normal",
  duration,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  const repeat = Math.max(1, Math.ceil(MIN_COPIES / items.length));
  const half = Array.from({ length: repeat }, () => items).flat();
  const track = [...half, ...half];
  // Scale duration with the repeat count so px/s speed stays constant
  // regardless of how many copies were needed to fill the half-track —
  // unless an explicit duration was given, which is taken as-is.
  const resolvedDuration = duration ?? BASE_DURATION[speed] * repeat;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-8 will-change-transform motion-safe:animate-marquee",
          speed === "fast" && "motion-safe:animate-marquee-fast",
          speed === "rapid" && "motion-safe:animate-marquee-rapid",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${resolvedDuration}s` }}
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
