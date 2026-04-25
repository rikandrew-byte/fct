"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Database, 
  Cpu, 
  LayoutDashboard, 
  Zap, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Server,
  Network,
  Gauge,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import CanaryArchitecture from "@/components/CanaryArchitecture";
import { useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

interface CanaryLabsClientProps {
  lang: string;
  dict: any;
}

export default function CanaryLabsClient({ lang, dict }: CanaryLabsClientProps) {
  const isEn = lang === "en";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 text-gray-950 selection:bg-amber-500 selection:text-black">
      {/* ── 1. HERO SECTION ───────────────────────── */}
      <section className="relative min-h-[70vh] pt-32 pb-24 flex items-center justify-center overflow-hidden px-6 bg-[#020617]">
        <NeuralNetworkBackground />
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center space-y-8 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Activity className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">
               {isEn ? "Industrial Data Historian" : "Dữ liệu Công nghiệp & IIoT"}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic text-white">
            Canary <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Labs</span>
          </h1>
          
          <p className="text-slate-400 text-xl font-light max-w-3xl mx-auto leading-relaxed">
            {isEn 
              ? "The world's highest performing Industrial Data Historian. Optimized for over 35 years to handle millions of data points per second with total reliability."
              : "Giải pháp Industrial Data Historian hiệu suất cao nhất thế giới. Được tối ưu hóa trong hơn 35 năm để xử lý hàng triệu điểm dữ liệu mỗi giây với độ tin cậy tuyệt đối."
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
             <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-2">
                <span className="text-4xl font-black text-amber-400">1.5M</span>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Writes Per Second" : "Tham số / Giây"}</p>
             </div>
             <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-2">
                <span className="text-4xl font-black text-amber-400">19,000+</span>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Deployments" : "Dự án triển khai"}</p>
             </div>
             <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-2">
                <span className="text-4xl font-black text-amber-400">35yr</span>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isEn ? "Excellence" : "Năm kinh nghiệm"}</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. ARCHITECTURAL BLUEPRINT ───────────────────────── */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20 text-gray-900">
               <h2 className="text-4xl font-black uppercase tracking-tighter">{isEn ? "The IIoT Architecture" : "Kiến trúc luồng dữ liệu IIoT"}</h2>
               <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full"></div>
            </div>

            <CanaryArchitecture isEn={isEn} />

            {/* CTA BELOW BLUEPRINT */}
            <div className="mt-16 flex justify-center">
              <Link 
                href={`/${lang}/contact?solution=hsm`}
                className="bg-amber-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-700 transition-all flex items-center gap-3 shadow-xl shadow-amber-500/20 group hover:scale-[1.02]"
              >
                {isEn ? "Request IIoT Architecture Consultation" : "Tư vấn kiến trúc IIoT chuyên sâu"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
         </div>
      </section>

      {/* ── 3. VALUES SECTION ───────────────────────── */}
      <section className="py-24 px-6 relative bg-slate-50">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <div className="w-16 h-16 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm">
                  <Database className="w-8 h-8" />
               </div>
               <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase italic text-gray-900">
                 {isEn ? "High Density Industrial Insights" : "Gia tăng giá trị từ dữ liệu công nghiệp"}
               </h2>
               <p className="text-gray-500 text-lg font-light leading-relaxed">
                 {isEn 
                    ? "Canary Labs isn't just a database. It's a comprehensive platform for teams to capture, store, and analyze operational data to make informed decisions."
                    : "Canary Labs không chỉ là một cơ sở dữ liệu. Đây là một nền tảng toàn diện để các đội ngũ thu thập, lưu trữ và phân tích dữ liệu vận hành nhằm đưa ra quyết định chính xác."
                 }
               </p>
               
               <div className="space-y-4 pt-4">
                  {[
                    "Lossless Data Compression",
                    "No SQL Maintenance Required",
                    "OPC Foundation Certified",
                    "Unlimited Axiom Client Licenses"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600 font-semibold group">
                       <ShieldCheck className="w-5 h-5 text-amber-600 group-hover:scale-125 transition-transform" />
                       {isEn ? feat : (
                         i === 0 ? "Nén dữ liệu không mất mát" :
                         i === 1 ? "Không cần bảo trì SQL" :
                         i === 2 ? "Chứng nhận OPC Foundation" :
                         "Không giới hạn giấy phép người dùng"
                       )}
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
               <div className="bg-white p-10 rounded-[3rem] space-y-6 group border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-amber-500/30 transition-all">
                  <Network className="w-10 h-10 text-amber-600" />
                  <h4 className="text-2xl font-black uppercase italic text-gray-900">{isEn ? "Interoperability" : "Khả năng tương thích"}</h4>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {isEn 
                      ? "Seamlessly connect to any SCADA, PLC, or IoT device. Canary supports standard protocols like MQTT Sparkplug B and OPC UA out of the box."
                      : "Kết nối mượt mà với mọi thiết bị SCADA, PLC hoặc IoT. Canary hỗ trợ sẵn các giao thức tiêu chuẩn như MQTT Sparkplug B và OPC UA."
                    }
                  </p>
               </div>
               <div className="bg-white p-10 rounded-[3rem] space-y-6 md:translate-x-4 border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-teal-500/30 transition-all">
                  <Gauge className="w-10 h-10 text-teal-600" />
                  <h4 className="text-2xl font-black uppercase italic text-gray-900">{isEn ? "Axiom Dashboards" : "Dashboard Axiom"}</h4>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {isEn 
                      ? "Build and deploy mobile-ready dashboards in minutes. Axiom provides a drag-and-drop environment for complex data visualization."
                      : "Xây dựng và triển khai bảng điều khiển di động trong vài phút. Axiom cung cấp môi trường kéo-thả để trực quan hóa dữ liệu phức tạp."
                    }
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ── 4. CTA FOOTER ───────────────────────── */}
      <section className="py-24 px-6 flex flex-col items-center justify-center text-center bg-white border-t border-gray-100">
         <div className="max-w-4xl w-full bg-gray-900 rounded-[3.5rem] p-16 space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
               {isEn ? "Scale Your Factory to IIoT Today" : "Nâng tầm nhà máy với IIoT"}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link 
                  href={`/${lang}/contact?solution=hsm`}
                  className="px-12 py-5 bg-amber-600 text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
                >
                  {isEn ? "Get Custom Quote" : "Nhận báo giá giải pháp"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
         </div>
      </section>
    </main>
  );
}
