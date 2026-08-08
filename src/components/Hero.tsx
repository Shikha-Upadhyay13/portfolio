"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats = [
  { value: "6+", label: "Projects" },
  { value: "20+", label: "Technologies" },
  { value: "AI", label: "B.Tech Major" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-8 max-w-[1400px] mx-auto overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center w-full relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-7"
        >
          {/* Availability badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full glass text-gray-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Open to AI / ML opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Shikha{" "}
            <span className="accent-text">Upadhyay</span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            variants={item}
            className="text-2xl md:text-3xl font-semibold text-gray-300 h-10"
          >
            <TypeAnimation
              sequence={[
                "AI Engineer",
                2000,
                "RAG System Builder",
                2000,
                "LLM Application Developer",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            I design intelligent AI systems using Retrieval-Augmented Generation,
            agentic workflows, and scalable LLM architectures focused on
            reliability and real-world deployment.
          </motion.p>

          {/* Skill Pills */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {["RAG Systems", "Agentic AI", "LLM Integration"].map((label) => (
              <span
                key={label}
                className="px-4 py-2 text-sm rounded-full glass hover-lift"
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex gap-4 pt-2">
            <a href="#projects" className="accent-btn px-6 py-3 rounded-xl">
              View Projects
            </a>
            <a
              href="#contact"
              className="glass px-6 py-3 rounded-xl transition accent-border"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="flex gap-10 pt-6 border-t border-white/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold accent-text">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-72 md:w-96 aspect-[15/16]">
            <Image
              src="/profile-cutout.png"
              alt="Shikha Upadhyay"
              fill
              priority
              className="object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
