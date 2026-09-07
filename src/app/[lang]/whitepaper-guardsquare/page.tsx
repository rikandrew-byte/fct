import { Metadata } from "next";
import Image from "next/image";
import WhitepaperForm from "@/app/[lang]/whitepaper/WhitepaperForm";
import { ShieldAlert, CheckCircle2, Lock, ArrowDown, FileWarning } from "lucide-react";

export const metadata: Metadata = {
  title: "Sách trắng: Bảo mật Ứng dụng Di động & Chống Mã độc | FCT Vĩnh Thịnh",
  description: "Tài liệu chuyên sâu về giải pháp chống dịch ngược và ngăn chặn mã độc Overlay dành cho ứng dụng Tài chính - Ngân hàng.",
};

export default async function WhitepaperGuardsquarePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700">
                  {isEn ? "Mobile Security Guide 2026" : "Tài liệu Bảo mật Mobile 2026"}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                {isEn ? "Defeat Mobile Malware" : "Đánh bại Mã độc &"} <br/>
                <span className="text-rose-600">{isEn ? "& Prevent Overlay Attacks" : "Ngăn chặn Tấn công Chiếm quyền"}</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                {isEn 
                  ? "A strategic whitepaper on robust mobile application protection, reverse engineering prevention, and runtime application self-protection (RASP) for the financial sector."
                  : "Sách trắng chiến lược về bảo vệ ứng dụng di động, chống dịch ngược và tự vệ chủ động (RASP) dành riêng cho khối Tài chính - Ngân hàng."}
              </p>
            </div>

            {/* Lời cảnh tỉnh - Warning Section */}
            <div className="bg-white border-l-4 border-rose-500 rounded-lg p-6 shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-700">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wide text-xs">
                  {isEn ? "The Reality Alert" : "Lời cảnh tỉnh thực tế"}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {isEn 
                  ? "In the digital era, mobile apps are the primary target for financial fraud. Malware using Overlay techniques can steal credentials silently. Is your banking app protected against Reverse Engineering?"
                  : "Trong kỷ nguyên số, ứng dụng di động là mục tiêu số 1 của tội phạm công nghệ cao. Mã độc sử dụng kỹ thuật Overlay (Bao phủ màn hình) có thể đánh cắp tài khoản một cách thầm lặng. App ngân hàng của bạn đã có khả năng chống dịch ngược chưa?"}
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  isEn ? "Overlay attacks & Screen scraping" : "Tấn công chiếm quyền màn hình (Overlay) & Quay lén",
                  isEn ? "App Repackaging & Reverse Engineering" : "Dịch ngược mã nguồn & Làm giả ứng dụng (Repackaging)",
                  isEn ? "Runtime manipulation & Hooking" : "Can thiệp bộ nhớ & Hooking khi ứng dụng đang chạy"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locked Preview */}
            <div className="relative group max-w-sm">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-10 rounded-lg flex flex-col items-center justify-center text-white p-6 text-center space-y-3 transition-all opacity-100">
                <Lock className="w-8 h-8 text-rose-300" />
                <p className="font-bold text-base uppercase tracking-wide">
                  {isEn ? "Content Locked" : "Nội dung đang được khóa"}
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isEn 
                    ? "Register below to receive the full PDF document" 
                    : "Đăng ký thông tin bên cạnh để nhận toàn bộ tài liệu bản PDF"}
                </p>
                <div className="pt-2">
                  <ArrowDown className="w-4 h-4 animate-bounce text-rose-300" />
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image 
                  src="/images/whitepaper-cover.png" 
                  alt="Guardsquare Whitepaper Cover" 
                  width={600} 
                  height={800} 
                  className="w-full grayscale-[0.5]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:sticky lg:top-32">
            <WhitepaperForm lang={lang} sourceIdentifier="whitepaper-guardsquare" />
            
            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale filter">
              <Image src="/images/sentinelLDK1.jpg" alt="Guardsquare" width={80} height={40} className="object-contain h-6" />
              <div className="w-px h-4 bg-slate-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Certified by FCT</span>
              <div className="w-px h-4 bg-slate-300" />
              <FileWarning className="w-5 h-5 text-slate-500" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
