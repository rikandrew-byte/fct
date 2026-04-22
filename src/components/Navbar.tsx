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
    { href: `/${lang}/knowledge`, label: dict.navbar.knowledge },
    { href: `/${lang}/news`, label: dict.navbar.news },
    { href: `/${lang}/projects`, label: dict.navbar.projects },
    { href: `/${lang}/products`, label: dict.navbar.products },
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
      <header className="fixed top-8 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none">
        <div className={`
          pointer-events-auto
          backdrop-blur-3xl border rounded-full px-6 py-2.5 
          flex items-center justify-between w-full max-w-5xl shadow-2xl transition-all duration-500 
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
              width={isScrolled ? 42 : 52} 
              height={isScrolled ? 42 : 52} 
              style={{ height: 'auto' }}
              className="object-contain relative z-10 transition-all group-hover:scale-110 duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
            <span className="font-black text-lg tracking-tighter hidden sm:block text-white font-sans relative z-10 transition-colors">
              FCT Vinh Thinh <span className={`${isScrolled ? "text-blue-400" : "text-blue-400"} transition-colors`}>.,JSC</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-0.5 p-1 bg-white/5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-3.5 py-2 rounded-full text-[12px] font-black tracking-tight transition-all duration-300 ${
                  pathname === link.href 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{isEn ? "VN" : "EN"}</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group bg-blue-600 text-white px-4.5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40 hidden xs:block"
            >
              <span className="relative z-10">{dict.common.getAdvice}</span>
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

        {/* Mobile Navigation Drawer */}
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
                onClick={toggleLanguage}
                className="flex items-center justify-between py-4 text-xl font-black text-gray-300 border-b border-white/5"
              >
                <span>{isEn ? "Chuyển sang Tiếng Việt" : "Switch to English"}</span>
                <Globe className="w-6 h-6 text-blue-400" />
              </button>

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
