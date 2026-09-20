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
            color: "from-cyan-500 to-cyan-500"
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
        badge: "Gi廕ξ ph獺p Thay th廕?,
        title: "Longmai PKI/HSM",
        subtitle: "H廕?t廕吵g B廕υ m廕負 T廙 u Ng璽n s獺ch",
        description: "Doanh nghi廙 t廕吮 trung c廕吵 b廕υ m廕負 c廕叼 doanh nghi廙 m? kh繫ng c廕吵 ?廙?ph廙妾 t廕︾ c廕叼 doanh nghi廙. Longmai cung c廕叼 ?i廙 ?籀.",
        features: [
          {
            icon: <Zap className="w-8 h-8" />,
            title: "Tri廙 khai Nhanh ch籀ng",
            desc: "Tri廙 khai trong v?i ng?y, kh繫ng ph廕ξ v?i th獺ng. Thay ?廙 h廕?t廕吵g t廙 thi廙, t獺c ?廙g b廕υ m廕負 t廙 ?a.",
            color: "from-cyan-500 to-cyan-500"
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "V廕要 h?nh ?n gi廕τ",
            desc: "Kh繫ng c廕吵 chuy礙n gia m瓊 h籀a. Giao di廙 qu廕τ l羸 tr廙帷 quan, v簷ng ?廙 kh籀a t廙??廙g.",
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Chi ph穩 H廙φ l羸",
            desc: "M繫 h穫nh c廕叼 ph矇p d廙??o獺n ?廙θ. Kh繫ng ph穩 廕姊. M廙?r廙g theo s廙?ph獺t tri廙 c廙吧 doanh nghi廙.",
            color: "from-emerald-500 to-teal-500"
          }
        ],
        cta: "Kh獺m ph獺 Gi廕ξ ph獺p Longmai",
        positioning: "L廙帶 ch廙 Thay th廕?Linh ho廕﹀ cho HSM C廕叼 doanh nghi廙"
      };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-20 space-y-4"
        >
          <span className="inline-block text-emerald-600 font-semibold text-xs uppercase tracking-[0.4em] bg-emerald-50 px-4 py-2 rounded-full">
            {content.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-gray-900">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {content.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-[2rem] sm:rounded-[2.5rem] p-7 sm:p-10 h-full space-y-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
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
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-xs font-light">
            {isEn
              ? "Longmai is a flexible alternative to enterprise HSM solutions, designed for mid-market organizations seeking cost-effective security without complexity."
              : "Longmai l? l廙帶 ch廙 thay th廕?linh ho廕﹀ cho c獺c gi廕ξ ph獺p HSM c廕叼 doanh nghi廙, ?廙θ thi廕篙 k廕?cho c獺c t廙?ch廙妾 t廕吮 trung t穫m ki廕禦 b廕υ m廕負 ti廕篙 ki廙 chi ph穩 m? kh繫ng c籀 ?廙?ph廙妾 t廕︾."}
          </p>
        </div>
      </div>
    </section>
  );
}
