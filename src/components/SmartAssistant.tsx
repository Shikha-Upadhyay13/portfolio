"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

const quickReplies = [
  { label: "Skills", query: "What are your core AI skills?" },
  { label: "Projects", query: "What are your best projects?" },
  { label: "Experience", query: "Where have you interned?" },
  { label: "Achievements", query: "What are your top achievements?" },
  { label: "Hackathons", query: "Tell me about your hackathons including SIH" },
  { label: "Contact", query: "How can I contact you?" },
];

/** Map citation labels → section anchors on the home page. */
function sourceHref(source: string): string | null {
  const s = source.toLowerCase();
  if (s.includes("skill")) return "/#skills";
  if (s.includes("project") || s.includes("case study")) return "/#projects";
  if (s.includes("experience") || s.includes("about → experience"))
    return "/#experience";
  if (s.includes("achievement")) return "/#achievements";
  if (s.includes("certif")) return "/#certifications";
  if (s.includes("hackathon")) return "/#hackathons";
  if (s.includes("leadership")) return "/#leadership";
  if (s.includes("education")) return "/#education";
  if (s.includes("hobb")) return "/#hobbies";
  if (s.includes("contact")) return "/#contact";
  if (s.includes("about")) return "/#about";
  return null;
}

export default function SmartAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat, loading]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (open && !minimized) {
      const t = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [open, minimized]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const streamReply = (text: string, sources: string[] = []) => {
    setStreaming(true);
    setChat((prev) => [...prev, { role: "assistant", content: "", sources }]);

    const chars = [...text];
    let i = 0;
    const step = () => {
      i += 1;
      setChat((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: chars.slice(0, i).join(""),
          sources,
        };
        return next;
      });
      if (i < chars.length) {
        const t = setTimeout(step, 10);
        timers.current.push(t);
      } else {
        setStreaming(false);
      }
    };
    step();
  };

  const handleSend = async (customMessage?: string) => {
    const finalMessage = customMessage || message;
    if (!finalMessage.trim() || streaming || loading) return;

    setChat((prev) => [...prev, { role: "user", content: finalMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        streamReply(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      streamReply(data.answer, data.sources ?? []);
    } catch {
      streamReply("Unable to reach the portfolio guide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setChat([]);
    setStreaming(false);
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => {
              setOpen(true);
              setMinimized(false);
            }}
            className="accent-btn fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3"
          >
            <MessageCircle className="h-4 w-4" />
            Portfolio Guide
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-md overflow-hidden rounded-2xl border border-line bg-panel/95 shadow-2xl backdrop-blur-xl"
            role="dialog"
            aria-label="Portfolio Guide"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span className="text-sm font-semibold accent-text">
                    Portfolio Guide
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">
                  Grounded in this site · Esc to close
                </p>
              </div>

              <div className="flex items-center gap-1 text-gray-400">
                {chat.length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-lg px-2 py-1 text-xs hover:bg-white/5 hover:text-white"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMinimized(!minimized)}
                  className="rounded-lg px-2 py-1 text-sm hover:bg-white/5 hover:text-white"
                  aria-label={minimized ? "Expand" : "Minimize"}
                >
                  {minimized ? "▢" : "–"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-gray-300 transition hover:bg-accent/15 hover:text-accent"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!minimized && (
              <div className="flex h-[min(70vh,520px)] flex-col p-4">
                <div
                  ref={scrollRef}
                  className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm"
                  aria-live="polite"
                  aria-relevant="additions"
                >
                  {chat.length === 0 && (
                    <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="leading-relaxed text-gray-300">
                        Hi — I&apos;m Shikha&apos;s guide. Ask about her AI work,
                        projects, experience, or how to reach her. Answers come
                        from this portfolio with citations.
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                        Try a starter
                      </p>
                    </div>
                  )}

                  {chat.map((msg, i) => (
                    <div
                      key={i}
                      className={
                        msg.role === "user" ? "flex justify-end" : "flex justify-start"
                      }
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-2.5 whitespace-pre-line ${
                          msg.role === "user"
                            ? "bg-accent-deep text-white"
                            : "border border-white/10 bg-white/10 text-gray-200"
                        }`}
                      >
                        {msg.content}
                        {streaming &&
                          msg.role === "assistant" &&
                          i === chat.length - 1 && (
                            <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse align-middle bg-accent" />
                          )}
                        {msg.role === "assistant" &&
                          msg.sources &&
                          msg.sources.length > 0 &&
                          msg.content &&
                          !streaming && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-white/10 pt-2">
                              {msg.sources.map((src) => {
                                const href = sourceHref(src);
                                const label = src.replace(/^About → /i, "");
                                return href ? (
                                  <a
                                    key={src}
                                    href={href}
                                    className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[11px] text-accent/90 transition hover:border-accent/40 hover:text-accent"
                                    onClick={() => setOpen(false)}
                                  >
                                    {label}
                                  </a>
                                ) : (
                                  <span
                                    key={src}
                                    className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[11px] text-gray-400"
                                  >
                                    {label}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="w-fit rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-gray-300">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => handleSend(q.query)}
                      disabled={streaming || loading}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-gray-300 transition hover:border-accent/40 hover:bg-accent/10 hover:text-white disabled:opacity-40"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    className="flex-1 rounded-xl bg-white/10 p-2.5 text-sm outline-none focus:ring-1 focus:ring-accent/50"
                    placeholder="Ask about skills, SIH, projects…"
                    aria-label="Message to portfolio guide"
                  />
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={streaming || loading || !message.trim()}
                    className="accent-btn inline-flex items-center gap-1.5 rounded-xl px-4 text-sm disabled:opacity-40"
                    aria-label="Send"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
