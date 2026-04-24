"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ZaloButton() {
  const zaloNumber = "0983027776";
  const zaloLink = `https://zalo.me/${zaloNumber}`;

  return (
    <div className="fixed bottom-8 left-8 z-[55] flex flex-col gap-4">
      <motion.a
        href={zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative flex items-center gap-3 bg-white p-2 rounded-full shadow-2xl border border-blue-100/50 backdrop-blur-xl"
      >
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20 group-hover:opacity-40"></div>
        
        {/* Icon Container */}
        <div className="relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-7 h-7 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.5.5 0 00.613.613l4.782-1.388A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.574 0-3.053-.456-4.302-1.242a.5.5 0 00-.455-.04l-3.32.964.964-3.32a.5.5 0 00-.04-.455A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M16.5 12a.5.5 0 01-.5.5h-7a.5.5 0 010-1h7a.5.5 0 01.5.5zM14.5 15a.5.5 0 01-.5.5h-5a.5.5 0 010-1h5a.5.5 0 01.5.5zM14.5 9a.5.5 0 01-.5.5h-5a.5.5 0 010-1h5a.5.5 0 01.5.5z"/>
          </svg>
        </div>

        {/* Text Label (Hidden on Mobile) */}
        <span className="hidden md:block pr-4 text-sm font-black text-blue-600 uppercase tracking-widest">
          Zalo Chat
        </span>
      </motion.a>
    </div>
  );
}
