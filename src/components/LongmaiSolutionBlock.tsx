"use client";

import { motion } from "framer-motion";
import { Zap, Users, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LongmaiSolutionBlockProps {
  isEn?: boolean;
  lang?: string;
}

export default function LongmaiSolutionBlock({ isEn = false, lang = "vi" }: LongmaiSolutionBlockProps) {
  const content = isEn
    ? {
        badge: "Alternative Solution",
        title: "Longmai PKI/HSM",
        subtitle: "Budget-Optimized Security Infrastructure",
        description: "Mid-market enterprises need enterprise-grade security without enterprise-grade complexity. Longmai delivers.",
        features: [
          {
            icon: <Zap className="w-8 h-8" />,
            title: "Fast Deployment",
            desc: "Deploy in days, not months. Minimal infrastructure changes, maximum security impact.",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Simplified Operations",
            desc: "No cryptography experts needed. Intuitive management console, automated key lifecycle.",
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Cost-Effective",
            desc: "Predictable licensing model. No hidden fees. Scales with your business growth.",
            color: "from-emerald-500 to-teal-500"
          }
        ],
        cta: "Explore Longmai Solutions",
        positioning: "Flexible Alternative to Enterprise HSM"
      }
    : {
        badge: "Giải pháp Thay thế",
        title: "Longmai PKI/HSM",
        subtitle: "Hạ tầng Bảo mật Tối ưu Ngân sách",
        description: "Doanh nghiệp tầm trung cần bảo mật cấp doanh nghiệp mà không cần độ phức tạp cấp doanh nghiệp. Longmai cung cấp điều đó.",
        features: [
          {
            icon: <Zap className="w-8 h-8" />,
            title: "Triển khai Nhanh chóng",
            desc: "Triển khai trong vài ngày, không phải vài tháng. Thay đổi hạ tầng tối thiểu, tác động bảo mật tối đa.",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Vận hành Đơn giản",
            desc: "Không cần chuyên gia mã hóa. Giao diện quản lý trực quan, vòng đời khóa tự động.",
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Chi phí Hợp lý",
            desc: "Mô hình cấp phép dự đoán được. Không phí ẩn. Mở rộng theo sự phát triển của doanh nghiệp.",
            color: "from-emerald-500 to-teal-500"
          }
        ],
        cta: "Khám phá Giải pháp Longmai",
        positioning: "Lựa chọn Thay thế Linh hoạt cho HSM Cấp doanh nghiệp"
      };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-block text-emerald-600 font-semibold text-xs uppercase tracking-[0.4em] bg-emerald-50 px-4 py-2 rounded-full">
            {content.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-gray-900">
            {content.title}
          </h2>
          <p className="text-xl text-emerald-700 font-bold tracking-wide">
            {content.subtitle}
          </p>
          <p className="text-gray-600 text-lg font-light max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {content.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 h-full space-y-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-3 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-light leading-relaxed text-base">
                  {feature.desc}
                </p>

                {/* Accent line */}
                <div className={`h-1 w-12 bg-gradient-to-r ${feature.color} rounded-full`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Positioning Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-sm font-light italic">
            {content.positioning}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href={`/${lang}/products/longmai`}
            className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-600/30 flex items-center gap-3 group"
          >
            {content.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Bottom accent */}
        <div className="mt-20 pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-xs font-light">
            {isEn
              ? "Longmai is a flexible alternative to enterprise HSM solutions, designed for mid-market organizations seeking cost-effective security without complexity."
              : "Longmai là lựa chọn thay thế linh hoạt cho các giải pháp HSM cấp doanh nghiệp, được thiết kế cho các tổ chức tầm trung tìm kiếm bảo mật tiết kiệm chi phí mà không có độ phức tạp."}
          </p>
        </div>
      </div>
    </section>
  );
}
