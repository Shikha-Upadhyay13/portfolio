import type { ComponentType } from "react";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiC,
  SiMysql,
  SiFirebase,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiGit,
  SiGithub,
  SiFigma,
  SiHuggingface,
  SiLangchain,
  SiN8N,
  SiMake,
  SiStyledcomponents,
  SiFramer,
  SiWix,
} from "react-icons/si";
import { FaJava, FaFileExcel } from "react-icons/fa";
import {
  Workflow,
  Sparkles,
  Cpu,
  Orbit,
  Network,
  SlidersHorizontal,
  Brain,
  BrainCircuit,
  Gauge,
  Blocks,
  ChartColumn,
  GitBranch,
  FlaskConical,
  Database,
  Binary,
  Search,
  Boxes,
  Share2,
  Plug,
  ShieldCheck,
} from "lucide-react";

export type SkillIcon = ComponentType<{ className?: string }>;

/** Real brand logos where one exists; a well-matched generic icon for
 * concepts/methodologies that don't have (or can't legally use) a logo. */
export const skillIcons: Record<string, SkillIcon> = {
  // AI & Generative AI
  "RAG Pipelines": Workflow,
  "Prompt Engineering": Sparkles,
  "LLM Integration": Cpu,
  "Embedding Models": Orbit,
  Transformers: Network,
  "Chunking & Retrieval Tuning": SlidersHorizontal,
  "Hugging Face": SiHuggingface,

  // Machine Learning & Data
  "Machine Learning": Brain,
  "Deep Learning": BrainCircuit,
  "Model Evaluation": Gauge,
  "Feature Engineering": Blocks,
  "Power BI": ChartColumn,
  Excel: FaFileExcel,

  // Agentic Workflows & Automation
  LangChain: SiLangchain,
  LangGraph: GitBranch,
  LangSmith: FlaskConical,
  N8N: SiN8N,
  Make: SiMake,

  // Programming
  Python: SiPython,
  Java: FaJava,
  C: SiC,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  SQL: Database,
  HTML: SiHtml5,
  CSS: SiCss,
  "Data Structures & Algorithms": Binary,

  // Databases & Vector Search
  MySQL: SiMysql,
  Firebase: SiFirebase,
  FAISS: Search,
  Chroma: Boxes,
  "Vector Databases": Share2,

  // Frontend & Backend
  "React.js (Vite)": SiReact,
  "Next.js": SiNextdotjs,
  FastAPI: SiFastapi,
  "REST APIs": Plug,
  "Styled-Components": SiStyledcomponents,
  "Framer Motion": SiFramer,
  "CORS Configuration": ShieldCheck,

  // Web Platforms & Tools
  Git: SiGit,
  GitHub: SiGithub,
  "Wix Studio": SiWix,
  Figma: SiFigma,
};
