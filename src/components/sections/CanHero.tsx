import Image from "next/image";

const CAN_SRC = "/can-mora-azul-cutout.png";
const CAN_WIDTH = 504;
const CAN_HEIGHT = 934;

/**
 * Hero visual: the can as an isolated cutout (no video, no background
 * plate) so nothing reads as a cropped rectangle — just the product,
 * floating with a soft glow and a gentle turntable-style rotation.
 */
export function CanHero() {
  return (
    <div className="relative flex justify-center py-6 sm:py-10">
      <div
        aria-hidden="true"
        className="animate-glow-pulse absolute top-1/2 left-1/2 h-[38vh] w-[38vh] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/30 blur-[90px]"
      />
      <Image
        src={CAN_SRC}
        alt="Lata IT'S BOOM sabor Mora Azul Açaí"
        width={CAN_WIDTH}
        height={CAN_HEIGHT}
        priority
        className="animate-can-spin relative h-[48vh] max-h-[440px] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)] [transform-style:preserve-3d] sm:h-[62vh] sm:max-h-[600px]"
      />
    </div>
  );
}
