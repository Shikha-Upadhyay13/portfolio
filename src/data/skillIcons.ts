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

export type SkillIcon = ComponentType<{ className?: string; style?: React.CSSProperties }>;

export type SkillIconEntry = {
  icon: SkillIcon;
  /** Brand color where one exists; a fitting accent otherwise. Applied via
   * CSS `color`, which both react-icons and lucide-react render through. */
  color: string;
};

const DEFAULT_ENTRY: SkillIconEntry = { icon: Sparkles, color: "#47F1FF" };

/** Real brand logos where one exists (tinted to their brand color); a
 * well-matched generic icon for concepts/methodologies that don't have one. */
export const skillIcons: Record<string, SkillIconEntry> = {
  // AI & Generative AI
  "RAG Pipelines": { icon: Workflow, color: "#47F1FF" },
  "Prompt Engineering": { icon: Sparkles, color: "#FBBF24" },
  "LLM Integration": { icon: Cpu, color: "#A78BFA" },
  "Embedding Models": { icon: Orbit, color: "#38BDF8" },
  Transformers: { icon: Network, color: "#F472B6" },
  "Chunking & Retrieval Tuning": { icon: SlidersHorizontal, color: "#34D399" },
  "Hugging Face": { icon: SiHuggingface, color: "#FFD21E" },

  // Machine Learning & Data
  "Machine Learning": { icon: Brain, color: "#FB923C" },
  "Deep Learning": { icon: BrainCircuit, color: "#F87171" },
  "Model Evaluation": { icon: Gauge, color: "#4ADE80" },
  "Feature Engineering": { icon: Blocks, color: "#FBBF24" },
  "Power BI": { icon: ChartColumn, color: "#F2C811" },
  Excel: { icon: FaFileExcel, color: "#217346" },

  // Agentic Workflows & Automation
  LangChain: { icon: SiLangchain, color: "#3FA37E" },
  LangGraph: { icon: GitBranch, color: "#60A5FA" },
  LangSmith: { icon: FlaskConical, color: "#C084FC" },
  N8N: { icon: SiN8N, color: "#EA4B71" },
  Make: { icon: SiMake, color: "#A21CAF" },

  // Programming
  Python: { icon: SiPython, color: "#3776AB" },
  Java: { icon: FaJava, color: "#F89820" },
  C: { icon: SiC, color: "#A8B9CC" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  SQL: { icon: Database, color: "#22D3EE" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#2965F1" },
  "Data Structures & Algorithms": { icon: Binary, color: "#F97316" },

  // Databases & Vector Search
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  FAISS: { icon: Search, color: "#2DD4BF" },
  Chroma: { icon: Boxes, color: "#EC4899" },
  "Vector Databases": { icon: Share2, color: "#60A5FA" },

  // Frontend & Backend
  "React.js (Vite)": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  "REST APIs": { icon: Plug, color: "#FBBF24" },
  "Styled-Components": { icon: SiStyledcomponents, color: "#DB7093" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "CORS Configuration": { icon: ShieldCheck, color: "#34D399" },

  // Web Platforms & Tools
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  "Wix Studio": { icon: SiWix, color: "#0C6EFC" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
};

export function getSkillIcon(name: string): SkillIconEntry {
  return skillIcons[name] ?? DEFAULT_ENTRY;
}
