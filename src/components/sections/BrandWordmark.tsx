import { InterlockedRings } from "@/components/icons/InterlockedRings";

/**
 * Big outlined "IT'S BOOM" mark — hollow stroke + soft brand-color glow
 * instead of a solid fill, so it reads as a giant graphic accent behind the
 * can rather than another block of text. Purely decorative: the brand name
 * is already conveyed by the page title and the nav logo.
 */
export function BrandWordmark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative -mt-2 flex select-none flex-col items-center overflow-hidden leading-[0.82]"
    >
      <span
        className="font-display -skew-x-6 text-[clamp(3.25rem,17vw,9rem)] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] [text-shadow:0_0_50px_rgba(124,92,224,0.55),0_0_100px_rgba(236,30,110,0.25)]"
      >
        IT&apos;S
      </span>
      <span
        className="font-display -skew-x-6 inline-flex items-center text-[clamp(3.25rem,17vw,9rem)] font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] [text-shadow:0_0_50px_rgba(124,92,224,0.55),0_0_100px_rgba(236,30,110,0.25)]"
      >
        B
        <InterlockedRings className="mx-[-0.06em] h-[0.55em] w-[0.95em] translate-y-[0.04em] text-white/85 [filter:drop-shadow(0_0_30px_rgba(124,92,224,0.55))]" />
        M
      </span>
    </div>
  );
}
