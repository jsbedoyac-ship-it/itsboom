import { InterlockedRings } from "@/components/icons/InterlockedRings";

/**
 * Big outlined "IT'S BOOM" mark — hollow stroke, no fill, no glow. One tight
 * line ("IT'S" running straight into "BOOM"), italic, matching the brand's
 * reference art exactly rather than a decorated reinterpretation.
 */
export function BrandWordmark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative flex select-none items-center justify-center overflow-hidden"
    >
      <span className="font-display -skew-x-6 inline-flex items-center whitespace-nowrap text-[clamp(2.75rem,11vw,7rem)] font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(230,230,235,0.8)]">
        IT&apos;S
        <span className="ml-[0.02em] inline-flex items-center">
          B
          <InterlockedRings className="mx-[-0.06em] h-[0.55em] w-[0.95em] translate-y-[0.04em] text-white/80" />
          M
        </span>
      </span>
    </div>
  );
}
