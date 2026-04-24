"use client";

import { motion } from "framer-motion";
import { Server, ShieldCheck, Cloud, Usb, Monitor, CheckCircle2, ArrowRight, ArrowDown } from "lucide-react";

interface ProductArchitectureProps {
  isEn?: boolean;
}

export default function ProductArchitecture({ isEn = false }: ProductArchitectureProps) {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight">
          {isEn ? "Licensing Architecture" : "Sơ đồ Kiến trúc Cấp phép"}
        </h2>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
          {isEn 
            ? "Secure, scalable, and flexible licensing deployment models from vendor to end-user." 
            : "Mô hình triển khai bản quyền an toàn, mở rộng và linh hoạt từ nhà cung cấp đến người dùng cuối."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative">
        
        {/* Zone 1: Vendor */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm relative z-10">
          <div className="text-center pb-2 border-b border-slate-200">
            <span className="text-xs font-black uppercase tracking-widest text-blue-800">
              {isEn ? "Vendor Zone" : "Vùng Nhà Phát Triển"}
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-900 text-white p-3 rounded-xl shadow-inner">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Sentinel EMS</h4>
                <p className="text-xs text-slate-500">License Management</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-700 text-white p-3 rounded-xl shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">App Protection</h4>
                <p className="text-xs text-slate-500">Envelope / API / SDK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Zone 2: Distribution (Arrows) */}
        <div className="w-full lg:w-auto flex lg:flex-col items-center justify-center gap-6 py-4 lg:py-0 relative z-0">
          {/* Mobile Arrows */}
          <div className="flex lg:hidden flex-row gap-8 justify-center w-full">
             <div className="flex flex-col items-center gap-3">
                <ArrowDown className="w-6 h-6 text-blue-400 animate-bounce" />
                <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-sm">
                  <Cloud className="w-4 h-4" /> Cloud
                </div>
             </div>
             <div className="flex flex-col items-center gap-3">
                <ArrowDown className="w-6 h-6 text-blue-400 animate-bounce" />
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-sm">
                  <Usb className="w-4 h-4" /> Hardware
                </div>
             </div>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden lg:flex flex-col gap-12 w-40 relative">
             <div className="relative w-full">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-sky-200 -z-10"></div>
                <div className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-sm relative z-10 mx-auto w-max">
                  <Cloud className="w-4 h-4" /> Cloud License
                </div>
                <ArrowRight className="absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 text-sky-400" />
             </div>
             
             <div className="relative w-full">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-indigo-200 -z-10"></div>
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-sm relative z-10 mx-auto w-max">
                  <Usb className="w-4 h-4" /> Longmai Token
                </div>
                <ArrowRight className="absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 text-indigo-400" />
             </div>
          </div>
        </div>

        {/* Zone 3: Customer */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm relative z-10">
          <div className="text-center pb-2 border-b border-slate-200">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
              {isEn ? "Customer Zone" : "Vùng Khách Hàng"}
            </span>
          </div>
          
          <div className="flex flex-col gap-4 h-full justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-900 flex flex-col items-center gap-4 text-center hover:scale-[1.02] transition-transform">
              <div className="relative">
                <Monitor className="w-16 h-16 text-slate-800" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  className="absolute -bottom-2 -right-2 bg-emerald-100 text-emerald-600 rounded-full p-1 border-2 border-white shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              </div>
              <div>
                <h4 className="font-black text-xl text-blue-900">End-user App</h4>
                <p className="text-xs text-slate-500 font-medium mt-2">
                  {isEn ? "License Validated Successfully" : "Kiểm tra Bản quyền Thành công"}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
