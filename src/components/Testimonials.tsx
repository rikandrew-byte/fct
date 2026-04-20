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
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Khách Hàng Nói Gì Về Chúng Tôi</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">Niềm tin của các đối tác chính là minh chứng rõ ràng nhất cho chất lượng và năng lực của công ty.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-600 font-light italic leading-relaxed mb-8">
                  "{testi.content}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{testi.name}</h4>
                  <p className="text-xs text-gray-500">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
