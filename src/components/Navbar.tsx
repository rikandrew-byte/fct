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
        <div className="glass-panel bg-white/70 backdrop-blur-2xl border border-white/40 rounded-full px-6 py-2.5 flex items-center justify-between w-full max-max-5xl max-w-5xl shadow-2xl shadow-blue-500/10 transition-all duration-500">
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Logo hình ảnh */}
            <Image 
              src="/logo.png" 
              alt="Logo FCT" 
              width={52} 
              height={52} 
              className="object-contain relative z-10 transition-transform group-hover:scale-110 duration-500"
            />
            <span className="font-black text-lg tracking-tighter hidden sm:block text-gray-950 font-sans relative z-10 transition-colors group-hover:text-blue-600">
              FCT Vinh Thinh <span className="text-blue-600 group-hover:text-gray-950">.,JSC</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 p-1 bg-gray-100/30 rounded-full border border-gray-100/50">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-5 py-2 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300 ${
                  pathname === link.href 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-blue-600 hover:bg-white/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hidden xs:block"
            >
              <span className="relative z-10">Nhận tư vấn</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-6 right-6 md:hidden bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-semibold py-2 border-b border-gray-50 flex justify-between items-center ${
                    pathname === link.href ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="mt-4 bg-blue-600 text-white py-4 rounded-2xl font-bold"
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
