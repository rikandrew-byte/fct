"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface ComparisonRow {
  metric: string;
  before: string;
  after: string;
}

interface SecurityComparisonTableProps {
  lang: string;
  title: string;
  subtitle: string;
  rows: ComparisonRow[];
}

export default function SecurityComparisonTable({
  lang,
  title,
  subtitle,
  rows,
}: SecurityComparisonTableProps) {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
            {title}
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-x-auto rounded-xl sm:rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/40 -mx-1"
        >
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-black uppercase tracking-widest whitespace-nowrap">
                  Chỉ số an toàn
                </th>
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-black uppercase tracking-widest whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                    Trước (Rủi ro)
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-black uppercase tracking-widest whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Sau (FCT)
                  </div>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-200 bg-white">
              {rows.map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  {/* Metric */}
                  <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-bold text-gray-900 bg-gray-50 min-w-[120px]">
                    {row.metric}
                  </td>

                  {/* Before */}
                  <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-gray-700 font-light min-w-[150px]">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{row.before}</span>
                    </div>
                  </td>

                  {/* After */}
                  <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm text-emerald-700 font-light bg-emerald-50/30 min-w-[150px]">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{row.after}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-700 text-base font-light mb-6">
            Bạn đang ở trạng thái nào? Hãy nâng cấp ngay.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-600/30"
          >
            Yêu cầu Tư vấn Giải pháp
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
