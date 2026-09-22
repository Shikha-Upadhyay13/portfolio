import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Button from "@/components/ui/Button";
import { CATEGORY_STYLES } from "@/components/ui/ProjectCard";
import { getCaseStudy, getCaseStudySlugs } from "@/data/caseStudies";
import { getProjectBySlug, PLACEHOLDER_REPO, projects } from "@/data/projects";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    return { title: "Project Not Found" };
  }

  const url = `${SITE_URL}/projects/${slug}`;

  return {
    title: `${project.title} | Case Study`,
    description: caseStudy.problem,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: caseStudy.approach,
      url,
      type: "article",
    },
    alternates: { canonical: url },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) notFound();

  const isPlaceholder = project.github.startsWith(PLACEHOLDER_REPO);
  const categoryStyle =
    CATEGORY_STYLES[project.category] ??
    "text-accent/80 bg-accent/10 border-accent/20";

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <span
          className={`inline-block text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border mb-4 ${categoryStyle}`}
        >
          {project.category}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
          {project.title}
        </h1>
        <p className="text-accent/80 mb-8">→ {project.highlight}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {caseStudy.metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-xl glass text-center"
            >
              <div className="text-lg font-bold accent-text">{m.value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 font-display">Problem</h2>
          <p className="text-gray-400 leading-relaxed">{caseStudy.problem}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 font-display">Approach</h2>
          <p className="text-gray-400 leading-relaxed">{caseStudy.approach}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-display">Architecture</h2>
          <ArchitectureDiagram steps={caseStudy.architecture} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 font-display">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 font-display">Key Learnings</h2>
          <ul className="space-y-3">
            {caseStudy.learnings.map((learning) => (
              <li
                key={learning}
                className="text-gray-400 leading-relaxed pl-4 border-l-2 border-accent/30"
              >
                {learning}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
          {!isPlaceholder && (
            <Button
              href={project.github}
              variant="accent"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository
              <ArrowUpRight className="w-4 h-4 ml-1 inline" />
            </Button>
          )}
          {project.demoUrl && (
            <Button href={project.demoUrl} variant="ghost" size="md" target="_blank">
              Live Demo
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function getCaseStudyProjects() {
  return projects.filter((p) => p.caseStudy);
}
