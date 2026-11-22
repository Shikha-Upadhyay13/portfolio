import type { CorpusChunk } from "./corpus";

const QUERY_EXPANSIONS: Record<string, string[]> = {
  rag: ["retrieval", "faiss", "langchain", "vector", "embedding", "grounded", "quantix"],
  ai: ["llm", "rag", "generative", "agent", "ml", "machine learning"],
  project: ["built", "developed", "quantix", "teaser", "github", "voxshield", "ieee", "ticketing"],
  skill: ["tech", "technology", "stack", "python", "fastapi", "langchain", "langgraph"],
  experience: ["intern", "job", "work", "quantum", "salesforce", "gandiva"],
  hackathon: [
    "guido",
    "dotpy",
    "biriyanios",
    "rover",
    "sih",
    "eternals",
    "voxshield",
    "smart india",
  ],
  sih: ["voxshield", "eternals", "hackathon", "voice"],
  voxshield: ["sih", "eternals", "voice", "clone", "scam"],
  contact: ["email", "linkedin", "github", "hire", "reach", "upadhyay"],
  math: ["quantix", "formula", "solver"],
  multimodal: ["teaser", "video", "audio", "image"],
  dance: ["bharatanatyam", "nritya", "hobby"],
  award: ["achievement", "topper", "token", "ranger", "agentblazer"],
  hire: ["contact", "email", "open", "opportunities"],
};

export type RetrievedChunk = CorpusChunk & { score: number };

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 1);
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
      const source = chunk.source.toLowerCase();
      let score = 0;
      for (const term of expanded) {
        if (haystack.includes(term)) score += term.length > 4 ? 3 : 2;
        if (source.includes(term)) score += 2;
      }
      // Prefer shorter, denser chunks when scores tie later via sort stability
      score += Math.min(chunk.text.length / 800, 1);
      return { ...chunk, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}
