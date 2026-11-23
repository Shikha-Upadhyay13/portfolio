"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/animations";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 56 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  none: {},
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", ...offset[direction] }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-10% 0px -8% 0px" }}
      transition={{
        duration: 0.85,
        ease: EASE_OUT_EXPO,
        delay,
        opacity: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
        filter: { duration: 0.75, ease: EASE_OUT_EXPO, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
