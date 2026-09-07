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
import TechGridBackground from "@/components/TechGridBackground";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import dynamic from "next/dynamic";
const GuardantArchitecture = dynamic(() => import("@/components/GuardantArchitecture"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-slate-900/5 animate-pulse rounded-lg max-w-5xl mx-auto" />
});

interface GuardantClientProps {
  lang: string;
  dict: any;
}

export default function GuardantClient({ lang, dict }: GuardantClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* ── 1. HERO SECTION (Slate-900 Blueprint) ───────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 bg-slate-900 border-b border-slate-800">
        <TechGridBackground />

        <div className="relative z-10 text-center space-y-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-800/80 rounded-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
               {isEn ? "Ecosystem of Solutions" : "Hệ sinh thái bảo vệ bản quyền"}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
              GUARDANT <br />
              <span className="text-emerald-400">
                IP SHIELD & LICENSE
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
               {isEn 
                 ? "Licensing, security, and sales management. Protect your core software IP and automate license delivery in physical, virtual, and cloud environments."
                 : "Quản lý cấp phép, bảo mật và thương mại hóa phần mềm. Bảo vệ tài sản trí tuệ (Core IP) và tự động hóa cấp phát license trên mọi môi trường."
               }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 max-w-4xl mx-auto">
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-lg space-y-1">
              <span className="text-3xl font-black text-emerald-400">30+</span>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{isEn ? "Years in Market" : "Năm kinh nghiệm"}</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-lg space-y-1">
              <span className="text-3xl font-black text-emerald-400">10M+</span>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{isEn ? "Licensed Software Copies" : "Bản quyền phần mềm đã cấp"}</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-lg space-y-1">
              <span className="text-3xl font-black text-emerald-400">3M+</span>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{isEn ? "Devices Sold" : "Thiết bị phần cứng bán ra"}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors shadow-sm"
            >
              {isEn ? "Request Guardant SDK Consultation" : "Nhận tư vấn Guardant SDK"}
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. ECOSYSTEM PORTFOLIO ────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative bg-white border-b border-slate-200">
        <div className="text-center mb-14 space-y-3">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-[0.3em]">{isEn ? "All-in-One Security" : "Hệ sinh thái toàn diện"}</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
             {isEn ? "Guardant Core Protection Suite" : "Giải pháp cốt lõi từ Guardant"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition-colors flex flex-col gap-4">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEn ? "Hardware Keys" : "Khóa cứng Vật lý"}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed flex-grow">
              {isEn
                ? "Guardant Sign and Guardant Chip. Premium USB dongles with cryptographic co-processors. Driver-free operation with secure non-volatile memory."
                : "Dòng Guardant Sign và Guardant Chip. USB dongle cao cấp tích hợp vi xử lý mã hóa mã nguồn, hoạt động không cần cài đặt driver."
              }
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition-colors flex flex-col gap-4">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEn ? "Software Keys" : "Khóa mềm Linh hoạt"}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed flex-grow">
              {isEn
                ? "Guardant DL. Software-based and cloud-native licensing. Fully compatible with virtualized environments and hypervisors."
                : "Guardant DL. Cấp phép bản quyền mềm hoặc trên Cloud linh hoạt, tương thích hoàn hảo với các môi trường ảo hóa (Hyper-V, ESXi)."
              }
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition-colors flex flex-col gap-4">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEn ? "Management Platforms" : "Quản lý Cấp phép"}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed flex-grow">
              {isEn
                ? "Guardant Station and Control Center. Centralized platform for managing the entire license lifecycle, usage logs, updates, and network licenses."
                : "Guardant Station và Control Center. Nền tảng quản lý vòng đời license, cập nhật OTA và giám sát sử dụng license mạng tập trung."
              }
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition-colors flex flex-col gap-4">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEn ? "Developer Utilities" : "Công cụ Phát triển"}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed flex-grow">
              {isEn
                ? "Guardant Protection Studio & Licensing API. Obfuscates execution flow, prevents reverse engineering, and integrates seamlessly into products."
                : "Guardant Protection Studio & Licensing API. Làm rối luồng thực thi (control flow), chống dịch ngược và tích hợp API bảo mật cao."
              }
            </p>
          </div>

        </div>
      </section>

      {/* ── 2.5 ARCHITECTURAL BLUEPRINT ──────────── */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-14 text-slate-900">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-[0.3em]">{isEn ? "Ecosystem Flow" : "Luồng Kiến Trúc Bảo Vệ"}</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              {isEn ? "The Guardant Security Architecture" : "Kiến trúc Bảo mật Guardant"}
            </h2>
          </div>
          <GuardantArchitecture isEn={isEn} />
        </div>
      </section>

      {/* ── 3. DETAILED VALUE PROPOSITION ──────────── */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-sm flex items-center justify-center text-emerald-700 border border-emerald-200">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
              {isEn ? "Protecting Software Integrity in the Modern Era" : "Bảo vệ toàn vẹn phần mềm trong thời đại mới"}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {isEn 
                ? "In an era where reverse engineering is accelerated by advanced decompilation tools, Guardant provides active defensive technology to secure core IPs and prevent unauthorized usage."
                : "Trong bối cảnh dịch ngược mã nguồn ngày càng tinh vi, Guardant mang đến các công cụ phòng vệ chủ động để bảo vệ thuật toán cốt lõi và khóa cứng bản quyền."
              }
            </p>
            
            <div className="space-y-3 pt-2">
              {[
                isEn ? "Driver-free hardware operation" : "Khóa cứng chạy không cần driver",
                isEn ? "Control Flow Obfuscation against decompilers" : "Làm rối luồng thực thi chống dịch ngược",
                isEn ? "Robust virtualization compatibility (Guardant DL)" : "Tương thích tốt với môi trường ảo hóa",
                isEn ? "Unified dashboard for licensing lifecycle" : "Hệ thống quản lý vòng đời license tập trung"
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-8 text-white relative overflow-hidden border border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide text-slate-200">
              {isEn ? "Key Application Fields" : "Thị trường Ứng dụng chính"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
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
                  <div key={idx} className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700 p-3 rounded-sm">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-300">{field.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA FOOTER ────────────────────────── */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {isEn ? "Commercialize Your Software Securely" : "Thương mại hóa phần mềm an toàn"}
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            {isEn 
              ? "Ready to secure your intellectual property? Contact FCT Vinh Thinh today for a customized consultation on Guardant solutions."
              : "Bạn đã sẵn sàng bảo vệ tài sản trí tuệ cốt lõi? Hãy liên hệ với FCT Vĩnh Thịnh ngay hôm nay để nhận tư vấn giải pháp Guardant tối ưu."
            }
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors"
            >
              {isEn ? "Request SDK Evaluation Kit" : "Đăng ký nhận bộ thử nghiệm SDK"}
            </button>
            <Link 
              href={`/${lang}/contact`}
              className="px-8 py-3.5 border border-slate-300 hover:border-emerald-700 rounded-sm text-slate-700 hover:text-emerald-700 font-semibold text-sm tracking-wide bg-white transition-colors"
            >
              {isEn ? "Contact Sales" : "Liên hệ tư vấn"}
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </main>
  );
}
