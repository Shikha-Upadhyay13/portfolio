"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

/** Soft pink velvet pleats — Bharatanatyam / character-forward stage. */
const VELVET =
  "repeating-linear-gradient(90deg, #2a0a1a 0px, #5c1840 10px, #9d2d6a 18px, #3d1028 28px, #7a2458 36px, #2a0a1a 44px)";

const TRIM = "#f9a8d4";
const TRIM_SOFT = "#fda4c8";
const TRIM_DEEP = "#db2777";

const OPEN_EASE: [number, number, number, number] = [0.65, 0.02, 0.2, 1];
const CLOSE_EASE: [number, number, number, number] = [0.4, 0.05, 0.2, 1];

export default function CurtainReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: false,
    amount: 0.22,
    margin: "-60px 0px",
  });
  const open = reduceMotion || inView;
  const openMs = reduceMotion ? 0.01 : 1.85;
  const closeMs = reduceMotion ? 0.01 : 1.25;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0.35, scale: 0.985 }}
        animate={
          open ? { opacity: 1, scale: 1 } : { opacity: 0.35, scale: 0.985 }
        }
        transition={{
          duration: open ? 1.2 : closeMs,
          ease: EASE_OUT_EXPO,
          delay: open && !reduceMotion ? 0.4 : 0,
        }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        <motion.div
          initial={false}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            duration: open ? (reduceMotion ? 0.01 : 1) : closeMs * 0.7,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(236,72,153,0.18), rgba(10,6,12,0.9) 70%)",
          }}
        />

        {/* Top valance */}
        <motion.div
          initial={false}
          animate={open ? { y: "-110%" } : { y: 0 }}
          transition={{
            duration: open ? (reduceMotion ? 0.01 : 1.35) : closeMs,
            ease: open ? OPEN_EASE : CLOSE_EASE,
            delay: open && !reduceMotion ? 0.05 : 0,
          }}
          className="absolute inset-x-0 top-0 z-30 h-[14%] min-h-[52px] origin-top"
          style={{
            background: VELVET,
            boxShadow: `0 12px 28px rgba(0,0,0,0.55), inset 0 -1px 0 ${TRIM}55`,
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-2"
            style={{
              background: `repeating-linear-gradient(90deg, ${TRIM} 0 3px, transparent 3px 9px), linear-gradient(${TRIM_SOFT}, ${TRIM_DEEP})`,
              opacity: 0.95,
            }}
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
            <span
              className="h-px w-8"
              style={{
                background: `linear-gradient(to right, transparent, ${TRIM})`,
              }}
            />
            <span
              className="font-display text-[10px] uppercase tracking-[0.35em]"
              style={{ color: TRIM_SOFT }}
            >
              Nritya
            </span>
            <span
              className="h-px w-8"
              style={{
                background: `linear-gradient(to left, transparent, ${TRIM})`,
              }}
            />
          </div>
        </motion.div>

        <CurtainPanel
          side="left"
          open={open}
          openMs={openMs}
          closeMs={closeMs}
        />
        <CurtainPanel
          side="right"
          open={open}
          openMs={openMs}
          closeMs={closeMs}
        />

        <motion.div
          initial={false}
          animate={open ? { opacity: 0, scaleY: 0.6 } : { opacity: 1, scaleY: 1 }}
          transition={{
            duration: open ? 0.65 : closeMs * 0.5,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute inset-y-[12%] left-1/2 z-40 w-px origin-center -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${TRIM} 15%, #fff0f7 50%, ${TRIM} 85%, transparent)`,
            boxShadow: `0 0 20px ${TRIM}80`,
          }}
        />
      </div>
    </div>
  );
}

function CurtainPanel({
  side,
  open,
  openMs,
  closeMs,
}: {
  side: "left" | "right";
  open: boolean;
  openMs: number;
  closeMs: number;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={false}
      animate={
        open
          ? {
              x: isLeft ? "-102%" : "102%",
              skewX: isLeft ? -3.5 : 3.5,
            }
          : {
              // Cross past center slightly, then settle — less “straight” close
              x: isLeft ? ["8%", "0%"] : ["-8%", "0%"],
              skewX: isLeft ? [5, 0] : [-5, 0],
            }
      }
      transition={{
        duration: open ? openMs : closeMs,
        ease: open ? OPEN_EASE : CLOSE_EASE,
        delay: open && openMs > 0.05 ? 0.14 : isLeft ? 0 : 0.08,
      }}
      className={`absolute bottom-0 top-[10%] z-20 w-[54%] ${
        isLeft ? "left-0 origin-left" : "right-0 origin-right"
      }`}
      style={{
        background: VELVET,
        boxShadow: isLeft
          ? "8px 0 40px rgba(0,0,0,0.5), inset -18px 0 40px rgba(80,10,40,0.4)"
          : "-8px 0 40px rgba(0,0,0,0.5), inset 18px 0 40px rgba(80,10,40,0.4)",
      }}
    >
      <div
        className={`absolute inset-y-0 w-[3px] ${isLeft ? "right-0" : "left-0"}`}
        style={{
          background: `linear-gradient(to bottom, transparent 5%, ${TRIM} 20%, #fff0f7 50%, ${TRIM} 80%, transparent 95%)`,
          opacity: 0.85,
          boxShadow: `0 0 12px ${TRIM}66`,
        }}
      />

      <div
        className="absolute inset-0 opacity-45"
        style={{
          background: isLeft
            ? "linear-gradient(105deg, transparent 40%, rgba(255,180,220,0.12) 55%, transparent 70%)"
            : "linear-gradient(255deg, transparent 40%, rgba(255,180,220,0.12) 55%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.55), transparent), linear-gradient(${TRIM_DEEP}, ${TRIM})`,
          opacity: 0.9,
        }}
      />
    </motion.div>
  );
}
