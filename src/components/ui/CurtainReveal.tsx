"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

/** Cafe-brown velvet pleats — warm stage for hobbies / Bharatanatyam. */
const VELVET =
  "repeating-linear-gradient(90deg, #3d2416 0px, #5c3a24 10px, #7a4e32 18px, #4a2e1a 28px, #6b4228 36px, #3d2416 44px)";

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
  // Replay every visit: open while in view, close when you leave so the next
  // scroll-in can part the curtains again.
  const inView = useInView(ref, { once: false, amount: 0.22, margin: "-60px 0px" });
  const open = reduceMotion || inView;
  const openMs = reduceMotion ? 0.01 : 1.45;
  const closeMs = reduceMotion ? 0.01 : 0.55;

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
        transition={{
          duration: open ? 1.1 : closeMs,
          ease: EASE_OUT_EXPO,
          delay: open && !reduceMotion ? 0.35 : 0,
        }}
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
          transition={{
            duration: open ? (reduceMotion ? 0.01 : 0.9) : closeMs,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute inset-0 bg-[#2a1c14]/85"
        />

        {/* Top valance / pelmet */}
        <motion.div
          initial={false}
          animate={open ? { y: "-110%" } : { y: 0 }}
          transition={{
            duration: open ? (reduceMotion ? 0.01 : 1.15) : closeMs,
            ease: OPEN_EASE,
            delay: open && !reduceMotion ? 0.05 : 0,
          }}
          className="absolute inset-x-0 top-0 z-30 h-[14%] min-h-[52px] origin-top"
          style={{
            background: VELVET,
            boxShadow:
              "0 12px 28px rgba(42,28,20,0.55), inset 0 -1px 0 rgba(196,164,132,0.4)",
          }}
        >
          {/* Warm beige fringe */}
          <div
            className="absolute inset-x-0 bottom-0 h-2"
            style={{
              background:
                "repeating-linear-gradient(90deg, #c4a484 0 3px, transparent 3px 9px), linear-gradient(#a67c52, #6f4e37)",
              opacity: 0.9,
            }}
          />
          {/* Center crest mark */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c4a484]/70" />
            <span className="font-display text-[10px] uppercase tracking-[0.35em] text-[#f5ede0]/90">
              Stage
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c4a484]/70" />
          </div>
        </motion.div>

        {/* Left curtain */}
        <CurtainPanel
          side="left"
          open={open}
          openMs={openMs}
          closeMs={closeMs}
        />

        {/* Right curtain */}
        <CurtainPanel
          side="right"
          open={open}
          openMs={openMs}
          closeMs={closeMs}
        />

        {/* Center rope / parting highlight */}
        <motion.div
          initial={false}
          animate={open ? { opacity: 0, scaleY: 0.6 } : { opacity: 1, scaleY: 1 }}
          transition={{
            duration: open ? 0.55 : closeMs,
            ease: EASE_OUT_EXPO,
          }}
          className="absolute inset-y-[12%] left-1/2 z-40 w-px origin-center -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #a67c52 15%, #f5ede0 50%, #a67c52 85%, transparent)",
            boxShadow: "0 0 18px rgba(111,78,55,0.4)",
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
              skewX: isLeft ? -2 : 2,
            }
          : { x: "0%", skewX: 0 }
      }
      transition={{
        duration: open ? openMs : closeMs,
        ease: OPEN_EASE,
        delay: open && openMs > 0.05 ? 0.12 : 0,
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
            "linear-gradient(to bottom, transparent 5%, #a67c52 20%, #f5ede0 50%, #a67c52 80%, transparent 95%)",
          opacity: 0.75,
        }}
      />

      {/* Soft fabric sheen */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: isLeft
            ? "linear-gradient(105deg, transparent 40%, rgba(245,237,224,0.1) 55%, transparent 70%)"
            : "linear-gradient(255deg, transparent 40%, rgba(245,237,224,0.1) 55%, transparent 70%)",
        }}
      />

      {/* Bottom weight / hem */}
      <div
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          background:
            "linear-gradient(to top, rgba(42,28,20,0.55), transparent), linear-gradient(#6f4e37, #c4a484)",
          opacity: 0.85,
        }}
      />
    </motion.div>
  );
}
