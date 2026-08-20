"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const CONTACT_EMAIL = "upadhyayshikha2005@gmail.com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading
        title="Contact"
        subtitle="Open to AI, ML, and GenAI opportunities. Let’s build something impactful."
      />

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Side - Info */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">Email</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-gray-400 hover:underline"
            >
              {CONTACT_EMAIL}
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-name" className="block text-sm mb-2">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="w-full p-3 rounded-md border bg-transparent"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm mb-2">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className="w-full p-3 rounded-md border bg-transparent"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className="w-full p-3 rounded-md border bg-transparent"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button type="submit" variant="accent" size="md">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
