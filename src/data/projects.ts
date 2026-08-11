export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  /** Short outcome shown as a highlight chip on the card. */
  highlight: string;
  /** Grouping label shown as a small badge. */
  category: string;
  /** Featured projects span two columns in the bento grid. */
  featured?: boolean;
}

// Repos that aren't public yet use this placeholder; the UI renders them as
// "Repo coming soon" instead of a broken link.
export const PLACEHOLDER_REPO = "https://github.com/yourusername";

export const projects: Project[] = [
  {
    title: "Teaser — Multimodal RAG Agent",
    description:
      "A multimodal Retrieval-Augmented Generation system built with FastAPI, React, FAISS, and LLM APIs that answers queries from text, image, audio, and video inputs. Includes an end-to-end retrieval pipeline — ingestion, chunking, embedding generation, and semantic similarity search — with real-time response streaming for grounded answers across heterogeneous data sources.",
    tech: ["FastAPI", "React", "FAISS", "LLM APIs"],
    github: "https://github.com/Shikha-Upadhyay13/Multimodal_Chatbot",
    highlight: "Text, image, audio & video in one pipeline",
    category: "Generative AI",
    featured: true,
  },
  {
    title: "Quantix – RAG Math Solver",
    description:
      "A RAG-based math-solving agent that retrieves relevant concepts and formulas to generate step-by-step solutions, reducing hallucinations by grounding LLM reasoning in retrieved mathematical context.",
    tech: ["Python", "LangChain", "FAISS", "LLM"],
    github: "https://github.com/Shikha-Upadhyay13/Quantix",
    highlight: "Grounds answers in retrieved context",
    category: "Generative AI",
    featured: true,
  },
  {
    title: "Travel Information RAG Agent",
    description:
      "A chatbot powered by Retrieval-Augmented Generation that answers travel-related queries by retrieving relevant policy and travel rule documents.",
    tech: ["LangChain", "Vector DB", "LLM", "RAG"],
    github: "https://github.com/Shikha-Upadhyay13/travel-ai-agent",
    highlight: "Document-grounded Q&A",
    category: "Generative AI",
  },
  {
    title: "Nykaa-Inspired E-Commerce Site",
    description:
      "An interactive learning platform inspired by Nykaa's e-commerce experience, integrating 3D models, animations, and YouTube embeds with a responsive, cross-device UI. Implemented text-to-speech and an AI chatbot for accessible content delivery and real-time learner support.",
    tech: ["HTML", "CSS", "JavaScript", "3D Models"],
    github: "https://github.com/Shikha-Upadhyay13/nykaa-ecommerce-clone",
    highlight: "3D models + AI chatbot",
    category: "Web App",
    featured: true,
  },
  {
    title: "Smart Image Compressor",
    description:
      "A full-stack web application that compresses images efficiently while maintaining visual quality using Flask and Pillow.",
    tech: ["Python", "Flask", "Pillow", "HTML", "CSS"],
    github: "https://github.com/Shikha-Upadhyay13/smart-image-compressor",
    highlight: "Full-stack image pipeline",
    category: "Web App",
  },
  {
    title: "PassVault – Password Manager",
    description:
      "A secure password management system built with Python and MySQL, focusing on safe credential storage and database security.",
    tech: ["Python", "MySQL", "SQL"],
    github: "https://github.com/Shikha-Upadhyay13/passvault-python-mysql",
    highlight: "Secure credential storage",
    category: "Security",
  },
  {
    title: "Penguin Species Classification",
    description:
      "Machine learning project implementing Logistic Regression, SVM, Decision Tree, and KNN models for penguin species prediction and performance comparison.",
    tech: ["Python", "Scikit-learn", "Pandas", "ML"],
    github: "https://github.com/Shikha-Upadhyay13/penguin-species-classification-ml",
    highlight: "4 models compared",
    category: "Machine Learning",
  },
  {
    title: "Guess My Number Game",
    description:
      "An interactive browser game built with JavaScript that uses DOM manipulation and dynamic styling to create engaging gameplay.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Shikha-Upadhyay13/html-css-js-games",
    highlight: "Interactive DOM game",
    category: "Web App",
  },
];
