import { Metadata } from "next";
import Image from "next/image";
import WhitepaperForm from "./WhitepaperForm";
import { ShieldAlert, CheckCircle2, Lock, ArrowDown, FileWarning } from "lucide-react";

export const metadata: Metadata = {
  title: "Sách trắng: Bảo vệ chất xám & Tối đa hóa doanh thu phần mềm | FCT Vĩnh Thịnh",
  description: "Tài liệu chuyên sâu về chiến lược cấp phép bản quyền và bảo mật ứng dụng dành cho nhà phát triển phần mềm.",
};

export default async function WhitepaperPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#fafafa]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/5 border border-blue-600/10 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {isEn ? "Expert Guide 2026" : "Tài liệu chuyên gia 2026"}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {isEn ? "Protect Intellectual Property" : "Bảo vệ chất xám &"} <br/>
                <span className="text-blue-600">{isEn ? "& Maximize Revenue" : "Tối đa hóa doanh thu"}</span>
              </h1>
              
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                {isEn 
                  ? "A strategic whitepaper on licensing models and application security for software publishers and enterprises."
                  : "Sách trắng chiến lược về mô hình cấp phép và bảo mật ứng dụng dành cho các nhà xuất bản phần mềm và doanh nghiệp."}
              </p>
            </div>

            {/* Lời cảnh tỉnh - Warning Section */}
            <div className="bg-white border-l-4 border-amber-500 rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-amber-600">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-black uppercase tracking-wider text-sm">
                  {isEn ? "The Reality Alert" : "Lời cảnh tỉnh thực tế"}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {isEn 
                  ? "In the digital era, source code is the 'blood' of the enterprise. Yet, 40% of software in use is unlicensed. Are you losing revenue to crackers or inefficient licensing models?"
                  : "Trong kỷ nguyên số, mã nguồn là 'mạch máu' của doanh nghiệp. Tuy nhiên, 40% phần mềm đang lưu hành là không có bản quyền. Bạn đang thất thoát doanh thu vào tay các 'cracker' hay vì mô hình cấp phép lạc hậu?"}
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  isEn ? "Source code leakage risks" : "Rủi ro lộ lọt mã nguồn và thuật toán lõi",
                  isEn ? "Revenue loss due to unauthorized usage" : "Thất thoát doanh thu do sử dụng trái phép",
                  isEn ? "Inefficient subscription management" : "Mô hình quản lý thuê bao thiếu linh hoạt"
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
              <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-md z-10 rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center space-y-4 transition-all opacity-100">
                <Lock className="w-12 h-12 mb-2 text-blue-300" />
                <p className="font-bold text-lg uppercase tracking-tight">
                  {isEn ? "Content Locked" : "Nội dung đang được khóa"}
                </p>
                <p className="text-xs text-blue-100 font-light leading-relaxed">
                  {isEn 
                    ? "Register below to receive the full 45-page PDF document" 
                    : "Đăng ký thông tin bên cạnh để nhận toàn bộ tài liệu 45 trang bản PDF"}
                </p>
                <div className="pt-2">
                  <ArrowDown className="w-5 h-5 animate-bounce text-blue-300" />
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image 
                  src="/images/whitepaper-cover.png" 
                  alt="Whitepaper Cover" 
                  width={600} 
                  height={800} 
                  className="w-full grayscale-[0.5]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:sticky lg:top-32">
            <WhitepaperForm lang={lang} />
            
            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale filter">
              <Image src="/images/sentinelLDK1.jpg" alt="Thales" width={80} height={40} className="object-contain h-6" />
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
