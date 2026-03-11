"use client";

import { useState } from "react";
import { resumeData } from "@/data/resumeData";
import { detectIntent } from "@/utils/detectIntent";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function SmartAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastIntent, setLastIntent] = useState<string | null>(null);

  const handleSend = (customMessage?: string) => {
    const finalMessage = customMessage || message;
    if (!finalMessage.trim()) return;

    setChat((prev) => [...prev, { role: "user", content: finalMessage }]);
    setMessage("");
    setLoading(true);

    setTimeout(() => {
      let intent = detectIntent(finalMessage);

      if (intent === "unknown" && lastIntent) {
        intent = lastIntent;
      }

      setLastIntent(intent);

      let reply = "";

      if (intent === "unknown") {
        reply =
          "You can ask me about my skills, projects, experience, leadership, or education.";
      } else {
        reply = resumeData[intent as keyof typeof resumeData];
      }

      setChat((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 px-4 py-3 rounded-full bg-purple-600 text-white shadow-lg z-50 hover:scale-105 transition"
        >
          Ask Me
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold text-purple-400">
              Portfolio Assistant
            </span>

            <div className="flex gap-2">
              {/* Minimize */}
              <button
                onClick={() => setMinimized(!minimized)}
                className="text-gray-400 hover:text-white text-sm"
              >
                –
              </button>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          {!minimized && (
            <div className="p-4 flex flex-col h-[420px]">
              {/* CHAT */}
              <div className="flex-1 overflow-y-auto space-y-3 text-sm">
                {chat.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[80%] px-4 py-2 rounded-xl whitespace-pre-line ${
                      msg.role === "user"
                        ? "ml-auto bg-purple-600 text-white"
                        : "bg-white/10 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}

                {loading && (
                  <div className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl w-fit animate-pulse">
                    Thinking...
                  </div>
                )}
              </div>

              {/* SUGGESTIONS */}
              {chat.length === 0 && (
                <div className="mt-3 space-y-2 text-xs text-gray-400">
                  <p>Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "What skills do you have?",
                      "Tell me about your projects",
                      "What is your experience?",
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(suggestion)}
                        className="px-3 py-1 bg-white/10 rounded-full hover:bg-purple-500/20 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INPUT */}
              <div className="mt-3 flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-white/10 p-2 rounded-lg text-sm outline-none"
                  placeholder="Ask something about me..."
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-purple-600 px-4 rounded-lg text-sm hover:bg-purple-500 transition"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
