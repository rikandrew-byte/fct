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
      {/* ── 1. Hero Section (Centered) ─────────────────────────────────── */}
      <section className="relative bg-[#020617] pt-32 pb-24 px-6 overflow-hidden">
        <NeuralNetworkBackground />

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[200px] -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              {isEn ? "Enterprise RFP Gateway" : "Cổng tiếp nhận hồ sơ giải pháp"}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase text-white">
            {isEn ? "Request for" : "Yêu cầu"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300">{isEn ? "Proposal" : "Giải pháp"}</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {isEn
              ? "Transform your infrastructure with world-class security. Submit your technical requirements below for a customized architectural blueprint and quote."
              : "Chuyển đổi hạ tầng bảo mật của bạn với tiêu chuẩn quốc tế. Gửi yêu cầu kỹ thuật để nhận thiết kế kiến trúc và báo giá tối ưu."
            }
          </p>
        </div>
      </section>

      {/* ── 2. Content Section (RFP Form) ─────────────────────────────── */}
      <section className="relative z-20 -mt-16 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-gray-200/50 mb-16">
            <div className="mb-12 text-center space-y-2">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{isEn ? "Expert Consultation Request" : "Gửi yêu cầu tư vấn"}</h2>
              <p className="text-gray-500 text-sm">{isEn ? "Share your needs and our security architects will design a customized plan for you." : "Chia sẻ nhu cầu của bạn để các chuyên gia bảo mật của chúng tôi tư vấn phương án tối ưu."}</p>
            </div>
            <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-gray-400 uppercase text-[10px] font-black tracking-widest animate-pulse">Initializing Secure Portal...</div>}>
              <RFPForm lang={lang} />
            </Suspense>
          </div>


          {/* HQ Location */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white border border-gray-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-gray-200/50">
            <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl bg-slate-50">
              <iframe
                title="Google Maps FCT Vinh Thinh Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.322596489379!2d105.83467477503!3d20.979697980655823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135add13ae6fb33%3A0x6739932145b736b4!2zTmfDtGkgU2FvIEJ1aWxkaW5n!5e0!3m2!1svi!2svn!4v1713500000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 text-blue-600 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{isEn ? "Address" : "Địa chỉ văn phòng"}</p>
                    <p className="text-lg font-bold text-gray-900 leading-tight">
                      Tầng 3, Tòa nhà Ngôi Sao, <br />15 Nguyễn Cảnh Dị, Hoàng Mai, Hà Nội.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 text-blue-600 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{isEn ? "Business Hours" : "Thời gian làm việc"}</p>
                    <p className="text-lg font-bold text-gray-900">
                      Thứ 2 - Thứ 6 | 08:30 - 17:30
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="https://maps.google.com/?q=Nguyễn+Cảnh+Dị,+Đại+Kim,+Hoàng+Mai,+Hà+Nội"
                target="_blank"
                className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all uppercase text-xs tracking-widest group shadow-xl"
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
