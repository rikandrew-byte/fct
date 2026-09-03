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
import TechGridBackground from "@/components/TechGridBackground";

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
      {/* ── 1. Hero Section ─────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <TechGridBackground />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 border border-blue-500 bg-blue-900/50 text-blue-300 text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-1.5 rounded-sm">
            <ShieldAlert className="w-3.5 h-3.5" />
            {isEn ? "Enterprise RFP Gateway" : "Cổng tiếp nhận hồ sơ giải pháp"}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight text-white">
            {isEn ? "Request for " : "Yêu cầu "}
            <span className="text-blue-400">{isEn ? "Proposal" : "Giải pháp"}</span>
          </h1>

          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            {isEn
              ? "Transform your infrastructure with world-class security. Submit your technical requirements below for a customized architectural blueprint and quote."
              : "Chuyển đổi hạ tầng bảo mật của bạn với tiêu chuẩn quốc tế. Gửi yêu cầu kỹ thuật để nhận thiết kế kiến trúc và báo giá tối ưu."
            }
          </p>
        </div>
      </section>

      {/* ── 2. Content Section (RFP Form) ─────────────────────────────── */}
      <section className="relative z-20 -mt-8 sm:-mt-16 px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 md:p-14 shadow-sm mb-8 sm:mb-12">
            <div className="mb-10 space-y-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{isEn ? "Expert Consultation Request" : "Gửi yêu cầu tư vấn"}</h2>
              <p className="text-slate-500 text-sm">{isEn ? "Share your needs and our security architects will design a customized plan for you." : "Chia sẻ nhu cầu của bạn để các chuyên gia bảo mật của chúng tôi tư vấn phương án tối ưu."}</p>
            </div>
            <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-slate-400 uppercase text-[10px] font-bold tracking-widest">Initializing Secure Portal...</div>}>
              <RFPForm lang={lang} />
            </Suspense>
          </div>


          {/* HQ Location */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center bg-white border border-slate-200 rounded-lg p-6 sm:p-8 md:p-12 shadow-sm">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-slate-200">
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

            <div className="space-y-6">
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center shrink-0 border border-slate-200 text-slate-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{isEn ? "Address" : "Địa chỉ văn phòng"}</p>
                    <p className="text-base font-semibold text-slate-900 leading-snug">
                      Tầng 3, Tòa nhà Ngôi Sao, <br />15 Nguyễn Cảnh Dị, Hoàng Mai, Hà Nội.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center shrink-0 border border-slate-200 text-slate-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{isEn ? "Business Hours" : "Thời gian làm việc"}</p>
                    <p className="text-base font-semibold text-slate-900">
                      Thứ 2 - Thứ 6 | 08:30 - 17:30
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="https://maps.google.com/?q=Nguyễn+Cảnh+Dị,+Đại+Kim,+Hoàng+Mai,+Hà+Nội"
                target="_blank"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-black transition-colors text-sm tracking-wide group"
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
