"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ContactVisual from "@/components/ContactVisual";
import { SOCIAL_LINKS } from "@/lib/site";

const CONTACT_EMAIL = SOCIAL_LINKS.email;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPICS = [
  "Internship / role",
  "Collaboration",
  "Project discussion",
  "Speaking / mentoring",
];

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email.trim()))
    errors.email = "Enter a valid email address.";
  if (!message.trim()) errors.message = "Message is required.";
  else if (message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

const fieldClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-gray-600 outline-none transition-colors focus:border-accent/50 focus:bg-white/[0.05] ${
    hasError ? "border-red-400/70" : "border-white/10"
  }`;

const channelClass =
  "flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-white/[0.04] transition group";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const errors = useMemo(
    () => validate(name, email, message),
    [name, email, message]
  );
  const isValid = Object.keys(errors).length === 0;

  const showError = (field: keyof FieldErrors) =>
    (touched[field] || submitted) && errors[field];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    const subjectParts = [
      topic ? `[${topic}]` : null,
      `Portfolio contact from ${name.trim()}`,
    ].filter(Boolean);
    const body = `${message.trim()}\n\n- ${name.trim()} (${email.trim()})`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subjectParts.join(" ")
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading
        title="Contact"
        subtitle="Open to AI, ML, and GenAI opportunities - roles, collaborations, or a quick hello."
      />

      {/* Equal-width, equal-height panels */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Left */}
        <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 overflow-hidden">
          <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities
          </div>

          <ContactVisual />

          <h3 className="mt-2 text-xl md:text-2xl font-semibold font-display leading-snug">
            Let’s talk about{" "}
            <span className="accent-text">building with AI</span>
          </h3>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed">
            Prefer email or LinkedIn. I usually reply within a day or two.
          </p>

          <div className="mt-5 flex-1 flex flex-col gap-3">
            <div className="flex items-stretch gap-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className={`${channelClass} flex-1`}>
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <div className="min-w-0 text-left">
                  <p className="text-[11px] uppercase tracking-wider text-gray-500">
                    Email
                  </p>
                  <p className="text-sm text-gray-200 truncate group-hover:text-white">
                    {CONTACT_EMAIL}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-accent ml-auto shrink-0" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email"}
                className="px-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-white/[0.04] transition text-gray-400 hover:text-white"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={channelClass}
            >
              <Linkedin className="w-4 h-4 text-accent shrink-0" />
              <div className="min-w-0 text-left">
                <p className="text-[11px] uppercase tracking-wider text-gray-500">
                  LinkedIn
                </p>
                <p className="text-sm text-gray-200 group-hover:text-white">
                  /in/shikha-upadhyay
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-accent ml-auto shrink-0" />
            </a>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className={channelClass}
            >
              <Github className="w-4 h-4 text-accent shrink-0" />
              <div className="min-w-0 text-left">
                <p className="text-[11px] uppercase tracking-wider text-gray-500">
                  GitHub
                </p>
                <p className="text-sm text-gray-200 group-hover:text-white">
                  @Shikha-Upadhyay13
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-accent ml-auto shrink-0" />
            </a>

            <button
              type="button"
              onMouseEnter={() =>
                window.dispatchEvent(new CustomEvent("preload-resume-preview"))
              }
              onFocus={() =>
                window.dispatchEvent(new CustomEvent("preload-resume-preview"))
              }
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-resume-preview"))
              }
              className={`${channelClass} w-full cursor-pointer text-left`}
            >
              <FileDown className="w-4 h-4 text-accent shrink-0" />
              <div className="min-w-0 text-left">
                <p className="text-[11px] uppercase tracking-wider text-gray-500">
                  Résumé
                </p>
                <p className="text-sm text-gray-200 group-hover:text-white">
                  Preview PDF
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-accent ml-auto shrink-0" />
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {sent ? (
            <div className="flex flex-1 flex-col justify-center">
              <div className="w-11 h-11 rounded-full border border-accent/40 flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold font-display">
                Opening your mail app…
              </h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Your message is ready in a new email to{" "}
                <span className="text-gray-200">{CONTACT_EMAIL}</span>. If
                nothing opened,{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:underline"
                >
                  click here
                </a>{" "}
                or use the channels on the left.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                  setTopic(null);
                  setTouched({ name: false, email: false, message: false });
                }}
                className="mt-6 self-start text-sm text-gray-400 hover:text-white transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="flex flex-1 flex-col gap-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <p className="text-sm text-gray-400 mb-3">What’s this about?</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const active = topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(active ? null : t)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                          active
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-white/10 text-gray-400 hover:text-white hover:border-white/25"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!showError("name")}
                    aria-describedby={
                      showError("name") ? "contact-name-error" : undefined
                    }
                    className={fieldClass(!!showError("name"))}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  />
                  {showError("name") && (
                    <p
                      id="contact-name-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={!!showError("email")}
                    aria-describedby={
                      showError("email") ? "contact-email-error" : undefined
                    }
                    className={fieldClass(!!showError("email"))}
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  />
                  {showError("email") && (
                    <p
                      id="contact-email-error"
                      className="mt-1.5 text-sm text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm text-gray-300"
                  >
                    Message
                  </label>
                  <span className="text-[11px] text-gray-600">
                    {message.trim().length}/500
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  required
                  aria-invalid={!!showError("message")}
                  aria-describedby={
                    showError("message") ? "contact-message-error" : undefined
                  }
                  className={`${fieldClass(!!showError("message"))} resize-none flex-1 min-h-[140px]`}
                  placeholder="A short note about the role, project, or question…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                />
                {showError("message") && (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 text-sm text-red-400"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <Button
                  type="submit"
                  variant="accent"
                  size="md"
                  disabled={!isValid}
                  className="!rounded-xl"
                >
                  <Send className="w-4 h-4" />
                  Send message
                </Button>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Opens your email app - no account required.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
