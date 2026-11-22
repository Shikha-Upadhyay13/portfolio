"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Profile as a syntax-highlighted object literal — on-brand for an AI engineer. */
function ProfileCodeBlock() {
  return (
    <div className="cafe-code overflow-hidden rounded-2xl border-2 border-accent/40 bg-panel shadow-2xl shadow-black/40">
      <div className="cafe-code__bar flex items-center gap-2 border-b border-line bg-page/40 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#c4a484]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#a67c52]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6f4e37]/70" />
        <span className="ml-3 font-mono text-xs text-muted">about.ts</span>
      </div>

      <pre className="overflow-x-auto bg-page/30 p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          <span className="text-accent">const</span>{" "}
          <span className="text-fg">engineer</span>{" "}
          <span className="text-muted">=</span>{" "}
          <span className="text-muted">{"{"}</span>
          {"\n  "}
          <span className="text-muted">name:</span>{" "}
          <span className="text-accent/90">&quot;Shikha Upadhyay&quot;</span>
          <span className="text-muted">,</span>
          {"\n  "}
          <span className="text-muted">role:</span>{" "}
          <span className="text-accent/90">&quot;AI Engineer&quot;</span>
          <span className="text-muted">,</span>
          {"\n  "}
          <span className="text-muted">focus:</span>{" "}
          <span className="text-muted">[</span>
          {"\n    "}
          <span className="text-accent">&quot;RAG Pipelines&quot;</span>
          <span className="text-muted">,</span>
          {"\n    "}
          <span className="text-accent">&quot;Agentic Workflows&quot;</span>
          <span className="text-muted">,</span>
          {"\n    "}
          <span className="text-accent">&quot;LLM Integration&quot;</span>
          <span className="text-muted">,</span>
          {"\n    "}
          <span className="text-accent">&quot;Vector Search&quot;</span>
          <span className="text-muted">,</span>
          {"\n  "}
          <span className="text-muted">],</span>
          {"\n  "}
          <span className="text-muted">approach:</span>{" "}
          <span className="text-accent/80">
            &quot;reliability-first, production-grade AI&quot;
          </span>
          <span className="text-muted">,</span>
          {"\n"}
          <span className="text-muted">{"}"}</span>
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
    <section id="about" className="w-full px-6 py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading title="About" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal
            direction="right"
            className="space-y-5 text-lg leading-relaxed text-muted"
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
      </div>
    </section>
  );
}
