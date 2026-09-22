import type { CorpusChunk } from "./corpus";

const QUERY_EXPANSIONS: Record<string, string[]> = {
  rag: ["retrieval", "faiss", "langchain", "vector", "embedding", "grounded"],
  ai: ["llm", "rag", "generative", "agent", "ml", "machine learning"],
  project: ["built", "developed", "quantix", "teaser", "github"],
  skill: ["tech", "technology", "stack", "python", "fastapi"],
  experience: ["intern", "job", "work", "quantum", "salesforce"],
  hackathon: ["guido", "dotpy", "biriyanios", "rover"],
  contact: ["email", "linkedin", "github", "hire", "reach"],
  math: ["quantix", "formula", "solver"],
  multimodal: ["teaser", "video", "audio", "image"],
};

export type RetrievedChunk = CorpusChunk & { score: number };

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\W+/).filter((t) => t.length > 1);
}

export function retrieveChunks(
  query: string,
  corpus: CorpusChunk[],
  topK = 3
): RetrievedChunk[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const expanded = new Set(terms);
  for (const term of terms) {
    for (const alt of QUERY_EXPANSIONS[term] ?? []) expanded.add(alt);
  }

  const scored = corpus
    .map((chunk) => {
      const haystack = chunk.text.toLowerCase();
      let score = 0;
      for (const term of expanded) {
        if (haystack.includes(term)) score += term.length > 4 ? 3 : 2;
        if (chunk.source.toLowerCase().includes(term)) score += 2;
      }
      return { ...chunk, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}
