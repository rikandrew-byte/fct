import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Cpu, ArrowRight, ShieldCheck } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
import { Metadata } from "next";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "FCT Vinh Thinh .,JSC | Kiến tạo hạ tầng số tương lai",
  description: "Cung cấp giải pháp hạ tầng Viễn thông, Công nghệ thông tin và Bảo mật chuyên dụng cho doanh nghiệp.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-20 overflow-x-hidden">

      {/* Hero Section Immersive */}
      <section className="relative pt-48 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <NeuralNetworkBackground />
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] -z-10 animate-pulse"></div>

        <div className="text-center max-w-5xl mx-auto space-y-10 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative inline-block"
          >
            <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-full px-6 py-2 text-[11px] font-black text-blue-600 tracking-[0.2em] shadow-sm uppercase">
              <span className="relative z-10">🛡️ CHUYÊN GIA BẢO MẬT & BẢN QUYỀN PHẦN MỀM</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-gray-950"
          >
            Giải pháp Công nghệ <br />
            <span className="relative inline-block pb-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500">
                Toàn diện & Đột phá
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 to-transparent rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed tracking-tight"
          >
            Hệ sinh thái sản phẩm từ các thương hiệu công nghệ hàng đầu thế giới, thiết kế riêng để đáp ứng những nhu cầu khắt khe nhất của doanh nghiệp.
          </motion.p>
        </div>
      </section>

      {/* Trust & Confidentiality Section */}
      <section className="border-y border-gray-200/60 bg-white py-12 mb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-400 font-black text-xs md:text-sm tracking-[0.3em] uppercase opacity-60">
            <div className="hover:text-blue-600 transition-colors">Ngân hàng</div>
            <div className="hover:text-blue-600 transition-colors">Chính phủ</div>
            <div className="hover:text-blue-600 transition-colors">Tài chính</div>
            <div className="hover:text-blue-600 transition-colors">An ninh mạng</div>
            <div className="hover:text-blue-600 transition-colors">Hạ tầng số</div>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-gray-400/80">
            <div className="h-px w-8 bg-gray-200"></div>
            <p className="text-[10px] font-medium uppercase tracking-widest italic">
              "Vì tính chất bảo mật đặc thù, chúng tôi cam kết bảo vệ tuyệt đối danh tính và dự án của khách hàng theo chuẩn NDA."
            </p>
            <div className="h-px w-8 bg-gray-200"></div>
          </div>
        </div>
      </section>

      {/* Phần Giải pháp theo xu hướng "Bento Box Grid" */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Tin tức và bài viết</h2>
            <p className="text-gray-500 font-light">Những cập nhật mới nhất và chia sẻ kiến thức công nghệ từ chúng tôi.</p>
          </div>
          <Link href="/news" className="text-blue-600 font-semibold hover:underline flex items-center gap-1 group">
            Xem tất cả bài viết <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {/* Lưới Bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
          
          {/* Card 1: Guardsquare (Top-Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-panel rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group transition-all duration-500"
          >
            {/* Ảnh nền mờ - Guardsquare abstract */}
            <Image 
              src="/images/guardsquare-bg.png" 
              alt="Guardsquare Security Background" 
              fill 
              className="object-cover opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent z-0"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-colors pointer-events-none"></div>
            
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-indigo-100">
              <ShieldAlert className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="relative z-10 text-2xl font-black text-gray-900 mb-3 tracking-tight">Bảo mật Ứng dụng Di động</h3>
            <p className="relative z-10 text-gray-500 text-sm font-light leading-relaxed max-w-sm">
              Giải pháp bảo vệ đa lớp từ Guardsquare, ngăn chặn dịch ngược và bảo vệ mã nguồn tối ưu cho ứng dụng iOS & Android.
            </p>
          </motion.div>

          {/* Card 2: Thales (Top-Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-panel rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group transition-all duration-500"
          >
            <Image 
              src="/sentinelLDK1.png" 
              alt="Bảo mật Thales" 
              fill 
              className="object-cover object-top opacity-[0.1] group-hover:opacity-[0.2] group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full group-hover:bg-blue-400/20 transition-colors pointer-events-none"></div>
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-blue-50/50 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-blue-100/50">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="relative z-10 text-2xl font-black text-gray-900 mb-3 tracking-tight">Bản quyền & An toàn thông tin</h3>
            <p className="relative z-10 text-gray-500 text-sm font-light leading-relaxed max-w-sm">
              Giải pháp Sentinel từ Thales giúp quản lý bản quyền phần mềm và bảo mật dữ liệu doanh nghiệp an toàn tuyệt đối.
            </p>
          </motion.div>

          {/* Card 3: Longmai (Bottom-Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-panel rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group transition-all duration-500"
          >
            <Image 
              src="/images/longmai-bg.png" 
              alt="Longmai Hardware Background" 
              fill 
              className="object-cover opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent z-0"></div>
            
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-rose-100">
              <Cpu className="w-7 h-7 text-rose-600" />
            </div>
            <h3 className="relative z-10 text-2xl font-black text-gray-900 mb-3 tracking-tight">Xác thực & Bảo mật phần cứng</h3>
            <p className="relative z-10 text-gray-500 text-sm font-light leading-relaxed max-w-sm">
              Đảm bảo an ninh với dòng sản phẩm SmartX và TimePro từ Longmai — giải pháp xác thực 2 lớp và khóa cứng tiêu chuẩn quốc tế.
            </p>
          </motion.div>

          {/* Card 4: Dịch vụ hỗ trợ (Bottom-Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative group"
          >
            <Link 
              href="/about" 
              className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/25 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 w-20 h-20 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/20">
                <ArrowRight className="w-10 h-10 text-white" />
              </div>
              <h3 className="relative z-10 text-2xl font-black tracking-tight">Xem toàn bộ hệ sinh thái</h3>
              <p className="relative z-10 text-blue-100/80 text-sm mt-3 font-light max-w-[240px] leading-relaxed">Khám phá cách chúng tôi bảo vệ tương lai số của bạn</p>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Về chúng tôi */}
      <AboutSection />

      {/* Đánh giá khách hàng */}
      <Testimonials />
    </div>
  );
}
