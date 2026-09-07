"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldAlert, 
  Smartphone, 
  Layers, 
  FileCode2, 
  TerminalSquare, 
  EyeOff, 
  Lock, 
  ActivitySquare,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TechGridBackground from "@/components/TechGridBackground";
import { useState, useRef } from "react";
import IntegritySeal from "@/components/IntegritySeal";
import ContactModal from "@/components/ContactModal";
import GuardsquareArchitecture from "@/components/GuardsquareArchitecture";
import AppShieldingFlow from "@/components/AppShieldingFlow";

interface GuardsquareClientProps {
  lang: string;
  dict: any;
}

export default function GuardsquareClient({ lang, dict }: GuardsquareClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isEn = lang === "en";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-sky-600">
      
      {/* ── 1. HERO SECTION (Slate-900 Blueprint) ───────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 bg-slate-900 border-b border-slate-800">
        <TechGridBackground />

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center space-y-6 max-w-5xl mx-auto"
        >
          <IntegritySeal />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
              GUARDSQUARE <br />
              <span className="text-sky-400">
                PROTECTION NEXUS
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
               {isEn 
                 ? "Advanced multi-layered protection for iOS and Android. Defend against reverse engineering, tampering, and intellectual property theft."
                 : "Bảo vệ đa tầng cấp độ cao cho iOS và Android. Chống lại các công cụ dịch ngược (Reverse Engineering), giả mạo và đánh cắp dữ liệu."
               }
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-sky-700 hover:bg-sky-800 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors shadow-sm"
            >
              {isEn ? "Get Technical Advice" : "Nhận Tư vấn Kỹ thuật"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── 1.5. GUARDSQUARE ARCHITECTURE ────────────────── */}
      <section className="bg-white relative pt-12 pb-12 border-t border-slate-200 z-20">
        <GuardsquareArchitecture isEn={isEn} />
      </section>

      {/* ── 2. BLUEPRINT (White) ────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative bg-white z-20">
         <div className="text-center mb-20 space-y-4">
            <span className="text-sky-600 font-black text-xs uppercase tracking-[0.4em]">Multi-Layer Protection</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-gray-900">
               {isEn ? "Defense Architecture" : "Kiến trúc Phòng thủ"}
            </h2>
         </div>

         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-slate-900 rounded-lg p-8 md:p-14 relative overflow-hidden border border-slate-800 shadow-sm"
         >
            {/* SVG Interactive Diagram */}
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-auto drop-shadow-[0_0_50px_rgba(56,189,248,0.1)]"
              fill="none" 
            >
              <defs>
                 <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                 </linearGradient>
                 <filter id="glow">
                   <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
              </defs>

              <g transform="translate(500, 250)">
                 {/* Center - Source Code */}
                 <motion.circle 
                    cx="0" cy="0" r="40" 
                    fill="#020617" stroke="#1e293b" strokeWidth="2" 
                    onMouseEnter={() => setActiveStep(0)}
                    className="cursor-pointer"
                 />
                 <FileCode2 className="text-slate-400" x="-15" y="-15" width="30" height="30" />
                 
                 {/* Layer 1: Obfuscation */}
                 <motion.g 
                   onMouseEnter={() => setActiveStep(1)} 
                   className="cursor-pointer"
                 >
                    <motion.circle 
                      initial={{ strokeDasharray: "4 4", rotate: 0 }}
                      animate={{ rotate: activeStep === 1 ? 360 : 0 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      cx="0" cy="0" r="100" 
                      fill="none" 
                      stroke={activeStep === 1 ? "url(#glowPulse)" : "#1e293b"} 
                      strokeWidth={activeStep === 1 ? "3" : "1"}
                      opacity={activeStep === 1 ? 1 : 0.3}
                      filter={activeStep === 1 ? "url(#glow)" : ""}
                    />
                    <text x="0" y="-115" fill="currentColor" fontSize="12" fontWeight="700" textAnchor="middle" className="text-sky-400 uppercase tracking-widest">
                      {isEn ? "L1: Obfuscation" : "L1: Làm Rối Mã"}
                    </text>
                 </motion.g>

                 {/* Layer 2: Encryption */}
                 <motion.g 
                   onMouseEnter={() => setActiveStep(2)} 
                   className="cursor-pointer"
                 >
                    <motion.circle 
                      cx="0" cy="0" r="160" 
                      fill="none" 
                      stroke={activeStep === 2 ? "#14b8a6" : "#1e293b"} 
                      strokeWidth={activeStep === 2 ? "3" : "1"}
                      opacity={activeStep === 2 ? 0.8 : 0.3}
                      filter={activeStep === 2 ? "url(#glow)" : ""}
                    />
                    <text x="0" y="-175" fill="currentColor" fontSize="12" fontWeight="700" textAnchor="middle" className="text-teal-400 uppercase tracking-widest">
                       {isEn ? "L2: Data Encryption" : "L2: Mã Hóa Dữ Liệu"}
                    </text>
                 </motion.g>

                 {/* Layer 3: RASP */}
                 <motion.g 
                   onMouseEnter={() => setActiveStep(3)} 
                   className="cursor-pointer"
                 >
                    <motion.circle 
                      initial={{ scale: 1 }}
                      animate={{ scale: activeStep === 3 ? [1, 1.02, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      cx="0" cy="0" r="220" 
                      fill="none" 
                      stroke={activeStep === 3 ? "#0369a1" : "#0f172a"} 
                      strokeWidth={activeStep === 3 ? "3" : "1"}
                      opacity={activeStep === 3 ? 1 : 0.3}
                      strokeDasharray="10 20"
                      filter={activeStep === 3 ? "url(#glow)" : ""}
                    />
                    <text x="0" y="-235" fill="currentColor" fontSize="12" fontWeight="700" textAnchor="middle" className="text-cyan-400 uppercase tracking-widest">
                       {isEn ? "L3: RASP active protection" : "L3: Tự Bảo Vệ RASP"}
                    </text>
                 </motion.g>
              </g>
            </svg>

            <div className="mt-12 min-h-[120px] flex items-center justify-center text-center">
               <motion.div 
                 key={activeStep}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="max-w-xl"
               >
                  {activeStep === 0 ? (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold flex items-center justify-center gap-2"><FileCode2 className="w-5 h-5 text-slate-400"/> {isEn ? "Raw Mobile App" : "App Gốc (Chưa bảo vệ)"}</h4>
                       <p className="text-slate-400 text-sm">
                          {isEn ? "Original APK/IPA files containing easily readable logic, APIs, and keys." : "Các tệp APK/IPA nguyên bản chứa logic dễ dàng đọc hiểu bới hacker."}
                       </p>
                    </div>
                  ) : activeStep === 1 ? (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold flex items-center justify-center gap-2"><EyeOff className="w-5 h-5 text-sky-400"/> {isEn ? "Name & Control Flow Obfuscation" : "Làm rối Cấu trúc & Tên"}</h4>
                       <p className="text-sky-200 text-sm font-light">
                          {isEn ? "Modifies class/method names and alters the control flow structure, confusing reverse-engineering tools like Jadx or Hopper." : "Đổi tên các class/hàm và xáo trộn luồng mã nguồn, đánh lừa các công cụ dịch ngược tiêu chuẩn."}
                       </p>
                    </div>
                  ) : activeStep === 2 ? (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold flex items-center justify-center gap-2"><Lock className="w-5 h-5 text-teal-400"/> {isEn ? "String & Asset Encryption" : "Mã hóa Chuỗi & Tài sản"}</h4>
                       <p className="text-teal-200 text-sm font-light">
                          {isEn ? "Applies strong cryptographic algorithms to sensitive data, API endpoints, and static assets inside the application." : "Trực tiếp dùng thuật toán mạnh mẽ mã hóa các chuỗi string, API Endpoints, ngăn chặn rò rỉ cơ sở dữ liệu."}
                       </p>
                    </div>
                  ) : activeStep === 3 ? (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold flex items-center justify-center gap-2"><ActivitySquare className="w-5 h-5 text-cyan-400"/> {isEn ? "RASP (Runtime Application Self-Protection)" : "Công nghệ RASP (Tự Bảo Vệ)"}</h4>
                       <p className="text-cyan-200 text-sm font-light">
                          {isEn ? "Actively monitors the app during runtime. Blocks rooting/jailbreak, hooking (Frida), and screen recording directly on the device." : "Theo dõi ứng dụng trực tiếp khi chạy. Khóa vĩnh viễn quyền truy cập nếu phát hiện máy Root/Jailbreak, Hooking (Frida) hoặc phần mềm quay màn hình."}
                       </p>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">
                       {isEn ? "Hover over the layers to view detailed protection mechanisms." : "Di chuột qua các vòng bảo vệ để xem cơ chế vận hành của DexGuard/iXGuard."}
                    </p>
                  )}
               </motion.div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link 
                href={`/${lang}/contact?solution=guardsquare`}
                className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide transition-colors flex items-center gap-2"
              >
                {isEn ? "Experience DexGuard Demo" : "Yêu cầu Demo DexGuard"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
         </motion.div>
      </section>

      {/* ── 2.5. APP SHIELDING FLOW SECTION ────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white border-t border-slate-200">
         <div className="text-center mb-14 space-y-3">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-[0.3em]">Application Hardening</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
              {isEn ? "App Shielding Pipeline" : "Quy trình Bảo vệ Ứng dụng"}
            </h2>
         </div>
         <AppShieldingFlow isEn={isEn} />
      </section>

      {/* ── 3. ZONE 1: PAIN (Slate-50) ───────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-4">
               <div className="w-10 h-10 bg-sky-50 rounded-sm flex items-center justify-center text-sky-700 border border-sky-200">
                  <ShieldAlert className="w-5 h-5" />
               </div>
               <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
                  {isEn ? "The Reality of App Tampering" : "Hiểm Họa Từ Việc Hack Ứng Dụng"}
               </h2>
               <p className="text-slate-600 text-base leading-relaxed">
                  {isEn 
                    ? "Financial institutions and mobile-first businesses face critical risks from cloned apps, transaction interception, and bot automation."
                    : "Các tổ chức tài chính đang đối mặt nguy cơ nghiêm trọng từ ứng dụng nhái (Clone Apps), đánh chặn giao dịch và lạm dụng API bằng Bot."
                  }
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white rounded-lg p-7 space-y-2 border border-slate-200">
                  <span className="text-3xl font-black text-slate-900">Top 3</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{isEn ? "Cyber Threats" : "Mối đe dọa hàng đầu"}</p>
               </div>
               <div className="bg-white rounded-lg p-7 space-y-2 lg:translate-y-6 border border-slate-200">
                  <span className="text-3xl font-black text-slate-900">100%</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{isEn ? "OWASP Coverage" : "Chống lại chuẩn OWASP"}</p>
               </div>
            </div>
         </div>
      </section>

      {/* ── 4. CTA FOOTER (White) ───────────────────────── */}
      <section className="py-20 px-6 flex flex-col items-center justify-center text-center bg-white border-t border-slate-200">
         <div className="max-w-4xl w-full bg-slate-900 rounded-lg p-10 md:p-14 space-y-6 relative overflow-hidden border border-slate-800 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
               {isEn ? "Ready to Protect Your Mobile Apps?" : "Sẵn sàng bảo vệ Ứng dụng Di động?"}
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
               {isEn
                 ? "Our certified security engineers are ready to provide technical consultation and support integration for iOS and Android."
                 : "Đội ngũ kỹ sư bảo mật của FCT sẵn sàng tư vấn kỹ thuật và hỗ trợ tích hợp giải pháp cho iOS và Android."
               }
            </p>
            <div className="flex justify-center gap-4 pt-2">
               <Link 
                 href={`/${lang}/contact?solution=guardsquare`}
                 className="px-8 py-3.5 bg-sky-700 hover:bg-sky-800 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors inline-flex items-center gap-2"
               >
                 {isEn ? "Request DexGuard Demo" : "Yêu cầu Demo DexGuard"}
                 <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </div>

         {/* Schema.org for SEO */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Guardsquare DexGuard & iXGuard",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Android, iOS",
                "description": "Advanced mobile app security protecting against reverse engineering and hacking.",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "FCT Vinh Thinh .,JSC"
                  }
                }
              })
            }}
          />
          {/* FAQ Schema for Enterprise B2B */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Guardsquare là gì và tại sao ứng dụng ngân hàng cần nó?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Guardsquare cung cấp giải pháp DexGuard (Android) và iXGuard (iOS) để làm rối mã nguồn và chống dịch ngược. Các ứng dụng ngân hàng, tài chính cần nó để ngăn chặn tin tặc trích xuất API Key, can thiệp luồng thanh toán và lừa đảo người dùng."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Công nghệ RASP của Guardsquare hoạt động thế nào?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "RASP (Runtime Application Self-Protection) là công nghệ tự bảo vệ trực tiếp khi ứng dụng đang chạy. Nó phát hiện và tự động chặn đứng các hành vi thiết bị đã root/jailbreak, sử dụng phần mềm giả lập, hoặc các công cụ Hooking (như Frida)."
                    }
                  }
                ]
              })
            }}
          />
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </main>
  );
}
