"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { achievements, type AchievementPhoto } from "@/data/achievements";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { rememberHomeSection } from "@/components/HomeScrollRestore";

const DEPTH = [
  { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1 },
  { x: 20, y: 16, rotate: 6, scale: 0.96, zIndex: 20, opacity: 0.85 },
  { x: 38, y: 30, rotate: 12, scale: 0.92, zIndex: 10, opacity: 0.55 },
];

/** Fixed positions so the burst is stable across renders / SSR. */
const SPARKLES = [
  { left: "4%", top: "6%", size: 28, delay: 0.02, drift: -28, color: "#47F1FF" },
  { left: "14%", top: "18%", size: 16, delay: 0.12, drift: -18, color: "#FFFFFF" },
  { left: "24%", top: "4%", size: 22, delay: 0.2, drift: -32, color: "#A5F3FC" },
  { left: "36%", top: "14%", size: 14, delay: 0.28, drift: -16, color: "#FFFFFF" },
  { left: "48%", top: "2%", size: 26, delay: 0.08, drift: -36, color: "#47F1FF" },
  { left: "58%", top: "16%", size: 12, delay: 0.34, drift: -14, color: "#FFFFFF" },
  { left: "68%", top: "5%", size: 24, delay: 0.06, drift: -26, color: "#67E8F9" },
  { left: "80%", top: "18%", size: 18, delay: 0.16, drift: -20, color: "#FFFFFF" },
  { left: "90%", top: "7%", size: 30, delay: 0.22, drift: -30, color: "#47F1FF" },
  { left: "8%", top: "38%", size: 16, delay: 0.3, drift: -14, color: "#A5F3FC" },
  { left: "92%", top: "36%", size: 20, delay: 0.26, drift: -18, color: "#47F1FF" },
  { left: "18%", top: "52%", size: 14, delay: 0.38, drift: -12, color: "#FFFFFF" },
  { left: "82%", top: "50%", size: 18, delay: 0.32, drift: -16, color: "#67E8F9" },
  { left: "42%", top: "42%", size: 12, delay: 0.42, drift: -10, color: "#A5F3FC" },
  { left: "62%", top: "46%", size: 15, delay: 0.36, drift: -12, color: "#FFFFFF" },
  { left: "30%", top: "30%", size: 10, delay: 0.44, drift: -10, color: "#47F1FF" },
];

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
      style={{
        filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 12px ${color}) drop-shadow(0 0 22px ${color})`,
      }}
    >
      <path d="M12 0 14.2 9.8 24 12 14.2 14.2 12 24 9.8 14.2 0 12 9.8 9.8Z" />
    </svg>
  );
}

/** Accent sparkles that pop when the achievements section enters view. */
function AchievementSparkles({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[15] overflow-visible"
    >
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute will-change-transform"
          style={{ left: s.left, top: s.top }}
          initial={{ opacity: 0, scale: 0, y: 12, rotate: -25 }}
          animate={
            active
              ? {
                  opacity: [0, 1, 1, 0.85, 0],
                  scale: [0, 1.45, 1.15, 1, 0.5],
                  y: [12, s.drift * 0.35, s.drift * 0.7, s.drift],
                  rotate: [-25, 8, 28, 48],
                }
              : { opacity: 0, scale: 0, y: 12 }
          }
          transition={{
            duration: 2.4,
            delay: s.delay,
            ease: EASE_OUT_EXPO,
            times: [0, 0.12, 0.35, 0.7, 1],
          }}
        >
          <SparkleIcon size={s.size} color={s.color} />
        </motion.span>
      ))}

      {/* Bright center flash */}
      <motion.div
        className="absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-[#47F1FF]/35 blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          active
            ? { opacity: [0, 1, 0.35, 0], scale: [0.5, 1.25, 1.5, 1.7] }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 2, ease: EASE_OUT_EXPO }}
      />
    </div>
  );
}

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
              className="absolute inset-0 cursor-grab overflow-hidden rounded-2xl border-2 border-accent/40 bg-panel p-2 shadow-[0_0_32px_rgba(71,241,255,0.18)] shadow-black/50 active:cursor-grabbing"
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

/** Home teaser — timeline strip; full stories live on /achievements. */
export function AchievementsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.25 });

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative mx-auto max-w-[1400px] px-6 py-24"
    >
      <AchievementSparkles active={inView} />

      <div className="relative z-10">
        <SectionHeading
          title="Achievements"
          subtitle="A short trail of wins — open any row for photos and the full story."
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Spine */}
        <div
          aria-hidden
          className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-accent/50 via-white/15 to-white/5 md:left-[1.35rem]"
        />

        <ol className="space-y-3">
          {achievements.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <li>
                <Link
                  href="/achievements"
                  onClick={() => rememberHomeSection("achievements")}
                  className="group relative flex gap-4 rounded-2xl border border-transparent py-3 pl-1 pr-3 transition hover:border-white/10 hover:bg-white/[0.03] md:gap-5 md:pr-4"
                >
                  {/* Node */}
                  <div className="relative z-[1] flex w-10 shrink-0 justify-center pt-3 md:w-12">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/50 bg-[#0b0b0f] shadow-[0_0_12px_rgba(71,241,255,0.35)] transition group-hover:border-accent group-hover:shadow-[0_0_18px_rgba(71,241,255,0.5)] md:h-6 md:w-6">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                  </div>

                  {/* Thumb */}
                  <div className="relative mt-1 hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:block md:h-[4.5rem] md:w-[4.5rem]">
                    <Image
                      src={item.photos[0].src}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Copy */}
                  <div className="min-w-0 flex-1 py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] tabular-nums text-gray-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-accent/80">
                        {item.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-base font-semibold leading-snug text-white transition group-hover:text-accent md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                      {item.meta}
                    </p>
                    {item.stats && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.stats.map((stat) => (
                          <span
                            key={stat.label}
                            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-gray-400"
                          >
                            <span className="text-accent">{stat.value}</span>{" "}
                            {stat.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="mt-3 hidden shrink-0 items-center gap-1 self-start text-sm text-gray-500 transition group-hover:text-accent sm:inline-flex">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal delay={0.15} className="relative z-10 mt-10 flex justify-center">
        <Link
          href="/achievements"
          onClick={() => rememberHomeSection("achievements")}
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-accent/40 hover:text-white"
        >
          View full achievements
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

/** Full achievements detail — used on /achievements. */
export default function Achievements() {
  return (
    <section id="achievements-detail" className="space-y-16 md:space-y-24">
      {achievements.map((item, index) => {
        const photoLeft = index % 2 === 1;
        return (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-6 md:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 font-display text-[8rem] font-bold leading-none text-white/[0.03] select-none md:text-[10rem]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <div
                className={`space-y-5 ${
                  photoLeft ? "order-2 md:order-2" : "order-2 md:order-1"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Badge tone="amber" icon={<Trophy className="h-3 w-3" />}>
                    {item.eyebrow}
                  </Badge>
                </div>

                <h2 className="font-display text-2xl font-semibold leading-tight md:text-4xl">
                  {item.title}
                </h2>
                <p className="text-base font-medium text-accent md:text-lg">
                  {item.meta}
                </p>

                {item.stats && (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {item.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3"
                      >
                        <div className="font-display text-xl font-semibold text-accent">
                          {stat.value}
                        </div>
                        <div className="mt-0.5 text-[11px] uppercase tracking-wider text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="max-w-lg text-[15px] leading-relaxed text-gray-300 md:text-base">
                  {item.description}
                </p>
              </div>

              <div
                className={
                  photoLeft ? "order-1 md:order-1" : "order-1 md:order-2"
                }
              >
                <PhotoStack photos={item.photos} />
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
