"use client";

import { skills } from "@/data/skills";
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

              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 hover:bg-[#47F1FF]/20 hover:border-[#47F1FF] transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
