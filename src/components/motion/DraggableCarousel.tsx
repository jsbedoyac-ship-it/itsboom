"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DraggableCarouselProps = {
  items: ReactNode[];
  className?: string;
  /** px/ms for the idle auto-scroll drift. */
  speed?: number;
};

// How long a manual interaction (drag or a prev/next tap) keeps the
// idle auto-scroll paused before it drifts again — long enough that
// resuming doesn't fight residual touch-scroll momentum.
const RESUME_DELAY_MS = 900;

/**
 * A marquee that never stops drifting on its own, but — unlike the
 * plain CSS `Marquee` — can be grabbed: drag or swipe it (touch scrolls
 * natively; mouse gets a pointer-driven drag since a div has no native
 * click-drag-to-scroll), or use the prev/next arrows to step one card
 * at a time. The item list is tripled into one continuous scroll
 * container and silently snapped back by one set-width whenever it
 * drifts past a rendered copy, so the loop has no visible seam in
 * either scroll direction.
 */
export function DraggableCarousel({ items, className, speed = 0.045 }: DraggableCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const oneSetWidthRef = useRef(0);
  const cardStepRef = useRef(0);
  const isInteractingRef = useRef(false);
  const isMouseDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const resumeTimeoutRef = useRef<number | undefined>(undefined);
  const shouldReduceMotion = useReducedMotion();

  const track = [...items, ...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      oneSetWidthRef.current = container.scrollWidth / 3;
      const firstCard = container.firstElementChild as HTMLElement | null;
      if (firstCard) {
        const style = getComputedStyle(container);
        const gap = parseFloat(style.columnGap || style.gap || "0");
        cardStepRef.current = firstCard.getBoundingClientRect().width + gap;
      }
      // Start centered in the middle copy so there's a full set of
      // buffer to drag/scroll into on either side before a wrap.
      if (container.scrollLeft < 1) {
        container.scrollLeft = oneSetWidthRef.current;
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);

    const wrap = () => {
      const oneSet = oneSetWidthRef.current;
      if (oneSet <= 0) return;
      if (container.scrollLeft >= oneSet * 2) container.scrollLeft -= oneSet;
      else if (container.scrollLeft <= 0) container.scrollLeft += oneSet;
    };

    let lastTime: number | null = null;
    let rafId: number;
    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const dt = now - lastTime;
      lastTime = now;

      if (!isInteractingRef.current && !shouldReduceMotion) {
        container.scrollLeft += speed * dt;
      }
      wrap();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const pause = () => {
      isInteractingRef.current = true;
      window.clearTimeout(resumeTimeoutRef.current);
    };
    const scheduleResume = () => {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = window.setTimeout(() => {
        isInteractingRef.current = false;
      }, RESUME_DELAY_MS);
    };

    // Touch drags scroll natively (momentum included) — we just need
    // to stay out of the way while one is happening. Mouse drags don't
    // scroll a div on their own, so those are driven by hand below.
    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType === "mouse") {
        isMouseDraggingRef.current = true;
        dragStartXRef.current = e.clientX;
        dragStartScrollRef.current = container.scrollLeft;
        container.setPointerCapture(e.pointerId);
        container.style.cursor = "grabbing";
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isMouseDraggingRef.current) return;
      container.scrollLeft = dragStartScrollRef.current - (e.clientX - dragStartXRef.current);
    };
    const endDrag = (e: PointerEvent) => {
      if (isMouseDraggingRef.current && container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
      isMouseDraggingRef.current = false;
      container.style.cursor = "";
      scheduleResume();
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.clearTimeout(resumeTimeoutRef.current);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
    };
  }, [items.length, speed, shouldReduceMotion]);

  const step = (direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container || !cardStepRef.current) return;
    isInteractingRef.current = true;
    window.clearTimeout(resumeTimeoutRef.current);
    container.scrollBy({ left: direction * cardStepRef.current, behavior: "smooth" });
    resumeTimeoutRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, RESUME_DELAY_MS);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        // No CSS scroll-behavior:smooth here on purpose — the idle
        // drift sets scrollLeft every animation frame, and the browser
        // treating each of those tiny steps as its own smooth-scroll
        // animation makes them fight each other instead of reading as
        // continuous motion. The prev/next buttons ask for a smooth
        // scroll explicitly instead, per-call, via scrollBy's own
        // `behavior` option.
        className="no-scrollbar flex touch-pan-x cursor-grab gap-8 overflow-x-auto"
      >
        {track.map((item, i) => (
          <div key={i} className="shrink-0 select-none">
            {item}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-gold hover:text-gold"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-gold hover:text-gold"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
