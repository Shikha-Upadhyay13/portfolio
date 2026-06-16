"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 items-center w-full relative z-10">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* Small Label */}
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            AI Portfolio
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Shikha{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Upadhyay
            </span>
          </h1>

          {/* Animated Role */}
          <div className="text-2xl md:text-3xl font-semibold text-gray-300">
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
          </div>

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            I design intelligent AI systems using Retrieval-Augmented Generation,
            agentic workflows, and scalable LLM architectures focused on
            reliability and real-world deployment.
          </p>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-3">
            {["RAG Systems", "Agentic AI", "LLM Integration"].map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm rounded-full glass hover-lift"
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="accent-btn px-6 py-3 rounded-xl">
              View Projects
            </button>

            <button className="glass px-6 py-3 rounded-xl transition hover:border-white/20">
              Contact Me
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            <div className="absolute inset-0 -z-10 flex justify-center">
              <div className="w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full"></div>
            </div>
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl -z-10"></div>

            {/* Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10">
              <Image
                src="/profile.jpg"
                alt="Shikha Upadhyay"
                fill
                priority
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}