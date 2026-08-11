"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, type AnimationPlaybackControls } from "framer-motion";
import { getSkillIcon } from "@/data/skillIcons";

const LOOP_SECONDS = 55; // time to travel one full set at rest

function SkillChip({ item }: { item: string }) {
  const { icon: Icon, color } = getSkillIcon(item);
  return (
    <div className="flex flex-col items-center gap-3 text-center shrink-0 w-32 px-3">
      <motion.div
        role="button"
        tabIndex={0}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 1.25 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black flex items-center justify-center"
        style={{ boxShadow: `0 0 16px 1px ${color}4d` }}
      >
        <Icon className="w-10 h-10 md:w-12 md:h-12 shrink-0" style={{ color }} />
      </motion.div>
      <span className="text-sm leading-tight text-gray-400">{item}</span>
    </div>
  );
}

export default function SkillsMarquee({
  items,
  direction = "left",
}: {
  items: string[];
  direction?: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const x = useMotionValue(0);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setSetWidth(trackRef.current.scrollWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useEffect(() => {
    if (!setWidth) return;
    startLoop();
    return () => controlsRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWidth]);

  const startLoop = () => {
    if (!setWidth) return;

    if (direction === "left") {
      const current = x.get();
      const normalized = ((current % setWidth) + setWidth) % setWidth;
      x.set(-normalized);
      const remaining = setWidth - normalized;

      controlsRef.current = animate(x, -setWidth, {
        duration: (remaining / setWidth) * LOOP_SECONDS,
        ease: "linear",
        onComplete: () => {
          x.set(0);
          startLoop();
        },
      });
    } else {
      const current = x.get();
      // When current sits exactly on a boundary (fresh start at -setWidth,
      // or right after a wraparound reset), the modulo below evaluates to
      // 0 — meaning "arrived" rather than "full lap to go" — which produces
      // a zero-duration animate() call. That completes synchronously,
      // re-invoking startLoop() in a tight recursive loop that pegs the
      // main thread. Treat an exact-zero result as a full lap instead.
      const distanceFromZero =
        ((-current % setWidth) + setWidth) % setWidth || setWidth;
      x.set(-distanceFromZero);

      controlsRef.current = animate(x, 0, {
        duration: (distanceFromZero / setWidth) * LOOP_SECONDS,
        ease: "linear",
        onComplete: () => {
          x.set(-setWidth);
          startLoop();
        },
      });
    }
  };

  const pause = () => controlsRef.current?.stop();
  const resume = () => startLoop();

  return (
    <div className="overflow-hidden fade-x">
      <motion.div
        ref={trackRef}
        className="flex"
        style={{ x }}
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        onDragStart={pause}
        onDragEnd={resume}
        onPointerEnter={pause}
        onPointerLeave={resume}
      >
        {[...items, ...items].map((item, i) => (
          <SkillChip key={`${item}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
