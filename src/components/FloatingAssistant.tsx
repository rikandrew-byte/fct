"use client";

import { MessageSquare, Sparkles, BookOpen, Phone, X, MessageCircle } from "lucide-react";
import { useAssistant } from "@/context/AssistantContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FloatingAssistantProps {
  dict: any;
}

export default function FloatingAssistant({ dict }: FloatingAssistantProps) {
  const { toggle, isOpen: isAIOpen } = useAssistant();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "vi";

  const zaloNumber = "0983027776";
  const zaloLink = `https://zalo.me/${zaloNumber}`;
  const phoneLink = `tel:${zaloNumber}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close hub menu if AI assistant opens
  useEffect(() => {
    if (isAIOpen) setIsMenuOpen(false);
  }, [isAIOpen]);

  const menuItems = [
    {
      id: "ai",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      label: dict.virtualAssistant?.navbarTitle || "AI Expert",
      color: "bg-blue-600",
      onClick: toggle
    },
    {
      id: "zalo",
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      label: "Zalo Chat",
      color: "bg-[#0068ff]",
      href: zaloLink
    },
    {
      id: "phone",
      icon: <Phone className="w-5 h-5 text-white" />,
      label: lang === "vi" ? "Gọi ngay" : "Call Now",
      color: "bg-emerald-500",
      href: phoneLink
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && !isAIOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
          
          {/* Expanded Menu Items */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="flex flex-col items-end gap-3 mb-2"
              >
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="px-3 py-1.5 rounded-lg bg-[#020617]/80 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shadow-xl border border-white/10 hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </a>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shadow-xl border border-white/10 hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <div className="relative group">
            {/* Knowledge Hub Label (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 items-center gap-3 px-4 py-2.5 rounded-xl bg-[#020617]/80 backdrop-blur-xl border border-blue-500/30 text-white shadow-2xl hover:border-blue-400 group transition-all duration-300 whitespace-nowrap"
            >
              <Link href={`/${lang}/resources`} className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">
                  {dict.navbar.resources}
                </span>
              </Link>
            </motion.div>

            {/* Hub Button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-[0_0_30px_rgba(35,131,246,0.4)] flex items-center justify-center border border-blue-400/30 backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700"></div>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="relative z-10"
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="relative z-10"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Active Pulse */}
              {!isMenuOpen && (
                <div className="absolute top-0 right-0 p-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-200"></span>
                  </span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
