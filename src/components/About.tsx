"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-14 px-6 max-w-[1400px] mx-auto">
      <SectionHeading title="About" />

      {/* Wide Description */}
      <Reveal delay={0.1}>
        <div className="text-gray-300 leading-relaxed text-lg space-y-6 mb-14">
          <p>
            I am an AI Engineer focused on building structured and reliable
            intelligent systems. My work centers around Retrieval-Augmented
            Generation (RAG), LLM integration, and agentic workflows.
          </p>

          <p>
            Rather than experimenting in isolation, I design architectures that
            combine machine learning, vector search, and reasoning pipelines to
            reduce hallucinations and improve production reliability. My goal is
            to bridge model intelligence with scalable real-world applications.
          </p>
        </div>
      </Reveal>

      {/* Core Focus */}
      <Reveal delay={0.15}>
        <h3 className="text-xl font-semibold mb-6">Core Focus</h3>

        <div className="border-l border-white/10 pl-6 space-y-5 text-gray-300">
          <p>RAG Pipelines & Retrieval Optimization</p>
          <p>Agentic AI System Design</p>
          <p>LLM Integration & Prompt Engineering</p>
          <p>Vector Databases & Embeddings</p>
        </div>
      </Reveal>
    </section>
  );
}
