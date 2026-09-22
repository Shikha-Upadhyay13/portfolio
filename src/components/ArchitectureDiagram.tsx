"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export type ArchitectureStep = {
  step: string;
  detail: string;
};

export default function ArchitectureDiagram({
  steps,
}: {
  steps: ArchitectureStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent"
      />

      <ol className="space-y-4">
        {steps.map((item, i) => (
          <motion.li
            key={item.step}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={
              reduceMotion || inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -12 }
            }
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative flex gap-4 pl-10"
          >
            <span className="absolute left-0 w-8 h-8 rounded-full border border-accent/50 bg-[#0b0b0f] flex items-center justify-center text-xs accent-text font-mono z-10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 p-4 rounded-xl glass border border-white/5 hover:border-accent/30 transition-colors">
              <h3 className="font-semibold mb-1">{item.step}</h3>
              <p className="text-sm text-gray-400">{item.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
