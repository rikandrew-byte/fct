import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  Activity,
  KeyRound,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Đối tác & Liên hệ | FCT Vinh Thinh JSC",
  description:
    "FCT Vinh Thinh JSC là đại lý phân phối chính thức của Thales, Guardsquare, Canary Labs và Longmai tại Việt Nam. Liên hệ để được tư vấn.",
};

const partners = [
  {
    id: "thales",
    name: "Thales",
    fullName: "Thales Group",
    tier: "Đại lý chính thức",
    category: "Bảo mật phần mềm – Sentinel LDK",
    productCount: 14,
    icon: Shield,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-800",
    accentBar: "bg-blue-800",
    badgeBg: "bg-blue-100 text-blue-800",
    btnColor: "text-blue-800 hover:bg-blue-50",
    description:
      "Thales là tập đoàn công nghệ hàng đầu thế giới trong lĩnh vực bảo mật kỹ thuật số với hơn 80,000 nhân viên toàn cầu. Dòng sản phẩm Sentinel LDK của Thales cung cấp giải pháp bảo vệ bản quyền phần mềm toàn diện — từ khóa USB phần cứng đến quản lý license đám mây.",
    website: "https://www.thales-esecurity.com",
    filterCategory: "Thales",
  },
  {
    id: "guardsquare",
    name: "Guardsquare",
    fullName: "Guardsquare NV",
    tier: "Đại lý chính thức",
    category: "Bảo mật ứng dụng di động",
    productCount: 2,
    icon: ShieldCheck,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    accentBar: "bg-sky-500",
    badgeBg: "bg-sky-100 text-sky-700",
    btnColor: "text-sky-700 hover:bg-sky-50",
    description:
      "Guardsquare (Bỉ) là nhà cung cấp giải pháp bảo vệ ứng dụng di động hàng đầu thế giới. DexGuard và iXGuard bảo vệ hàng ngàn ứng dụng Android/iOS trên toàn cầu bằng kỹ thuật che mờ, mã hóa và tự bảo vệ thời gian chạy (RASP) — thế hệ kế tiếp của ProGuard.",
    website: "https://www.guardsquare.com",
    filterCategory: "Guardsquare",
  },
  {
    id: "canary",
    name: "Canary Labs",
    fullName: "Canary Labs, Inc.",
    tier: "Đại lý phân phối",
    category: "Thu thập & phân tích dữ liệu công nghiệp",
    productCount: 1,
    icon: Activity,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    accentBar: "bg-amber-500",
    badgeBg: "bg-amber-100 text-amber-700",
    btnColor: "text-amber-700 hover:bg-amber-50",
    description:
      "Canary Labs (Mỹ) chuyên cung cấp phần mềm thu thập và lưu trữ dữ liệu lịch sử công nghiệp (historian). Hệ thống Canary Collectors hỗ trợ OPC UA/DA, MQTT và các giao thức SCADA phổ biến — phù hợp với nhà máy sản xuất, hệ thống giám sát và tự động hóa công nghiệp (IIoT).",
    website: "https://www.canarylabs.com",
    filterCategory: "Canary Labs",
  },
  {
    id: "longmai",
    name: "Longmai",
    fullName: "Longmai Technology Co., Ltd.",
    tier: "Đại lý phân phối",
    category: "Thiết bị xác thực & Bảo mật PKI",
    productCount: 3,
    icon: KeyRound,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    accentBar: "bg-red-500",
    badgeBg: "bg-red-100 text-red-700",
    btnColor: "text-red-700 hover:bg-red-50",
    description:
      "Longmai Technology (Trung Quốc) là nhà sản xuất thiết bị bảo mật phần cứng với hơn 20 năm kinh nghiệm. Sản phẩm hiện tại bao gồm SmartX1 (khóa bảo vệ bản quyền phần mềm), SmartX3 (USB token PKI) và TimePro (thiết bị OTP phần cứng) — tuân thủ các tiêu chuẩn quốc tế FIPS 140-2 và Common Criteria.",
    website: "https://longmaitech.com",
    filterCategory: "Longmai",
  },
];

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

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 pt-44 pb-28 px-6">
        {/* decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full">
            Hệ sinh thái công nghệ toàn cầu
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Đối tác &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              Liên hệ
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            FCT Vinh Thinh JSC là đại lý phân phối chính thức tại Việt Nam của những thương hiệu
            bảo mật và công nghệ hàng đầu thế giới.
          </p>
        </div>
      </div>

      {/* ── Partners Grid ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                id={`partner-${p.id}`}
                className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group flex flex-col"
              >
                {/* Coloured accent bar */}
                <div className={`h-1.5 w-full ${p.accentBar}`} />

                <div className="p-8 flex flex-col flex-1 gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${p.iconBg}`}
                      >
                        <Icon className={`w-7 h-7 ${p.iconColor}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">
                          {p.name}
                        </h2>
                        <p className="text-xs text-gray-400 font-light">{p.fullName}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shrink-0 ${p.badgeBg}`}
                    >
                      {p.tier}
                    </span>
                  </div>

                  {/* Category tag */}
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    {p.category}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed font-light flex-1">
                    {p.description}
                  </p>

                  {/* Footer links */}
                  <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                    <Link
                      href={`/products`}
                      className={`inline-flex items-center gap-2 text-sm font-bold transition-all px-3 py-2 rounded-xl ${p.btnColor}`}
                    >
                      Xem {p.productCount} sản phẩm
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Website chính thức
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Contact Section ───────────────────────────────────────────── */}
      <div className="bg-gray-950 py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-gray-500 font-light">
              Đội ngũ tư vấn của FCT Vinh Thinh sẵn sàng hỗ trợ bạn lựa chọn giải pháp phù hợp nhất.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-600 hover:bg-gray-800 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                      {item.label}
                    </p>
                    <p className="text-gray-200 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0983027776"
              id="contact-call-btn"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: 0983 027 776
            </a>
            <a
              href="https://zalo.me/0983027776"
              id="contact-zalo-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-800 text-gray-200 border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Chat qua Zalo
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
