"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";
import CurtainReveal from "@/components/ui/CurtainReveal";
import { hobbies } from "@/data/hobbies";

export default function Hobbies() {
  const [featured, ...rest] = hobbies;

  return (
    <section id="hobbies" className="bg-[#f5ede0] px-6 py-24 text-[#5c3d2e]">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Hobbies & Passion"
          subtitle="Life beyond the terminal — the pursuits that keep me curious and grounded."
          titleClassName="text-[#6f4e37]"
          className="[&_p]:text-[#8a7360]"
        />

        <CurtainReveal className="border border-[#6f4e37]/15 bg-[#efe4d4]/80 p-6 md:p-10">
          <div className="space-y-20">
            {/* Featured hobby, full width */}
            <div className="space-y-8">
              <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
                <h3 className="text-2xl font-semibold text-[#5c3d2e]">
                  {featured.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-wide text-[#8b5e3c]">
                  {featured.tagline}
                </p>
                <p className="leading-relaxed text-[#8a7360]">
                  {featured.description}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <MediaFilmstrip items={featured.media} />
              </Reveal>
            </div>

            {/* Remaining hobbies */}
            <div className="relative grid gap-y-12 divide-y divide-[#6f4e37]/15 md:grid-cols-2 md:divide-y-0">
              {rest.map((hobby, i) => (
                <Reveal
                  key={hobby.title}
                  delay={i * 0.1}
                  className={`space-y-6 ${
                    i === 0 ? "pt-0 md:pr-10" : "pt-12 md:pt-0 md:pl-10"
                  }`}
                >
                  <div className="space-y-3 text-center">
                    <h3 className="text-2xl font-semibold text-[#5c3d2e]">
                      {hobby.title}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-wide text-[#8b5e3c]">
                      {hobby.tagline}
                    </p>
                    <p className="leading-relaxed text-[#8a7360]">
                      {hobby.description}
                    </p>
                  </div>
                  <MediaFilmstrip items={hobby.media} />
                </Reveal>
              ))}

              <div
                aria-hidden
                className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#6f4e37]/15 md:block"
              />
            </div>
          </div>
        </CurtainReveal>
      </div>
    </section>
  );
}
