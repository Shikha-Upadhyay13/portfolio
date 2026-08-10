"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import { detectIntent } from "@/utils/detectIntent";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickReplies = [
  "What skills do you have?",
  "Tell me about your projects",
  "What is your experience?",
  "Tell me about your achievements",
  "What hackathons have you done?",
  "How can I contact you?",
];

export default function SmartAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [lastIntent, setLastIntent] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);

  // Clean up any pending timers on unmount
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  // Stream a reply in character-by-character (typewriter effect)
  const streamReply = (text: string) => {
    setStreaming(true);
    setChat((prev) => [...prev, { role: "assistant", content: "" }]);

    const chars = [...text];
    let i = 0;
    const step = () => {
      i += 1;
      setChat((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: chars.slice(0, i).join(""),
        };
        return next;
      });
      if (i < chars.length) {
        const t = setTimeout(step, 12);
        timers.current.push(t);
      } else {
        setStreaming(false);
      }
    };
    step();
  };

  const handleSend = (customMessage?: string) => {
    const finalMessage = customMessage || message;
    if (!finalMessage.trim() || streaming) return;

    setChat((prev) => [...prev, { role: "user", content: finalMessage }]);
    setMessage("");
    setLoading(true);

    const t = setTimeout(() => {
      let intent = detectIntent(finalMessage);
      if (intent === "unknown" && lastIntent) intent = lastIntent;
      setLastIntent(intent);

      const reply =
        intent === "unknown"
          ? "I can talk about my skills, projects, experience, achievements, certifications, hackathons, leadership, education, hobbies, or how to reach me — try asking about one of those!"
          : resumeData[intent as keyof typeof resumeData].trim();

      setLoading(false);
      streamReply(reply);
    }, 500);
    timers.current.push(t);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 inline-flex items-center gap-2 px-4 py-3 rounded-full accent-btn z-50"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Ask AI
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
            className="fixed bottom-6 right-6 w-[92vw] max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-sm font-semibold accent-text">
                Portfolio Assistant
              </span>

              <div className="flex gap-3 text-gray-400">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="hover:text-white text-sm"
                  aria-label="Minimize"
                >
                  –
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="hover:text-white text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {!minimized && (
              <div className="p-4 flex flex-col h-[440px]">
                {/* CHAT */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto space-y-3 text-sm pr-1"
                >
                  {chat.length === 0 && (
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Hi! I&apos;m Shikha&apos;s portfolio assistant. Ask me about
                      her skills, projects, experience, achievements,
                      certifications, hackathons, leadership, education, or
                      hobbies.
                    </p>
                  )}

                  {chat.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] px-4 py-2 rounded-xl whitespace-pre-line ${
                        msg.role === "user"
                          ? "ml-auto bg-[#0B5C68] text-white"
                          : "bg-white/10 text-gray-200"
                      }`}
                    >
                      {msg.content}
                      {streaming &&
                        msg.role === "assistant" &&
                        i === chat.length - 1 && (
                          <span className="inline-block w-1.5 h-4 align-middle ml-0.5 bg-[#47F1FF] animate-pulse" />
                        )}
                    </div>
                  ))}

                  {loading && (
                    <div className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl w-fit">
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                      </span>
                    </div>
                  )}
                </div>

                {/* QUICK REPLIES */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      disabled={streaming || loading}
                      className="px-3 py-1 text-xs bg-white/10 rounded-full hover:bg-[#47F1FF]/20 transition disabled:opacity-40"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* INPUT */}
                <div className="mt-3 flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 bg-white/10 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#47F1FF]/50"
                    placeholder="Ask something about me..."
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={streaming || loading}
                    className="accent-btn px-4 rounded-lg text-sm disabled:opacity-40"
                  >
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
