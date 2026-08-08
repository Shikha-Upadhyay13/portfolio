export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string[];
  /** Matches a Certification's `id` in certifications.ts; shows a "Certificate" button that opens it. */
  certificateId?: string;
};

export const experiences: Experience[] = [
  {
    company: "Quantum Gandiva AI",
    role: "Research Intern",
    duration: "03/2026 – Present",
    description: [
      "Developed and applied evaluation (Evals) frameworks to assess LLM outputs for accuracy, relevance, and safety.",
      "Assisted in designing agentic workflows for real-world problem statements.",
    ],
  },
  {
    company: "Salesforce",
    role: "Intern, Agentblazer Champion Program",
    duration: "10/2025 – Present",
    certificateId: "salesforce-developer-agentblazer",
    description: [
      "Gained hands-on experience in Salesforce fundamentals including Apex and Lightning Web Components (LWC).",
      "Worked on automation workflows and process optimization tasks.",
      "Earned multiple Salesforce Super Badges including Apex Specialist.",
    ],
  },
];
