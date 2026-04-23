"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}/about`, label: dict.navbar.about },
    { href: `/${lang}/projects`, label: dict.navbar.projects },
    { href: `/${lang}/products`, label: dict.navbar.products },
    { href: `/${lang}/knowledge`, label: dict.navbar.knowledge },
    { href: `/${lang}/contact`, label: dict.navbar.contact },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Header Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50" : "bg-transparent"
        }`}
      >
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo FCT" width={40} height={40} className="object-contain" />
          <span className="font-black text-white text-sm tracking-tighter">FCT Vinh Thinh</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-300 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Fullscreen Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617]/90 backdrop-blur-2xl flex flex-col justify-center px-8 animate-in fade-in duration-300">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => {
              const isProducts = link.href.includes("/products");
              const isActive = pathname === link.href;

              return (
                <div key={link.href} className="flex flex-col border-b border-slate-800/50 pb-4">
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-light tracking-wide ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isProducts && (
                    <div className="flex flex-col gap-4 mt-6 pl-4 border-l border-slate-800/50">
                      <Link href={`/${lang}/products/thales-sentinel`} onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-200 text-lg">Thales Sentinel</Link>
                      <Link href={`/${lang}/products/guardsquare`} onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-200 text-lg">Guardsquare</Link>
                      <Link href={`/${lang}/products/canary-labs`} onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-200 text-lg">Canary Labs</Link>
                      <Link href={`/${lang}/products/longmai`} onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-200 text-lg">Longmai</Link>
                    </div>
                  )}
                </div>
              );
            })}
            <button 
              onClick={() => { setIsOpen(false); onOpenConsult(); }}
              className="mt-8 text-center px-8 py-5 bg-blue-600 rounded-2xl text-white font-black text-sm uppercase tracking-widest"
            >
              {dict.common.getAdviceNow}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
