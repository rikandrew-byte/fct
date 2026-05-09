"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Sparkles } from "lucide-react";
import ContactModal from "./ContactModal";
import MobileNav from "./MobileNav";
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
    { href: `/${lang}/blog`, label: dict.navbar.news || (isEn ? "Articles" : "Bài viết") },
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
      {/* Floating Language Switcher - Top Right (Desktop Only) */}
      <div className="fixed top-8 right-6 z-[60] hidden lg:flex items-center gap-3">
        <button 
          aria-label="Toggle language"
          onClick={toggleLanguage}
          className="group relative flex items-center gap-3 bg-white/40 backdrop-blur-3xl border border-gray-300 hover:border-blue-400 rounded-2xl px-6 py-4 transition-all duration-500 shadow-2xl pointer-events-auto overflow-hidden min-h-[48px]"
        >
          <div className="absolute inset-0 bg-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Globe className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-700" aria-hidden="true" />
          <span className="text-sm font-black text-gray-900 tracking-widest uppercase">
            {isEn ? "Tiếng Việt" : "English"}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse ml-1"></div>
        </button>
      </div>

      <header className="fixed top-8 left-0 right-0 z-40 px-6 hidden lg:flex justify-center pointer-events-none">
        <div className={`
          pointer-events-auto
          backdrop-blur-3xl border rounded-full px-6 py-2.5 
          flex items-center justify-between w-full max-w-5xl shadow-2xl transition-all duration-500 
          ${isScrolled 
            ? "bg-white/95 border-blue-300 shadow-blue-200/50 py-2 scale-[0.98]" 
            : "bg-white/60 border-gray-200 shadow-gray-200/20"
          }
          hover:border-gray-300
        `}>
          <Link href={`/${lang}`} className="flex items-center gap-3 group relative flex-shrink-0">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Image 
              src="/logo.png" 
              alt="FCT Vinh Thinh Logo - Enterprise Security Solutions" 
              width={isScrolled ? 50 : 64} 
              height={isScrolled ? 50 : 64} 
              priority={true}
              style={{ height: 'auto' }}
              className="object-contain relative z-10 transition-all group-hover:scale-110 duration-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            />
            <span className="font-black text-lg tracking-tighter hidden sm:block text-gray-900 font-sans relative z-10 transition-colors whitespace-nowrap">
              FCT Vinh Thinh <span className={`${isScrolled ? "text-blue-600" : "text-blue-600"} transition-colors`}>.,JSC</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-x-3 p-1 bg-gray-100/50 rounded-full border border-gray-300 flex-nowrap flex-shrink">
            {navLinks.map((link) => {
              const isProducts = link.href.includes("/products");
              return (
                <div key={link.href} className="relative group flex-shrink-0">
                  <Link 
                    href={link.href} 
                    className={`px-4 py-2 rounded-full text-[14px] font-medium tracking-tight transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
                      pathname === link.href 
                        ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-200/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isProducts && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white/95 backdrop-blur-2xl border border-gray-300 rounded-2xl p-2 w-56 shadow-2xl flex flex-col gap-1">
                        <Link href={`/${lang}/products/thales-sentinel`} className="px-4 py-2 hover:bg-gray-100 rounded-xl text-gray-700 hover:text-blue-600 text-sm font-semibold transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Thales Sentinel
                        </Link>
                        <Link href={`/${lang}/products/guardsquare`} className="px-4 py-2 hover:bg-gray-100 rounded-xl text-gray-700 hover:text-sky-600 text-sm font-semibold transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>Guardsquare
                        </Link>
                        <Link href={`/${lang}/products/canary-labs`} className="px-4 py-2 hover:bg-gray-100 rounded-xl text-gray-700 hover:text-amber-600 text-sm font-semibold transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Canary Labs
                        </Link>
                        <Link href={`/${lang}/products/longmai`} className="px-4 py-2 hover:bg-gray-100 rounded-xl text-gray-700 hover:text-rose-600 text-sm font-semibold transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Longmai
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

            <div className="flex items-center gap-2 pr-2 border-r border-white/10">
              <div className="relative group/search">
                 <button aria-label="Search" className="p-3 text-gray-600 hover:text-gray-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                 </button>
                 <input 
                   type="text" 
                   aria-label={isEn ? "Search" : "Tìm kiếm"}
                   placeholder={isEn ? "Search..." : "Tìm kiếm..."}
                   className="absolute right-0 top-1/2 -translate-y-1/2 w-0 group-hover/search:w-28 lg:group-focus-within/search:w-28 transition-all duration-500 bg-white border border-gray-300 rounded-full px-0 group-hover/search:px-4 py-1.5 text-xs text-gray-700 outline-none opacity-0 group-hover/search:opacity-100"
                 />
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4.5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-500 hidden xs:block"
            >
              <span className="relative z-10">{dict.common.getAdvice}</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_infinite]"></div>
              {/* Subtle Breathing Glow */}
              <div className="absolute inset-0 bg-blue-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            </button>
            
          </div>
      </header>

      <MobileNav lang={lang} dict={dict} onOpenConsult={() => setIsModalOpen(true)} />

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </>
  );
}
