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
      <main className="mx-auto min-h-screen max-w-[1400px] px-6 pb-24 pt-28">
        <Link
          href="/#achievements"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="mb-14">
          <h1 className="font-display text-3xl font-semibold accent-text md:text-4xl">
            Achievements
          </h1>
          <p className="mt-3 max-w-xl text-gray-400">
            {achievements.length} milestones across academics, hackathons, and
            Trailhead — with the photos and details.
          </p>
        </div>

        <Achievements />
      </main>
      <Footer />
    </>
  );
}
