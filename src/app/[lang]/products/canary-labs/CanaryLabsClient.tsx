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
import TechGridBackground from "@/components/TechGridBackground";
import dynamic from "next/dynamic";
const CanaryArchitecture = dynamic(() => import("@/components/CanaryArchitecture"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-slate-900/50 animate-pulse rounded-lg" />
});
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
    <main ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* ── 1. HERO SECTION (Slate-900 Blueprint) ───────────────────── */}
      <section className="relative min-h-[60vh] pt-28 pb-20 flex items-center justify-center overflow-hidden px-6 bg-slate-900 border-b border-slate-800">
        <TechGridBackground />
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center space-y-6 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/60 border border-amber-800/80 rounded-sm">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300">
               {isEn ? "Industrial Data Historian" : "Dữ liệu Công nghiệp & IIoT"}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
            Canary <span className="text-amber-400">Labs</span>
          </h1>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            {isEn 
              ? "The world's leading Industrial Data Historian platform. Optimized over 35 years to handle 1.5 million data points per second with zero data loss guarantee."
              : "Nền tảng Industrial Data Historian hàng đầu thế giới. Được tối ưu hóa trong hơn 35 năm để xử lý 1.5 triệu điểm dữ liệu mỗi giây với cam kết Zero Data Loss."
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
             <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-lg space-y-1">
                <span className="text-3xl font-black text-amber-400">1.5M</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{isEn ? "Writes Per Second" : "Tham số / Giây"}</p>
             </div>
             <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-lg space-y-1">
                <span className="text-3xl font-black text-amber-400">19,000+</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{isEn ? "Deployments" : "Dự án triển khai"}</p>
             </div>
             <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-lg space-y-1">
                <span className="text-3xl font-black text-amber-400">35yr</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{isEn ? "Excellence" : "Năm kinh nghiệm"}</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. ARCHITECTURAL BLUEPRINT ───────────────────────── */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
         <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-14 text-slate-900">
               <span className="text-amber-700 font-bold text-xs uppercase tracking-[0.3em]">OT Data Pipeline</span>
               <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">{isEn ? "The IIoT Architecture" : "Kiến trúc luồng dữ liệu IIoT"}</h2>
            </div>

            <CanaryArchitecture isEn={isEn} />

            {/* CTA BELOW BLUEPRINT */}
            <div className="mt-12 flex justify-center">
              <Link 
                href={`/${lang}/contact?solution=hsm`}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide transition-colors inline-flex items-center gap-2"
              >
                {isEn ? "Request IIoT Architecture Consultation" : "Tư vấn kiến trúc IIoT chuyên sâu"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
         </div>
      </section>

      {/* ── 3. VALUES SECTION ───────────────────────── */}
      <section className="py-20 px-6 relative bg-slate-50 border-b border-slate-200">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
               <div className="w-10 h-10 bg-amber-50 rounded-sm flex items-center justify-center text-amber-700 border border-amber-200">
                  <Database className="w-5 h-5" />
               </div>
               <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
                 {isEn ? "High Density Industrial Insights" : "Gia tăng giá trị từ dữ liệu công nghiệp"}
               </h2>
               <p className="text-slate-600 text-base leading-relaxed">
                 {isEn 
                    ? "Canary Labs isn't just a database. It's a comprehensive platform for teams to capture, store, and analyze operational data to make informed decisions."
                    : "Canary Labs không chỉ là một cơ sở dữ liệu. Đây là nền tảng toàn diện để các đội ngũ thu thập, lưu trữ và phân tích dữ liệu vận hành nhằm đưa ra quyết định chính xác."
                 }
               </p>
               
               <div className="space-y-3 pt-2">
                  {[
                    "Lossless Data Compression",
                    "No SQL Maintenance Required",
                    "OPC Foundation Certified",
                    "Unlimited Axiom Client Licenses"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                       <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
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
               <div className="bg-white p-8 rounded-lg space-y-4 border border-slate-200 hover:border-slate-400 transition-colors">
                  <Network className="w-8 h-8 text-amber-700" />
                  <h4 className="text-xl font-bold uppercase text-slate-900">{isEn ? "Interoperability" : "Khả năng tương thích"}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {isEn 
                      ? "Seamlessly connect to any SCADA, PLC, or IoT device. Canary supports standard protocols like MQTT Sparkplug B and OPC UA out of the box."
                      : "Kết nối mượt mà với mọi thiết bị SCADA, PLC hoặc IoT. Canary hỗ trợ sẵn các giao thức tiêu chuẩn như MQTT Sparkplug B và OPC UA."
                    }
                  </p>
               </div>
               <div className="bg-white p-8 rounded-lg space-y-4 border border-slate-200 hover:border-slate-400 transition-colors">
                  <Gauge className="w-8 h-8 text-teal-700" />
                  <h4 className="text-xl font-bold uppercase text-slate-900">{isEn ? "Axiom Dashboards" : "Dashboard Axiom"}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
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
      <section className="py-20 px-6 flex flex-col items-center justify-center text-center bg-white">
         <div className="max-w-4xl w-full bg-slate-900 rounded-lg p-10 md:p-14 space-y-6 relative overflow-hidden border border-slate-800 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
               {isEn ? "Scale Your Factory to IIoT Today" : "Nâng tầm nhà máy với IIoT"}
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
               {isEn
                 ? "Connect with FCT's industrial automation team to evaluate architecture and deploy Canary Historian in your environment."
                 : "Liên hệ với đội ngũ tự động hóa công nghiệp của FCT để đánh giá kiến trúc và triển khai Canary Historian cho nhà máy của bạn."
               }
            </p>
            <div className="flex justify-center gap-4 pt-2">
                <Link 
                  href={`/${lang}/contact?solution=hsm`}
                  className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-sm font-semibold text-sm tracking-wide transition-colors inline-flex items-center gap-2"
                >
                  {isEn ? "Get Custom Quote" : "Nhận báo giá giải pháp"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
         </div>
      </section>
    </main>
  );
}
