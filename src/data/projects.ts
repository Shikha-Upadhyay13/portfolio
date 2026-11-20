export interface Project {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  github: string;
  /** Short outcome shown as a highlight chip on the card. */
  highlight: string;
  /** Grouping label shown as a small badge. */
  category: string;
  /** Featured projects span two columns in the bento grid. */
  featured?: boolean;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
  architecture?: { step: string; detail: string }[];
  learnings?: string[];
  caseStudy?: boolean;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Repos that aren't public yet use this placeholder; the UI renders them as
// "Repo coming soon" instead of a broken link.
export const PLACEHOLDER_REPO = "https://github.com/yourusername";

export const projects: Project[] = [
  {
    title: "VoxShield",
    slug: "voxshield",
    description:
      "Smart India Hackathon 2026 project (SIH26104) — reusable AI voice-security core that scores cloned vs. real voices and scam speech separately in real time. FastAPI engine with WebSocket streaming, neural + DSP authenticity checks, and Next.js demo adapters for call monitoring and bank-style hold/MFA flows.",
    tech: ["FastAPI", "Next.js", "TypeScript", "Whisper", "ONNX"],
    github: "https://github.com/Shikha-Upadhyay13/VoxShield",
    highlight: "Live clone & scam-speech detection",
    category: "Cybersecurity",
    featured: true,
  },
  {
    title: "Teaser — Agentic Multimodal Chatbot",
    slug: "teaser-multimodal-rag",
    description:
      "An agentic chatbot that plans tool use — search, read, calculate, transcribe, and generate files — across text, image, audio, and video. Includes eval workflows, a FastAPI backend, React frontend, and deployment via Render for grounded multimodal answers.",
    tech: ["FastAPI", "React", "LLM APIs", "Agentic AI"],
    github: "https://github.com/Shikha-Upadhyay13/Multimodal_Chatbot",
    highlight: "Tool-planning agent + multimodal inputs",
    category: "Generative AI",
    featured: true,
    caseStudy: true,
  },
  {
    title: "IEEE Paper Builder",
    slug: "ieee-paper-builder",
    description:
      "Drag-and-drop IEEE conference paper editor with a live, paginated two-column preview that stays byte-accurate to IEEE format. Block-based writing, Playwright PDF export from the same DOM as preview, Supabase auth/storage, and a Groq-backed AI assistant for drafting — no manual LaTeX formatting.",
    tech: ["React", "TypeScript", "Vite", "Supabase", "Playwright", "Groq"],
    github: "https://github.com/Shikha-Upadhyay13/IEEE",
    highlight: "IEEE-accurate editor + PDF export",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "IT Ticketing Tool",
    slug: "it-ticketing-tool",
    description:
      "Full-stack IT support ticketing system for creating, prioritizing, assigning, and tracking resolution workflows — structured ticket lifecycle, role-based access, and dashboards for support teams.",
    tech: ["Full Stack", "REST APIs", "SQL"],
    github: "https://github.com/Shikha-Upadhyay13/Ticketing_tool",
    highlight: "End-to-end ticket lifecycle",
    category: "Web App",
    featured: true,
  },
  {
    title: "Quantix – RAG Math Solver",
    slug: "quantix-rag-math-solver",
    description:
      "A RAG-based math-solving agent that retrieves relevant concepts and formulas to generate step-by-step solutions, reducing hallucinations by grounding LLM reasoning in retrieved mathematical context.",
    tech: ["Python", "LangChain", "FAISS", "LLM"],
    github: "https://github.com/Shikha-Upadhyay13/Quantix",
    highlight: "Grounds answers in retrieved context",
    category: "Generative AI",
    caseStudy: true,
  },
  {
    title: "Travel Information RAG Agent",
    slug: "travel-information-rag-agent",
    description:
      "A chatbot powered by Retrieval-Augmented Generation that answers travel-related queries by retrieving relevant policy and travel rule documents.",
    tech: ["LangChain", "Vector DB", "LLM", "RAG"],
    github: "https://github.com/Shikha-Upadhyay13/travel-ai-agent",
    highlight: "Document-grounded Q&A",
    category: "Generative AI",
  },
  {
    title: "Nykaa-Inspired E-Commerce Site",
    slug: "nykaa-inspired-e-commerce-site",
    description:
      "An interactive learning platform inspired by Nykaa's e-commerce experience, integrating 3D models, animations, and YouTube embeds with a responsive, cross-device UI. Implemented text-to-speech and an AI chatbot for accessible content delivery and real-time learner support.",
    tech: ["HTML", "CSS", "JavaScript", "3D Models"],
    github: "https://github.com/Shikha-Upadhyay13/nykaa-ecommerce-clone",
    highlight: "3D models + AI chatbot",
    category: "Web App",
  },
  {
    title: "Smart Image Compressor",
    slug: "smart-image-compressor",
    description:
      "A full-stack web application that compresses images efficiently while maintaining visual quality using Flask and Pillow.",
    tech: ["Python", "Flask", "Pillow", "HTML", "CSS"],
    github: "https://github.com/Shikha-Upadhyay13/smart-image-compressor",
    highlight: "Full-stack image pipeline",
    category: "Web App",
  },
  {
    title: "PassVault – Password Manager",
    slug: "passvault-password-manager",
    description:
      "A secure password management system built with Python and MySQL, focusing on safe credential storage and database security.",
    tech: ["Python", "MySQL", "SQL"],
    github: "https://github.com/Shikha-Upadhyay13/passvault-python-mysql",
    highlight: "Secure credential storage",
    category: "Security",
  },
  {
    title: "Penguin Species Classification",
    slug: "penguin-species-classification",
    description:
      "Machine learning project implementing Logistic Regression, SVM, Decision Tree, and KNN models for penguin species prediction and performance comparison.",
    tech: ["Python", "Scikit-learn", "Pandas", "ML"],
    github: "https://github.com/Shikha-Upadhyay13/penguin-species-classification-ml",
    highlight: "4 models compared",
    category: "Machine Learning",
  },
  {
    title: "Guess My Number Game",
    slug: "guess-my-number-game",
    description:
      "An interactive browser game built with JavaScript that uses DOM manipulation and dynamic styling to create engaging gameplay.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Shikha-Upadhyay13/html-css-js-games",
    highlight: "Interactive DOM game",
    category: "Web App",
  },
];