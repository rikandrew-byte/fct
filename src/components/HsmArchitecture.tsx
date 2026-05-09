"use client";

import { motion } from "framer-motion";
import { Database, Lock, Shield, Code, ArrowRight } from "lucide-react";

interface HsmArchitectureProps {
  isEn?: boolean;
}

export default function HsmArchitecture({ isEn = false }: HsmArchitectureProps) {
  const labels = isEn
    ? {
        app: "Business Application",
        tls: "TLS Connection Layer",
        hsm: "HSM Firewall",
        core: "Secure Core (Private Key)",
        flow: "Cryptographic Flow",
      }
    : {
        app: "Ứng dụng Nghiệp vụ",
        tls: "Lớp Kết nối TLS",
        hsm: "Vách ngăn HSM",
        core: "Vùng lõi (Private Key)",
        flow: "Luồng Ký số",
      };

  return (
    <div className="w-full space-y-12">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-6">
          {/* Block 1: Application */}
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
                  {labels.app}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {isEn
                  ? "Transaction request from business logic"
                  : "Yêu cầu giao dịch từ logic nghiệp vụ"}
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

          {/* Block 2: TLS Layer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-amber-500" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">
                  {labels.tls}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {isEn
                  ? "Encrypted tunnel (TLS 1.3)"
                  : "Đường hầm mã hóa (TLS 1.3)"}
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

          {/* Block 3: HSM Firewall */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-slate-900 border-2 border-rose-600 rounded-2xl p-8 space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex items-center gap-3">
                <Lock className="w-6 h-6 text-rose-500" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">
                  {labels.hsm}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {isEn
                  ? "FIPS 140-2 Level 3 Barrier"
                  : "Rào cản FIPS 140-2 Level 3"}
              </p>
            </div>
          </motion.div>

          {/* Arrow 3 */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-6 h-6 text-slate-500" />
          </motion.div>

          {/* Block 4: Secure Core */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 rounded-2xl p-8 space-y-4 relative">
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-green-500" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">
                  {labels.core}
                </h3>
              </div>
              <p className="text-slate-400 text-xs font-light">
                {isEn
                  ? "Never leaves the chip"
                  : "Không bao giờ rời khỏi chip"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated Flow Line */}
        <motion.div className="mt-8 h-1 bg-gradient-to-r from-blue-500 via-rose-500 to-green-500 rounded-full overflow-hidden">
          <motion.div
            className="h-full w-1/4 bg-white blur-sm"
            animate={{ x: ["0%", "400%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Flow Description */}
        <div className="text-center space-y-2">
          <p className="text-slate-400 text-sm font-light">
            {labels.flow}
          </p>
          <p className="text-slate-500 text-xs">
            {isEn
              ? "Request → Encryption → Signing → Response"
              : "Yêu cầu → Mã hóa → Ký số → Phản hồi"}
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
              {labels.app}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {isEn
              ? "Transaction request from business logic"
              : "Yêu cầu giao dịch từ logic nghiệp vụ"}
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
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              {labels.tls}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {isEn ? "Encrypted tunnel (TLS 1.3)" : "Đường hầm mã hóa (TLS 1.3)"}
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
          className="bg-slate-900 border-2 border-rose-600 rounded-2xl p-6 space-y-3 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-center gap-2">
            <Lock className="w-5 h-5 text-rose-500" />
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              {labels.hsm}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {isEn
              ? "FIPS 140-2 Level 3 Barrier"
              : "Rào cản FIPS 140-2 Level 3"}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
          </motion.div>
        </div>

        {/* Block 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600 rounded-2xl p-6 space-y-3 relative"
        >
          <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-500" />
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              {labels.core}
            </h3>
          </div>
          <p className="text-slate-400 text-xs font-light">
            {isEn ? "Never leaves the chip" : "Không bao giờ rời khỏi chip"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
