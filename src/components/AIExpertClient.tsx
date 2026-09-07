"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShieldCheck, Terminal, RefreshCcw } from "lucide-react";
import TechGridBackground from "./TechGridBackground";
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
        { role: "ai", content: error.message || (lang === "en" ? "System Error: Unable to reach AI Expert." : "Lỗi hệ thống: Không thể kết nối tới Chuyên gia Tư vấn Kỹ thuật.") }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="relative z-20 pt-36 pb-8 px-6 bg-slate-900 border-b border-slate-800 text-white overflow-hidden">
        <TechGridBackground />
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-50">
                  {lang === "en" ? "FCT Technical Advisor" : "Trợ lý Kỹ thuật FCT"}
                </h1>
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
                  Enterprise
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                {lang === "en" ? "Grounded in FCT Knowledge Base" : "Dữ liệu đối soát hệ sinh thái FCT"}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setMessages([])}
            className="p-2.5 rounded-sm bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
            title="Clear Chat"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 overflow-hidden flex flex-col max-w-4xl mx-auto w-full px-6 py-6">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-xs text-blue-600">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  {lang === "en" ? "Technical Consultation Session Initialized" : "Phiên tư vấn kỹ thuật trực tuyến"}
                </h2>
                <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                  {lang === "en" 
                    ? "Ask technical questions about Software Protection, Mobile Security, or Industrial OT Historian." 
                    : "Tra cứu thông số kỹ thuật, mô hình cấp phép Sentinel/Guardant, bảo mật Guardsquare, hoặc dữ liệu công nghiệp Canary."}
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
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
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

        {/* Input Bar */}
        <div className="pt-4 pb-6">
          <form 
            onSubmit={handleSubmit}
            className="flex gap-2"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "en" ? "Type your technical query..." : "Nhập câu hỏi chuyên môn kỹ thuật..."}
              className="flex-1 bg-white border border-slate-200 rounded-sm px-4 py-2.5 text-sm font-sans text-slate-900 outline-none focus:border-blue-500 shadow-xs"
            />
            <button 
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-sm transition-all text-xs font-semibold flex items-center justify-center shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center mt-2.5 text-slate-400 font-mono uppercase tracking-wider">
            {lang === "en" ? "Enterprise Technical Session — Confidential & Grounded" : "Phiên tư vấn kỹ thuật doanh nghiệp — Bảo mật & Đã đối soát tài liệu"}
          </p>
        </div>
      </div>
    </main>
  );
}
