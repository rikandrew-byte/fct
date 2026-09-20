"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
}

export default function ContactModal({ isOpen, onClose, dict }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const d = dict.contactModal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Phone validation
    const phoneRegex = /^[0-9+]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          message,
          source: 'Contact Modal',
          turnstileToken // Send the bot protection token
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setTurnstileToken(null);

        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 4000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white w-full max-w-lg rounded-lg shadow-xl border border-slate-200 overflow-hidden"
          >
            {/* Header Modal */}
            <div className="bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center text-white">
              <div>
                <h3 className="text-lg font-bold text-slate-50">{d.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{d.subtitle}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-sm transition-colors border border-slate-700"
                disabled={isLoading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 flex flex-col items-center justify-center text-center space-y-3"
                  >
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-sm flex items-center justify-center mb-1">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-slate-900">{d.success.title}</h4>
                      <p className="text-slate-600 text-sm" dangerouslySetInnerHTML={{ __html: d.success.message }} />
                    </div>
                    <button 
                      onClick={onClose}
                      className="text-cyan-600 font-semibold text-xs uppercase tracking-wider hover:underline pt-3"
                    >
                      {d.success.close}
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
                      <label className="text-xs font-semibold text-slate-700">{d.form.name}</label>
                      <input
                        required
                        type="text"
                        placeholder={d.form.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:border-cyan-500 focus:bg-white text-sm text-slate-900 transition-all font-sans"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">{d.form.phone}</label>
                        <input
                          required
                          type="tel"
                          placeholder={d.form.phonePlaceholder}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:border-cyan-500 focus:bg-white text-sm text-slate-900 transition-all font-sans"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">{d.form.email}</label>
                        <input
                          required
                          type="email"
                          placeholder={d.form.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:border-cyan-500 focus:bg-white text-sm text-slate-900 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">{d.form.message}</label>
                      <textarea
                        rows={3} placeholder={d.form.messagePlaceholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:border-cyan-500 focus:bg-white text-sm text-slate-900 transition-all font-sans resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`w-full py-3 rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all mt-2 ${
                        isLoading 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                          : "bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{d.form.submitting}</span>
                        </>
                      ) : (
                        <>
                          <span>{d.form.submit}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {/* Tàng hình — Chặn Bot */}
                    <TurnstileWidget onVerify={setTurnstileToken} />

                    <p className="text-[10px] text-slate-400 text-center font-mono uppercase tracking-wider mt-3">{d.form.commitment}</p>
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
