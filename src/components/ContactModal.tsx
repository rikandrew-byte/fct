"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Giả lập xử lý gửi form. Trong ứng dụng thực tế, bạn sẽ gửi dữ liệu ở đây.
    // const formData = { name, phone, email, message };
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Xóa các trường trong form
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 4000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center text-white">
              <div>
                <h3 className="text-xl font-bold">Nhận Tư Vấn Miễn Phí</h3>
                <p className="text-sm font-light text-blue-100 mt-1">Chuyên gia của chúng tôi sẽ liên hệ trong 24h</p>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-gray-900">Gửi Thành Công!</h4>
                      <p className="text-gray-600 font-light">Cảm ơn bạn đã tin tưởng. <br/>Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="text-blue-600 font-semibold text-sm hover:underline pt-4"
                    >
                      Đóng cửa sổ
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Họ và Tên</label>
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Số Điện Thoại</label>
                        <input
                          required
                          type="tel"
                          placeholder="0901234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                          required
                          type="email"
                          placeholder="email@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Nhu cầu tư vấn</label>
                      <textarea
                        rows={3} placeholder="Mô tả dự án hoặc yêu cầu của bạn..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg mt-4 ${
                        isLoading 
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                          : "bg-gray-900 hover:bg-black text-white shadow-gray-900/20 active:scale-[0.98]"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <span>Gửi Yêu Cầu</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center font-light uppercase tracking-widest mt-4">Cam kết bảo mật thông tin 100%</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
