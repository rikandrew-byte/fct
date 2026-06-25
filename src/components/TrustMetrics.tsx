"use client";

import { Shield, TrendingUp, Zap, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface Metric {
  value: string;
  label: string;
  description: string;
}

interface TrustMetricsProps {
  dict: {
    trustMetrics: {
      title: string;
      subtitle: string;
      metrics: Metric[];
    };
  };
}

const METRIC_ICONS = [
  <Shield key="shield" className="w-8 h-8" />,
  <TrendingUp key="trending" className="w-8 h-8" />,
  <Zap key="zap" className="w-8 h-8" />,
  <Lock key="lock" className="w-8 h-8" />,
];

const METRIC_COLORS = [
  "from-blue-100 to-blue-50 border-blue-300 text-blue-700",
  "from-emerald-100 to-emerald-50 border-emerald-300 text-emerald-700",
  "from-amber-100 to-amber-50 border-amber-300 text-amber-700",
  "from-violet-100 to-violet-50 border-violet-300 text-violet-700",
];

export default function TrustMetrics({ dict }: TrustMetricsProps) {
  const { title, subtitle, metrics } = dict.trustMetrics;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden border-y border-gray-200">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            {title}
          </h2>
          <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-xl border bg-gradient-to-br p-6 flex flex-col gap-4 transition-all duration-300 hover:border-opacity-100 hover:shadow-2xl ${METRIC_COLORS[index]}`}
            >
              {/* Icon */}
              <div className="text-current opacity-80 group-hover:opacity-100 transition-opacity">
                {METRIC_ICONS[index]}
              </div>

              {/* Value + Label */}
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-current opacity-90">
                  {metric.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm font-light text-gray-700 leading-relaxed mt-auto">
                {metric.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
