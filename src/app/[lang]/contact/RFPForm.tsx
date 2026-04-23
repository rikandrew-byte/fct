"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Send, 
  Building2, 
  ShieldCheck, 
  Users, 
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Lock,
  ArrowRight
} from "lucide-react";

interface RFPFormProps {
  lang: string;
}

export default function RFPForm({ lang }: RFPFormProps) {
  const isEn = lang === "en";
  const searchParams = useSearchParams();
  const solutionParam = searchParams.get("solution");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    industry: "",
    solution: solutionParam || "",
    projectScale: "",
    message: ""
  });

  useEffect(() => {
    setMounted(true);
    if (solutionParam) {
      setFormData(prev => ({ ...prev, solution: solutionParam }));
    }
  }, [solutionParam]);

  if (!mounted) return <div className="h-[600px] flex items-center justify-center text-slate-500 uppercase text-[10px] font-black tracking-widest animate-pulse">Initializing Secure Portal...</div>;

  const industries = isEn 
    ? ["Finance & Banking", "Government", "Telecommunications", "Manufacturing", "Energy", "Other"]
    : ["Tài chính - Ngân hàng", "Chính phủ - Khối công", "Viễn thông", "Sản xuất", "Năng lượng", "Khác"];

  const solutions = [
    { value: "thales", label: "Thales Sentinel (Licensing & Protection)" },
    { value: "guardsquare", label: "Guardsquare (Mobile App Security)" },
    { value: "longmai", label: "Longmai (Hardware Token & 2FA)" },
    { value: "pki", label: "PKI & Digital Signature Solutions" },
    { value: "hsm", label: "HSM & Data Encryption" },
  ];

  const scales = isEn
    ? ["Small (Startup/Niche)", "Medium (Enterprise Level)", "Large (Government/National Scale)", "Ongoing Security Audit"]
    : ["Quy mô nhỏ (Startup/Dự án riêng)", "Quy mô vừa (Doanh nghiệp)", "Quy mô lớn (Tập đoàn/Quốc gia)", "Tư vấn bảo mật định kỳ"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, send to API here
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] p-12 text-center space-y-8"
      >
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            {isEn ? "Request Received" : "Yêu cầu đã được gửi"}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {isEn 
              ? "Your solution inquiry has been logged. An FCT security architect will review your RFP and contact you within 24 business hours."
              : "Yêu cầu của bạn đã được ghi nhận. Chuyên gia giải pháp của FCT sẽ xem xét RFP và liên hệ với bạn trong vòng 24 giờ làm việc."}
          </p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg"
        >
          {isEn ? "Send another request" : "Gửi yêu cầu khác"}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Full Name */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Users className="w-3 h-3" /> {isEn ? "Full Name" : "Họ và tên"}
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 outline-none transition-all font-medium"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Lock className="w-3 h-3" /> {isEn ? "Email Address" : "Địa chỉ Email"}
          </label>
          <input
            required
            type="email"
            placeholder="contact@company.com"
            className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 outline-none transition-all font-medium"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Company */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Building2 className="w-3 h-3" /> {isEn ? "Organization" : "Tên tổ chức / Doanh nghiệp"}
          </label>
          <input
            required
            type="text"
            placeholder="FCT Vinh Thinh"
            className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 outline-none transition-all font-medium"
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
          />
        </div>

        {/* Industry Dropdown */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> {isEn ? "Industry" : "Ngành kinh doanh"}
          </label>
          <div className="relative">
            <select
              required
              className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 appearance-none focus:border-blue-500 outline-none transition-all font-medium cursor-pointer"
              value={formData.industry}
              onChange={e => setFormData({...formData, industry: e.target.value})}
            >
              <option value="" disabled className="bg-white">{isEn ? "Select Industry" : "Chọn ngành nghề"}</option>
              {industries.map(ind => (
                <option key={ind} value={ind} className="bg-white">{ind}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Solution Focus */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> {isEn ? "Solution Focus" : "Giải pháp quan tâm"}
          </label>
          <div className="relative">
            <select
              required
              className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 appearance-none focus:border-blue-500 outline-none transition-all font-medium cursor-pointer"
              value={formData.solution}
              onChange={e => setFormData({...formData, solution: e.target.value})}
            >
              <option value="" disabled className="bg-white">{isEn ? "Select Solution" : "Chọn giải pháp"}</option>
              {solutions.map(sol => (
                <option key={sol.value} value={sol.value} className="bg-white">{sol.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Project Scale */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <ArrowRight className="w-3 h-3" /> {isEn ? "Project Scale" : "Quy mô dự án"}
          </label>
          <div className="relative">
            <select
              required
              className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 appearance-none focus:border-blue-500 outline-none transition-all font-medium cursor-pointer"
              value={formData.projectScale}
              onChange={e => setFormData({...formData, projectScale: e.target.value})}
            >
              <option value="" disabled className="bg-white">{isEn ? "Select Scale" : "Chọn quy mô"}</option>
              {scales.map(scale => (
                <option key={scale} value={scale} className="bg-white">{scale}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{isEn ? "Technical Requirements / Notes" : "Yêu cầu kỹ thuật chi tiết"}</label>
        <textarea
          rows={4}
          placeholder={isEn ? "Describe your security goals..." : "Mô tả mục tiêu bảo mật của dự án..."}
          className="w-full bg-slate-50 border border-gray-200 rounded-3xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 outline-none transition-all font-medium resize-none"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-500/20 group hover:scale-[1.02] active:scale-[0.98]"
        >
          {isEn ? "Submit Solution RFP" : "Gửi yêu cầu RFP"}
          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
        <p className="mt-6 text-gray-400 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> {isEn ? "Secure encrypted data transmission" : "Truyền dữ liệu mã hóa an toàn"}
        </p>
      </div>
    </form>
  );
}
