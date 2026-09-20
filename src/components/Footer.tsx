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
    
    // Kh繫i ph廙卉 con s廙?g廕吵 nh廕另 t廙?l廕吵 t廕ξ tr廙 (gi繳p UI kh繫ng b廙?gi廕負 t廙?2103)
    const cachedTotal = localStorage.getItem('fct_last_total');
    if (cachedTotal) {
      setVisitorCount(parseInt(cachedTotal, 10));
    }

    // G廙 API ?廙?ghi nh廕要 1 l廙ㄅ xem trang th廕負 v?o Database
    const recordVisit = async () => {
      try {
        const res = await fetch('/api/visits', { method: 'POST' });
        const data = await res.json();
        if (data.total) {
          const realTotal = 2100 + data.total;
          setVisitorCount(realTotal); 
          // Lu l廕【 ?廙?l廕吵 sau load trang kh繫ng b廙?gi廕負 s廙?
          localStorage.setItem('fct_last_total', realTotal.toString());
        }
      } catch (error) {
        console.error("L廙 ?廕禦 l廙ㄅ truy c廕計", error);
      }
    };

    recordVisit();

    // Gi廕?l廕計 s廙?ng廙 ?ang tr廙帷 tuy廕積 (Online)
    setOnlineCount(Math.floor(Math.random() * (15 - 5 + 1)) + 5);
  }, []);

  return (
    <footer className="bg-gray-900 pt-4 md:pt-6 pb-4 border-t border-gray-800 text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-10">
          {/* C廙 1: Brand */}
          <div className="space-y-8 md:col-span-4">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="FCT Vinh Thinh Logo - Enterprise Security Solutions" 
                width={56} 
                height={56} 
                className="brightness-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0"
              />
              <span className="font-bold text-xl sm:text-2xl text-gray-100 tracking-tight leading-tight">FCT Vinh Thinh .,JSC</span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-sm">
              {d.brandDescription}
            </p>

          </div>

          {/* C廙 2: Tin t廙妾 v? b?i vi廕篙 */}
          <div className="md:col-span-3">
            <h4 className="text-gray-100 font-bold mb-6 uppercase text-xs tracking-[0.2em]">{d.columns.news}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href={`/${lang}/blog`} className="hover:text-cyan-400 transition-colors">{d.newsArticles.softProtection}</Link></li>
              <li><Link href={`/${lang}/blog`} className="hover:text-cyan-400 transition-colors">{d.newsArticles.mobileSecurity}</Link></li>
              <li><Link href={`/${lang}/blog`} className="hover:text-cyan-400 transition-colors">{d.newsArticles.authSecurity}</Link></li>
              <li><Link href={`/${lang}/blog`} className="hover:text-cyan-400 transition-colors">{d.newsArticles.iiotSolutions}</Link></li>
            </ul>
          </div>

          {/* C廙 3: Li礙n k廕篙 nhanh */}
          <div className="md:col-span-2">
            <h4 className="text-gray-100 font-bold mb-6 uppercase text-xs tracking-[0.2em]">{d.columns.company}</h4>
            <ul className="space-y-6 font-light">
              <li><Link href={`/${lang}/projects`} className="hover:text-cyan-400 transition-colors uppercase text-[12px] tracking-normal">{dict.navbar.projects}</Link></li>
              <li><Link href={`/${lang}/blog`} className="hover:text-cyan-400 transition-colors uppercase text-[12px] tracking-normal">{dict.navbar.news}</Link></li>
            </ul>
          </div>

          {/* C廙 4: Li礙n h廙?*/}
          <div className="md:col-span-3">
            <h4 className="text-gray-100 font-bold mb-6 uppercase text-xs tracking-[0.2em]">{d.columns.contact}</h4>
            <ul className="space-y-5 text-sm font-light">
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-100 font-medium">{d.contactLines.headquarters}</p>
                  <p className="text-sm">{d.hqAddress}</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-100 font-medium">{d.contactLines.hotline}</p>
                  <p className="text-sm">0983 027 776</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-100 font-medium">{d.contactLines.supportEmail}</p>
                  <p className="text-sm">andrew@fct.vn</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <p className="text-[11px] font-medium uppercase tracking-widest text-center md:text-left">
              {d.copyright}
            </p>
            
            {/* Visitor Counter Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 backdrop-blur-sm shadow-inner group hover:border-cyan-400/50 transition-all duration-500">
              <div className="relative flex items-center shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-40"></div>
              </div>
              <div className="flex items-center gap-3 divide-x divide-gray-700 uppercase tracking-[0.1em] font-bold text-[10px] text-gray-300">
                <span className="flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                  <span className="text-gray-100">{mounted ? onlineCount : '--'}</span> {d.visitorCounter.online}
                </span>
                <span className="pl-3 flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                   {d.visitorCounter.total}: <span className="text-gray-100">{mounted ? visitorCount.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US') : '--'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 text-[11px] font-medium uppercase tracking-widest text-gray-400">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors whitespace-nowrap">{d.legal.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-white transition-colors whitespace-nowrap">{d.legal.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
