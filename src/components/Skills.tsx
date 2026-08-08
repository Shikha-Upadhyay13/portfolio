"use client";

import { skills } from "@/data/skills";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-[1400px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
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
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-purple-400">
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:border-purple-400 transition"
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
