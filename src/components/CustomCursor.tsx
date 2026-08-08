"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Raw pointer position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  // Spring-smoothed values give the ring a fluid, weighty trail
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const interactive = "a, button, input, textarea, [role='button']";
    const over = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(interactive)) setHovering(true);
    };
    const out = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(interactive)) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [x, y]);

  return (
    <>
      {/* Outer ring (spring-smoothed, grows on interactive hover) */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] border border-[#47F1FF]/50 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 0.7 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Inner dot (snappy, follows raw position) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-[#47F1FF]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
