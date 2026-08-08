export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
};

export const certifications: Certification[] = [
  {
    id: "big-data-101",
    title: "Big Data 101",
    issuer: "IBM · Cognitive Class",
    date: "April 2026",
    description:
      "Completed IBM's foundational course on big data concepts, tools, and architecture on cognitiveclass.ai, powered by the IBM Developer Skills Network.",
    image: "/images/certifications/big-data-101-ibm.jpg",
  },
  {
    id: "claude-code-in-action",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "March 2026",
    description:
      "Completed Anthropic's course on using Claude Code for real-world development workflows.",
    image: "/images/certifications/claude-code-in-action.jpg",
  },
  {
    id: "goldman-sachs-risk-simulation",
    title: "Risk Job Simulation",
    issuer: "Goldman Sachs · Forage",
    date: "March 2026",
    description:
      "Completed practical tasks in an introduction to risk analysis and evaluating client profiles and real estate investments.",
    image: "/images/certifications/goldman-sachs-risk-simulation.jpg",
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    date: "March 2026 (Nov 2025 – Mar 2026)",
    description:
      "Completed practical tasks in data analysis and forensic technology over a multi-month simulation.",
    image: "/images/certifications/deloitte-data-analytics-simulation.jpg",
  },
  {
    id: "salesforce-developer-agentblazer",
    title: "Salesforce Developer With Agentblazer Champion Program",
    issuer: "SmartBridge · Salesforce · AICTE",
    date: "August 2025 (8-week program, May–Jul 2025)",
    description:
      "Completed an 8-week virtual internship covering Salesforce fundamentals — org setup, data management, security, developer fundamentals, process automation, and UI — plus hands-on super badges including Apex Specialist and Object Relationships.",
    image: "/images/certifications/salesforce-developer-agentblazer.jpg",
  },
  {
    id: "ai-for-all-aware",
    title: "AI For All — AI Aware",
    issuer: "Intel · CBSE · Digital India",
    date: "August 2025",
    description:
      "Completed the AI Aware stage of the AI For All program, a national AI-literacy initiative by Intel and CBSE under Digital India.",
    image: "/images/certifications/ai-for-all-aware.jpg",
  },
  {
    id: "genai-productivity",
    title: "Build Your Generative AI Productivity Skills with Microsoft and LinkedIn",
    issuer: "LinkedIn Learning · Microsoft",
    date: "August 2025",
    description:
      "Completed a learning path on applying generative AI for business productivity, covering AI for Business, AI Productivity, and Generative AI.",
    image: "/images/certifications/genai-productivity-linkedin-microsoft.jpg",
  },
  {
    id: "machine-learning-simplilearn",
    title: "Machine Learning",
    issuer: "Simplilearn SkillUp",
    date: "May 2025",
    description: "Completed an online course covering core machine learning concepts.",
    image: "/images/certifications/machine-learning-simplilearn.jpg",
  },
  {
    id: "python-essentials-2",
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy · Vidya Jyothi Institute of Technology",
    date: "March 2025",
    description:
      "Completed the second part of Cisco's Python programming track, covering more advanced language concepts.",
    image: "/images/certifications/python-essentials-2-cisco.jpg",
  },
  {
    id: "html-css-udemy",
    title: "Build Responsive Real-World Websites with HTML and CSS",
    issuer: "Udemy",
    date: "October 2024",
    description:
      "37.5-hour course on building responsive, real-world websites with HTML and CSS, taught by Jonas Schmedtmann.",
    image: "/images/certifications/html-css-udemy.jpg",
  },
  {
    id: "qlik-data-analytics",
    title: "Qlik Data Analytics Certification",
    issuer: "Qlik",
    date: "October 2024",
    description: "Certified in data analytics fundamentals on the Qlik platform.",
    image: "/images/certifications/qlik-data-analytics.jpg",
  },
  {
    id: "qlik-data-literacy",
    title: "Qlik Data Literacy Certification",
    issuer: "Qlik",
    date: "October 2024",
    description:
      "Certified in core data literacy skills — reading, working with, and communicating with data.",
    image: "/images/certifications/qlik-data-literacy.jpg",
  },
];
