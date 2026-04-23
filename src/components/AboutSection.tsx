"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe } from "lucide-react";

interface AboutSectionProps {
  lang: string;
  dict: any;
}

export default function AboutSection({ lang, dict }: AboutSectionProps) {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: dict.about.features[0].title,
      description: dict.about.features[0].description,
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: dict.about.features[1].title,
      description: dict.about.features[1].description,
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-500" />,
      title: dict.about.features[2].title,
      description: dict.about.features[2].description,
    },
  ];

  const content = dict.about;

  return (
    <section className="py-16 md:py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center text-center lg:text-left">
          {/* Trái: Nội dung */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-[11px] font-black text-blue-600 tracking-[0.3em] uppercase">{content.badge}</h2>
              <h3 className="text-4xl md:text-6xl font-black text-gray-950 leading-[0.95] tracking-tighter">
                {content.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {content.subtitle}
                </span>
              </h3>
            </div>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed tracking-tight max-w-xl mx-auto lg:mx-0">
              {content.description}
            </p>
            <div className="pt-4">
              <Link
                href={`/${lang}/about`}
                className="group inline-flex items-center gap-3 bg-white border border-gray-200 px-8 py-4 rounded-2xl font-black text-sm tracking-tight hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl shadow-gray-200/40 hover:shadow-blue-500/20"
              >
                {content.more} <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Phải: Grid tính năng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative items-start">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4 text-left group"
              >
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{feature.title}</h4>
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
