"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Profile as a syntax-highlighted object literal — on-brand for an AI engineer. */
function ProfileCodeBlock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-xs text-gray-500">about.ts</span>
      </div>

      <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          <span className="text-accent">const</span>{" "}
          <span className="text-gray-100">engineer</span>{" "}
          <span className="text-gray-600">=</span>{" "}
          <span className="text-gray-600">{"{"}</span>
          {"\n  "}
          <span className="text-gray-400">name:</span>{" "}
          <span className="text-accent/90">&quot;Shikha Upadhyay&quot;</span>
          <span className="text-gray-600">,</span>
          {"\n  "}
          <span className="text-gray-400">role:</span>{" "}
          <span className="text-accent/90">&quot;AI Engineer&quot;</span>
          <span className="text-gray-600">,</span>
          {"\n  "}
          <span className="text-gray-400">focus:</span>{" "}
          <span className="text-gray-600">[</span>
          {"\n    "}
          <span className="text-[#8AF6FF]">&quot;RAG Pipelines&quot;</span>
          <span className="text-gray-600">,</span>
          {"\n    "}
          <span className="text-[#8AF6FF]">&quot;Agentic Workflows&quot;</span>
          <span className="text-gray-600">,</span>
          {"\n    "}
          <span className="text-[#8AF6FF]">&quot;LLM Integration&quot;</span>
          <span className="text-gray-600">,</span>
          {"\n    "}
          <span className="text-[#8AF6FF]">&quot;Vector Search&quot;</span>
          <span className="text-gray-600">,</span>
          {"\n  "}
          <span className="text-gray-600">],</span>
          {"\n  "}
          <span className="text-gray-400">approach:</span>{" "}
          <span className="text-accent/80">
            &quot;reliability-first, production-grade AI&quot;
          </span>
          <span className="text-gray-600">,</span>
          {"\n"}
          <span className="text-gray-600">{"}"}</span>
          <span className="text-accent">;</span>
          <span
            aria-hidden
            className="ml-0.5 inline-block h-4 w-[7px] animate-pulse align-middle bg-accent"
          />
        </code>
      </pre>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading title="About" />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal
          direction="right"
          className="space-y-5 text-lg leading-relaxed text-gray-300"
        >
          <p>
            I&apos;m focused on AI evaluations, chatbot testing, and analyzing
            model performance — turning client and design-partner requirements
            into practical solutions and clearer product quality.
          </p>
          <p>
            Day to day that means RAG and agentic LLM apps, eval frameworks,
            and stakeholder communication: understanding needs, briefing the
            build team, and walking partners through what the system can do
            reliably in the real world.
          </p>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <ProfileCodeBlock />
        </Reveal>
      </div>
    </section>
  );
}
