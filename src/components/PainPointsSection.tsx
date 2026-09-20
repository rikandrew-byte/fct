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
  "text-cyan-700 border-cyan-200 bg-cyan-50",
  "text-slate-700 border-slate-200 bg-slate-100",
  "text-slate-700 border-slate-200 bg-slate-100",
];

export default function PainPointsSection({ dict }: PainPointsSectionProps) {
  const { title, subtitle, cards } = dict.painPoints;

  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 space-y-4"
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
              className={`group relative border border-slate-200 bg-white rounded-lg p-7 flex flex-col gap-5 transition-colors duration-200 hover:border-slate-400`}
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
