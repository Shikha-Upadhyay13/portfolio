export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
}

export const projects: Project[] = [
  {
    title: "Quantix – RAG AI Assistant",
    description:
      "An intelligent AI assistant built using Retrieval-Augmented Generation. The system retrieves relevant context before generating responses, improving accuracy and reducing hallucinations.",
    tech: ["Python", "LangChain", "FAISS", "LLM"],
    github: "https://github.com/yourusername/quantix",
  },
  {
    title: "Smart Image Compressor",
    description:
      "A full-stack web application that compresses images efficiently while maintaining visual quality using Flask and Pillow.",
    tech: ["Python", "Flask", "Pillow", "HTML", "CSS"],
    github: "https://github.com/yourusername/image-compressor",
  },
  {
    title: "PassVault – Password Manager",
    description:
      "A secure password management system built with Python and MySQL, focusing on safe credential storage and database security.",
    tech: ["Python", "MySQL", "SQL"],
    github: "https://github.com/yourusername/passvault",
  },
  {
    title: "Penguin Species Classification",
    description:
      "Machine learning project implementing Logistic Regression, SVM, Decision Tree, and KNN models for penguin species prediction and performance comparison.",
    tech: ["Python", "Scikit-learn", "Pandas", "ML"],
    github: "https://github.com/yourusername/penguin-ml",
  },
  {
    title: "Travel Information RAG Agent",
    description:
      "A chatbot powered by Retrieval-Augmented Generation that answers travel-related queries by retrieving relevant policy and travel rule documents.",
    tech: ["LangChain", "Vector DB", "LLM", "RAG"],
    github: "https://github.com/yourusername/travel-rag",
  },
  {
    title: "Guess My Number Game",
    description:
      "An interactive browser game built with JavaScript that uses DOM manipulation and dynamic styling to create engaging gameplay.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/yourusername/guess-number",
  },
];