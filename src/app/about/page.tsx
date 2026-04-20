"use client";

import Link from "next/link";
import {
  Shield,
  Award,
  Users,
  Globe,
  Zap,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  PackageCheck,
  HeartHandshake,
  ExternalLink,
} from "lucide-react";
import { partners } from "@/data/partners";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { motion } from "framer-motion";



const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "200+", label: "Khách hàng tin dùng" },
  { value: "18", label: "Sản phẩm phân phối" },
  { value: "4", label: "Đối tác toàn cầu" },
];

const values = [
  {
    icon: Shield,
    color: "bg-blue-50 text-blue-800",
    title: "Chính hãng 100%",
    desc: "Mọi sản phẩm đều được phân phối trực tiếp từ nhà sản xuất, có đầy đủ chứng từ xuất xứ và bảo hành chính thức tại Việt Nam.",
  },
  {
    icon: HeartHandshake,
    color: "bg-sky-50 text-sky-600",
    title: "Tận tâm hỗ trợ",
    desc: "Đội ngũ kỹ thuật được đào tạo bài bản, luôn sẵn sàng tư vấn và hỗ trợ khách hàng trong suốt quá trình triển khai và sau bán hàng.",
  },
  {
    icon: PackageCheck,
    color: "bg-amber-50 text-amber-600",
    title: "Giải pháp toàn diện",
    desc: "Không chỉ bán sản phẩm — chúng tôi cung cấp giải pháp đầu cuối từ tư vấn, lựa chọn sản phẩm phù hợp đến triển khai và vận hành.",
  },
  {
    icon: Globe,
    color: "bg-emerald-50 text-emerald-600",
    title: "Kết nối quốc tế",
    desc: "Đại lý chính thức của Thales (Pháp), Guardsquare (Bỉ), Canary Labs (Mỹ) — mang công nghệ hàng đầu thế giới đến Việt Nam.",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Thành lập",
    desc: "FCT Vinh Thinh JSC được thành lập tại Hà Nội, tập trung vào phân phối thiết bị bảo mật phần mềm.",
  },
  {
    year: "2013",
    title: "Đối tác Thales",
    desc: "Trở thành đại lý chính thức của Thales (SafeNet) tại Việt Nam, phân phối dòng Sentinel LDK.",
  },
  {
    year: "2017",
    title: "Mở rộng danh mục",
    desc: "Bổ sung Guardsquare (DexGuard, iXGuard) và Canary Labs vào danh mục sản phẩm, phục vụ bảo mật ứng dụng di động và IIoT.",
  },
  {
    year: "2022",
    title: "200+ khách hàng",
    desc: "Vượt mốc 200 khách hàng doanh nghiệp trên toàn quốc, bao gồm các tổ chức tài chính, ngân hàng và sản xuất.",
  },
  {
    year: "2026",
    title: "Chuyển đổi số",
    desc: "Ra mắt website thế hệ mới, nâng cao trải nghiệm khách hàng và mở rộng kênh phân phối trực tuyến.",
  },
];

const expertise = [
  "Bảo vệ bản quyền phần mềm (Software Licensing & Protection)",
  "Bảo mật ứng dụng Android & iOS (Mobile App Security)",
  "Thu thập & phân tích dữ liệu công nghiệp (Industrial IoT / Historian)",
  "Xác thực hai yếu tố & PKI (2FA / Digital Signature)",
  "Tư vấn triển khai hệ thống quản lý bản quyền (EMS / Entitlement)",
  "Hỗ trợ kỹ thuật & đào tạo sử dụng sản phẩm",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────── - TECH-HEAVY PLUS MODE */}
      <section className="relative pt-44 pb-32 px-6 min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
        <NeuralNetworkBackground />
        
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[180px] -z-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
            {/* Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-10"
            >
              <div className="inline-block bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 text-[11px] font-black text-blue-300 tracking-[0.4em] uppercase shadow-2xl">
                Về chúng tôi
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                Sứ mệnh bảo mật <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  Vững bước tương lai
                </span>
              </h1>
              <p className="text-gray-300 text-xl font-light leading-relaxed max-w-xl tracking-tight">
                Hơn 10 năm đồng hành cùng doanh nghiệp Việt trong việc bảo mật tài sản số và xây dựng hạ tầng dữ liệu đẳng cấp quốc tế.
              </p>
              <div className="flex flex-wrap gap-5 pt-6">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-tight hover:bg-blue-700 transition-all duration-500 shadow-2xl shadow-blue-500/40"
                >
                  Xem giải pháp <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-sm tracking-tight hover:bg-white/10 transition-all duration-500"
                >
                  Kết nối chuyên gia
                </Link>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5 shrink-0 w-full lg:w-auto">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 text-center group hover:border-blue-500/50 transition-colors duration-500 shadow-2xl"
                >
                  <p className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors">{s.value}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Giới thiệu ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Giới thiệu công ty
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight max-w-3xl">
            Chúng tôi là ai?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-600 text-base leading-relaxed font-light">
            <div className="space-y-5">
              <p>
                <strong className="font-semibold text-gray-900">FCT Vĩnh Thịnh JSC</strong> (Công
                ty Cổ phần Công nghệ FCT Vĩnh Thịnh) là một trong những đơn vị tiên phong tại Việt
                Nam trong lĩnh vực phân phối giải pháp{" "}
                <strong className="font-semibold text-gray-900">
                  bảo vệ bản quyền phần mềm
                </strong>
                ,{" "}
                <strong className="font-semibold text-gray-900">
                  thu thập dữ liệu công nghiệp
                </strong>
                .
              </p>
              <p>
                Thành lập từ năm 2010. Trụ sở chính đặt tại Hà Nội, chúng tôi phục vụ khách hàng
                trên toàn quốc — từ các công ty phần mềm vừa và nhỏ, tổ chức tài chính, ngân hàng
                đến các tập đoàn sản xuất và nhà máy công nghiệp.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                Là đại lý chính thức của{" "}
                <strong className="font-semibold text-gray-900">Thales</strong> (Pháp),{" "}
                <strong className="font-semibold text-gray-900">Guardsquare</strong> (Bỉ),{" "}
                <strong className="font-semibold text-gray-900">Canary Labs</strong> (Mỹ) và{" "}
                <strong className="font-semibold text-gray-900">Longmai</strong> (Trung Quốc), FCT
                Vĩnh Thịnh cam kết mang đến những giải pháp công nghệ đẳng cấp quốc tế với dịch vụ
                hỗ trợ kỹ thuật tại chỗ, bằng tiếng Việt.
              </p>
              <p>
                Chúng tôi không chỉ đơn thuần bán sản phẩm, mà còn{" "}
                <strong className="font-semibold text-gray-900">đồng hành tư vấn</strong>, hỗ trợ
                lựa chọn giải pháp phù hợp, triển khai và đào tạo sử dụng — đảm bảo khách hàng
                khai thác tối đa giá trị từ mỗi sản phẩm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giá trị cốt lõi ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              Giá trị cốt lõi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Tại sao chọn FCT Vĩnh Thịnh?
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
              Cam kết cung cấp giải pháp tốt nhất với dịch vụ hỗ trợ tận tâm nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 flex gap-6"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${v.color}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900">{v.title}</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lĩnh vực chuyên môn ──────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Chuyên môn
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                Lĩnh vực chúng tôi am hiểu sâu nhất
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Đội ngũ kỹ thuật của FCT Vĩnh Thịnh được đào tạo trực tiếp bởi các nhà sản xuất,
                đảm bảo tư vấn chính xác và hỗ trợ triển khai chuyên nghiệp.
              </p>
            </div>
            <ul className="space-y-4">
              {expertise.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              Hành trình
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Chặng đường phát triển
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-100 md:left-1/2" />

            <div className="space-y-10">
              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  className={`relative flex gap-8 items-start ${
                    idx % 2 === 0
                      ? "md:flex-row text-left"
                      : "md:flex-row-reverse text-left md:text-right"
                  }`}
                >
                  {/* Year bubble */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white font-black text-sm shadow-lg shadow-blue-800/20 ml-0.5 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0">
                    {m.year.slice(2)}
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 ml-6 md:ml-0 ${
                      idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm inline-block w-full md:max-w-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {m.year}
                        </span>
                        <h3 className="font-black text-gray-900">{m.title}</h3>
                      </div>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Đối tác chiến lược ───────────────────────────────────────── */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Mạng lưới toàn cầu
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Đối tác chiến lược
              </h2>
              <p className="text-gray-500 font-light text-lg max-w-2xl">
                Chúng tôi tự hào là đại diện chính thức của những thương hiệu công nghệ và bảo mật
                hàng đầu thế giới tại Việt Nam.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group flex flex-col"
                >
                  <div className={`h-1.5 w-full ${p.accentBar}`} />
                  <div className="p-8 flex flex-col flex-1 gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${p.iconBg}`}
                        >
                          <Icon className={`w-7 h-7 ${p.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-light">{p.fullName}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shrink-0 ${p.badgeBg}`}
                      >
                        {p.tier}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed font-light flex-1">
                      {p.description}
                    </p>
                    <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                      <Link
                        href={`/products`}
                        className={`inline-flex items-center gap-2 text-sm font-bold transition-all px-3 py-2 rounded-xl ${p.btnColor}`}
                      >
                        Xem sản phẩm
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Liên hệ ─────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-gray-400 font-light text-lg max-w-xl mx-auto">
            Hãy liên hệ với chúng tôi để được tư vấn miễn phí về giải pháp phù hợp nhất với nhu
            cầu của doanh nghiệp bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0983027776"
              id="about-contact-call"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-5 h-5" />
              Gọi: 0983 027 776
            </a>
            <a
              href="mailto:andrew@fct.vn"
              id="about-contact-email"
              className="flex items-center justify-center gap-2 bg-gray-800 text-gray-200 border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all"
            >
              <Mail className="w-5 h-5" />
              andrew@fct.vn
            </a>
            <Link
              href="/products"
              id="about-view-products"
              className="flex items-center justify-center gap-2 bg-gray-800 text-gray-200 border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all"
            >
              <Award className="w-5 h-5" />
              Xem sản phẩm
            </Link>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
            <span className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              Tầng 03 tòa nhà Ngôi Sao, ô 15 lô B đường Nguyễn Cảnh Dị, Phường Đại Kim, Quận Hoàng Mai, Hà Nội
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
