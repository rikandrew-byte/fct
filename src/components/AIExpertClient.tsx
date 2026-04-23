"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShieldCheck, Sparkles, Terminal, RefreshCcw } from "lucide-react";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface AIExpertClientProps {
  lang: string;
  dict: any;
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

export default function AIExpertClient({ lang, dict }: AIExpertClientProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "ai", content: data.content }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev, 
        { role: "ai", content: error.message || (lang === "en" ? "System Error: Unable to reach AI Expert." : "Lỗi h�?thống: Không th�?kết nối tới Chuyên gia AI.") }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col">
      <NeuralNetworkBackground />
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-20 pt-32 pb-10 px-6 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                FCT Expert AI <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Demo</span>
              </h1>
              <p className="text-gray-400 text-xs font-light uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {lang === "en" ? "Grounded in FCT Knowledge Base" : "D�?liệu dựa trên h�?sinh thái FCT"}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setMessages([])}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            title="Clear Chat"
          >
            <RefreshCcw className="w-5 h-5 text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 overflow-hidden flex flex-col max-w-4xl mx-auto w-full px-6">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto py-10 space-y-8 scrollbar-hide"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Terminal className="w-10 h-10 text-blue-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight">
                  {lang === "en" ? "Secure Terminal Initialized" : "Khởi tạo Phiên l?m việc Bảo mật"}
                </h2>
                <p className="text-sm font-light text-gray-400 max-w-xs">
                  {lang === "en" ? "Ask me anything about Software Protection, Mobile Security, or Industrial Data." : "Tra cứu thông tin v�?Bảo v�?Bản quyền, Bảo mật Di ?ộng hoặc D�?liệu Công nghiệp."}
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
                className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${
                  m.role === "user" 
                    ? "bg-white/10 border-white/10" 
                    : "bg-blue-600/20 border-blue-500/30"
                }`}>
                  {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-blue-400" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-5 text-sm leading-relaxed ${
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
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <div className="bg-blue-900/10 border border-blue-800/20 rounded-2xl px-6 py-4 flex gap-1 items-center">
                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Bar */}
        <div className="py-10">
          <form 
            onSubmit={handleSubmit}
            className="flex gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl focus-within:border-blue-500/50 transition-all backdrop-blur-xl"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "en" ? "Type your technical query..." : "Nhập câu hỏi chuyên môn..."}
              className="flex-1 bg-transparent border-none outline-none px-4 py-2 font-light placeholder:text-gray-600"
            />
            <button 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center mt-4 text-gray-600 font-bold uppercase tracking-widest">
            {lang === "en" ? "Secure AI Session ??No data is saved" : "Phiên l?m việc bảo mật ??D�?liệu không ?ược lưu lại"}
          </p>
        </div>
      </div>
    </main>
  );
}
