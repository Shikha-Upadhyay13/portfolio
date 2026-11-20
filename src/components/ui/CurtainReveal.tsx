"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

/** Theater-velvet pleats — deep wine with soft fold highlights. */
const VELVET =
  "repeating-linear-gradient(90deg, #2a0a12 0px, #4a1420 10px, #6b1e2e 18px, #3d1018 28px, #5c1828 36px, #2a0a12 44px)";

const OPEN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function CurtainReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.28, margin: "-40px" });
  const open = reduceMotion || inView;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Stage floor / content */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0.35, scale: 0.985 }}
        animate={
          open
            ? { opacity: 1, scale: 1 }
            : { opacity: 0.35, scale: 0.985 }
        }
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: reduceMotion ? 0 : 0.35 }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      {/* Curtains + valance — sit above until they part */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        {/* Soft stage wash — fades as curtains part */}
        <motion.div
          initial={false}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: EASE_OUT_EXPO }}
          className="absolute inset-0 bg-[#0a0608]/85"
        />

        {/* Top valance / pelmet */}
        <motion.div
          initial={false}
          animate={open ? { y: "-110%" } : { y: 0 }}
          transition={{
            duration: reduceMotion ? 0.01 : 1.15,
            ease: OPEN_EASE,
            delay: reduceMotion ? 0 : 0.05,
          }}
          className="absolute inset-x-0 top-0 z-30 h-[14%] min-h-[52px] origin-top"
          style={{
            background: VELVET,
            boxShadow:
              "0 12px 28px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(212,175,95,0.35)",
          }}
        >
          {/* Gold fringe */}
          <div
            className="absolute inset-x-0 bottom-0 h-2"
            style={{
              background:
                "repeating-linear-gradient(90deg, #d4af5f 0 3px, transparent 3px 9px), linear-gradient(#c9a227, #8a6a1a)",
              opacity: 0.9,
            }}
          />
          {/* Center crest mark */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af5f]/70" />
            <span className="font-display text-[10px] uppercase tracking-[0.35em] text-[#e8d5a3]/90">
              Stage
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af5f]/70" />
          </div>
        </motion.div>

        {/* Left curtain */}
        <CurtainPanel side="left" open={open} reduceMotion={!!reduceMotion} />

        {/* Right curtain */}
        <CurtainPanel side="right" open={open} reduceMotion={!!reduceMotion} />

        {/* Center rope / parting highlight */}
        <motion.div
          initial={false}
          animate={open ? { opacity: 0, scaleY: 0.6 } : { opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="absolute inset-y-[12%] left-1/2 z-40 w-px origin-center -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #d4af5f 15%, #f0e0a8 50%, #d4af5f 85%, transparent)",
            boxShadow: "0 0 18px rgba(212,175,95,0.45)",
          }}
        />
      </div>
    </div>
  );
}

function CurtainPanel({
  side,
  open,
  reduceMotion,
}: {
  side: "left" | "right";
  open: boolean;
  reduceMotion: boolean;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={false}
      animate={
        open
          ? {
              x: isLeft ? "-102%" : "102%",
              skewX: isLeft ? -2 : 2,
            }
          : { x: "0%", skewX: 0 }
      }
      transition={{
        duration: reduceMotion ? 0.01 : 1.45,
        ease: OPEN_EASE,
        delay: reduceMotion ? 0 : 0.12,
      }}
      className={`absolute bottom-0 top-[10%] z-20 w-[52%] ${
        isLeft ? "left-0 origin-left" : "right-0 origin-right"
      }`}
      style={{
        background: VELVET,
        boxShadow: isLeft
          ? "8px 0 40px rgba(0,0,0,0.5), inset -18px 0 40px rgba(0,0,0,0.35)"
          : "-8px 0 40px rgba(0,0,0,0.5), inset 18px 0 40px rgba(0,0,0,0.35)",
      }}
    >
      {/* Inner edge gold trim */}
      <div
        className={`absolute inset-y-0 w-[3px] ${
          isLeft ? "right-0" : "left-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, transparent 5%, #d4af5f 20%, #f5e6b8 50%, #d4af5f 80%, transparent 95%)",
          opacity: 0.75,
        }}
      />

      {/* Soft fabric sheen */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: isLeft
            ? "linear-gradient(105deg, transparent 40%, rgba(255,220,180,0.08) 55%, transparent 70%)"
            : "linear-gradient(255deg, transparent 40%, rgba(255,220,180,0.08) 55%, transparent 70%)",
        }}
      />

      {/* Bottom weight / hem */}
      <div
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), transparent), linear-gradient(#8a6a1a, #d4af5f)",
          opacity: 0.85,
        }}
      />
    </motion.div>
  );
}
