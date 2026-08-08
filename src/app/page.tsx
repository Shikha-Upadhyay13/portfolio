import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Hackathons from "@/components/Hackathons";
import Leadership from "@/components/Leadership";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Achievements />
      <Certifications />
      <Hackathons />
      <Leadership />
      <Hobbies />
      <Contact />
      <Footer />
    </>
  );
}
