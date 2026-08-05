"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  KeyRound, 
  Cpu, 
  Zap, 
  Lock, 
  ArrowRight,
  Database,
  Cloud,
  Layers,
  Code2,
  CheckCircle2,
  FileCode2,
  Activity
} from "lucide-react";
import Link from "next/link";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

interface GuardantClientProps {
  lang: string;
  dict: any;
}

export default function GuardantClient({ lang, dict }: GuardantClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-slate-50 text-gray-950 overflow-hidden font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* ── 1. HERO SECTION (Dark) ───────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 bg-[#020617]">
        <NeuralNetworkBackground />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[200px] -z-10 animate-pulse"></div>

        <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
               {isEn ? "Ecosystem of Solutions" : "Hệ sinh thái bảo vệ bản quyền"}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-white drop-shadow-2xl">
              GUARDANT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                IP SHIELD & LICENSE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
               {isEn 
                 ? "Licensing, security, and sales management. Protect your core software IP and automate license delivery in physical, virtual, and cloud environments."
                 : "Quản lý cấp phép, bảo mật và thương mại hóa phần mềm. Bảo vệ tài sản trí tuệ (Core IP) và tự động hóa cấp phát license trên mọi môi trường."
               }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-2">
              <span className="text-4xl font-black text-emerald-400">30+</span>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Years in Market" : "Năm kinh nghiệm"}</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-2">
              <span className="text-4xl font-black text-emerald-400">10M+</span>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Licensed Software Copies" : "Bản quyền phần mềm đã cấp"}</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-2">
              <span className="text-4xl font-black text-emerald-400">3M+</span>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Devices Sold" : "Thiết bị phần cứng bán ra"}</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-600/30"
            >
              {isEn ? "Request Guardant SDK Consultation" : "Nhận tư vấn Guardant SDK"}
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. ECOSYSTEM PORTFOLIO ────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative bg-white rounded-t-[4rem] -mt-12 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="text-center mb-20 space-y-4">
          <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em]">{isEn ? "All-in-One Security" : "Hệ sinh thái toàn diện"}</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-gray-900">
             {isEn ? "Guardant Core Protection Suite" : "Giải pháp cốt lõi từ Guardant"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1 */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {isEn ? "Hardware Keys" : "Khóa cứng Vật lý"}
            </h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed flex-grow">
              {isEn
                ? "Guardant Sign and Guardant Chip. Premium USB dongles with cryptographic co-processors. Driver-free operation with secure non-volatile memory."
                : "Dòng Guardant Sign và Guardant Chip. USB dongle cao cấp tích hợp vi xử lý mã hóa mã nguồn, hoạt động không cần cài đặt driver."
              }
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {isEn ? "Software Keys" : "Khóa mềm Linh hoạt"}
            </h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed flex-grow">
              {isEn
                ? "Guardant DL. Software-based and cloud-native licensing. Fully compatible with virtualized environments and hypervisors."
                : "Guardant DL. Cấp phép bản quyền mềm hoặc trên Cloud linh hoạt, tương thích hoàn hảo với các môi trường ảo hóa (Hyper-V, ESXi)."
              }
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {isEn ? "Management Platforms" : "Quản lý Cấp phép"}
            </h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed flex-grow">
              {isEn
                ? "Guardant Station and Control Center. Centralized platform for managing the entire license lifecycle, usage logs, updates, and network licenses."
                : "Guardant Station và Control Center. Nền tảng quản lý vòng đời license, cập nhật OTA và giám sát sử dụng license mạng tập trung."
              }
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {isEn ? "Developer Utilities" : "Công cụ Phát triển"}
            </h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed flex-grow">
              {isEn
                ? "Guardant Protection Studio & Licensing API. Obfuscates execution flow, prevents reverse engineering, and integrates seamlessly into products."
                : "Guardant Protection Studio & Licensing API. Làm rối luồng thực thi (control flow), chống dịch ngược và tích hợp API bảo mật cao."
              }
            </p>
          </div>

        </div>
      </section>

      {/* ── 3. DETAILED VALUE PROPOSITION ──────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase italic text-gray-900">
              {isEn ? "Protecting Software Integrity in the AI Era" : "Bảo vệ toàn vẹn phần mềm trong thời đại AI"}
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              {isEn 
                ? "In an era where reverse engineering is accelerated by advanced machine learning, Guardant provides active defensive technology to secure core IPs and prevent unauthorized usage."
                : "Trong kỷ nguyên mà việc dịch ngược mã nguồn được tăng tốc bằng AI, Guardant mang đến các công cụ phòng vệ chủ động để bảo vệ thuật toán cốt lõi và khóa cứng bản quyền."
              }
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                isEn ? "Driver-free hardware operation" : "Khóa cứng chạy không cần driver",
                isEn ? "Control Flow Obfuscation against decompilers" : "Làm rối luồng thực thi chống dịch ngược",
                isEn ? "Robust virtualization compatibility (Guardant DL)" : "Tương thích tốt với môi trường ảo hóa",
                isEn ? "Unified dashboard for licensing lifecycle" : "Hệ thống quản lý vòng đời license tập trung"
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            <h3 className="text-2xl font-black mb-8 uppercase tracking-wide">
              {isEn ? "Key Application Fields" : "Thị trường Ứng dụng chính"}
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: isEn ? "CAD/CAM Systems" : "Hệ thống CAD/CAM", icon: FileCode2 },
                { label: isEn ? "ERP Systems" : "Phần mềm ERP", icon: Layers },
                { label: isEn ? "Industrial Automation" : "Tự động hóa công nghiệp", icon: Cpu },
                { label: isEn ? "Medical Equipment" : "Thiết bị y tế", icon: Activity },
                { label: isEn ? "Video Surveillance" : "Giám sát Video", icon: Lock },
                { label: isEn ? "AI & Neural Networks" : "Mạng Nơ-ron & AI", icon: Zap }
              ].map((field, idx) => {
                const Icon = field.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-300">{field.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA FOOTER ────────────────────────── */}
      <section className="bg-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
            {isEn ? "Commercialize Your Software Securely" : "Thương mại hóa phần mềm an toàn"}
          </h2>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
            {isEn 
              ? "Ready to secure your intellectual property? Contact FCT Vinh Thinh today for a customized consultation on Guardant solutions."
              : "Bạn đã sẵn sàng bảo vệ tài sản trí tuệ cốt lõi? Hãy liên hệ với FCT Vĩnh Thịnh ngay hôm nay để nhận tư vấn giải pháp Guardant tối ưu."
            }
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4.5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
            >
              {isEn ? "Request SDK Evaluation Kit" : "Đăng ký nhận bộ thử nghiệm SDK"}
            </button>
            <Link 
              href={`/${lang}/contact`}
              className="px-10 py-4.5 border border-slate-200 hover:border-emerald-600 rounded-2xl text-slate-800 hover:text-emerald-600 font-black text-xs uppercase tracking-widest transition-all"
            >
              {isEn ? "Contact Sales" : "Liên hệ bán hàng"}
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </main>
  );
}
