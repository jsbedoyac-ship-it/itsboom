import Image from "next/image";

const WORDMARK_SRC = "/wordmark-itsboom.png";
const WORDMARK_WIDTH = 775;
const WORDMARK_HEIGHT = 135;

/**
 * Big "IT'S BOOM" mark — the exact letterforms from the brand's reference
 * art (public/Its'Boom.png), cut out from its background, not a font-based
 * redraw.
 */
export function BrandWordmark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative flex select-none items-center justify-center overflow-hidden px-4"
    >
      <Image
        src={WORDMARK_SRC}
        alt=""
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        priority
        className="h-auto w-full max-w-[820px]"
      />
    </div>
  );
}
