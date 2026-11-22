import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import ScrollConnector from "@/components/ui/ScrollConnector";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import { AchievementsPreview } from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Hackathons from "@/components/Hackathons";
import Leadership from "@/components/Leadership";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HomeScrollRestore from "@/components/HomeScrollRestore";

export default function Home() {
  return (
    <div id="main-content">
      <HomeScrollRestore />
      <Navbar />
      <Hero />
      <ScrollConnector />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <AchievementsPreview />
      <Certifications />
      <Hackathons />
      <Leadership />
      <Hobbies />
      <Contact />
      <Footer />
    </div>
  );
}
