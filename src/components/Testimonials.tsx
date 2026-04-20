"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Hoàng Nguyễn",
    role: "CTO Ngân hàng số",
    content: "Chúng tôi đã tin dùng DexGuard từ Guardsquare do FCT cung cấp để bảo vệ ứng dụng Mobile Banking. Giải pháp này giúp ngăn chặn tuyệt đối các nỗ lực dịch ngược và tấn công giả mạo, đảm bảo an toàn cho hàng triệu giao dịch mỗi ngày.",
  },
  {
    name: "Trần Anh",
    role: "Trưởng phòng R&D Phần mềm",
    content: "Từ khi triển khai quản lý license bằng khóa cứng Sentinel của Thales, vấn đề bản quyền không còn là nỗi lo. Hệ thống linh hoạt và bảo mật cực cao đã giúp chúng tôi an tâm mở rộng thị trường ra quốc tế.",
  },
  {
    name: "Lê Minh",
    role: "Giám đốc Vận hành Sản xuất",
    content: "Hệ thống Canary Historian đã giải quyết triệt để bài toán thu thập dữ liệu khổng lồ từ nhà máy. Khả năng nén dữ liệu mạnh mẽ và truy xuất thời gian thực giúp chúng tôi kiểm soát chất lượng chính xác đến từng mili giây.",
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
