"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TextTunnel } from "@/components/ui/TextTunnel";
import { flavors } from "@/lib/flavors";

const heroCans = [
  {
    ...flavors[0],
    src: "/can-kiwi-fresa.png",
    width: 1214,
    height: 1600,
    baseRotate: 11,
    clinkDelta: 7,
    overshoot: -3,
  },
  {
    ...flavors[1],
    src: "/can-mora-azul.png",
    width: 1202,
    height: 1600,
    baseRotate: -11,
    clinkDelta: -7,
    overshoot: 3,
  },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <TextTunnel
      text="Hecha para quienes van por más"
      className="h-[clamp(20rem,80vw,50rem)]"
    >
      <div className="flex w-full max-w-2xl items-end justify-center gap-1 pb-2 sm:max-w-3xl sm:gap-3 sm:pb-4 lg:max-w-4xl">
        {heroCans.map((can, i) => (
          <motion.div
            key={can.id}
            className="relative w-[42%] max-w-[16rem] sm:max-w-[20rem] lg:max-w-[24rem]"
            style={{ aspectRatio: `${can.width} / ${can.height}`, transformOrigin: "bottom center" }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 60, rotate: can.baseRotate }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: shouldReduceMotion
                ? can.baseRotate
                : [
                    can.baseRotate,
                    can.baseRotate,
                    can.baseRotate + can.clinkDelta,
                    can.baseRotate + can.overshoot,
                    can.baseRotate,
                  ],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
              rotate: shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 2.6,
                    times: [0, 0.5, 0.62, 0.8, 1],
                    delay: 1.1,
                    repeat: Infinity,
                    repeatDelay: 1.6,
                    ease: "easeInOut",
                  },
            }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          >
            <div className="relative h-full w-full drop-shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
              <Image
                src={can.src}
                alt={`Lata IT'S BOOM sabor ${can.name}`}
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 45vw"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </TextTunnel>
  );
}
