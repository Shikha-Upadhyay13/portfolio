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
      "Built and evaluated LLM applications using Python, evaluation datasets, automated tests, and trace analysis to assess accuracy, relevance, and safety.",
      "Lead client and design-partner meetings: understand requirements, translate them into clear instructions for the development team, and walk stakeholders through the application.",
    ],
  },
  {
    company: "Salesforce",
    role: "Intern, Agentblazer Champion Program",
    duration: "10/2025 – Present",
    certificateId: "salesforce-developer-agentblazer",
    description: [
      "Worked on Apex, LWC, Flow automation, data modelling, and Salesforce security.",
      "Earned Apex Specialist Superbadge, Trailhead Ranger (116+ badges, 105K+ points), and Agentblazer Innovator '26.",
    ],
  },
];
