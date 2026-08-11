"use client";

import { Sparkle } from "lucide-react";
import { skills } from "@/data/skills";
import { skillIcons } from "@/data/skillIcons";
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

              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items.map((item, i) => {
                  const Icon = skillIcons[item] ?? Sparkle;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 pl-2.5 pr-3.5 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 transition-all duration-200 hover:bg-[#47F1FF]/15 hover:border-[#47F1FF]/60 hover:text-white hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4 text-[#47F1FF] shrink-0" />
                      {item}
                    </span>
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
