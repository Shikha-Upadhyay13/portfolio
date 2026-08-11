"use client";

import dynamic from "next/dynamic";
import { skills } from "@/data/skills";

// Client-only: measures its own scroll width to build a seamless loop, which
// differs from the SSR-time default and would otherwise hydration-mismatch.
const SkillsMarquee = dynamic(() => import("@/components/ui/SkillsMarquee"), {
  ssr: false,
});

const allSkills = skills.flatMap((group) => group.items);

export default function Skills() {
  return (
    <section id="skills" className="py-24 max-w-[1400px] mx-auto overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 text-[#47F1FF] px-6">
        Skills
      </h2>
      <p className="text-center text-gray-500 text-sm mb-14 px-6">
        Drag to explore — it keeps drifting on its own.
      </p>

      <SkillsMarquee items={allSkills} />
    </section>
  );
}
