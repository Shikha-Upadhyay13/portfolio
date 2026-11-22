import type { RetrievedChunk } from "./retrieve";

const FALLBACK =
  "I can walk you through Shikha's skills, projects, experience, achievements, certifications, hackathons, leadership, education, hobbies, or how to reach her. Try a topic like “RAG projects” or “hackathons.”";

const GREETING =
  "Hi — I'm Shikha's portfolio guide. I answer from what's on this site (with sources). Ask about her AI work, projects, experience, achievements, or how to get in touch.";

export type SynthesizedAnswer = {
  answer: string;
  sources: string[];
};

function looksLikeGreeting(query: string): boolean {
  const t = query.trim().toLowerCase();
  return /^(hi|hello|hey|yo|sup|hola)\b/.test(t) || /who are you|what can (i|you) ask|help me/.test(t);
}

export function synthesizeAnswer(
  chunks: RetrievedChunk[],
  query = ""
): SynthesizedAnswer {
  if (looksLikeGreeting(query) && chunks.length === 0) {
    return { answer: GREETING, sources: [] };
  }

  if (chunks.length === 0) {
    return { answer: FALLBACK, sources: [] };
  }

  const sources = [...new Set(chunks.map((c) => c.source))];
  const body = chunks.map((c) => c.text.trim()).join("\n\n");

  // Light framing so dumps read like a guide, not a raw paste.
  const lead =
    chunks.length === 1
      ? ""
      : "Here's what I found on this site:\n\n";

  return { answer: `${lead}${body}`, sources };
}
