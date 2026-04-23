"use client";

import { MessageCircle, X, BriefcaseBusiness, Mail, Phone, MapPin, Video, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FooterProps {
  lang: string;
  dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
  const [visitorCount, setVisitorCount] = useState(2103);
  const [onlineCount, setOnlineCount] = useState(1);
  const [mounted, setMounted] = useState(false);

  const d = dict.footer;

  useEffect(() => {
    setMounted(true);
    // Logic bộ đếm lượt truy cập (Visitor Counter)
    const storedCount = localStorage.getItem("fct_visitor_count");
    const initialBase = 2103;
    
    if (!storedCount) {
      const newCount = initialBase + 1;
      localStorage.setItem("fct_visitor_count", newCount.toString());
      setVisitorCount(newCount);
    } else {
      const newCount = parseInt(storedCount) + 1;
      localStorage.setItem("fct_visitor_count", newCount.toString());
      setVisitorCount(newCount);
    }

    // Giả lập số người đang trực tuyến (Online)
    setOnlineCount(Math.floor(Math.random() * (15 - 5 + 1)) + 5);
  }, []);

  return (
    <footer className="bg-[#020617] pt-4 md:pt-6 pb-4 border-t border-gray-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-10">
          {/* Cột 1: Brand */}
          <div className="space-y-8 md:col-span-4">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo FCT Vinh Thinh .,JSC" 
                width={56} 
                height={56} 
                className="brightness-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0"
              />
              <span className="font-bold text-2xl text-slate-200 tracking-tight whitespace-nowrap">FCT Vinh Thinh .,JSC</span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-sm">
              {d.brandDescription}
            </p>

          </div>

          {/* Cột 2: Tin tức và bài viết */}
          <div className="md:col-span-3">
            <h4 className="text-slate-200 font-bold mb-6 uppercase text-xs tracking-[0.2em]">{d.columns.news}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href={`/${lang}/news`} className="hover:text-blue-500 transition-colors">{d.newsArticles.softProtection}</Link></li>
              <li><Link href={`/${lang}/news`} className="hover:text-blue-500 transition-colors">{d.newsArticles.mobileSecurity}</Link></li>
              <li><Link href={`/${lang}/news`} className="hover:text-blue-500 transition-colors">{d.newsArticles.authSecurity}</Link></li>
              <li><Link href={`/${lang}/news`} className="hover:text-blue-500 transition-colors">{d.newsArticles.iiotSolutions}</Link></li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="md:col-span-2">
            <h4 className="text-slate-200 font-bold mb-6 uppercase text-xs tracking-[0.2em]">{d.columns.company}</h4>
            <ul className="space-y-6 font-light">
              <li><Link href={`/${lang}/projects`} className="hover:text-blue-500 transition-colors uppercase text-[12px] tracking-normal">{dict.navbar.projects}</Link></li>
              <li><Link href={`/${lang}/news`} className="hover:text-blue-500 transition-colors uppercase text-[12px] tracking-normal">{dict.navbar.news}</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div className="md:col-span-3">
            <h4 className="text-slate-200 font-bold mb-6 uppercase text-xs tracking-[0.2em]">{d.columns.contact}</h4>
            <ul className="space-y-5 text-sm font-light">
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-slate-200 font-medium">{d.contactLines.headquarters}</p>
                  <p className="text-sm">{d.hqAddress}</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-slate-200 font-medium">{d.contactLines.hotline}</p>
                  <p className="text-sm">0983 027 776</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-slate-200 font-medium">{d.contactLines.supportEmail}</p>
                  <p className="text-sm">andrew@fct.vn</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-200">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <p className="text-[11px] font-medium uppercase tracking-widest whitespace-nowrap">
              {d.copyright}
            </p>
            
            {/* Visitor Counter Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-900/50 border border-white/5 rounded-full px-4 py-2 backdrop-blur-sm shadow-inner group hover:border-blue-500/30 transition-all duration-500">
              <div className="relative flex items-center shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-40"></div>
              </div>
              <div className="flex items-center gap-3 divide-x divide-white/10 uppercase tracking-[0.1em] font-bold text-[10px] text-slate-300">
                <span className="flex items-center gap-1.5 group-hover:text-blue-400 transition-colors whitespace-nowrap">
                  <span className="text-slate-200">{mounted ? onlineCount : '--'}</span> {d.visitorCounter.online}
                </span>
                <span className="pl-3 flex items-center gap-1.5 group-hover:text-blue-400 transition-colors whitespace-nowrap">
                   {d.visitorCounter.total}: <span className="text-slate-200">{mounted ? visitorCount.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US') : '--'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 text-[11px] font-medium uppercase tracking-widest text-slate-400">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors whitespace-nowrap">{d.legal.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-white transition-colors whitespace-nowrap">{d.legal.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
