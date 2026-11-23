"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const SOURCE = `const engineer = {
  name: "Shikha Upadhyay",
  role: "AI Engineer",
  focus: [
    "RAG Pipelines",
    "Agentic Workflows",
    "LLM Integration",
    "Vector Search",
  ],
  approach: "reliability-first, production-grade AI",
};`;

/** Tokenize a TypeScript-ish snippet for cafe / accent highlighting. */
function highlight(code: string) {
  const nodes: { text: string; className: string; key: string }[] = [];
  const re =
    /(\/\/.*$)|("(?:\\.|[^"\\])*")|(\b(?:const|let|var)\b)|(\b[A-Za-z_][\w]*\b)|(\s+)|([^\s"\w]+)/gm;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code))) {
    const [full, comment, str, kw, ident, space, punct] = m;
    let className = "text-fg";
    if (comment) className = "text-muted";
    else if (str) className = "text-accent";
    else if (kw) className = "text-accent";
    else if (ident) {
      className =
        ident === "engineer" || ident === "name" || ident === "role" ||
        ident === "focus" || ident === "approach"
          ? ident === "engineer"
            ? "text-fg"
            : "text-muted"
          : "text-fg";
    } else if (space) className = "";
    else if (punct) className = "text-muted";
    nodes.push({ text: full, className, key: `${i++}-${full.slice(0, 8)}` });
  }
  return nodes;
}

function ProfileCodeBlock() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Replay whenever About scrolls back into view
  const inView = useInView(ref, { once: false, amount: 0.4, margin: "0px" });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) {
      // Reset so the next scroll-in starts from the beginning
      setTyped("");
      setDone(false);
      return;
    }

    if (reduceMotion) {
      setTyped(SOURCE);
      setDone(true);
      return;
    }

    let i = 0;
    let timer = 0;
    let cancelled = false;
    setTyped("");
    setDone(false);

    const step = () => {
      if (cancelled) return;
      i += 1;
      setTyped(SOURCE.slice(0, i));
      if (i >= SOURCE.length) {
        setDone(true);
        return;
      }
      const ch = SOURCE[i - 1];
      const delay =
        ch === "\n" ? 90 : ch === "," || ch === "{" || ch === "[" ? 45 : 18;
      timer = window.setTimeout(step, delay);
    };
    timer = window.setTimeout(step, 280);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, reduceMotion]);

  const tokens = highlight(typed);

  return (
    <div
      ref={ref}
      className="cafe-code overflow-hidden rounded-2xl border-2 border-accent/40 bg-panel shadow-2xl shadow-black/40"
    >
      <div className="cafe-code__bar flex items-center gap-2 border-b border-line bg-page/40 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-xs text-muted">about.ts</span>
      </div>

      <pre className="min-h-[300px] overflow-x-auto bg-page/30 p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          {tokens.map((t) =>
            t.className ? (
              <span key={t.key} className={t.className}>
                {t.text}
              </span>
            ) : (
              <span key={t.key}>{t.text}</span>
            )
          )}
          <span
            aria-hidden
            className={`ml-0.5 inline-block h-4 w-[7px] align-middle bg-accent ${
              done ? "animate-pulse" : ""
            }`}
          />
        </code>
      </pre>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="w-full px-6 py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading title="About" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal
            direction="right"
            className="space-y-5 text-lg leading-relaxed text-muted"
          >
            <p>
              I&apos;m focused on AI evaluations, chatbot testing, and analyzing
              model performance - turning client and design-partner requirements
              into practical solutions and clearer product quality.
            </p>
            <p>
              Day to day that means RAG and agentic LLM apps, eval frameworks,
              and stakeholder communication: understanding needs, briefing the
              build team, and walking partners through what the system can do
              reliably in the real world.
            </p>
          </Reveal>

          {/* No Reveal wrapper - typing animation is the entrance */}
          <ProfileCodeBlock />
        </div>
      </div>
    </section>
  );
}
