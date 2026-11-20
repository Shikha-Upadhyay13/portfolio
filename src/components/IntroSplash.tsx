"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

const INTRO_MS = 2800;

export default function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // Always land on the hero after reload — ignore restored scroll / #hash.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const delay = reduceMotion ? 400 : INTRO_MS;
    const t = setTimeout(finish, delay);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduceMotion]);

  const finish = () => {
    window.scrollTo(0, 0);
    setVisible(false);
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          role="dialog"
          aria-label="Welcome"
          aria-modal="true"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.65, ease: EASE_OUT_EXPO },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0b0b0f] overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,28rem)] h-[min(90vw,28rem)] rounded-full bg-[#47F1FF]/10 blur-[100px]"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.35, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 45 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-[#47F1FF] mb-8 shadow-[0_0_40px_rgba(71,241,255,0.45)]"
              aria-hidden
            />

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="text-4xl md:text-6xl font-bold font-display tracking-tight"
            >
              <span className="accent-text">Shikha</span>
              <span className="text-white">.dev</span>
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.55, ease: EASE_OUT_EXPO }}
              className="mt-4 text-sm md:text-base text-gray-400 tracking-[0.2em] uppercase"
            >
              AI Engineer · RAG · Agentic Systems
            </motion.p>

            {!reduceMotion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-10 w-40 h-[2px] rounded-full bg-white/10 overflow-hidden"
                aria-hidden
              >
                <motion.div
                  className="h-full bg-[#47F1FF]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 1.85, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-8 right-8 z-20 text-xs text-gray-500 hover:text-white transition-colors tracking-wide"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
