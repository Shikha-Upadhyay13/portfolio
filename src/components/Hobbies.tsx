"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";
import CurtainReveal from "@/components/ui/CurtainReveal";
import { hobbies } from "@/data/hobbies";

export default function Hobbies() {
  const [featured, ...rest] = hobbies;

  return (
    <section id="hobbies" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading
        title="Hobbies & Passion"
        subtitle="Life beyond the terminal — the pursuits that keep me curious and grounded."
      />

      <CurtainReveal className="border border-white/10 bg-[#0c0a0b]/40 p-6 md:p-10">
        <div className="space-y-20">
          {/* Featured hobby, full width */}
          <div className="space-y-8">
            <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
              <h3 className="text-2xl font-semibold">{featured.title}</h3>
              <p className="accent-text text-sm font-medium uppercase tracking-wide">
                {featured.tagline}
              </p>
              <p className="leading-relaxed text-gray-300">
                {featured.description}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <MediaFilmstrip items={featured.media} />
            </Reveal>
          </div>

          {/* Remaining hobbies */}
          <div className="relative grid gap-y-12 divide-y divide-white/10 md:grid-cols-2 md:divide-y-0">
            {rest.map((hobby, i) => (
              <Reveal
                key={hobby.title}
                delay={i * 0.1}
                className={`space-y-6 ${
                  i === 0 ? "pt-0 md:pr-10" : "pt-12 md:pt-0 md:pl-10"
                }`}
              >
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-semibold">{hobby.title}</h3>
                  <p className="accent-text text-sm font-medium uppercase tracking-wide">
                    {hobby.tagline}
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    {hobby.description}
                  </p>
                </div>
                <MediaFilmstrip items={hobby.media} />
              </Reveal>
            ))}

            <div
              aria-hidden
              className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 md:block"
            />
          </div>
        </div>
      </CurtainReveal>
    </section>
  );
}
