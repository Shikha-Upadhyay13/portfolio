"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
        className="relative aspect-[4/5] w-full max-w-sm"
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
              className="absolute inset-0 cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-panel p-2 shadow-2xl shadow-black/50 active:cursor-grabbing"
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg">
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

      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="text-gray-400"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-5 bg-accent" : "w-1.5 bg-white/20"
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
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-3 max-w-xs text-center text-sm text-gray-400">
        {photos[current].caption}
      </p>
    </div>
  );
}

/** Compact home teaser — full stories live on /achievements. */
export function AchievementsPreview() {
  return (
    <section id="achievements" className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading
        title="Achievements"
        subtitle="Highlights from academics, hackathons, and Trailhead."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.05}>
            <Link
              href="/achievements"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-accent/40 hover:bg-white/[0.04]"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                {item.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-accent/80">{item.meta}</p>
              {item.stats && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.stats.map((stat) => (
                    <Badge
                      key={stat.label}
                      tone="accent"
                      className="!items-baseline normal-case tracking-normal"
                    >
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
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-gray-500 transition group-hover:text-accent">
                View details
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12} className="mt-10 flex justify-center">
        <Link
          href="/achievements"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-accent/40 hover:text-white"
        >
          Open achievements page
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

/** Full achievements detail — used on /achievements. */
export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="space-y-20">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="grid items-center gap-12 md:grid-cols-2 md:gap-20"
          >
            <Reveal delay={0.1} className="order-2 space-y-4 md:order-1">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                {item.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold md:text-3xl">{item.title}</h2>
              <p className="accent-text font-medium">{item.meta}</p>

              {item.stats && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.stats.map((stat) => (
                    <Badge
                      key={stat.label}
                      tone="accent"
                      className="!items-baseline normal-case tracking-normal"
                    >
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

              <p className="max-w-md leading-relaxed text-gray-300">
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
