"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ContactModal from "./ContactModal";

const navLinks = [
  { href: "/about", label: "Về chúng tôi" },
  { href: "/news", label: "Tin tức và bài viết" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-8 left-0 right-0 z-40 px-6 flex justify-center">
        <div className="glass-panel bg-gray-950/20 backdrop-blur-3xl border border-white/10 rounded-full px-6 py-2.5 flex items-center justify-between w-full max-max-5xl max-w-5xl shadow-2xl shadow-blue-500/5 transition-all duration-500 hover:border-white/20">
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Logo hình ảnh */}
            <Image 
              src="/logo.png" 
              alt="Logo FCT" 
              width={52} 
              height={52} 
              className="object-contain relative z-10 transition-transform group-hover:scale-110 duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
            <span className="font-black text-lg tracking-tighter hidden sm:block text-white font-sans relative z-10 transition-colors group-hover:text-blue-400">
              FCT Vinh Thinh <span className="text-blue-400 group-hover:text-white">.,JSC</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 p-1 bg-white/5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-5 py-2 rounded-full text-[13px] font-black tracking-tight transition-all duration-300 ${
                  pathname === link.href 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40 hidden xs:block"
            >
              <span className="relative z-10">Nhận tư vấn</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer - DARK MODE */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-6 right-6 md:hidden bg-[#020617]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-black py-3 border-b border-white/5 flex justify-between items-center tracking-tight ${
                    pathname === link.href ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="mt-6 bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-sm tracking-widest uppercase shadow-xl shadow-blue-600/30"
              >
                Nhận tư vấn ngay
              </button>
            </nav>
          </div>
        )}
      </header>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
