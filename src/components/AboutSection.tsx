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
    <section className="py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Trái: Nội dung */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-[11px] font-black text-blue-600 tracking-[0.3em] uppercase">Về Chúng Tôi</h2>
              <h3 className="text-4xl md:text-6xl font-black text-gray-950 leading-[0.95] tracking-tighter">
                Đồng Hành Cùng Doanh Nghiệp <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Trong Kỷ Nguyên Số
                </span>
              </h3>
            </div>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed tracking-tight max-w-xl">
              Chúng tôi không chỉ cung cấp dịch vụ, mà mang đến <strong className="font-bold text-gray-900">hệ sinh thái công nghệ trọn vẹn</strong>. Bằng sự am hiểu chuyên sâu và năng lực đối tác toàn cầu, chúng tôi giúp các tổ chức vượt qua giới hạn.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-white border border-gray-200 px-8 py-4 rounded-2xl font-black text-sm tracking-tight hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl shadow-gray-200/40 hover:shadow-blue-500/20"
              >
                Tìm hiểu thêm về FCT <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Phải: Grid tính năng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-[2rem] border-white/40 hover:bg-white transition-all duration-500 group"
              >
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-gray-100 group-hover:bg-blue-600 transition-colors duration-500">
                  <div className="group-hover:text-white transition-colors duration-500">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{feature.title}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
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
