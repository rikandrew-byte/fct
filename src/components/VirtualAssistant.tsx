"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, RefreshCcw, X, Zap } from "lucide-react";
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
  p: ({ children }: any) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
  h1: ({ children }: any) => <h1 className="text-xl font-black mt-6 mb-3 text-blue-600">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-lg font-black mt-5 mb-2 text-blue-500">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-md font-bold mt-4 mb-2 text-blue-600">{children}</h3>,
  ul: ({ children }: any) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
  li: ({ children }: any) => <li className="leading-relaxed text-gray-800">{children}</li>,
  code: ({ children }: any) => <code className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-mono border border-blue-300">{children}</code>,
  strong: ({ children }: any) => <strong className="font-black text-gray-900">{children}</strong>,
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-gradient-to-br from-white to-blue-50 border-l border-blue-200 z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-20 p-6 flex items-center justify-between border-b border-blue-200 bg-gradient-to-r from-white/80 to-blue-50/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-2">
                    {v.title} 
                    <span className="text-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20">
                      {v.badge}
                    </span>
                  </h3>
                  <p className="text-blue-600/70 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                    {v.groundedNote}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMessages([])}
                  className="p-2.5 rounded-xl bg-blue-100 border border-blue-300 hover:bg-blue-200 hover:border-blue-400 transition-all group"
                  title={v.clearChat}
                >
                  <RefreshCcw className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-red-100 border border-red-300 hover:bg-red-200 hover:border-red-400 transition-all text-red-600 hover:text-red-700"
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
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-6">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center border border-blue-300 shadow-lg shadow-blue-200/50"
                    >
                      <Zap className="w-10 h-10 text-blue-600" />
                    </motion.div>
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <h4 className="text-xl font-black tracking-tight text-gray-900">
                        {v.initializingTitle}
                      </h4>
                      <p className="text-sm font-light text-blue-700/60 max-w-xs">
                        {v.initializingSub}
                      </p>
                    </motion.div>
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
                      <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border shadow-lg ${
                        m.role === "user" 
                          ? "bg-blue-100 border-blue-300 shadow-blue-200/50" 
                          : "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400/50 shadow-blue-500/30"
                      }`}>
                        {m.role === "user" ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed border ${
                        m.role === "user"
                          ? "bg-blue-100 border-blue-300 text-gray-900"
                          : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 text-gray-900"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border border-blue-400/50 shadow-lg shadow-blue-500/30">
                      <Sparkles className="w-4 h-4 text-white animate-spin" />
                    </div>
                    <div className="bg-blue-100 border border-blue-300 rounded-2xl px-4 py-3 flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-blue-200 bg-gradient-to-t from-white/80 to-white/40 backdrop-blur-xl">
                <form 
                  onSubmit={handleSubmit}
                  className="flex gap-2 p-1.5 bg-blue-100 border border-blue-300 rounded-2xl focus-within:border-blue-400 focus-within:bg-blue-100/80 transition-all shadow-lg shadow-blue-200/30"
                >
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={v.placeholder}
                    className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm font-light placeholder:text-blue-400/50 text-gray-900"
                  />
                  <button 
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/30 font-semibold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="h-px w-8 bg-blue-300/50"></span>
                  <p className="text-[9px] text-blue-600/60 font-bold uppercase tracking-[0.2em]">
                    {v.disclaimer}
                  </p>
                  <span className="h-px w-8 bg-blue-300/50"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
