"use client";

import { MessageSquare, Sparkles, BookOpen } from "lucide-react";
import { useAssistant } from "@/context/AssistantContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FloatingAssistantProps {
  dict: any;
}

export default function FloatingAssistant({ dict }: FloatingAssistantProps) {
  const { toggle, isOpen } = useAssistant();
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "vi";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isOpen && (
        <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-center gap-4">
          {/* Knowledge Hub Link Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href={`/${lang}/resources`}
              aria-label="Truy cập Trung tâm Kiến thức"
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#020617]/80 backdrop-blur-3xl border border-blue-500/30 text-white shadow-2xl hover:border-blue-400 group transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/40 transition-colors">
                <BookOpen className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-100 whitespace-nowrap">
                {dict.navbar.resources}
              </span>
            </Link>
          </motion.div>

          {/* Label positioned above the assistant button */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-2 rounded-2xl bg-[#020617]/60 backdrop-blur-3xl border border-blue-500/30 text-white shadow-2xl shadow-blue-500/10 pointer-events-none select-none relative"
          >
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-100 whitespace-nowrap">
                   {dict.virtualAssistant.navbarTitle}
                </span>
             </div>
             {/* Tail/Arrow pointing down */}
             <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#020617]/60 border-r border-b border-blue-500/30 rotate-45 backdrop-blur-3xl"></div>
          </motion.div>

          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            aria-label="Mở trợ lý tư vấn ảo"
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 text-white shadow-[0_0_30px_rgba(35,131,246,0.4)] flex items-center justify-center group overflow-hidden border border-blue-400/30 backdrop-blur-xl relative"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]"></div>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            
            <div className="relative z-10">
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
              <Sparkles className="absolute -top-3 -right-3 w-4 h-4 text-blue-200 animate-pulse" />
            </div>

            {/* Indicator Ping */}
            <div className="absolute top-0 right-0 p-3">
               <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-200"></span>
              </div>
            </div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
