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
      <header className="fixed top-6 left-0 right-0 z-40 px-6 flex justify-center">
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-lg shadow-gray-200/20">
          <Link href="/" className="flex items-center gap-3">
            {/* Logo hình ảnh */}
            <Image 
              src="/logo.png" 
              alt="Logo FCT" 
              width={56} 
              height={56} 
              className="object-contain"
            />
            <span className="font-bold text-lg tracking-tight hidden sm:block text-gray-900 font-sans">FCT Vinh Thinh .,JSC</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-colors duration-200 ${
                  pathname === link.href 
                    ? "text-blue-600 font-bold" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform hover:bg-blue-700 shadow-md shadow-blue-500/20 hidden xs:block"
            >
              Nhận tư vấn
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
