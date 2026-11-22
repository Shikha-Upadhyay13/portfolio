"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

const INTRO_MS = 1200;
const INTRO_SEEN_KEY = "portfolio-intro-seen";

export default function IntroSplash() {
  const reduceMotion = useReducedMotion();
  // Start hidden to avoid SSR flash; decide after mount.
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    setVisible(!seen);
    setReady(true);

    // Only lock scroll restoration during the first-visit intro.
    if (!seen && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    } else if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }
  }, []);

  useEffect(() => {
    if (!ready || !visible) return;

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
  }, [ready, visible, reduceMotion]);

  const finish = () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }
    document.body.style.overflow = "";
    setVisible(false);

    // First visit still lands on hero; hash restores only after intro was already seen.
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      // Clear hash on first paint so the hero reads cleanly after splash.
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo(0, 0);
  };

  if (!ready) return null;

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
            scale: 1.02,
            filter: "blur(6px)",
            transition: { duration: 0.35, ease: EASE_OUT_EXPO },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-page"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[min(90vw,28rem)] w-[min(90vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]"
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.35, rotate: -45 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 45 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="mb-8 h-10 w-10 rounded-md bg-accent shadow-[0_0_40px_var(--accent-glow)] md:h-12 md:w-12"
              aria-hidden
            />

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: EASE_OUT_EXPO }}
              className="font-display text-4xl font-bold tracking-tight md:text-6xl"
            >
              <span className="accent-text">Shikha</span>
              <span className="text-fg">.dev</span>
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35, ease: EASE_OUT_EXPO }}
              className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-400 md:text-base"
            >
              AI Engineer · RAG · Agentic Systems
            </motion.p>

            {!reduceMotion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-10 h-[2px] w-40 overflow-hidden rounded-full bg-white/10"
                aria-hidden
              >
                <motion.div
                  className="h-full bg-[#47F1FF]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.28, duration: 0.85, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-8 right-8 z-20 text-xs tracking-wide text-gray-500 transition-colors hover:text-white"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
