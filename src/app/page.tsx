import Image from "next/image";
import Link from "next/link";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FCT Vinh Thinh .,JSC | Kiến tạo hạ tầng số tương lai",
  description: "Cung cấp giải pháp hạ tầng Viễn thông, Công nghệ thông tin và Bảo mật chuyên dụng cho doanh nghiệp.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-20">


      {/* Hero Section Immersive */}
      <section className="relative pt-48 pb-20 px-6 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Ánh sáng Gradient mờ ảo phía sau */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto space-y-8 z-10">
          <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-600 tracking-wide mb-4 shadow-sm">
            🚀 KIẾN TẠO HẠ TẦNG SỐ TƯƠNG LAI
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900">
            Giải pháp Công nghệ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800">
              Toàn diện & Đột phá
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Hệ sinh thái sản phẩm từ các thương hiệu công nghệ hàng đầu thế giới, thiết kế riêng để đáp ứng những nhu cầu khắt khe nhất của doanh nghiệp.
          </p>
        </div>
      </section>

      {/* Phần Liên lạc dạng liên kết nổi bật */}
      <section className="border-y border-gray-200/60 bg-gray-100/30 py-8 mb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 text-gray-400 font-bold text-xl md:text-2xl tracking-widest opacity-80">
          <div className="hover:text-gray-900 transition-colors cursor-pointer">CISCO</div>
          <div className="hover:text-gray-900 transition-colors cursor-pointer">MICROSOFT</div>
          <div className="hover:text-gray-900 transition-colors cursor-pointer">DELL</div>
          <div className="hover:text-gray-900 transition-colors cursor-pointer">HP</div>
          <div className="hover:text-gray-900 transition-colors cursor-pointer">FLUKE</div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
          
          {/* Card Lớn 1: Hạ tầng */}
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 shadow-sm rounded-[2rem] p-10 flex flex-col justify-end relative overflow-hidden group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
            {/* Ảnh nền mờ */}
            <Image 
              src="/server.jpg.png" 
              alt="Hạ tầng máy chủ" 
              fill 
              className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 blur-[100px] rounded-full group-hover:bg-blue-400/20 transition-colors z-0"></div>
            <div className="relative z-10 text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">⚡</div>
            <h3 className="relative z-10 text-3xl font-bold text-blue-950 mb-3 tracking-tight">Hạ tầng Viễn thông & CNTT</h3>
            <p className="relative z-10 text-blue-900/70 font-light text-lg leading-relaxed">Tư vấn, thiết kế hệ thống mạng lõi, trung tâm dữ liệu (Data Center), máy chủ và lưu trữ doanh nghiệp.</p>
          </div>

          {/* Card 2: Bảo mật */}
          <div className="md:col-span-2 bg-white border border-gray-100 shadow-sm rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            {/* Ảnh nền mờ */}
            <Image 
              src="/sentinelLDK1.png" 
              alt="Bảo mật an toàn thông tin" 
              fill 
              className="object-cover object-top opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/10 blur-[80px] rounded-full group-hover:bg-emerald-400/20 transition-colors z-0"></div>
            <div className="relative z-10 text-3xl mb-4 transform group-hover:rotate-12 transition-transform">🛡️</div>
            <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-2">Bảo mật & An toàn thông tin</h3>
            <p className="relative z-10 text-gray-600 text-sm font-light leading-relaxed">Giải pháp tường lửa, chống thất thoát dữ liệu và giám sát an ninh mạng toàn diện.</p>
          </div>

          {/* Card 4: Dịch vụ */}
          <Link 
            href="/about" 
            className="md:col-span-2 bg-blue-600 text-white shadow-lg shadow-blue-500/20 rounded-[2rem] p-8 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-center items-center text-center group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl text-white">➔</span>
            </div>
            <h3 className="text-lg font-bold">Xem toàn bộ<br/>Dịch vụ hỗ trợ</h3>
          </Link>

        </div>
      </section>

      {/* Về chúng tôi */}
      <AboutSection />

      {/* Đánh giá khách hàng */}
      <Testimonials />
    </div>
  );
}
