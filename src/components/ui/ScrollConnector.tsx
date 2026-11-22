"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * A thread that grows as the user scrolls from one section into the next,
 * instead of each section fading in independently. Progress is driven
 * directly by scroll position (useScroll + a ref'd viewport band), not by
 * a one-shot viewport-entry trigger like `Reveal`.
 */
export default function ScrollConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 35%"],
  });

  const rawHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const height = useSpring(rawHeight, { stiffness: 140, damping: 24 });
  const dotOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0]
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="scroll-connector relative flex h-28 justify-center md:h-36"
    >
      <div className="relative h-full w-px overflow-visible bg-line">
        <motion.div
          style={{ height: reduceMotion ? "100%" : height }}
          className="absolute top-0 left-0 w-px bg-gradient-to-b from-accent via-accent/70 to-transparent"
        />
        {!reduceMotion && (
          <motion.div
            style={{ top: height, opacity: dotOpacity }}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_color-mix(in_srgb,var(--accent-1)_45%,transparent)]"
          />
        )}
      </div>
    </div>
  );
}
