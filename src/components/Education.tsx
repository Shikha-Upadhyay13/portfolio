"use client";

import { education } from "@/data/education";
import Reveal from "@/components/ui/Reveal";

function EduCard({
  degree,
  institution,
  score,
  duration,
  align = "left",
}: {
  degree: string;
  institution: string;
  score: string;
  duration: string;
  align?: "left" | "right";
}) {
  const textAlign = align === "right" ? "text-right" : "text-left";
  const durationAlign = align === "right" ? "text-left" : "text-right";
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-300 hover:border-purple-400/40 hover:-translate-y-1">
      <p className={`${durationAlign} text-sm font-mono tracking-wider text-purple-300/80`}>
        {duration}
      </p>
      <h3 className={`${textAlign} text-2xl font-semibold mt-3`}>{degree}</h3>
      <p className={`${textAlign} text-sm uppercase tracking-wide text-gray-500 mt-2`}>
        {institution}
      </p>
      <p className={`${textAlign} text-base text-gray-300 mt-6`}>{score}</p>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Education
        </h2>
      </Reveal>

      <div className="relative max-w-5xl mx-auto">
        {/* Dashed timeline spine, desktop only */}
        <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 border-l border-dashed border-white/15" />

        <div className="space-y-12 md:space-y-20">
          {education.map((item, index) => {
            const onLeft = index % 2 === 0;
            // B.Tech (0) and Class X (2) read right-aligned; Intermediate (1) stays left.
            const align = index === 1 ? "left" : "right";

            return (
              <div key={index} className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                {/* Dot marker on the spine, desktop only */}
                <span className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
                  <span className="absolute w-7 h-7 rounded-full bg-purple-500/20" />
                  <span className="relative w-3.5 h-3.5 rounded-full bg-purple-400 ring-4 ring-[#0b0b0f]" />
                </span>

                {onLeft ? (
                  <>
                    <Reveal direction="right">
                      <EduCard {...item} align={align} />
                    </Reveal>
                    <div aria-hidden />
                  </>
                ) : (
                  <>
                    <div aria-hidden className="hidden md:block" />
                    <Reveal direction="left">
                      <EduCard {...item} align={align} />
                    </Reveal>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
