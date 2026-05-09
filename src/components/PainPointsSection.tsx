"use client";

import { Smartphone, Database, Code } from "lucide-react";
import { motion } from "framer-motion";

interface PainCard {
  tag: string;
  title: string;
  pain: string;
  consequence: string;
}

interface PainPointsSectionProps {
  dict: {
    painPoints: {
      title: string;
      subtitle: string;
      cards: PainCard[];
    };
  };
}

const CARD_ICONS = [
  <Smartphone key="smartphone" className="w-7 h-7" />,
  <Database key="database" className="w-7 h-7" />,
  <Code key="code" className="w-7 h-7" />,
];

const CARD_ACCENT_COLORS = [
  "text-blue-600 border-blue-300 bg-blue-100",
  "text-emerald-600 border-emerald-300 bg-emerald-100",
  "text-violet-600 border-violet-300 bg-violet-100",
];

const CARD_GLOW_COLORS = [
  "group-hover:shadow-blue-500/20",
  "group-hover:shadow-emerald-500/20",
  "group-hover:shadow-violet-500/20",
];

export default function PainPointsSection({ dict }: PainPointsSectionProps) {
  const { title, subtitle, cards } = dict.painPoints;

  return (
    <section className="bg-white py-20 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
            {title}
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`group relative rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm p-7 flex flex-col gap-5 transition-all duration-300 hover:border-gray-300 hover:shadow-2xl ${CARD_GLOW_COLORS[index]}`}
            >
              {/* Tag + Icon row */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full border ${CARD_ACCENT_COLORS[index]}`}>
                  {CARD_ICONS[index]}
                  {card.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-gray-900 tracking-tight leading-snug">
                {card.title}
              </h3>

              {/* Divider */}
              <div className="h-px w-full bg-gray-200" />

              {/* Pain */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600">
                  Nỗi đau
                </p>
                <p className="text-gray-700 text-sm font-light leading-relaxed">
                  {card.pain}
                </p>
              </div>

              {/* Consequence */}
              <div className="mt-auto space-y-1.5 rounded-xl bg-red-100 border border-red-300 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-600">
                  Hậu quả
                </p>
                <p className="text-red-700 text-sm font-light leading-relaxed">
                  {card.consequence}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
