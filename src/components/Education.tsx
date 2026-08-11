"use client";

import Image from "next/image";
import { education, type EducationEntry } from "@/data/education";
import Reveal from "@/components/ui/Reveal";

function EduCard({
  institution,
  image,
  milestones,
  align = "left",
}: EducationEntry & { align?: "left" | "right" }) {
  const textAlign = align === "right" ? "text-right" : "text-left";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#47F1FF]/40 hover:-translate-y-1">
      <div className="relative aspect-[16/9]">
        <Image
          src={image}
          alt={`${institution} campus`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <p
          className={`absolute bottom-3 ${
            align === "right" ? "right-4 text-right" : "left-4 text-left"
          } text-sm font-medium uppercase tracking-wide text-white/90`}
        >
          {institution}
        </p>
      </div>

      <div className="p-8 divide-y divide-white/10">
        {milestones.map((m, i) => (
          <div key={m.degree} className={i > 0 ? "pt-5 mt-5" : ""}>
            <p className={`${textAlign} text-sm font-mono tracking-wider text-[#47F1FF]/80`}>
              {m.duration}
            </p>
            <h3 className={`${textAlign} text-2xl font-semibold mt-2`}>{m.degree}</h3>
            <p className={`${textAlign} text-base text-gray-300 mt-3`}>{m.score}</p>
          </div>
        ))}
      </div>
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
            const align = onLeft ? "right" : "left";

            return (
              <div key={item.institution} className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                {/* Dot marker on the spine, desktop only */}
                <span className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
                  <span className="absolute w-7 h-7 rounded-full bg-[#47F1FF]/20" />
                  <span className="relative w-3.5 h-3.5 rounded-full bg-[#47F1FF] ring-4 ring-[#0b0b0f]" />
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
