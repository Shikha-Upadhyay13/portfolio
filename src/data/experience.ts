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
      "Built and evaluated LLM applications in Python - designing evaluation datasets, automated tests, and trace analysis to measure accuracy, relevance, and safety before anything ships.",
      "Own the evaluation loop end-to-end: score model outputs, surface failure modes, and feed clear findings back into product and engineering so chatbot quality keeps improving.",
      "Lead client and design-partner meetings - gather requirements, translate them into actionable specs for the development team, and walk stakeholders through what the system can do reliably.",
      "Bridge research and delivery at Quantum Gandiva AI: keep partners aligned on scope, demos, and next steps while the team iterates on agentic and RAG-powered experiences.",
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
