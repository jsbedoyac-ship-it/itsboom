"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TextTunnel } from "@/components/ui/TextTunnel";
import { flavors } from "@/lib/flavors";

const heroCans = [
  { ...flavors[0], src: "/can-kiwi-fresa.png", width: 1214, height: 1600, floatDelay: 0 },
  { ...flavors[1], src: "/can-mora-azul.png", width: 1202, height: 1600, floatDelay: 0.8 },
];

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <TextTunnel
      text="Hecha para quienes van por más"
      className="h-[28rem] sm:h-[36rem] lg:h-[42rem]"
    >
      <div className="flex w-full max-w-md items-end justify-center gap-5 pb-6 sm:max-w-xl sm:gap-10 sm:pb-10">
        {heroCans.map((can, i) => (
          <motion.div
            key={can.id}
            className="relative w-1/2 max-w-[12rem] sm:max-w-[15rem]"
            style={{ aspectRatio: `${can.width} / ${can.height}` }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -16, 0] }}
              transition={{ duration: 5, delay: can.floatDelay, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={can.src}
                alt={`Lata IT'S BOOM sabor ${can.name}`}
                fill
                sizes="(min-width: 640px) 15rem, 45vw"
                className="object-contain"
                priority={i === 0}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </TextTunnel>
  );
}
