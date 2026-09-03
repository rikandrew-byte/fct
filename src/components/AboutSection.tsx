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
    <section className="py-16 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center text-center lg:text-left">
          {/* Trái: Nội dung */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-blue-700 tracking-[0.3em] uppercase block">{content.badge}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                {content.title} <br />
                <span className="text-blue-700">{content.subtitle}</span>
              </h2>
            </div>
            <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.description}
            </p>
          </motion.div>

          {/* Phải: Grid tính năng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative items-start">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-3 text-left"
              >
                <div>{feature.icon}</div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
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
