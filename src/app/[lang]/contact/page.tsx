import { Metadata } from "next";
import { Suspense } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/config/i18n-config";
import Link from "next/link";
import RFPForm from "./RFPForm";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  
  return {
    title: `RFP | ${dict.contact.metaTitle}`,
    description: "Submit a Request for Proposal for enterprise-grade security solutions.",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-slate-50 text-gray-950 selection:bg-blue-600">
      {/* ── 1. Hero / Header ─────────────────────────────────────────── */}
      <section className="relative bg-[#020617] pt-24 pb-12 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[200px] -z-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                  {isEn ? "Enterprise RFP Gateway" : "Cổng tiếp nhận hồ sơ giải pháp"}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase text-white">
                {isEn ? "Request for" : "Yêu cầu"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300">
                  {isEn ? "Proposal" : "Giải pháp"}
                </span>
              </h1>

              <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl">
                {isEn 
                  ? "Transform your infrastructure with world-class security. Submit your technical requirements below for a customized architectural blueprint and quote."
                  : "Chuyển đổi hạ tầng bảo mật của bạn với tiêu chuẩn quốc tế. Gửi yêu cầu kỹ thuật để nhận thiết kế kiến trúc và báo giá tối ưu."
                }
              </p>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl space-y-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] uppercase font-black text-slate-500">{isEn ? "Expert Hotline" : "Đường dây chuyên gia"}</p>
                  <p className="font-bold text-lg text-white">0983 027 776</p>
                </div>
                <div className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl space-y-3">
                  <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] uppercase font-black text-slate-500">{isEn ? "Technical Inquiry" : "Email kỹ thuật"}</p>
                  <p className="font-bold text-lg text-white">andrew@fct.vn</p>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative bg-[#020617]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                
                <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-slate-500 uppercase text-[10px] font-black tracking-widest animate-pulse">Initializing Secure Portal...</div>}>
                  <RFPForm lang={lang} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. HQ Location ───────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="w-full aspect-video rounded-[3rem] overflow-hidden border border-gray-200 shadow-3xl bg-slate-100 group relative">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.322596489379!2d105.83467477503!3d20.979697980655823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135add13ae6fb33%3A0x6739932145b736b4!2zTmfDtGkgU2FvIEJ1aWxkaW5n!5e0!3m2!1svi!2svn!4v1713500000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:contrast-[1.1] transition-all duration-1000"
              ></iframe>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">{isEn ? "Address" : "Địa chỉ văn phòng"}</p>
                    <p className="text-lg font-bold text-gray-900">
                      Tầng 4, Tòa nhà Ngôi Sao, 15 Nguyễn Cảnh Dị, <br />
                      Đại Kim, Hoàng Mai, Hà Nội.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">{isEn ? "Business Hours" : "Thời gian làm việc"}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {isEn ? "Monday - Friday | 08:30 - 17:30" : "Thứ 2 - Thứ 6 | 08:30 - 17:30"}
                    </p>
                  </div>
                </div>
              </div>

              <Link 
                href="https://maps.google.com/?q=Nguyễn+Cảnh+Dị,+Đại+Kim,+Hoàng+Mai,+Hà+Nội"
                target="_blank"
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all uppercase text-xs tracking-widest group shadow-lg shadow-blue-500/20"
              >
                {isEn ? "View on Google Maps" : "Xem trên Bản đồ"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
