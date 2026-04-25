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
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#fafafa]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-amber-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/5 border border-amber-600/10 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                  {isEn ? "Industrial Data Guide 2026" : "Tài liệu Dữ liệu Nhà máy 2026"}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {isEn ? "Break SQL Limits &" : "Bứt phá giới hạn SQL &"} <br/>
                <span className="text-amber-600">{isEn ? "Visualize Millions of OT Data" : "Trực quan hóa Dữ liệu OT"}</span>
              </h1>
              
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                {isEn 
                  ? "A strategic whitepaper on high-speed industrial data logging, historical data management, and real-time visualization for Factory and OT Infrastructure."
                  : "Sách trắng chiến lược về lưu trữ dữ liệu công nghiệp tốc độ cao, quản trị dữ liệu quá khứ và trực quan hóa thời gian thực cho khối Nhà máy và Hạ tầng OT."}
              </p>
            </div>

            {/* Lời cảnh tỉnh - Warning Section */}
            <div className="bg-white border-l-4 border-amber-500 rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-amber-600">
                <Database className="w-6 h-6" />
                <h3 className="font-black uppercase tracking-wider text-sm">
                  {isEn ? "The Infrastructure Gap" : "Nỗi đau hạ tầng dữ liệu"}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {isEn 
                  ? "In modern manufacturing, OT data is gold. But traditional SQL often crumbles under millions of data points per second. Is your legacy database slowing down your operational intelligence?"
                  : "Trong sản xuất hiện đại, dữ liệu OT là mỏ vàng. Nhưng SQL truyền thống thường gục ngã trước hàng triệu điểm dữ liệu mỗi giây. Hệ quản trị dữ liệu cũ có đang làm chậm tiến trình thông minh hóa nhà máy của bạn?"}
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  isEn ? "SQL Server overload with massive Time-series data" : "SQL Server quá tải khi xử lý dữ liệu Time-series quy mô lớn",
                  isEn ? "Latency in real-time historical data retrieval" : "Trễ trong việc truy xuất dữ liệu quá khứ theo thời gian thực",
                  isEn ? "Lack of specialized tools for OT visualization" : "Thiếu hụt công cụ chuyên dụng để trực quan hóa dữ liệu OT"
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
              <div className="absolute inset-0 bg-amber-900/40 backdrop-blur-md z-10 rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center space-y-4 transition-all opacity-100">
                <Lock className="w-12 h-12 mb-2 text-amber-300" />
                <p className="font-bold text-lg uppercase tracking-tight">
                  {isEn ? "Content Locked" : "Nội dung đang được khóa"}
                </p>
                <p className="text-xs text-amber-100 font-light leading-relaxed">
                  {isEn 
                    ? "Register below to receive the full PDF document" 
                    : "Đăng ký thông tin bên cạnh để nhận toàn bộ tài liệu bản PDF"}
                </p>
                <div className="pt-2">
                  <ArrowDown className="w-5 h-5 animate-bounce text-amber-300" />
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
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
