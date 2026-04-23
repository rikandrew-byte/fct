"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe, Sparkles } from "lucide-react";
import ContactModal from "./ContactModal";
import { useAssistant } from "@/context/AssistantContext";

interface NavbarProps {
  lang: string;
  dict: any;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { open: openAssistant } = useAssistant();

  const isEn = lang === "en";

  const navLinks = [
    { href: `/${lang}/about`, label: dict.navbar.about },
    { href: `/${lang}/projects`, label: dict.navbar.projects },
    { href: `/${lang}/products`, label: dict.navbar.products },
    { href: `/${lang}/knowledge`, label: dict.navbar.knowledge },
    { href: `/${lang}/contact`, label: dict.navbar.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = isEn ? "vi" : "en";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <>
      {/* Floating Language Switcher - Top Right */}
      <div className="fixed top-8 right-6 z-[60] flex items-center gap-3">
        <button 
          onClick={toggleLanguage}
          className="group relative flex items-center gap-3 bg-[#020617]/40 backdrop-blur-3xl border border-white/10 hover:border-blue-500/50 rounded-2xl px-5 py-3 transition-all duration-500 shadow-2xl pointer-events-auto overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Globe className="w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
          <span className="text-sm font-black text-white tracking-widest uppercase">
            {isEn ? "Tiếng Việt" : "English"}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse ml-1"></div>
        </button>
      </div>

      <header className="fixed top-8 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none">
        <div className={`
          pointer-events-auto
          backdrop-blur-3xl border rounded-full px-6 py-2.5 
          flex items-center justify-between w-full max-w-4xl shadow-2xl transition-all duration-500 
          ${isScrolled 
            ? "bg-[#020617]/95 border-blue-500/40 shadow-blue-500/20 py-2 scale-[0.98]" 
            : "bg-[#020617]/60 border-white/10 shadow-black/20"
          }
          hover:border-white/20
        `}>
          <Link href={`/${lang}`} className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Image 
              src="/logo.png" 
              alt="Logo FCT" 
              width={isScrolled ? 50 : 64} 
              height={isScrolled ? 50 : 64} 
              style={{ height: 'auto' }}
              className="object-contain relative z-10 transition-all group-hover:scale-110 duration-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            />
            <span className="font-black text-lg tracking-tighter hidden sm:block text-white font-sans relative z-10 transition-colors">
              FCT Vinh Thinh <span className={`${isScrolled ? "text-blue-400" : "text-blue-400"} transition-colors`}>.,JSC</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-white/5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-5 py-2.5 rounded-full text-sm font-black tracking-tight transition-all duration-300 ${
                  pathname === link.href 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "text-gray-300 hover:text-blue-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4.5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-500 hidden xs:block"
            >
              <span className="relative z-10">{dict.common.getAdvice}</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_infinite]"></div>
              {/* Subtle Breathing Glow */}
              <div className="absolute inset-0 bg-blue-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-blue-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-6 right-6 lg:hidden bg-[#020617]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
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
              
              <Link 
                href={`/${lang}/knowledge`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-black py-3 border-b border-white/5 text-blue-400"
              >
                {dict.navbar.knowledge}
              </Link>

              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="mt-6 bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-sm tracking-widest uppercase shadow-xl shadow-blue-600/30"
              >
                {dict.common.getAdviceNow}
              </button>
            </nav>
          </div>
        )}
      </header>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </>
  );
}
