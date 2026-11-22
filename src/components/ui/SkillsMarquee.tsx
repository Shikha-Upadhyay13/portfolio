"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  type AnimationPlaybackControls,
} from "framer-motion";
import { getSkillIcon } from "@/data/skillIcons";

const LOOP_SECONDS = 55;

function SkillChip({ item }: { item: string }) {
  const { icon: Icon, color } = getSkillIcon(item);
  return (
    <div className="flex w-32 shrink-0 flex-col items-center gap-3 px-3 text-center">
      <motion.div
        role="button"
        tabIndex={0}
        whileHover={{ scale: 1.12, y: -6 }}
        whileTap={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="relative z-0 flex h-20 w-20 items-center justify-center rounded-2xl bg-black hover:z-20 md:h-24 md:w-24"
        style={{
          boxShadow: `0 0 16px 1px ${color}4d`,
          // Keep the full rounded shape while scaling (no flat clipped edge)
          transformOrigin: "center center",
        }}
      >
        <Icon
          className="h-10 w-10 shrink-0 md:h-12 md:w-12"
          style={{ color }}
        />
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
    // Vertical padding lives INSIDE overflow-hidden so glow + hover scale
    // aren't chopped flat across the top of each tile.
    <div className="fade-x overflow-hidden py-5">
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
