import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { resumeData } from "@/data/resumeData";
import { skills } from "@/data/skills";

export type CorpusChunk = {
  id: string;
  source: string;
  text: string;
};

function chunkText(source: string, id: string, text: string): CorpusChunk {
  return {
    id,
    source,
    text: text.trim(),
  };
}

export function buildCorpus(): CorpusChunk[] {
  const chunks: CorpusChunk[] = [];

  for (const [key, text] of Object.entries(resumeData)) {
    chunks.push(chunkText(`About → ${key}`, `resume-${key}`, text));
  }

  for (const project of projects) {
    chunks.push(
      chunkText(
        `Projects → ${project.title}`,
        `project-${project.slug}`,
        `${project.title}. ${project.description} Tech: ${project.tech.join(", ")}. Highlight: ${project.highlight}.`
      )
    );
  }

  for (const [slug, study] of Object.entries(caseStudies)) {
    chunks.push(
      chunkText(
        `Case Study → ${slug}`,
        `case-${slug}`,
        `Problem: ${study.problem} Approach: ${study.approach} Learnings: ${study.learnings.join(" ")}`
      )
    );
  }

  for (const group of skills) {
    chunks.push(
      chunkText(
        `Skills → ${group.category}`,
        `skills-${group.category.toLowerCase().replace(/\s+/g, "-")}`,
        `${group.category}: ${group.items.join(", ")}.`
      )
    );
  }

  return chunks;
}

let cachedCorpus: CorpusChunk[] | null = null;

export function getCorpus(): CorpusChunk[] {
  if (!cachedCorpus) cachedCorpus = buildCorpus();
  return cachedCorpus;
}
