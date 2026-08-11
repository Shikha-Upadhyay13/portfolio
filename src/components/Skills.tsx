"use client";

import { skills } from "@/data/skills";
import { getSkillIcon } from "@/data/skillIcons";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-[1400px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 text-[#47F1FF]">
        Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {skills.map((skillGroup, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: isLeft ? -80 : 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#47F1FF] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-[#47F1FF]">
                {skillGroup.category}
              </h3>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-4">
                {skillGroup.items.map((item, i) => {
                  const { icon: Icon, color } = getSkillIcon(item);
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 text-center group">
                      <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105">
                        <Icon className="w-8 h-8 shrink-0" style={{ color }} />
                      </div>
                      <span className="text-[11px] leading-tight text-gray-400">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
