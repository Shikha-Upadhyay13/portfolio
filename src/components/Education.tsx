"use client";

import Image from "next/image";
import { education, type EducationEntry } from "@/data/education";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

function EduCard({
  institution,
  image,
  milestones,
  align = "left",
}: EducationEntry & { align?: "left" | "right" }) {
  const textAlign = align === "right" ? "text-right" : "text-left";

  return (
    <Card padding="md" className="overflow-hidden !p-0">
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

      <div className="divide-y divide-white/10 p-8">
        {milestones.map((m, i) => (
          <div key={m.degree} className={i > 0 ? "mt-5 pt-5" : ""}>
            <p
              className={`${textAlign} font-mono text-sm tracking-wider text-[#47F1FF]/80`}
            >
              {m.duration}
            </p>
            <h3 className={`${textAlign} mt-2 text-2xl font-semibold`}>
              {m.degree}
            </h3>
            <p className={`${textAlign} mt-3 text-base text-gray-300`}>
              {m.score}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading title="Education" />

      <div className="relative mx-auto max-w-5xl">
        {/* Dashed timeline spine, desktop only */}
        <div className="absolute bottom-2 left-1/2 top-2 hidden w-px -translate-x-1/2 border-l border-dashed border-white/15 md:block" />

        <div className="space-y-12 md:space-y-20">
          {education.map((item, index) => {
            const onLeft = index % 2 === 0;
            const align = onLeft ? "right" : "left";

            return (
              <div
                key={item.institution}
                className="relative items-center md:grid md:grid-cols-2 md:gap-16"
              >
                {/* Dot marker on the spine, desktop only */}
                <span className="absolute left-1/2 top-10 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                  <span className="absolute h-7 w-7 rounded-full bg-[#47F1FF]/20" />
                  <span className="relative h-3.5 w-3.5 rounded-full bg-[#47F1FF] ring-4 ring-[#0b0b0f]" />
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
