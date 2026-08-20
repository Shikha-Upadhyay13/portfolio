"use client";

import { Trophy } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";
import { hackathons } from "@/data/hackathons";

export default function Hackathons() {
  return (
    <section id="hackathons" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading
        title="Hackathons"
        subtitle="Building under a clock, with a team, against the unknown."
      />

      <div className="space-y-20">
        {hackathons.map((hack) => (
          <div key={hack.title} className="space-y-8">
            <Reveal className="max-w-2xl mx-auto text-center space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-wide">
                <span className="text-gray-500">{hack.team}</span>
                {hack.award && (
                  <Badge tone="amber" icon={<Trophy className="w-3 h-3" />}>
                    {hack.award}
                  </Badge>
                )}
              </div>
              <h3 className="text-2xl font-semibold">{hack.title}</h3>
              <p className="accent-text font-medium text-sm">{hack.event}</p>
              <p className="text-gray-300 leading-relaxed text-left sm:text-center">
                {hack.description}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <MediaFilmstrip items={hack.media} center />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
