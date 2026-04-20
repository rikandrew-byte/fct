"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "GĐ Công nghệ",
    role: "Đơn vị Tài chính & Ngân hàng",
    content: "Giải pháp lưu trữ và hạ tầng mạng mà công ty cung cấp đã giúp chúng tôi tối ưu 40% chi phí vận hành hàng tháng. Sự chuyên nghiệp của đội ngũ hỗ trợ thực sự ấn tượng.",
  },
  {
    name: "Quản lý Dự án",
    role: "Cơ quan Quản lý Nhà nước",
    content: "Chúng tôi đã tìm kiếm một đối tác triển khai bảo mật dài hạn và rất hài lòng với kết quả đạt được. Hệ thống phân quyền và giám sát an ninh hoạt động cực kỳ mượt mà.",
  },
  {
    name: "Lãnh đạo Kỹ thuật",
    role: "Tập đoàn Công nghệ Đa quốc gia",
    content: "Các thiết bị đo lường được phân phối đáp ứng chính xác mọi bài test khắt khe nhất từ phía khách hàng Châu Âu của chúng tôi. Dịch vụ hậu mãi rất tuyệt vời.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter opacity-90">Khách Hàng Nói Gì</h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-tight italic">
            Niềm tin là giá trị cốt lõi trong mọi giải pháp an ninh của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel p-10 rounded-[2.5rem] border-white/40 flex flex-col justify-between group transition-all duration-500 relative"
            >
              <div className="absolute inset-x-10 bottom-0 h-1 bg-blue-600/0 group-hover:bg-blue-600/50 group-hover:blur-md transition-all duration-500"></div>
              <div>
                <div className="flex gap-1 mb-8 text-blue-600">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-gray-600 font-light italic leading-relaxed mb-10 text-lg">
                  "{testi.content}"
                </p>
              </div>
              <div className="flex items-center gap-5 pt-8 border-t border-gray-100/50">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-gray-950 text-base tracking-tight">{testi.name}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-0.5">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
