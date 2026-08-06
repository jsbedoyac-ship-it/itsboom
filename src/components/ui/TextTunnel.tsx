import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/motion/Marquee";

const FRAME_COUNT = 5;

type TextTunnelProps = {
  text: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Glowing perspective "tunnel" backdrop: receding neon frames, a scrolling
 * text wall with a faded floor reflection, and a slot for foreground content.
 */
export function TextTunnel({ text, className, children }: TextTunnelProps) {
  const textItem = (
    <span
      className="font-display flex items-center gap-6 whitespace-nowrap text-[3rem] font-black uppercase leading-none tracking-tight text-white motion-safe:animate-text-glow sm:text-[5rem] lg:text-[6.5rem]"
      style={{ textShadow: "0 0 30px rgba(236,30,110,0.55), 0 0 70px rgba(236,30,110,0.3)" }}
    >
      {text}
      <span className="text-gold" aria-hidden="true">
        ✦
      </span>
    </span>
  );

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] border border-border bg-background",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(236,30,110,0.24),transparent_70%)] motion-safe:animate-hue-shift" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_38%_32%_at_28%_18%,rgba(122,193,66,0.14),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_38%_32%_at_76%_22%,rgba(75,46,158,0.2),transparent_70%)]" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: FRAME_COUNT }).map((_, i) => {
          const inset = 6 + i * 8.5;
          return (
            <div
              key={i}
              className="absolute rounded-[1.75rem] border motion-safe:animate-glow-pulse"
              style={{
                inset: `${inset}%`,
                borderColor: i % 2 === 0 ? "rgba(236,30,110,0.4)" : "rgba(245,166,35,0.22)",
                boxShadow: `0 0 ${16 + i * 4}px rgba(236,30,110,0.22)`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-x-0 top-[36%] -translate-y-1/2 opacity-90">
        <Marquee items={[textItem]} />
      </div>

      <div
        className="absolute inset-x-0 top-[64%] origin-top scale-y-[-1] opacity-25"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 75%)",
        }}
        aria-hidden="true"
      >
        <Marquee items={[textItem]} reverse />
      </div>

      <div className="relative z-10 flex h-full items-end justify-center">{children}</div>
    </div>
  );
}
