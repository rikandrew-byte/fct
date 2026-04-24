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
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#fafafa]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-rose-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-400/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600/5 border border-rose-600/10 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">
                  {isEn ? "Mobile Security Guide 2026" : "Tài liệu Bảo mật Mobile 2026"}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {isEn ? "Defeat Mobile Malware" : "Đánh bại Mã độc &"} <br/>
                <span className="text-rose-600">{isEn ? "& Prevent Overlay Attacks" : "Ngăn chặn Tấn công Chiếm quyền"}</span>
              </h1>
              
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                {isEn 
                  ? "A strategic whitepaper on robust mobile application protection, reverse engineering prevention, and runtime application self-protection (RASP) for the financial sector."
                  : "Sách trắng chiến lược về bảo vệ ứng dụng di động, chống dịch ngược và tự vệ chủ động (RASP) dành riêng cho khối Tài chính - Ngân hàng."}
              </p>
            </div>

            {/* Lời cảnh tỉnh - Warning Section */}
            <div className="bg-white border-l-4 border-rose-500 rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-black uppercase tracking-wider text-sm">
                  {isEn ? "The Reality Alert" : "Lời cảnh tỉnh thực tế"}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {isEn 
                  ? "In the digital era, mobile apps are the primary target for financial fraud. Malware using Overlay techniques can steal credentials silently. Is your banking app protected against Reverse Engineering?"
                  : "Trong kỷ nguyên số, ứng dụng di động là mục tiêu số 1 của tội phạm công nghệ cao. Mã độc sử dụng kỹ thuật Overlay (Bao phủ màn hình) có thể đánh cắp tài khoản một cách thầm lặng. App ngân hàng của bạn đã có khả năng chống dịch ngược chưa?"}
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  isEn ? "Overlay attacks & Screen scraping" : "Tấn công chiếm quyền màn hình (Overlay) & Quay lén",
                  isEn ? "App Repackaging & Reverse Engineering" : "Dịch ngược mã nguồn & Làm giả ứng dụng (Repackaging)",
                  isEn ? "Runtime manipulation & Hooking" : "Can thiệp bộ nhớ & Hooking khi ứng dụng đang chạy"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locked Preview */}
            <div className="relative group max-w-sm">
              <div className="absolute inset-0 bg-rose-900/40 backdrop-blur-md z-10 rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center space-y-4 transition-all opacity-100">
                <Lock className="w-12 h-12 mb-2 text-rose-300" />
                <p className="font-bold text-lg uppercase tracking-tight">
                  {isEn ? "Content Locked" : "Nội dung đang được khóa"}
                </p>
                <p className="text-xs text-rose-100 font-light leading-relaxed">
                  {isEn 
                    ? "Register below to receive the full PDF document" 
                    : "Đăng ký thông tin bên cạnh để nhận toàn bộ tài liệu bản PDF"}
                </p>
                <div className="pt-2">
                  <ArrowDown className="w-5 h-5 animate-bounce text-rose-300" />
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
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
