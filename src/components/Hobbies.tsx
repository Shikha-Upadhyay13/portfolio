"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";
import CurtainReveal from "@/components/ui/CurtainReveal";
import { hobbies } from "@/data/hobbies";

export default function Hobbies() {
  const [featured, ...rest] = hobbies;

  return (
    <section id="hobbies" className="w-full border-y border-line bg-page px-6 py-24 text-fg">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Hobbies & Passion"
          subtitle="Life beyond the terminal - the pursuits that keep me curious and grounded."
        />

        <CurtainReveal className="border border-line bg-raised/80 p-6 md:p-10">
          <div className="space-y-20">
            {/* Featured hobby, full width */}
            <div className="space-y-8">
              <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
                <h3 className="text-2xl font-semibold text-fg">
                  {featured.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-wide text-accent">
                  {featured.tagline}
                </p>
                <p className="leading-relaxed text-muted">
                  {featured.description}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <MediaFilmstrip items={featured.media} variant="classic" />
              </Reveal>
            </div>

            {/* Remaining hobbies */}
            <div className="relative grid gap-y-12 divide-y divide-line md:grid-cols-2 md:divide-y-0">
              {rest.map((hobby, i) => (
                <Reveal
                  key={hobby.title}
                  delay={i * 0.1}
                  className={`space-y-6 ${
                    i === 0 ? "pt-0 md:pr-10" : "pt-12 md:pt-0 md:pl-10"
                  }`}
                >
                  <div className="space-y-3 text-center">
                    <h3 className="text-2xl font-semibold text-fg">
                      {hobby.title}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-wide text-accent">
                      {hobby.tagline}
                    </p>
                    <p className="leading-relaxed text-muted">
                      {hobby.description}
                    </p>
                  </div>
                  <MediaFilmstrip items={hobby.media} variant="classic" />
                </Reveal>
              ))}

              <div
                aria-hidden
                className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line md:block"
              />
            </div>
          </div>
        </CurtainReveal>
      </div>
    </section>
  );
}
