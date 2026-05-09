"use client";

import { motion } from "framer-motion";
import { Code, Zap, Shield, ArrowRight } from "lucide-react";

interface AppShieldingFlowProps {
  isEn?: boolean;
}

export default function AppShieldingFlow({ isEn = false }: AppShieldingFlowProps) {
  const labels = isEn
    ? {
        source: "Source Code",
        engine: "Protection Engine",
        app: "Secure Application",
        sourceDesc: "Original application code",
        engineDesc: "Obfuscation, Encryption, RASP",
        appDesc: "Hardened against reverse engineering",
        flow: "Application Shielding Flow",
        flowDetail: "Code → Protection → Deployment",
      }
    : {
        source: "Mã Nguồn",
        engine: "Động cơ Bảo vệ",
        app: "Ứng dụng An toàn",
        sourceDesc: "Mã ứng dụng gốc",
        engineDesc: "Làm rối, Mã hóa, RASP",
        appDesc: "Bảo vệ chống đảo ngược",
        flow: "Luồng Bảo vệ Ứng dụng",
        flowDetail: "Mã → Bảo vệ → Triển khai",
      };

  return (
    <div className="w-full space-y-12">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-6">
          {/* Block 1: Source Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-blue-500" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">
                  {labels.source}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {labels.sourceDesc}
              </p>
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-6 h-6 text-slate-500" />
          </motion.div>

          {/* Block 2: Protection Engine */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <div className="bg-slate-900 border-2 border-amber-600 rounded-2xl p-8 space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex items-center gap-3">
                <Zap className="w-6 h-6 text-amber-500" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">
                  {labels.engine}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {labels.engineDesc}
              </p>
            </div>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-6 h-6 text-slate-500" />
          </motion.div>

          {/* Block 3: Secure Application */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 rounded-2xl p-8 space-y-4 relative">
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">
                  {labels.app}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {labels.appDesc}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated Flow Line */}
        <motion.div className="mt-8 h-1 bg-gradient-to-r from-blue-500 via-amber-500 to-green-500 rounded-full overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-white blur-sm"
            animate={{ x: ["0%", "300%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Flow Description */}
        <div className="text-center space-y-2">
          <p className="text-slate-400 text-sm font-light">
            {labels.flow}
          </p>
          <p className="text-slate-500 text-xs">
            {labels.flowDetail}
          </p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {/* Block 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3"
        >
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-500" />
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              {labels.source}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {labels.sourceDesc}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
          </motion.div>
        </div>

        {/* Block 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border-2 border-amber-600 rounded-2xl p-6 space-y-3 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              {labels.engine}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {labels.engineDesc}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
          </motion.div>
        </div>

        {/* Block 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 rounded-2xl p-6 space-y-3 relative"
        >
          <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              {labels.app}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {labels.appDesc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
