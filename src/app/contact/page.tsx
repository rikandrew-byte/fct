import { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Liên hệ | FCT Vinh Thinh JSC",
  description:
    "Liên hệ với FCT Vinh Thinh JSC để được tư vấn về các giải pháp bảo mật phần mềm, ứng dụng di động và dữ liệu công nghiệp.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "Tầng 03 tòa nhà Ngôi Sao, ô 15 lô B đường Nguyễn Cảnh Dị, Phường Đại Kim, Quận Hoàng Mai, Hà Nội",
    href: "https://maps.google.com/?q=Nguyễn+Cảnh+Dị,+Đại+Kim,+Hoàng+Mai,+Hà+Nội",
    color: "bg-blue-600/10 text-blue-500",
  },
  {
    icon: Phone,
    label: "Hotline",
    value: "0983 027 776",
    href: "tel:0983027776",
    color: "bg-emerald-600/10 text-emerald-500",
  },
  {
    icon: Mail,
    label: "Email",
    value: "andrew@fct.vn",
    href: "mailto:andrew@fct.vn",
    color: "bg-violet-600/10 text-violet-500",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 pt-44 pb-28 px-6 text-center">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full">
            Kết nối với chúng tôi
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Liên hệ với{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              chúng tôi
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            FCT Vinh Thinh luôn sẵn sàng lắng nghe và đồng hành cùng doanh nghiệp bạn trong mọi giải pháp công nghệ.
          </p>
        </div>
      </div>

      {/* ── Contact Info Grid ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group flex flex-col items-center text-center gap-6"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    {item.label}
                  </p>
                  <p className="text-gray-900 font-semibold leading-relaxed group-hover:text-blue-600 transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Form & Maps Section ──────────────────────────────────────── */}
      <div className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Gửi yêu cầu tư vấn
            </h2>
            <p className="text-gray-500 font-light max-w-xl mx-auto">
              Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0983027776"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: 0983 027 776
            </a>
            <a
              href="https://zalo.me/0983027776"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-950 text-white px-10 py-5 rounded-2xl font-bold hover:bg-black transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Chat qua Zalo
            </a>
          </div>

          {/* Map Placeholder/Embed */}
          <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-inner bg-gray-50 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.322596489379!2d105.83467477503!3d20.979697980655823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135add13ae6fb33%3A0x6739932145b736b4!2zTmfDtGkgU2FvIEJ1aWxkaW5n!5e0!3m2!1svi!2svn!4v1713500000000!5m2!1svi!2svn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
