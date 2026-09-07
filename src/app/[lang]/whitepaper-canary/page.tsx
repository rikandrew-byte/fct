import { Metadata } from "next";
import Image from "next/image";
import WhitepaperForm from "@/app/[lang]/whitepaper/WhitepaperForm";
import { ShieldAlert, CheckCircle2, Lock, ArrowDown, FileWarning, Database, Cpu, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sách trắng: Tối ưu hóa Dữ liệu Vận hành & Canary Historian | FCT Vĩnh Thịnh",
  description: "Tài liệu chuyên sâu về giải pháp lưu trữ dữ liệu tốc độ cao và trực quan hóa hàng triệu điểm dữ liệu OT cho nhà máy.",
};

export default async function WhitepaperCanaryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
                  {isEn ? "Industrial Data Guide 2026" : "Tài liệu Dữ liệu Nhà máy 2026"}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                {isEn ? "Break SQL Limits &" : "Bứt phá giới hạn SQL &"} <br/>
                <span className="text-amber-600">{isEn ? "Visualize Millions of OT Data" : "Trực quan hóa Dữ liệu OT"}</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                {isEn 
                  ? "A strategic whitepaper on high-speed industrial data logging, historical data management, and real-time visualization for Factory and OT Infrastructure."
                  : "Sách trắng chiến lược về lưu trữ dữ liệu công nghiệp tốc độ cao, quản trị dữ liệu quá khứ và trực quan hóa thời gian thực cho khối Nhà máy và Hạ tầng OT."}
              </p>
            </div>

            {/* Lời cảnh tỉnh - Warning Section */}
            <div className="bg-white border-l-4 border-amber-500 rounded-lg p-6 shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <Database className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wide text-xs">
                  {isEn ? "The Infrastructure Gap" : "Nỗi đau hạ tầng dữ liệu"}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {isEn 
                  ? "In modern manufacturing, OT data is gold. But traditional SQL often crumbles under millions of data points per second. Is your legacy database slowing down your operational intelligence?"
                  : "Trong sản xuất hiện đại, dữ liệu OT là mỏ vàng. Nhưng SQL truyền thống thường gục ngã trước hàng triệu điểm dữ liệu mỗi giây. Hệ quản trị dữ liệu cũ có đang làm chậm tiến trình thông minh hóa nhà máy của bạn?"}
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  isEn ? "SQL Server overload with massive Time-series data" : "SQL Server quá tải khi xử lý dữ liệu Time-series quy mô lớn",
                  isEn ? "Latency in real-time historical data retrieval" : "Trễ trong việc truy xuất dữ liệu quá khứ theo thời gian thực",
                  isEn ? "Lack of specialized tools for OT visualization" : "Thiếu hụt công cụ chuyên dụng để trực quan hóa dữ liệu OT"
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
                <Lock className="w-8 h-8 text-amber-300" />
                <p className="font-bold text-base uppercase tracking-wide">
                  {isEn ? "Content Locked" : "Nội dung đang được khóa"}
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isEn 
                    ? "Register below to receive the full PDF document" 
                    : "Đăng ký thông tin bên cạnh để nhận toàn bộ tài liệu bản PDF"}
                </p>
                <div className="pt-2">
                  <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image 
                  src="/images/whitepaper-cover.png" 
                  alt="Canary Historian Whitepaper Cover" 
                  width={600} 
                  height={800} 
                  className="w-full grayscale-[0.5]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:sticky lg:top-32">
            <WhitepaperForm lang={lang} sourceIdentifier="whitepaper-canary" />
            
            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale filter">
              <Image src="/images/sentinelLDK1.jpg" alt="Canary" width={80} height={40} className="object-contain h-6" />
              <div className="w-px h-4 bg-slate-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">OT Excellence by FCT</span>
              <div className="w-px h-4 bg-slate-300" />
              <BarChart3 className="w-5 h-5 text-slate-500" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
