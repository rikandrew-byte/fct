"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import Image from "next/image";

interface MobileNavProps {
  lang: string;
  dict: any;
  onOpenConsult: () => void;
}

export default function MobileNav({ lang, dict, onOpenConsult }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isEn = lang === "en";

  const toggleLanguage = () => {
    const newLang = isEn ? "vi" : "en";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}/about`, label: dict.navbar.about || (isEn ? "About Us" : "Về chúng tôi") },
    { href: `/${lang}/projects`, label: dict.navbar.projects || (isEn ? "Projects" : "Dự án tiêu biểu") },
    { href: `/${lang}/products`, label: dict.navbar.products || (isEn ? "Products" : "Sản phẩm") },
    { href: `/${lang}/resources`, label: isEn ? "Resources" : "Tài liệu" },
    { href: `/${lang}/blog`, label: dict.navbar.news || (isEn ? "Articles" : "Bài viết") },
    { href: `/${lang}/contact`, label: dict.navbar.contact || (isEn ? "Contact" : "Liên hệ") },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Header Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg" : "bg-white/30 backdrop-blur-md"
        }`}
      >
        <Link href={`/${lang}`} className="flex items-center gap-2.5 z-50">
          <Image src="/logo.png" alt="FCT Vinh Thinh Logo" width={36} height={36} className="object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.2)]" />
          <span className="font-black text-gray-900 text-[13px] tracking-tighter drop-shadow-md">FCT Vinh Thinh</span>
        </Link>
        
        <div className="flex items-center gap-2 z-50">
          <button 
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-300 text-gray-700 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{isEn ? "EN" : "VI"}</span>
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-300 shadow-sm"
          >
            {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-2xl flex flex-col justify-start pt-28 px-8 animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => {
              const isProducts = link.href.includes("/products");
              const isActive = pathname === link.href;

              return (
                <div key={link.href} className="flex flex-col border-b border-gray-200/50 pb-4">
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-light tracking-wide ${
                      isActive ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isProducts && (
                    <div className="flex flex-col gap-4 mt-6 pl-4 border-l border-gray-200/50">
                      <Link href={`/${lang}/products/thales-sentinel`} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 text-lg">Thales Sentinel</Link>
                      <Link href={`/${lang}/products/guardsquare`} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 text-lg">Guardsquare</Link>
                      <Link href={`/${lang}/products/canary-labs`} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 text-lg">Canary Labs</Link>
                      <Link href={`/${lang}/products/longmai`} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900 text-lg">Longmai</Link>
                    </div>
                  )}
                </div>
              );
            })}
            <button 
              onClick={() => { setIsOpen(false); onOpenConsult(); }}
              className="mt-6 text-center px-6 py-4 bg-blue-600 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-transform w-max mx-auto"
            >
              {dict.common.getAdviceNow}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
