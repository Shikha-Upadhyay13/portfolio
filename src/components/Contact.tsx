"use client";

import { useMemo, useState, type FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const CONTACT_EMAIL = "upadhyayshikha2005@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!message.trim()) errors.message = "Message is required.";
  else if (message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(name, email, message), [name, email, message]);
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    const subject = `Portfolio contact from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const showError = (field: keyof FieldErrors) =>
    (touched[field] || submitted) && errors[field];

  return (
    <section id="contact" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading
        title="Contact"
        subtitle="Open to AI, ML, and GenAI opportunities. Let’s build something impactful."
      />

      <div className="grid md:grid-cols-2 gap-12">
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

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="contact-name" className="block text-sm mb-2">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              aria-invalid={!!showError("name")}
              aria-describedby={showError("name") ? "contact-name-error" : undefined}
              className={`w-full p-3 rounded-md border bg-transparent ${
                showError("name") ? "border-red-400/70" : ""
              }`}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            />
            {showError("name") && (
              <p id="contact-name-error" className="mt-1 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm mb-2">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              aria-invalid={!!showError("email")}
              aria-describedby={showError("email") ? "contact-email-error" : undefined}
              className={`w-full p-3 rounded-md border bg-transparent ${
                showError("email") ? "border-red-400/70" : ""
              }`}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            {showError("email") && (
              <p id="contact-email-error" className="mt-1 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              aria-invalid={!!showError("message")}
              aria-describedby={showError("message") ? "contact-message-error" : undefined}
              className={`w-full p-3 rounded-md border bg-transparent ${
                showError("message") ? "border-red-400/70" : ""
              }`}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            />
            {showError("message") && (
              <p id="contact-message-error" className="mt-1 text-sm text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="accent" size="md" disabled={!isValid}>
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
