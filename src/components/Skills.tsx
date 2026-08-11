"use client";

import { skills } from "@/data/skills";
import { getSkillIcon } from "@/data/skillIcons";
import { motion } from "framer-motion";

function IconBadge({
  item,
  size,
}: {
  item: string;
  size: "hero" | "small";
}) {
  const { icon: Icon, color } = getSkillIcon(item);
  const isHero = size === "hero";
  const badgeSize = isHero ? "w-20 h-20 md:w-24 md:h-24" : "w-14 h-14";
  const iconSize = isHero ? "w-11 h-11 md:w-14 md:h-14" : "w-8 h-8";
  const labelClass = isHero
    ? "text-sm font-semibold text-white"
    : "text-[11px] text-gray-500";

  return (
    <div className="flex flex-col items-center gap-2.5 text-center group">
      <div
        className={`${badgeSize} rounded-2xl bg-black flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105`}
      >
        <Icon
          className={`${iconSize} shrink-0`}
          style={{ color, filter: `drop-shadow(0 0 10px ${color}80)` }}
        />
      </div>
      <span
        className={`${labelClass} leading-tight max-w-[6rem] group-hover:text-gray-200 transition-colors`}
      >
        {item}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-[1400px] mx-auto overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-24 text-[#47F1FF]">
        Skills
      </h2>

      <div className="space-y-24">
        {skills.map((group, index) => {
          const [hero, ...rest] = group.items;
          const mid = (rest.length - 1) / 2;

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Soft domain-color wash — no hard edges, replaces the old bordered card */}
              <div
                aria-hidden
                className="absolute -inset-x-10 -inset-y-16 -z-10 pointer-events-none"
                style={{
                  background: `radial-gradient(55% 90% at 12% 40%, ${group.color}1f, transparent 70%)`,
                }}
              />

              <div className="flex items-center gap-3 mb-10">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: group.color, boxShadow: `0 0 10px 2px ${group.color}80` }}
                />
                <h3
                  className="text-sm font-semibold uppercase tracking-[0.15em]"
                  style={{ color: group.color }}
                >
                  {group.category}
                </h3>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-end gap-x-8 gap-y-10 md:overflow-x-auto md:pb-2 no-scrollbar">
                <div className="shrink-0">
                  <IconBadge item={hero} size="hero" />
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-end gap-x-6 gap-y-8">
                  {rest.map((item, i) => {
                    const arc = mid > 0 ? Math.sin((i / rest.length) * Math.PI) * 16 : 0;
                    return (
                      <div
                        key={item}
                        className="shrink-0"
                        style={{ transform: `translateY(${-arc}px)` }}
                      >
                        <IconBadge item={item} size="small" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
