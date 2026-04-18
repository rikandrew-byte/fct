"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Target } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "An Toàn & Bảo Mật",
    description: "Giải pháp an ninh mạng toàn diện bảo vệ tối đa dữ liệu doanh nghiệp.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: "Hiệu Suất Vượt Trội",
    description: "Tối ưu hóa sức mạnh hạ tầng IT để nền tảng luôn hoạt động ở tốc độ cao nhất.",
  },
  {
    icon: <Globe className="w-6 h-6 text-emerald-500" />,
    title: "Kết Nối Toàn Cầu",
    description: "Đảm bảo sự liên thông không giới hạn và liền mạch qua các nền tảng mạng lõi.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Trái: Nội dung */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Về Chúng Tôi</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Đồng Hành Cùng Doanh Nghiệp Trong Kỷ Nguyên Số
            </h3>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              Chúng tôi không chỉ cung cấp dịch vụ, mà mang đến <strong>hệ sinh thái công nghệ trọn vẹn</strong>. Bằng sự am hiểu chuyên sâu và năng lực đối tác toàn cầu, chúng tôi giúp các tổ chức vượt qua giới hạn và bứt phá doanh thu.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                Tìm hiểu thêm về FCT Vĩnh Thịnh <span className="text-xl">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Phải: Grid tính năng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-50/80 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:bg-white transition-all duration-300"
              >
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
