export interface CaseStudy {
  slug: string;
  problem: string;
  approach: string;
  metrics: { label: string; value: string }[];
  architecture: { step: string; detail: string }[];
  learnings: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "teaser-multimodal-rag": {
    slug: "teaser-multimodal-rag",
    problem:
      "LLM chatbots struggle with heterogeneous data — text docs, images, audio, and video often live in separate silos. A user asking about content buried in a video or image gets hallucinated answers when the model cannot retrieve grounded context from those modalities.",
    approach:
      "Built an end-to-end multimodal RAG pipeline: ingest files across four modalities, normalize them into embeddable chunks, index in FAISS, and retrieve the top-k relevant segments before prompting the LLM. The FastAPI backend handles ingestion and streaming; the React frontend provides a unified chat interface.",
    metrics: [
      { label: "Modalities", value: "4" },
      { label: "Retrieval", value: "FAISS semantic search" },
      { label: "Response", value: "Streamed tokens" },
      { label: "Stack", value: "FastAPI + React" },
    ],
    architecture: [
      {
        step: "Ingest",
        detail: "Accept text, image, audio, and video uploads; extract raw content per modality.",
      },
      {
        step: "Chunk",
        detail: "Split extracted content into retrieval-sized segments with metadata tags.",
      },
      {
        step: "Embed",
        detail: "Generate vector embeddings for each chunk and store in a FAISS index.",
      },
      {
        step: "Retrieve",
        detail: "On query, embed the user message and fetch top-k similar chunks.",
      },
      {
        step: "Generate",
        detail: "Pass retrieved context to the LLM with streaming response back to the client.",
      },
    ],
    learnings: [
      "Modality-specific preprocessing is the hardest part — a one-size chunking strategy fails across text vs. audio transcripts.",
      "Streaming responses dramatically improve perceived latency even when retrieval adds overhead.",
      "Keeping ingestion and retrieval in separate modules made it easy to swap embedding models without touching the UI.",
    ],
  },
  "quantix-rag-math-solver": {
    slug: "quantix-rag-math-solver",
    problem:
      "LLMs frequently hallucinate formulas and skip steps when solving math problems from memory alone. Students and engineers need step-by-step solutions grounded in verified mathematical concepts, not plausible-sounding guesses.",
    approach:
      "Designed a RAG math solver that indexes mathematical concepts, formulas, and worked examples into FAISS via LangChain. At query time, the system retrieves relevant mathematical context before asking the LLM to produce a structured, step-by-step solution grounded in that retrieved material.",
    metrics: [
      { label: "Grounding", value: "FAISS + LangChain" },
      { label: "Output", value: "Step-by-step" },
      { label: "Focus", value: "Hallucination reduction" },
      { label: "Language", value: "Python" },
    ],
    architecture: [
      {
        step: "Ingest",
        detail: "Load math concepts, formulas, and example problems into a structured document store.",
      },
      {
        step: "Chunk",
        detail: "Split by concept/topic boundaries so each chunk carries a complete formula or rule.",
      },
      {
        step: "Embed",
        detail: "Index chunks in FAISS for semantic similarity search on natural-language math queries.",
      },
      {
        step: "Retrieve",
        detail: "Fetch the most relevant formulas and examples for the user's problem statement.",
      },
      {
        step: "Generate",
        detail: "Prompt the LLM with retrieved context to produce a grounded, step-by-step solution.",
      },
    ],
    learnings: [
      "Topic-boundary chunking outperformed fixed-size chunking for formula retrieval accuracy.",
      "Explicitly instructing the LLM to cite retrieved formulas reduced unsupported steps.",
      "Separating retrieval scoring from generation made debugging bad answers much faster.",
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
