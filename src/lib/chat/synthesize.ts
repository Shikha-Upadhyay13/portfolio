import type { RetrievedChunk } from "./retrieve";

const FALLBACK =
  "I can help with questions about Shikha's skills, projects, experience, achievements, certifications, hackathons, leadership, education, hobbies, or contact info. Try asking about one of those topics!";

export type SynthesizedAnswer = {
  answer: string;
  sources: string[];
};

export function synthesizeAnswer(chunks: RetrievedChunk[]): SynthesizedAnswer {
  if (chunks.length === 0) {
    return { answer: FALLBACK, sources: [] };
  }

  const sources = [...new Set(chunks.map((c) => c.source))];
  const paragraphs = chunks.map((c) => c.text.trim());
  const answer = paragraphs.join("\n\n");

  return { answer, sources };
}
