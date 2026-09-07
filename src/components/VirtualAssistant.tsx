"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, RefreshCcw, X, MessageSquare, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface VirtualAssistantProps {
  lang: string;
  dict: any;
  isOpen: boolean;
  onClose: () => void;
}

const MarkdownStyles = {
  p: ({ children }: any) => <p className="mb-3 last:mb-0 leading-relaxed text-sm text-slate-700">{children}</p>,
  h1: ({ children }: any) => <h1 className="text-base font-bold mt-4 mb-2 text-slate-900">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-sm font-bold mt-3 mb-1.5 text-slate-900">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-xs font-bold mt-2 mb-1 text-slate-900">{children}</h3>,
  ul: ({ children }: any) => <ul className="list-disc pl-4 mb-3 space-y-1 text-sm text-slate-700">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-4 mb-3 space-y-1 text-sm text-slate-700">{children}</ol>,
  li: ({ children }: any) => <li className="leading-relaxed text-slate-700 text-sm">{children}</li>,
  code: ({ children }: any) => <code className="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded-sm text-xs font-mono border border-slate-200">{children}</code>,
  strong: ({ children }: any) => <strong className="font-bold text-slate-900">{children}</strong>,
};

export default function VirtualAssistant({ lang, dict, isOpen, onClose }: VirtualAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const v = dict.virtualAssistant;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "ai", content: data.content }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev, 
        { role: "ai", content: error.message || v.systemError }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] md:w-[540px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative z-20 px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-slate-900 text-white">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight text-slate-100">
                      {v.title}
                    </h3>
                    <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
                      {v.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    {v.groundedNote}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setMessages([])}
                  className="p-2 rounded-sm bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                  title={v.clearChat}
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-sm bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-all border border-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 relative z-10 overflow-hidden flex flex-col w-full bg-slate-50">
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4"
              >
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-6 py-12">
                    <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-xs text-blue-600">
                      <MessageSquare className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-slate-900">
                        {v.initializingTitle}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                        {v.initializingSub}
                      </p>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 shrink-0 rounded-sm flex items-center justify-center border text-xs ${
                        m.role === "user" 
                          ? "bg-slate-200 border-slate-300 text-slate-700" 
                          : "bg-blue-600 border-blue-700 text-white"
                      }`}>
                        {m.role === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`max-w-[85%] rounded-lg p-4 text-sm leading-relaxed border ${
                        m.role === "user"
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-white border-slate-200 text-slate-800 shadow-xs"
                      }`}>
                        {m.role === "ai" ? (
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={MarkdownStyles}
                          >
                            {m.content}
                          </ReactMarkdown>
                        ) : (
                          m.content
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-sm bg-blue-600 border border-blue-700 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex gap-1.5 items-center shadow-xs">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <form 
                  onSubmit={handleSubmit}
                  className="flex gap-2"
                >
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={v.placeholder}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
                  />
                  <button 
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-sm transition-all text-xs font-semibold flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-slate-400 font-mono text-center mt-2.5 uppercase tracking-wider">
                  {v.disclaimer}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
