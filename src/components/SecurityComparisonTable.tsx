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
    <section className="bg-slate-50 py-14 sm:py-20 px-4 sm:px-6 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
            {title}
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm -mx-1"
        >
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest whitespace-nowrap text-slate-300 w-[28%]">
                  Chỉ số an toàn
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest whitespace-nowrap w-[36%]">
                  <div className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    Trước (Rủi ro)
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase tracking-widest whitespace-nowrap w-[36%]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Sau (FCT)
                  </div>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Metric */}
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 border-r border-slate-200">
                    {row.metric}
                  </td>

                  {/* Before */}
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-slate-600 border-r border-slate-200">
                    <div className="flex items-start gap-2.5">
                      <X className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>{row.before}</span>
                    </div>
                  </td>

                  {/* After */}
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-emerald-800 bg-emerald-50/40">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{row.after}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <p className="text-slate-500 text-sm">
            Bạn đang ở trạng thái nào? Hãy nâng cấp ngay.
          </p>
          <a
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-sm font-semibold text-sm tracking-wide transition-colors duration-200 shrink-0"
          >
            Yêu cầu Tư vấn Giải pháp
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
