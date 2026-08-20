"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { achievements, type AchievementPhoto } from "@/data/achievements";

/** Stacked-photo depths behind the front card: offset, tilt, scale, fade. */
const DEPTH = [
  { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1 },
  { x: 20, y: 16, rotate: 6, scale: 0.96, zIndex: 20, opacity: 0.85 },
  { x: 38, y: 30, rotate: 12, scale: 0.92, zIndex: 10, opacity: 0.55 },
];

function PhotoStack({ photos }: { photos: AchievementPhoto[] }) {
  const total = photos.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setCurrent((c) => (c + dir + total) % total),
    [total]
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused || total < 2) return;
    const id = setInterval(() => go(1), 4200);
    return () => clearInterval(id);
  }, [go, paused, total]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-sm aspect-[4/5]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {photos.map((photo, i) => {
          const pos = (i - current + total) % total;
          if (pos > 2) return null;
          const depth = DEPTH[pos];

          return (
            <motion.div
              key={photo.src}
              drag={pos === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(1);
                else if (info.offset.x > 70) go(-1);
              }}
              animate={depth}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{ touchAction: "pan-y" }}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-panel shadow-2xl shadow-black/50 p-2 cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="object-contain bg-panel"
                  priority={i === 0}
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="text-gray-400"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-5 bg-accent"
                  : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Next photo"
          onClick={() => go(1)}
          className="text-gray-400"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="mt-3 text-sm text-gray-400 text-center max-w-xs">
        {photos[current].caption}
      </p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading title="Achievements" />

      <div className="space-y-20">
        {achievements.map((item) => (
          <div key={item.title} className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal delay={0.1} className="space-y-4 order-2 md:order-1">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                {item.eyebrow}
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold">{item.title}</h3>
              <p className="accent-text font-medium">{item.meta}</p>

              {item.stats && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.stats.map((stat) => (
                    <Badge key={stat.label} tone="accent" className="!items-baseline normal-case tracking-normal">
                      <span className="text-sm font-semibold text-accent">
                        {stat.value}
                      </span>
                      <span className="text-[11px] uppercase tracking-wide text-gray-400">
                        {stat.label}
                      </span>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-gray-300 leading-relaxed max-w-md">
                {item.description}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="order-1 md:order-2">
              <PhotoStack photos={item.photos} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
