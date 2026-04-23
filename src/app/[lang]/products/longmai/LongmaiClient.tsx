"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldAlert, 
  KeyRound, 
  Cpu, 
  Zap, 
  Lock, 
  FileSignature, 
  CheckCircle2,
  Server,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { useState, useRef } from "react";
import IntegritySeal from "@/components/IntegritySeal";
import ContactModal from "@/components/ContactModal";

interface LongmaiClientProps {
  lang: string;
  dict: any;
}

export default function LongmaiClient({ lang, dict }: LongmaiClientProps) {
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
    <main ref={containerRef} className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-rose-600">
      
      {/* ── 1. THE HARDWARE FORTRESS (Hero Section) ───────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <NeuralNetworkBackground />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[200px] -z-10 animate-pulse"></div>

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
              LONGMAI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-orange-300 drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]">
                THE HARDWARE FORTRESS
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
               {isEn 
                 ? "Beyond simple USB tokens. We deliver absolute physical security via Secure Element chips for 2FA, PKI, and digital signatures."
                 : "Hơn cả một chiếc Token. Chúng tôi cung cấp pháo đài vật lý bằng chip bảo mật (Secure Element) phục vụ Xác thực 2 lớp (2FA) và Chữ ký số."
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
      </section>

      {/* ── 2. BLUEPRINT: 2FA & PKI INTERACTIVE DIAGRAM ────────────────── */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative content-visibility-auto">
         <div className="text-center mb-20 space-y-4">
            <span className="text-rose-500 font-black text-xs uppercase tracking-[0.4em]">Zero-Trust Engine</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              {isEn ? "Hardware-Isolated Execution" : "Xử lý Cách ly Phần cứng"}
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
              className="w-full h-auto drop-shadow-[0_0_50px_rgba(244,63,94,0.1)]"
              fill="none" 
            >
              <defs>
                 <filter id="roseGlow">
                   <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
                 <linearGradient id="zapFlash" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#fcd34d" />
                    <stop offset="100%" stopColor="#f43f5e" />
                 </linearGradient>
              </defs>

              {/* Data Path: Transaction -> Token */}
              <motion.path 
                d="M 250 200 L 450 200" 
                stroke="#334155" strokeWidth="4" strokeDasharray="10 5" 
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: activeStep !== null ? 1 : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                d="M 250 200 L 450 200" 
                stroke="url(#zapFlash)" strokeWidth="4" 
                filter={activeStep !== null ? "url(#roseGlow)" : ""}
              />

              {/* Data Path: Token -> Bank Server */}
              <motion.path 
                d="M 550 200 L 750 200" 
                stroke="#334155" strokeWidth="4" strokeDasharray="10 5" 
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: activeStep !== null ? 1 : 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                d="M 550 200 L 750 200" 
                stroke="#10b981" strokeWidth="4" 
                filter={activeStep !== null ? "url(#roseGlow)" : ""}
              />

              {/* Node 1: Transaction Request */}
              <motion.g 
                onMouseEnter={() => setActiveStep(1)} 
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <rect x="50" y="150" width="200" height="100" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                <FileSignature className="text-slate-400" x="135" y="170" width="30" height="30" />
                <text x="150" y="235" fill="currentColor" fontSize="14" fontWeight="900" textAnchor="middle" className="text-slate-300 uppercase tracking-widest">
                  {isEn ? "Trans Request" : "Lệnh Giao Dịch"}
                </text>
                {activeStep === 1 && (
                  <rect x="50" y="150" width="200" height="100" rx="16" fill="none" stroke="#f43f5e" strokeWidth="3" className="filter blur-sm" />
                )}
              </motion.g>

              {/* Node 2: Longmai Hardware Token (Secure Element) */}
              <motion.g 
                onMouseEnter={() => setActiveStep(2)} 
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <rect x="400" y="125" width="200" height="150" rx="30" fill="#4c0519" stroke="#9f1239" strokeWidth="3" />
                <Cpu className="text-rose-400" x="480" y="155" width="40" height="40" />
                <text x="500" y="225" fill="currentColor" fontSize="16" fontWeight="900" textAnchor="middle" className="text-white uppercase tracking-widest">
                  {isEn ? "SECURE ELEMENT" : "CHIP BẢO MẬT"}
                </text>
                <text x="500" y="250" fill="currentColor" fontSize="10" fontWeight="700" textAnchor="middle" className="text-rose-300 tracking-wider">
                  RSA / ECC / AES
                </text>
                
                {/* Simulated Lightning effect inside chip */}
                {activeStep === 2 && (
                  <motion.path 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    d="M 490 140 L 485 160 L 500 160 L 490 190" 
                    fill="none" stroke="#fcd34d" strokeWidth="3" filter="url(#roseGlow)"
                  />
                )}
              </motion.g>

              {/* Node 3: Verification Server */}
              <motion.g 
                onMouseEnter={() => setActiveStep(3)} 
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <rect x="750" y="150" width="200" height="100" rx="16" fill="#064e3b" stroke="#065f46" strokeWidth="2" />
                <Server className="text-emerald-400" x="835" y="170" width="30" height="30" />
                <text x="850" y="235" fill="currentColor" fontSize="14" fontWeight="900" textAnchor="middle" className="text-white uppercase tracking-widest">
                  {isEn ? "Verified System" : "Hệ Thống Đích"}
                </text>
                {activeStep === 3 && (
                  <rect x="750" y="150" width="200" height="100" rx="16" fill="none" stroke="#10b981" strokeWidth="3" className="filter blur-sm" />
                )}
              </motion.g>

              <Lock className="text-yellow-400" x="430" y="90" width="40" height="40" />
            </svg>

            {/* Diagram Tooltip Info */}
            <div className="mt-12 min-h-[120px] flex items-center justify-center text-center">
               <motion.div 
                 key={activeStep}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="max-w-2xl"
               >
                  {!activeStep ? (
                    <p className="text-slate-500 italic flex text-center justify-center items-center gap-2">
                       {isEn ? "Hover stage to inspect hardware logic" : "Di chuột vào quy trình để xem logic xử lý bên trong chip thẻ"}
                    </p>
                  ) : activeStep === 1 ? (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold uppercase tracking-widest">{isEn ? "Unsigned Payload" : "Dữ liệu chưa ký"}</h4>
                       <p className="text-rose-200 font-light text-sm">
                          {isEn 
                            ? "A user initiates a login or financial transaction. The raw data payload is incredibly vulnerable to Man-In-The-Middle attacks at this stage."
                            : "Người dùng khởi tạo đăng nhập hoặc chuyển tiền. Goí dữ liệu thô này rất dễ bị tấn công nghe lén (Man-In-The-Middle) nếu gửi trực tiếp qua mạng."
                          }
                       </p>
                    </div>
                  ) : activeStep === 2 ? (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                         <Zap className="w-4 h-4 text-yellow-400"/> {isEn ? "Isolated Execution Engine" : "Động cơ Xử lý Cách ly"}
                       </h4>
                       <p className="text-rose-300 font-light text-sm">
                          {isEn 
                            ? "The payload enters the SmartX hardware. The Private Key NEVER leaves the chip. The chip computes the cryptographic signature locally and spits out the result."
                            : "Dữ liệu đi vào phần cứng SmartX. Khóa Private Key KHÔNG BAO GIỜ rời khỏi chip. Con chip sẽ tính toán chữ ký mật mã (RSA/ECC) ngay bên trong và chỉ xuất kết quả ra ngoài."
                          }
                       </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                       <h4 className="text-white font-bold uppercase tracking-widest">{isEn ? "Cryptographic Guarantee" : "Sự Bảo Đảm Mật Mã Học"}</h4>
                       <p className="text-emerald-200 font-light text-sm">
                          {isEn 
                            ? "The server receives the signed payload. Since the private key cannot be extracted, the server can mathematically guarantee the transaction originated from the physical token."
                            : "Máy chủ nhận được gói tin đã mã hóa. Vì Private Key không thể bị trích xuất khỏi chip cứng, máy chủ có thể đảm bảo 100% bằng toán học rằng giao dịch xuất phát từ người giữ Token."
                          }
                       </p>
                    </div>
                  )}
               </motion.div>
            </div>
            
            {/* 🚀 NEW CTA UNDER BLUEPRINT */}
            <div className="mt-10 flex justify-center">
              <Link 
                href={`/${lang}/contact?solution=longmai`}
                className="military-panel px-10 py-4 bg-rose-950/50 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-rose-500/50 transition-all flex items-center gap-3 border border-white/5 group shadow-2xl"
              >
                {isEn ? "Request Longmai Token Demo" : "Tư vấn Token Longmai"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-rose-400" />
              </Link>
            </div>
         </motion.div>
      </section>

      {/* ── 3. CORE VALUES ───────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#020617] to-[#2e1026]">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
               <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                  <ShieldAlert className="w-6 h-6" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {isEn ? "Software OTPs are No Longer Safe" : "Mã OTP Phần Mềm Không Còn An Toàn"}
               </h2>
               <p className="text-slate-400 text-lg font-light leading-relaxed">
                  {isEn 
                    ? "SMS and Authenticator apps are vulnerable to SIM swapping, phishing, and malware. True security requires hardware isolation."
                    : "Mã OTP qua SMS (Tin nhắn) hay ứng dụng trên điện thoại rất dễ bị đánh cắp qua SIM-swap, Phishing hoặc mã độc. An ninh thật sự đòi hỏi sự cách ly vật lý."
                  }
               </p>
            </div>
            
             <div className="grid grid-cols-2 gap-4">
               <div className="military-panel rounded-3xl p-8 space-y-2 border-rose-500/10 hover:-translate-y-2 transition-transform">
                  <KeyRound className="w-8 h-8 text-rose-500 mb-4" />
                  <span className="text-2xl font-black text-white">PKCS#11</span>
                  <p className="text-[10px] text-slate-500 uppercase font-black">{isEn ? "Enterprise Standard" : "Tiêu chuẩn Doanh nghiệp"}</p>
               </div>
               <div className="military-panel rounded-3xl p-8 space-y-2 translate-y-8 border-rose-500/10 hover:-translate-y-2 transition-transform">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />
                  <span className="text-2xl font-black text-white">FIPS 140-2</span>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Gov Certification" : "Chứng nhận Chính phủ"}</p>
               </div>
            </div>
         </div>
      </section>

      {/* ── 4. CALL TO ACTION & Schema ───────────────────────── */}
      <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
         <div className="max-w-4xl military-panel rounded-[3.5rem] p-16 space-y-10 relative overflow-hidden">
            <h2 className="text-4xl font-black tracking-tighter leading-none relative z-10">
               {isEn ? "Lock Down Your Workforce Access" : "Khóa chặt Quyền Truy cập Hệ Thống"}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 pt-4 relative z-10">
               <Link 
                 href={`/${lang}/contact?solution=longmai`}
                 className="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] hover:bg-rose-500 transition-all flex items-center gap-3"
               >
                 {isEn ? "Request Token Quote" : "Nhận báo giá Token"}
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
                "name": "Longmai Hardware Token & 2FA Solutions",
                "brand": {
                  "@type": "Brand",
                  "name": "Longmai"
                },
                "category": "Hardware Security",
                "description": "Hardware-based PKI tokens and 2FA keys for enterprise identity and access management.",
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
