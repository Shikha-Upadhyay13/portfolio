"use client";

import { leadership } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";

export default function Leadership() {
  const [featured, ...rest] = leadership;

  return (
    <section id="leadership" className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
      <SectionHeading
        title="Leadership & Activities"
        subtitle="Clubs and roles that shaped how I build, speak, and ship with people."
        className="!mb-10"
      />

      {/* Featured club with media — compact split */}
      <Reveal className="mb-8">
        <Card
          padding="sm"
          accentRail
          className="overflow-hidden !p-0 hover:shadow-[0_0_28px_rgba(71,241,255,0.12)]"
        >
          <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="flex flex-col justify-center space-y-2 p-5 md:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent/80">
                Featured
              </p>
              <h3 className="text-xl font-semibold leading-snug md:text-2xl">
                {featured.club}
              </h3>
              <p className="text-sm text-gray-400">{featured.role}</p>
              <p className="text-sm leading-relaxed text-gray-300">
                {featured.description}
              </p>
            </div>
            {featured.media && (
              <div className="border-t border-white/10 bg-white/[0.02] px-3 py-4 md:border-l md:border-t-0 md:px-4 md:py-5">
                <MediaFilmstrip items={featured.media} center variant="neon" />
              </div>
            )}
          </div>
        </Card>
      </Reveal>

      {/* Remaining clubs — tight grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((item, i) => (
          <Reveal key={item.club} delay={i * 0.05}>
            <Card
              padding="sm"
              className="h-full !p-4 transition group-hover/lead:opacity-100 hover:border-accent/40"
            >
              <h3 className="text-base font-semibold leading-snug">{item.club}</h3>
              <p className="mt-1.5 text-xs uppercase tracking-wide text-accent/70">
                {item.role}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
                {item.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
