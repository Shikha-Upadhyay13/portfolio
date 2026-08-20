"use client";

import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

// Client-only: measures its own scroll width to build a seamless loop, which
// differs from the SSR-time default and would otherwise hydration-mismatch.
const SkillsMarquee = dynamic(() => import("@/components/ui/SkillsMarquee"), {
  ssr: false,
});

const allSkills = skills.flatMap((group) => group.items);

// Spread round-robin across 3 rows so each row mixes categories rather than
// running through them in blocks, and scroll alternate rows in opposite
// directions for a fuller, more dynamic wall of skills.
const ROWS = 3;
const rows: string[][] = Array.from({ length: ROWS }, () => []);
allSkills.forEach((item, i) => rows[i % ROWS].push(item));

export default function Skills() {
  return (
    <section id="skills" className="py-32 max-w-[1400px] mx-auto overflow-hidden">
      <SectionHeading
        title="Skills"
        subtitle="Drag to explore — it keeps drifting on its own."
        className="px-6"
      />

      <div className="space-y-10 md:space-y-14">
        {rows.map((row, i) => (
          <SkillsMarquee key={i} items={row} direction={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}
