"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, type AnimationPlaybackControls } from "framer-motion";
import { getSkillIcon } from "@/data/skillIcons";

const LOOP_SECONDS = 45; // time to travel one full set at rest

function SkillChip({ item }: { item: string }) {
  const { icon: Icon, color } = getSkillIcon(item);
  return (
    <div className="flex flex-col items-center gap-2.5 text-center shrink-0 w-24 px-2">
      <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center">
        <Icon
          className="w-8 h-8 shrink-0"
          style={{ color, filter: `drop-shadow(0 0 9px ${color}80)` }}
        />
      </div>
      <span className="text-[11px] leading-tight text-gray-500">{item}</span>
    </div>
  );
}

export default function SkillsMarquee({ items }: { items: string[] }) {
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
  };

  const pause = () => controlsRef.current?.stop();
  const resume = () => startLoop();

  return (
    <div className="overflow-hidden fade-x">
      <motion.div
        ref={trackRef}
        className="flex cursor-grab active:cursor-grabbing"
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
