import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Achievements from "@/components/Achievements";
import { achievements } from "@/data/achievements";

export const metadata = {
  title: "Achievements | Shikha Upadhyay",
  description:
    "Academic excellence, hackathon awards, and Salesforce Trailhead milestones.",
};

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden pb-24 pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(71,241,255,0.1),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-[1400px] px-6">
          <Link
            href="/#achievements"
            className="mb-10 inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          <header className="mb-16 max-w-3xl border-b border-white/10 pb-10">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-500">
              Milestones
            </p>
            <h1 className="font-display text-4xl font-semibold md:text-5xl">
              Achievements
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              {achievements.length} stories across academics, hackathons, and
              Trailhead — swipe the stacks for every photo.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {achievements.map((a) => (
                <div key={a.eyebrow}>
                  <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
                    {a.eyebrow}
                  </div>
                  <div className="mt-1 text-sm text-gray-300">
                    {a.photos.length} photos
                  </div>
                </div>
              ))}
            </div>
          </header>

          <Achievements />
        </div>
      </main>
      <Footer />
    </>
  );
}
