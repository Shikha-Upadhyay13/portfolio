"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";
import { hackathons } from "@/data/hackathons";

export default function Hackathons() {
  const [active, setActive] = useState(0);
  const hack = hackathons[active];

  return (
    <section id="hackathons" className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading
        title="Hackathons"
        subtitle="Building under a clock, with a team, against the unknown."
      />

      <Reveal>
        <div
          role="tablist"
          aria-label="Hackathon entries"
          className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hackathons.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`flex h-full min-h-[8.25rem] flex-col rounded-xl border px-4 py-4 text-left transition md:px-5 ${
                  selected
                    ? "border-accent/40 bg-accent/[0.07]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="mb-3 flex h-6 items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      selected ? "text-accent" : "text-gray-500"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-h-[1.25rem] max-w-[70%] justify-end">
                    {item.award ? (
                      <Badge tone="amber" icon={<Trophy className="h-3 w-3" />}>
                        {item.award}
                      </Badge>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-600">
                        Entry
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`line-clamp-2 min-h-[2.75rem] font-display text-[15px] font-semibold leading-snug md:text-base ${
                    selected ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.title}
                </span>
                <span className="mt-auto line-clamp-1 pt-2 text-xs text-gray-500">
                  {item.team}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        role="tabpanel"
        key={hack.title}
        className="space-y-8 border-t border-white/10 pt-10"
      >
        <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {hack.team}
          </p>
          <h3 className="font-display text-2xl font-semibold md:text-3xl">
            {hack.title}
          </h3>
          <p className="text-sm font-medium text-accent/80">{hack.event}</p>
          <p className="text-left text-gray-300 leading-relaxed sm:text-center">
            {hack.description}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <MediaFilmstrip items={hack.media} center variant="classic" />
        </Reveal>
      </div>
    </section>
  );
}
