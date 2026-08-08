"use client";

export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <h3 className="text-lg font-semibold">Shikha Upadhyay</h3>
            <p className="text-gray-400 mt-3 text-sm max-w-sm">
              AI Engineer focused on building reliable RAG systems, agentic
              workflows, and production-ready GenAI applications.
            </p>
          </div>

          {/* Right */}
          <div className="flex md:justify-end gap-12 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#experience">Experience</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Connect</h4>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="mailto:upadhyayshikha2005@gmail.com">Email</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Shikha Upadhyay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
