"use client";

import { Database, MessageSquare, Search, Workflow } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const focusAreas = [
  {
    icon: Search,
    title: "RAG Pipelines & Retrieval Optimization",
    description:
      "Designing retrieval systems that ground LLM outputs in real, verifiable context instead of memorized guesses.",
  },
  {
    icon: Workflow,
    title: "Agentic AI System Design",
    description:
      "Building multi-step agentic workflows that reason, plan, and act reliably rather than one-shot prompting.",
  },
  {
    icon: MessageSquare,
    title: "LLM Integration & Prompt Engineering",
    description:
      "Wiring LLMs into production systems with prompt design that holds up outside a demo notebook.",
  },
  {
    icon: Database,
    title: "Vector Databases & Embeddings",
    description:
      "Working with embeddings and vector search to power fast, accurate retrieval at scale.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading title="About" />

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Narrative — a display-font pull statement first, supporting detail after */}
        <div className="lg:col-span-2 space-y-6">
          <Reveal direction="right">
            <p className="font-display text-2xl md:text-[1.75rem] font-semibold leading-snug">
              I design <span className="accent-text">intelligent AI systems</span>{" "}
              that hold up outside the demo.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                I am an AI Engineer focused on building structured and reliable
                intelligent systems. My work centers around Retrieval-Augmented
                Generation (RAG), LLM integration, and agentic workflows.
              </p>
              <p>
                Rather than experimenting in isolation, I design architectures
                that combine machine learning, vector search, and reasoning
                pipelines to reduce hallucinations and improve production
                reliability. My goal is to bridge model intelligence with
                scalable real-world applications.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core Focus — a 2x2 grid of icon cards instead of a bare bulleted list */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
          {focusAreas.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={0.08 * i}>
              <Card padding="md" className="h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-1.5 leading-snug">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
