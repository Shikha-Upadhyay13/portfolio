"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-black/30 border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg font-semibold accent-text">Shikha.dev</h1>

        {/* Right Side */}
        <div className="flex items-center gap-8 text-sm">
          <a href="#about" className="hover:text-purple-400 transition">
            About
          </a>

          <a href="#skills" className="hover:text-purple-400 transition">
            Skills
          </a>

          <a href="#projects" className="hover:text-purple-400 transition">
            Projects
          </a>

          <a href="#contact" className="hover:text-purple-400 transition">
            Contact
          </a>

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 rounded-lg glass transition hover:border-purple-400/50"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
