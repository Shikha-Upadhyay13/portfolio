"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Renders Shikha's profile as a syntax-highlighted object literal, styled
 * like a code editor tab — a more genuine, on-brand alternative to a generic
 * icon-card grid for an AI engineer's About section. */
function ProfileCodeBlock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel overflow-hidden shadow-2xl shadow-black/40">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs text-gray-500 font-mono">about.ts</span>
      </div>

      <pre className="p-6 text-[13px] sm:text-sm leading-relaxed font-mono overflow-x-auto">
        <code>
          <span className="text-accent">const</span>{" "}
          <span className="text-gray-200">engineer</span>{" "}
          <span className="text-gray-500">=</span>{" "}
          <span className="text-gray-500">{"{"}</span>
          {"\n  "}
          <span className="text-gray-300">name:</span>{" "}
          <span className="text-amber-300">&quot;Shikha Upadhyay&quot;</span>
          <span className="text-gray-500">,</span>
          {"\n  "}
          <span className="text-gray-300">role:</span>{" "}
          <span className="text-amber-300">&quot;AI Engineer&quot;</span>
          <span className="text-gray-500">,</span>
          {"\n  "}
          <span className="text-gray-300">focus:</span>{" "}
          <span className="text-gray-500">[</span>
          {"\n    "}
          <span className="text-amber-300">&quot;RAG Pipelines&quot;</span>
          <span className="text-gray-500">,</span>
          {"\n    "}
          <span className="text-amber-300">&quot;Agentic Workflows&quot;</span>
          <span className="text-gray-500">,</span>
          {"\n    "}
          <span className="text-amber-300">&quot;LLM Integration&quot;</span>
          <span className="text-gray-500">,</span>
          {"\n    "}
          <span className="text-amber-300">&quot;Vector Search&quot;</span>
          <span className="text-gray-500">,</span>
          {"\n  "}
          <span className="text-gray-500">],</span>
          {"\n  "}
          <span className="text-gray-300">approach:</span>{" "}
          <span className="text-amber-300">
            &quot;reliability-first, production-grade AI&quot;
          </span>
          <span className="text-gray-500">,</span>
          {"\n"}
          <span className="text-gray-500">{"}"}</span>
          <span className="text-accent">;</span>
          <span
            aria-hidden
            className="inline-block w-[7px] h-4 bg-accent ml-0.5 align-middle animate-pulse"
          />
        </code>
      </pre>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading title="About" />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Narrative */}
        <Reveal direction="right" className="space-y-5 text-gray-300 leading-relaxed text-lg">
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
        </Reveal>

        {/* Profile-as-code panel */}
        <Reveal direction="left" delay={0.1}>
          <ProfileCodeBlock />
        </Reveal>
      </div>
    </section>
  );
}
