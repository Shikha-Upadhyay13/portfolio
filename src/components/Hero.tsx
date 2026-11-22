"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";

const container = staggerContainer();
const item = fadeUp;

const stats = [
  { value: "30+", label: "Projects" },
  { value: "20+", label: "Technologies" },
  { value: "AI", label: "B.Tech Major" },
];

function HeroPortrait() {
  return (
    <div className="relative z-10 w-72 shrink-0 sm:w-80 md:w-[24rem]">
      {/* Soft cafe-brown wash behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(111,78,55,0.18),transparent_68%)] blur-2xl"
      />

      {/* Warm brown gradient rim */}
      <div
        className="relative rounded-sm p-px shadow-2xl shadow-black/50"
        style={{
          background:
            "linear-gradient(145deg, rgba(111,78,55,0.55), rgba(245,237,224,0.55) 35%, rgba(139,94,60,0.35) 65%, rgba(92,61,46,0.45))",
        }}
      >
        <div className="relative h-[22rem] overflow-hidden rounded-[3px] bg-[#2a1c14] sm:h-[26rem] md:h-[28rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16%] top-[18%] h-48 w-48 rounded-full bg-accent/15 blur-[52px]"
          />

          <Image
            src="/profile.jpg"
            alt="Shikha Upadhyay"
            width={768}
            height={960}
            priority
            className="relative z-[1] h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
        <span>Portrait · 2026</span>
        <span>B.Tech AI · VJIT</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] items-center px-4 pb-10 pt-20 sm:px-6 md:px-8">
      <div className="grid w-full items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
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
            className="font-display text-5xl font-bold leading-tight text-accent md:text-6xl"
          >
            Shikha{" "}
            <span className="accent-text">Upadhyay</span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            variants={item}
            className="text-2xl md:text-3xl font-semibold text-gray-300 h-10 font-display"
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
            <Button href="#projects" variant="accent" size="md">
              View Projects
            </Button>
            <Button href="#contact" variant="ghost" size="md">
              Contact Me
            </Button>
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

        {/* RIGHT SIDE — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="relative flex justify-center md:justify-end items-center min-h-[340px] md:min-h-[480px]"
        >
          <HeroPortrait />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
