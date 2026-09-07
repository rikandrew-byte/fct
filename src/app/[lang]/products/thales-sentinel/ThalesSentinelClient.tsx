"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  Settings, 
  Package, 
  RefreshCcw, 
  AlertTriangle, 
  Cpu, 
  Cloud, 
  Code2,
  MousePointer2,
  Lock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import TechGridBackground from "@/components/TechGridBackground";
import { useState, useRef } from "react";
import IntegritySeal from "@/components/IntegritySeal";
import ContactModal from "@/components/ContactModal";
import ProductArchitecture from "@/components/ProductArchitecture";
import HsmArchitecture from "@/components/HsmArchitecture";

interface ThalesSentinelClientProps {
  lang: string;
  dict: any;
}

export default function ThalesSentinelClient({ lang, dict }: ThalesSentinelClientProps) {
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

  const steps = [
    {
      id: 1,
      title: isEn ? "Security Consulting" : "Tư vấn Giải pháp",
      desc: isEn ? "Analyzing architecture to select the optimal licensing model." : "Phân tích kiến trúc phần mềm để lựa chọn mô hình bản quyền tối ưu.",
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 2,
      title: isEn ? "SDK Integration" : "Tích hợp SDK",
      desc: isEn ? "Using AES encryption & Envelope to wrap binary files." : "Sử dụng mã hóa AES & Envelope để bao bọc các tệp tin thực thi.",
      icon: <Code2 className="w-5 h-5" />
    },
    {
      id: 3,
      title: isEn ? "Packaging" : "Đóng gói & Phát hành",
      desc: isEn ? "Creating HL/SL keys for end-users." : "Tạo khóa HL/SL và cấp phát cho người dùng cuối.",
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 4,
      title: isEn ? "Lifecycle Management" : "Quản lý Vòng đời",
      desc: isEn ? "Updating, renewing or revoking licenses via Sentinel EMS." : "Cập nhật, gia hạn hoặc thu hồi quyền sử dụng qua Sentinel EMS.",
      icon: <RefreshCcw className="w-5 h-5" />
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-blue-600">
      
      {/* ── 1. HERO SECTION (Slate-900 Dark Blueprint) ───────────────────── */}
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
              THALES SENTINEL <br />
              <span className="text-blue-400">
                INTELLECTUAL ARMORY
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
              {isEn 
                ? "The industry standard for software protection and entitlement management. Transforming intellectual property into secure revenue."
                : "Tiêu chuẩn toàn cầu về bảo vệ bản quyền và quản lý quyền sử dụng phần mềm. Bảo vệ tài sản trí tuệ và ngăn chặn thất thoát doanh thu."
              }
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors shadow-sm"
            >
              {isEn ? "Get Technical Advice" : "Nhận Tư vấn Kỹ thuật"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── 1.5. ARCHITECTURE SECTION ────────────────── */}
      <section className="bg-white border-t border-slate-200 z-20 relative pt-12">
        <ProductArchitecture isEn={isEn} />
      </section>

      {/* ── 2. BLUEPRINT (White) ────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative text-[15px] bg-white">
         <div className="text-center mb-16 space-y-3">
            <span className="text-blue-700 font-bold text-xs uppercase tracking-[0.3em]">Military Grade Logic</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
              Sentinel Security Pipeline
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
              viewBox="0 0 1000 400" 
              className="w-full h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.1)]"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                 <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e293b" />
                 </linearGradient>
              </defs>

              <motion.path 
                initial={{ strokeDasharray: "10 10", strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                d="M150 200 H850" 
                stroke="url(#lineGrad)" 
                strokeWidth="2" 
                opacity={activeStep !== null ? 0.4 : 0.05} 
              />

              {/* Stage 1: Input Code */}
              <motion.g 
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onMouseEnter={() => setActiveStep(1)}
              >
                <rect x="50" y="150" width="200" height="100" rx="20" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                <Code2 className="text-slate-500" x="135" y="170" width="30" height="30" />
                <text x="150" y="235" fill="white" fontSize="14" fontWeight="900" textAnchor="middle" className="uppercase tracking-widest">
                  {isEn ? "SOURCE CODE" : "MÃ NGUỒN"}
                </text>
                {activeStep === 1 && (
                  <rect x="50" y="150" width="200" height="100" rx="20" fill="none" stroke="#3b82f6" strokeWidth="3" className="filter blur-sm" />
                )}
              </motion.g>

              {/* Stage 2: Envelope Wrapper */}
              <motion.g 
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onMouseEnter={() => setActiveStep(2)}
              >
                <rect x="400" y="125" width="200" height="150" rx="30" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
                <motion.circle 
                  animate={{ scale: activeStep === 2 ? [1, 1.1, 1] : 1 }} 
                  transition={{ duration: 3, repeat: Infinity }}
                  cx="500" cy="180" r="40" 
                  fill="#1e293b" 
                  stroke={activeStep === 2 ? "#3b82f6" : "#1e293b"} 
                  strokeWidth="2" 
                />
                <ShieldCheck className="text-blue-400" x="480" y="160" width="40" height="40" />
                <text x="500" y="245" fill="white" fontSize="14" fontWeight="900" textAnchor="middle" className="uppercase tracking-widest">
                  {isEn ? "SENTINEL ENVELOPE" : "GIÁP PHẦN MỀM"}
                </text>
                {activeStep === 2 && (
                  <rect x="400" y="125" width="200" height="150" rx="30" fill="none" stroke="#3b82f6" strokeWidth="4" className="filter blur-md" />
                )}
              </motion.g>

              {/* Stage 3: Protected Output */}
              <motion.g 
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onMouseEnter={() => setActiveStep(3)}
              >
                <rect x="750" y="150" width="200" height="100" rx="20" fill="#064e3b" stroke="#065f46" strokeWidth="2" />
                <Lock className="text-emerald-400" x="835" y="170" width="30" height="30" />
                <text x="850" y="235" fill="white" fontSize="14" fontWeight="900" textAnchor="middle" className="uppercase tracking-widest">
                  {isEn ? "SECURE BINARY" : "PHẦN MỀM BẢO MẬT"}
                </text>
                {activeStep === 3 && (
                  <rect x="750" y="150" width="200" height="100" rx="20" fill="none" stroke="#10b981" strokeWidth="3" className="filter blur-sm" />
                )}
              </motion.g>
            </svg>

            <div className="mt-12 min-h-[100px] flex items-center justify-center text-center">
               <motion.div 
                 key={activeStep}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="max-w-2xl"
               >
                  {!activeStep ? (
                    <p className="text-slate-500 italic flex items-center gap-2">
                       <MousePointer2 className="w-4 h-4" /> {isEn ? "Hover stage to inspect technical logic" : "Di chuột vào quy trình để xem chi tiết kỹ thuật"}
                    </p>
                  ) : activeStep === 1 ? (
                    <p className="text-blue-600 font-light leading-relaxed">
                       {isEn 
                         ? "Plain executable files (Win/Linux/Android) contain raw logic. Vulnerable to reverse engineering and illicit modification."
                         : "Tệp tin thực thi (Win/Linux/Android) chưa được bảo vệ, dễ bị dịch ngược mã nguồn và thay đổi logic trái phép."
                       }
                    </p>
                  ) : activeStep === 2 ? (
                    <p className="text-blue-600 font-light leading-relaxed">
                       {isEn 
                         ? "Multi-layered encryption wrapper. Prevents debugging, patching, and data dumping using proprietary Thales obfuscation algorithms."
                         : "Lớp bao bọc đa tầng mã hóa. Tự động ngăn chặn Debugger, Patching và trích xuất dữ liệu bằng thuật toán của Thales."
                       }
                    </p>
                  ) : (
                    <p className="text-emerald-200 font-light leading-relaxed">
                       {isEn 
                         ? "Protected executable bound to HL/SL license. Requires authorized key presence to decrypt and run at runtime."
                         : "Phần mềm đã được khóa chặt vào License HL/SL. Chỉ có thể giải mã và chạy khi có sự hiện diện của khóa được cấp phép."
                       }
                    </p>
                  )}
               </motion.div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link 
                href={`/${lang}/contact?solution=thales`}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20 group"
              >
                {isEn ? "Request HSM/Sentinel Quote" : "Nhận báo giá tích hợp HSM"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
         </motion.div>
      </section>

      {/* ── 2.5. HSM ARCHITECTURE SECTION ────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
         <div className="text-center mb-20 space-y-4">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em]">Cryptographic Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-gray-900">
              {isEn ? "HSM Security Architecture" : "Kiến trúc Bảo mật HSM"}
            </h2>
         </div>
         <HsmArchitecture isEn={isEn} />
      </section>

      {/* ── 3. ZONE 1: PIRACY (Slate-50) ────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
               <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-gray-900">
                  {isEn ? "The Reality of Software Piracy" : "Nỗi đau từ Vi phạm Bản quyền"}
               </h2>
               <p className="text-gray-500 text-lg font-light leading-relaxed">
                  {isEn 
                    ? "In Asia, piracy rates can exceed 50%. Every unshielded program is a leak in your corporate revenue."
                    : "Tại châu Á, tỷ lệ vi phạm bản quyền có thể vượt quá 50%. Mỗi phần mềm không được bảo vệ là một lỗ hổng thất thoát doanh thu nghiêm trọng."
                  }
               </p>
               <ul className="space-y-4 pt-4">
                  {[
                    isEn ? "Financial loss from unlicensed usage" : "Thất thoát tiền tệ trực tiếp",
                    isEn ? "IP Theft and Reverse Engineering" : "Mất cắp trí tuệ và dịch ngược mã",
                    isEn ? "Brand damage from hacked versions" : "Tổn hại uy tín do các bản hack"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-bold uppercase tracking-wider">
                       <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white rounded-lg p-7 space-y-2 border border-slate-200">
                  <span className="text-3xl font-black text-slate-900">$46B+</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{isEn ? "Global Piracy Cost" : "Thiệt hại toàn cầu"}</p>
               </div>
               <div className="bg-white rounded-lg p-7 space-y-2 lg:translate-y-6 border border-slate-200">
                  <span className="text-3xl font-black text-slate-900">57%</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{isEn ? "Hacked Apps Rate" : "Tỷ lệ app bị hack"}</p>
               </div>
            </div>
         </div>
      </section>

      {/* ── ZONE 2: TECHNOLOGY (White) ────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white border-t border-slate-200">
         <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{isEn ? "Core Technology Pillars" : "Trụ cột Công nghệ lõi"}</h2>
            <p className="text-slate-500 text-sm md:text-base">{isEn ? "Tailored protection for every environment" : "Bảo vệ tối ưu cho mọi môi trường vận hành"}</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* HL - Hardware */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 space-y-6 hover:border-slate-400 transition-colors">
               <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center text-blue-700">
                     <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-sm text-blue-700">Sentinel HL</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-bold uppercase text-slate-900">{isEn ? "Hardware-Based" : "Khóa Cứng Vật lý"}</h3>
                  <table className="w-full text-xs text-slate-600 font-mono">
                     <tbody className="divide-y divide-slate-100">
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Security Chip" : "Chip Bảo Mật"}:</td> <td className="text-slate-900 font-bold">EAL5+ Standard</td></tr>
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Memory" : "Bộ nhớ"}:</td> <td className="text-slate-900 font-bold">Up to 31KB</td></tr>
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Connection" : "Kết nối"}:</td> <td className="text-slate-900 font-bold">USB / SMT / SD</td></tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* SL - Software */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 space-y-6 hover:border-slate-400 transition-colors">
               <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-indigo-50 rounded-sm flex items-center justify-center text-indigo-700">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-sm text-indigo-700">Sentinel SL</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-bold uppercase text-slate-900">{isEn ? "Software-Based" : "Khóa Mềm Phi vật lý"}</h3>
                  <table className="w-full text-xs text-slate-600 font-mono">
                     <tbody className="divide-y divide-slate-100">
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Fingerprint" : "Dấu vân tay"}:</td> <td className="text-slate-900 font-bold">Binding-ID</td></tr>
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Distribution" : "Phát hành"}:</td> <td className="text-slate-900 font-bold">Instant Activation</td></tr>
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Trial Support" : "Dùng thử"}:</td> <td className="text-slate-900 font-bold">Full Feature</td></tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Cloud */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 space-y-6 hover:border-slate-400 transition-colors">
               <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-sky-50 rounded-sm flex items-center justify-center text-sky-700">
                     <Cloud className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-sm text-sky-700">Sentinel Cloud</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-bold uppercase text-slate-900">{isEn ? "Cloud-Licensing" : "Cấp phép Đám mây"}</h3>
                  <table className="w-full text-xs text-slate-600 font-mono">
                     <tbody className="divide-y divide-slate-100">
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Real-time" : "Thời gian thực"}:</td> <td className="text-slate-900 font-bold">Live Entitlement</td></tr>
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Subscription" : "Thuê bao"}:</td> <td className="text-slate-900 font-bold">Monthly/Annual</td></tr>
                        <tr className="flex justify-between py-2.5"><td>{isEn ? "Reporting" : "Báo cáo"}:</td> <td className="text-slate-900 font-bold">Usage Tracking</td></tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>

      {/* Zone 3: FCT Process (Slate-50) */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
         <div className="max-w-6xl mx-auto">
            <div className="mb-14 text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{isEn ? "FCT Implementation Process" : "Quy trình Triển khai FCT"}</h2>
               <p className="text-slate-500 text-sm">{isEn ? "Standardized 4-step security integration" : "4 bước tích hợp chuẩn hóa từ tư vấn đến vận hành"}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {steps.map((step, idx) => (
                 <div key={idx} className="relative">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 h-full space-y-4 hover:border-slate-400 transition-colors">
                       <span className="text-[10px] font-bold text-blue-700 uppercase tracking-[0.25em]">Phase 0{step.id}</span>
                       <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-slate-700">
                          {step.icon}
                       </div>
                       <h4 className="text-base font-bold uppercase tracking-tight text-slate-900">{step.title}</h4>
                       <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 translate-x-1/2 z-20 text-slate-300">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── 4. CTA FOOTER ───────────────────────── */}
      <section className="py-20 px-6 flex flex-col items-center justify-center text-center bg-white border-t border-slate-200">
         <div className="max-w-4xl w-full bg-slate-900 rounded-lg p-10 md:p-14 space-y-6 relative overflow-hidden border border-slate-800 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
               {isEn ? "Ready to Secure Your Software Licensing?" : "Sẵn sàng bảo vệ Bản quyền Phần mềm?"}
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
               {isEn 
                 ? "Our certified technical team in Vietnam is ready to support your integration process from SDK to full-scale distribution."
                 : "Đội ngũ kỹ thuật được chứng nhận của FCT tại Việt Nam đã sẵn sàng hỗ trợ quy trình tích hợp từ SDK đến phát hành diện rộng."
               }
            </p>
            <div className="flex justify-center gap-4 pt-2">
               <Link 
                 href={`/${lang}/contact?solution=thales`}
                 className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors inline-flex items-center gap-2"
               >
                 {isEn ? "Request Integration Quote" : "Nhận báo giá tích hợp"}
                 <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </div>

         {/* Schema.org Service for B2B SEO */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Thales Sentinel Software Protection & Licensing",
                "description": "Enterprise consulting, integration and deployment of Thales Sentinel hardware/software license protection (Sentinel HL/SL) for ISVs and software publishers in Vietnam.",
                "url": "https://fct.vn/vi/products/thales-sentinel",
                "serviceType": "Software Licensing & Intellectual Property Protection",
                "areaServed": {
                  "@type": "Country",
                  "name": "Vietnam"
                },
                "brand": {
                  "@type": "Brand",
                  "name": "Thales"
                },
                "provider": {
                  "@type": "Organization",
                  "name": "FCT Vinh Thinh .,JSC",
                  "url": "https://fct.vn"
                },
                "audience": {
                  "@type": "BusinessAudience",
                  "audienceType": "Software Publishers, ISVs, Enterprise IT"
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
                    "name": "Giải pháp bảo vệ bản quyền Thales Sentinel là gì?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Thales Sentinel là giải pháp bảo mật phần mềm và quản lý cấp phép bản quyền (Licensing) hàng đầu thế giới, giúp doanh nghiệp ngăn chặn vi phạm bản quyền và bảo vệ mã nguồn."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "FCT Vinh Thinh cung cấp thiết bị Sentinel HL nào?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Chúng tôi cung cấp đầy đủ các dòng khóa cứng Sentinel HL (Hardware Token), Sentinel SL (Software License) và Cloud Licensing cho doanh nghiệp B2B tại Việt Nam."
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
