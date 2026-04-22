"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShieldCheck, Sparkles, Terminal, RefreshCcw, X, MessageSquare } from "lucide-react";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
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
  p: ({ children }: any) => <p className="mb-4 last:mb-0">{children}</p>,
  h1: ({ children }: any) => <h1 className="text-xl font-black mt-6 mb-3 text-blue-400">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-lg font-black mt-5 mb-2 text-blue-300">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-md font-bold mt-4 mb-2 text-blue-200">{children}</h3>,
  ul: ({ children }: any) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
  li: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  code: ({ children }: any) => <code className="bg-blue-900/30 text-blue-200 px-1.5 py-0.5 rounded-md text-xs font-mono">{children}</code>,
  strong: ({ children }: any) => <strong className="font-black text-white">{children}</strong>,
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
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#020617] border-l border-white/10 z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            <NeuralNetworkBackground />
            
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-20 p-6 flex items-center justify-between border-b border-white/5 bg-[#020617]/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
                  <ShieldCheck className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                    {v.title} <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{v.badge}</span>
                  </h3>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {v.groundedNote}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMessages([])}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  title={v.clearChat}
                >
                  <RefreshCcw className="w-5 h-5 text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all text-gray-400 hover:text-rose-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 relative z-10 overflow-hidden flex flex-col w-full">
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
              >
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60 px-6">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                      <Terminal className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold tracking-tight text-white">
                        {v.initializingTitle}
                      </h4>
                      <p className="text-sm font-light text-gray-400 max-w-xs">
                        {v.initializingSub}
                      </p>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border ${
                        m.role === "user" 
                          ? "bg-white/10 border-white/10" 
                          : "bg-blue-600/20 border-blue-500/30"
                      }`}>
                        {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-white/5 border border-white/10 text-gray-200"
                          : "bg-blue-900/20 border border-blue-800/30 text-blue-50"
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
                  <div className="flex gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                    </div>
                    <div className="bg-blue-900/10 border border-blue-800/20 rounded-2xl px-4 py-3 flex gap-1 items-center">
                      <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/5 bg-[#020617]/50 backdrop-blur-xl">
                <form 
                  onSubmit={handleSubmit}
                  className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl focus-within:border-blue-500/50 transition-all"
                >
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={v.placeholder}
                    className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm font-light placeholder:text-gray-600"
                  />
                  <button 
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="h-px w-8 bg-white/5"></span>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                    {v.disclaimer}
                  </p>
                  <span className="h-px w-8 bg-white/5"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
