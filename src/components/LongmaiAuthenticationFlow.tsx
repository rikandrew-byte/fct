"use client";

import { motion } from "framer-motion";
import { Smartphone, Lock, Server, ArrowRight } from "lucide-react";

interface LongmaiAuthenticationFlowProps {
  isEn?: boolean;
}

export default function LongmaiAuthenticationFlow({ isEn = false }: LongmaiAuthenticationFlowProps) {
  const labels = isEn
    ? {
        device: "User Device",
        deviceDesc: "Laptop / Mobile requesting authentication or document signing",
        token: "Longmai Hardware Token",
        tokenDesc: "USB/Smartcard with encrypted Private Key, signing on-chip",
        server: "Target Server",
        serverDesc: "Receives secure authentication result, key never exposed",
        flow: "Endpoint Authentication Flow",
        flowDetail: "Request → Sign on Chip → Verified Response",
      }
    : {
        device: "Thiết bị Người dùng",
        deviceDesc: "Laptop/Mobile cần đăng nhập hoặc ký tài liệu",
        token: "Longmai Hardware Token",
        tokenDesc: "USB/Smartcard chứa Private Key mã hóa cứng, ký trên chip",
        server: "Hệ thống Server",
        serverDesc: "Nhận kết quả xác thực an toàn, khóa không bao giờ lộ",
        flow: "Luồng Xác thực Endpoint",
        flowDetail: "Yêu cầu → Ký trên Chip → Phản hồi Xác minh",
      };

  return (
    <div className="w-full space-y-12">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-6">
          {/* Block 1: User Device */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-500" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-widest">
                  {labels.device}
                </h3>
              </div>
              <p className="text-slate-500 text-xs font-light">
                {labels.deviceDesc}
              </p>
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-6 h-6 text-slate-400" />
          </motion.div>

          {/* Block 2: Longmai Token */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <div className="bg-white border-2 border-rose-400 rounded-2xl p-8 space-y-4 relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent pointer-events-none" />
              <div className="relative z-10 flex items-center gap-3">
                <Lock className="w-6 h-6 text-rose-500" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-widest">
                  {labels.token}
                </h3>
              </div>
              <p className="text-slate-500 text-xs font-light">
                {labels.tokenDesc}
              </p>
            </div>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <ArrowRight className="w-6 h-6 text-slate-400" />
          </motion.div>

          {/* Block 3: Server */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 relative shadow-sm">
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="flex items-center gap-3">
                <Server className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-widest">
                  {labels.server}
                </h3>
              </div>
              <p className="text-slate-500 text-xs font-light">
                {labels.serverDesc}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated Flow Line */}
        <motion.div className="mt-8 h-0.5 bg-gradient-to-r from-blue-400 via-rose-400 to-green-400 rounded-full overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-white blur-sm"
            animate={{ x: ["0%", "300%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Flow Description */}
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-sm font-light">
            {labels.flow}
          </p>
          <p className="text-slate-400 text-xs">
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
          className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-widest">
              {labels.device}
            </h3>
          </div>
          <p className="text-slate-500 text-xs font-light">
            {labels.deviceDesc}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
          </motion.div>
        </div>

        {/* Block 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-rose-400 rounded-2xl p-6 space-y-3 relative overflow-hidden shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-center gap-2">
            <Lock className="w-5 h-5 text-rose-500" />
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-widest">
              {labels.token}
            </h3>
          </div>
          <p className="text-slate-500 text-xs font-light">
            {labels.tokenDesc}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
          </motion.div>
        </div>

        {/* Block 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 relative shadow-sm"
        >
          <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-widest">
              {labels.server}
            </h3>
          </div>
          <p className="text-slate-500 text-xs font-light">
            {labels.serverDesc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
