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
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { useState, useRef } from "react";
import IntegritySeal from "@/components/IntegritySeal";
import ContactModal from "@/components/ContactModal";

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
      icon: <Settings className="w-6 h-6" />
    },
    {
      id: 2,
      title: isEn ? "SDK Integration" : "Tích hợp SDK",
      desc: isEn ? "Using AES encryption & Envelope to wrap binary files." : "Sử dụng mã hóa AES & Envelope để bao bọc các tệp tin thực thi.",
      icon: <Code2 className="w-6 h-6" />
    },
    {
      id: 3,
      title: isEn ? "Packaging" : "Đóng gói & Phát hành",
      desc: isEn ? "Creating HL/SL keys for end-users." : "Tạo khóa HL/SL và cấp phát cho người dùng cuối.",
      icon: <Package className="w-6 h-6" />
    },
    {
      id: 4,
      title: isEn ? "Lifecycle Management" : "Quản lý Vòng đời",
      desc: isEn ? "Updating, renewing or revoking licenses via Sentinel EMS." : "Cập nhật, gia hạn hoặc thu hồi quyền sử dụng qua Sentinel EMS.",
      icon: <RefreshCcw className="w-6 h-6" />
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-600">
      
      {/* ── 1. THE DARK FOUNDRY (Hero Section) ───────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <NeuralNetworkBackground />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center space-y-10 max-w-5xl mx-auto"
        >
          <IntegritySeal />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              THALES SENTINEL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                THE DARK FOUNDRY
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
              {isEn 
                ? "The industry standard for software protection and entitlement management. Transforming intellectual property into secure revenue."
                : "Tiêu chuẩn vàng toàn cầu về bảo vệ bản quyền và quản lý quyền sử dụng phần mềm. Biến trí tuệ thành nguồn thu nhập an toàn."
              }
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 pt-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 brushed-aluminum text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
              {isEn ? "Get Technical Advice" : "Nhận Tư vấn Kỹ thuật"}
            </button>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">SECURE FLOW</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* ── 2. BLUEPRINT: SVG INTERACTIVE DIAGRAM ────────────────── */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative">
         <div className="text-center mb-20 space-y-4">
            <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em]">Military Grade Logic</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              Sentinel Security Pipeline
            </h2>
         </div>

         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="military-panel rounded-[3rem] p-12 md:p-20 relative overflow-hidden group"
         >
            {/* SVG Interactive Diagram */}
            <svg 
              viewBox="0 0 1000 400" 
              className="w-full h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.1)]"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lines - Animated Pulse */}
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

            {/* Diagram Tooltip Info */}
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
                    <p className="text-blue-200 font-light leading-relaxed">
                       {isEn 
                         ? "Plain executable files (Win/Linux/Android) contain raw logic. Vulnerable to reverse engineering and illicit modification."
                         : "Tệp tin thực thi (Win/Linux/Android) chưa được bảo vệ, dễ bị dịch ngược mã nguồn và thay đổi logic trái phép."
                       }
                    </p>
                  ) : activeStep === 2 ? (
                    <p className="text-blue-200 font-light leading-relaxed">
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

            {/* 🚀 NEW CTA UNDER BLUEPRINT */}
            <div className="mt-10 flex justify-center">
              <Link 
                href={`/${lang}/contact?solution=thales`}
                className="military-panel px-10 py-4 bg-blue-950/50 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-blue-500/50 transition-all flex items-center gap-3 border border-white/5 group shadow-2xl"
              >
                {isEn ? "Request HSM/Sentinel Quote" : "Nhận báo giá tích hợp HSM"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-blue-400" />
              </Link>
            </div>
         </motion.div>
      </section>

      {/* ── 3. TRIPLE LAYER: CONTENT STRUCTURE ────────────────────── */}
      
      {/* Zone 1: The Pain (Piracy) */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#020617] to-[#0f172a]">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
               <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {isEn ? "The Reality of Software Piracy" : "Nỗi đau từ Vi phạm Bản quyền"}
               </h2>
               <p className="text-slate-400 text-lg font-light leading-relaxed">
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
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold uppercase tracking-wider">
                       <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="military-panel rounded-3xl p-8 space-y-2 border-red-500/10">
                  <span className="text-3xl font-black text-white">$46B+</span>
                  <p className="text-[10px] text-slate-500 uppercase font-black">{isEn ? "Global Piracy Cost" : "Thiệt hại toàn cầu"}</p>
               </div>
               <div className="military-panel rounded-3xl p-8 space-y-2 translate-y-8">
                  <span className="text-3xl font-black text-white">57%</span>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Hacked Apps Rate" : "Tỷ lệ app bị hack"}</p>
               </div>
            </div>
         </div>
      </section>

      {/* Zone 2: Core Solutions (Spec Sheets) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">{isEn ? "Core Technology Pillars" : "Trụ cột Công nghệ lõi"}</h2>
            <p className="text-slate-500">{isEn ? "Tailored protection for every environment" : "Bảo vệ tối ưu cho mọi môi trường vận hành"}</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* HL - Hardware */}
            <motion.div whileHover={{ y: -10 }} className="military-panel rounded-[2.5rem] p-8 space-y-8 border-blue-500/20">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                     <Cpu className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-blue-600/10 px-3 py-1 rounded-full text-blue-400">Sentinel HL</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase">{isEn ? "Hardware-Based" : "Khóa Cứng Vật lý"}</h3>
                  <table className="w-full text-xs text-slate-400 font-mono">
                     <tbody className="divide-y divide-slate-800">
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Security Chip" : "Chip Bảo Mật"}:</td> <td className="text-white text-right">EAL5+ Standard</td></tr>
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Memory" : "Bộ nhớ"}:</td> <td className="text-white text-right">Up to 31KB</td></tr>
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Connection" : "Kết nối"}:</td> <td className="text-white text-right">USB / ExpressCard / SMT</td></tr>
                     </tbody>
                  </table>
               </div>
            </motion.div>

            {/* SL - Software */}
            <motion.div whileHover={{ y: -10 }} className="military-panel rounded-[2.5rem] p-8 space-y-8 border-indigo-500/20">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500">
                     <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-600/10 px-3 py-1 rounded-full text-indigo-400">Sentinel SL</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase">{isEn ? "Software-Based" : "Khóa Mềm Phi vật lý"}</h3>
                  <table className="w-full text-xs text-slate-400 font-mono">
                     <tbody className="divide-y divide-slate-800">
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Fingerprint" : "Dấu vân tay máy"}:</td> <td className="text-white text-right">HDD/MAC/CPU Binding</td></tr>
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Distribution" : "Phát hành"}:</td> <td className="text-white text-right">Instant Activation</td></tr>
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Trial Support" : "Hỗ trợ dùng thử"}:</td> <td className="text-white text-right">Full Feature</td></tr>
                     </tbody>
                  </table>
               </div>
            </motion.div>

            {/* Cloud */}
            <motion.div whileHover={{ y: -10 }} className="military-panel rounded-[2.5rem] p-8 space-y-8 border-sky-500/20">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-sky-600/10 rounded-2xl flex items-center justify-center text-sky-500">
                     <Cloud className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-sky-600/10 px-3 py-1 rounded-full text-sky-400">Sentinel Cloud</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase">{isEn ? "Cloud-Licensing" : "Cấp phép Đám mây"}</h3>
                  <table className="w-full text-xs text-slate-400 font-mono">
                     <tbody className="divide-y divide-slate-800">
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Real-time" : "Thời gian thực"}:</td> <td className="text-white text-right">Live Entitlements</td></tr>
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Subscription" : "Đăng ký thuê bao"}:</td> <td className="text-white text-right">Monthly/Annual</td></tr>
                        <tr className="py-2 block"><td className="py-2">{isEn ? "Reporting" : "Báo cáo"}:</td> <td className="text-white text-right">Usage Tracking</td></tr>
                     </tbody>
                  </table>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Zone 3: FCT Process (4 Steps) */}
      <section className="py-24 px-6 bg-[#010409]">
         <div className="max-w-6xl mx-auto">
            <div className="mb-20">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center">{isEn ? "FCT Implementation Process" : "Quy trình Triển khai FCT"}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {steps.map((step, idx) => (
                 <div key={idx} className="relative group">
                    <div className="military-panel rounded-[2rem] p-8 h-full space-y-6 transition-all duration-300 group-hover:border-blue-500/50 group-hover:-translate-y-2">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Phase 0{step.id}</span>
                       <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {step.icon}
                       </div>
                       <h4 className="text-lg font-black uppercase tracking-tight">{step.title}</h4>
                       <p className="text-slate-500 text-sm font-light leading-relaxed">{step.desc}</p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-20 text-slate-800">
                         <ArrowRight className="w-8 h-8" />
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── 4. CALL TO ACTION & SEO Schema ───────────────────────── */}
      <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
         <div className="max-w-4xl military-panel rounded-[3.5rem] p-16 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-4xl font-black tracking-tighter leading-none">
               {isEn ? "Ready to Seal Your Software Security?" : "Sẵn sàng niêm phong Bản quyền của bạn?"}
            </h2>
            <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">
               {isEn 
                 ? "Our certified technical team in Vietnam is ready to support your integration process from SDK to full-scale distribution."
                 : "Đội ngũ kỹ thuật được chứng nhận của FCT tại Việt Nam đã sẵn sàng hỗ trợ quy trình tích hợp từ SDK đến phát hành diện rộng."
               }
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
               <Link 
                 href={`/${lang}/contact?solution=thales`}
                 className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all flex items-center gap-3"
               >
                 {isEn ? "Request Integration Quote" : "Nhận báo giá tích hợp"}
                 <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
         </div>

         {/* Schema.org for SEO */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "Thales Sentinel Software Protection",
                "image": "https://fct.vn/images/products/sentinel-hl.jpg",
                "description": "Enterprise-grade software licensing and security solutions by Thales Sentinel.",
                "brand": {
                  "@type": "Brand",
                  "name": "Thales"
                },
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
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </main>
  );
}
