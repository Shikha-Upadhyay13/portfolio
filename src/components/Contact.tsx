"use client";

import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <Reveal className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Contact
        </h2>
        <p className="text-gray-400 mt-4">
          Open to AI, ML, and GenAI opportunities. Let’s build something
          impactful.
        </p>
      </Reveal>

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Side - Info */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">Email</h3>
            <a
              href="mailto:upadhyayshikha2005@gmail.com"
              className="text-gray-400 hover:underline"
            >
              upadhyayshikha2005@gmail.com
            </a>
          </div>

          <div>
            <h3 className="font-semibold">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/shikha-upadhyay-2955aa2b8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline"
            >
              https://www.linkedin.com/in/shikha-upadhyay
            </a>
          </div>

          <div>
            <h3 className="font-semibold">GitHub</h3>
            <a
              href="https://github.com/Shikha-Upadhyay13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline"
            >
              https://github.com/Shikha-Upadhyay13
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-md border bg-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md border bg-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full p-3 rounded-md border bg-transparent"
              placeholder="Write your message..."
            />
          </div>

          <button type="submit" className="px-6 py-3 rounded-md border">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
