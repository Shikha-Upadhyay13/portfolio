"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const PIPELINE = [
  {
    step: "Ingest",
    detail: "Collect documents, APIs, and multimodal inputs into a normalized pipeline.",
  },
  {
    step: "Chunk",
    detail: "Split content by topic or structure so each segment is retrieval-ready.",
  },
  {
    step: "Embed",
    detail: "Generate vector embeddings and index them in FAISS or a vector store.",
  },
  {
    step: "Retrieve",
    detail: "Fetch top-k relevant chunks for the user query before generation.",
  },
  {
    step: "Eval",
    detail: "Measure accuracy, relevance, and safety of outputs with eval frameworks.",
  },
  {
    step: "Deploy",
    detail: "Ship via FastAPI backends with streaming, monitoring, and clean APIs.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading
        title="How I Work"
        subtitle="My RAG pipeline — from raw data to reliable, grounded AI applications."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {PIPELINE.map((item, i) => (
          <Reveal key={item.step} delay={i * 0.08}>
            <div className="p-6 rounded-2xl glass hover-lift h-full">
              <span className="text-xs font-mono accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold mt-2 mb-2 font-display">
                {item.step}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
