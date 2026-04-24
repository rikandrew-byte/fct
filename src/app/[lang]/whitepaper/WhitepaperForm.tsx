"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Users, 
  Lock,
  ArrowRight,
  Loader2,
  FileText
} from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";

interface WhitepaperFormProps {
  lang: string;
}

export default function WhitepaperForm({ lang }: WhitepaperFormProps) {
  const isEn = lang === "en";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "Đăng ký nhận Sách trắng: Bảo vệ chất xám & Tối đa hóa doanh thu phần mềm"
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-20 flex items-center justify-center text-slate-400 text-[10px] tracking-widest animate-pulse uppercase">Initializing Form...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      alert(isEn ? "Security check pending. Please wait." : "Đang kiểm tra bảo mật. Vui lòng đợi.");
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9+]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert(isEn ? "Invalid phone number." : "Số điện thoại không hợp lệ.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'whitepaper',
          turnstileToken
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTurnstileToken(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || (isEn ? 'Error occurred.' : 'Đã có lỗi xảy ra.'));
      }
    } catch (error) {
      alert(isEn ? 'Network error.' : 'Lỗi kết nối.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center space-y-4"
      >
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <FileText className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">
            {isEn ? "Check Your Email!" : "Kiểm tra Email của bạn!"}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isEn 
              ? "We have sent the download link for the Whitepaper to your inbox. Please check your Spam folder if you don't see it."
              : "Link tải Sách trắng đã được gửi vào hòm thư của bạn. Vui lòng kiểm tra cả hòm thư Spam nếu chưa nhận được."}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 space-y-6 relative overflow-hidden">
      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
            <Users className="w-3 h-3" /> {isEn ? "Full Name" : "Họ và tên"}
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
            <Lock className="w-3 h-3" /> {isEn ? "Email" : "Địa chỉ Email"}
          </label>
          <input
            required
            type="email"
            placeholder="contact@company.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
            <ArrowRight className="w-3 h-3" /> {isEn ? "Phone" : "Số điện thoại"}
          </label>
          <input
            required
            type="tel"
            placeholder="090..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
            <ArrowRight className="w-3 h-3" /> {isEn ? "Company" : "Công ty"}
          </label>
          <input
            required
            type="text"
            placeholder="FCT..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-500/20 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (isEn ? "Processing..." : "Đang xử lý...") : (isEn ? "DOWNLOAD WHITEPAPER" : "ĐĂNG KÝ TẢI SÁCH TRẮNG")}
          {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        </button>
        
        <TurnstileWidget onVerify={setTurnstileToken} />
        
        <p className="mt-6 text-center text-[9px] text-slate-400 uppercase tracking-wider font-bold">
          {isEn ? "Secure encrypted data transmission" : "Truyền dữ liệu mã hóa an toàn — NDA Policy"}
        </p>
      </div>
    </form>
  );
}
