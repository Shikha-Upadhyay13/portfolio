"use client";

import Reveal from "@/components/ui/Reveal";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";
import { hobbies } from "@/data/hobbies";

export default function Hobbies() {
  const [featured, ...rest] = hobbies;

  return (
    <section id="hobbies" className="py-24 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Hobbies & Passion
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Life beyond the terminal — the pursuits that keep me curious and grounded.
        </p>
      </Reveal>

      <div className="space-y-20">
        {/* Featured hobby, full width */}
        <div className="space-y-8">
          <Reveal className="max-w-2xl mx-auto text-center space-y-3">
            <h3 className="text-2xl font-semibold">{featured.title}</h3>
            <p className="accent-text font-medium text-sm uppercase tracking-wide">
              {featured.tagline}
            </p>
            <p className="text-gray-300 leading-relaxed">{featured.description}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <MediaFilmstrip items={featured.media} />
          </Reveal>
        </div>

        {/* Remaining hobbies, side by side with a divider instead of stacked */}
        <div className="relative grid md:grid-cols-2 divide-y divide-white/10 md:divide-y-0 gap-y-12">
          {rest.map((hobby, i) => (
            <Reveal
              key={hobby.title}
              delay={i * 0.1}
              className={`space-y-6 ${i === 0 ? "pt-0 md:pr-10" : "pt-12 md:pt-0 md:pl-10"}`}
            >
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-semibold">{hobby.title}</h3>
                <p className="accent-text font-medium text-sm uppercase tracking-wide">
                  {hobby.tagline}
                </p>
                <p className="text-gray-300 leading-relaxed">{hobby.description}</p>
              </div>
              <MediaFilmstrip items={hobby.media} />
            </Reveal>
          ))}

          {/* Vertical split between the two columns, desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/10"
          />
        </div>
      </div>
    </section>
  );
}
