"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { skills } from "@/data/skills";
import { getSkillIcon } from "@/data/skillIcons";

export default function Skills() {
  const [active, setActive] = useState(0);
  const group = skills[active];

  return (
    <section id="skills" className="mx-auto max-w-[1400px] overflow-hidden px-6 py-24">
      <SectionHeading
        title="Skills"
        subtitle="Pick a category — browse the stack without chasing a marquee."
      />

      <Reveal>
        <div
          role="tablist"
          aria-label="Skill categories"
          className="mb-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar"
        >
          {skills.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-lg border px-3.5 py-2 text-sm transition ${
                  selected
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                {s.category}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal key={group.category} delay={0.05}>
        <div
          role="tabpanel"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {group.items.map((item) => {
            const { icon: Icon, color } = getSkillIcon(item);
            return (
              <div
                key={item}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-5 text-center transition hover:border-accent/30 hover:bg-white/[0.04]"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/60 md:h-16 md:w-16"
                  style={{ boxShadow: `0 0 18px 1px ${color}40` }}
                >
                  <Icon
                    className="h-7 w-7 shrink-0 md:h-8 md:w-8"
                    style={{ color }}
                  />
                </div>
                <span className="text-xs leading-snug text-gray-300 md:text-sm">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      <p className="mt-6 text-center font-mono text-[11px] text-gray-600">
        {group.items.length} in {group.category} · {skills.reduce((n, s) => n + s.items.length, 0)} total
      </p>
    </section>
  );
}
