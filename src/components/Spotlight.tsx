"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/**
 * A large radial glow that follows the cursor — the page's "signature" effect.
 * Sits behind all content (-z-10) and fades to the static ambient color when
 * the pointer leaves the window.
 */
export default function Spotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 });

  const background = useMotionTemplate`radial-gradient(140px circle at ${sx}px ${sy}px, rgba(168,85,247,0.18), rgba(59,130,246,0.10) 40%, transparent 70%)`;

  useEffect(() => {
    // Start centered so there's a glow before the first mouse move
    x.set(window.innerWidth / 2);
    y.set(window.innerHeight * 0.4);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
