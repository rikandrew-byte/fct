"use client";

import { MessageCircle, X, BriefcaseBusiness, Mail, Phone, MapPin, Video, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(2103);
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    // Logic bộ đếm lượt truy cập (Visitor Counter)
    const storedCount = localStorage.getItem("fct_visitor_count");
    const initialBase = 2103;
    
    if (!storedCount) {
      const newCount = initialBase + 1;
      localStorage.setItem("fct_visitor_count", newCount.toString());
      setVisitorCount(newCount);
    } else {
      const newCount = parseInt(storedCount) + 1;
      localStorage.setItem("fct_visitor_count", newCount.toString());
      setVisitorCount(newCount);
    }

    // Giả lập số người đang trực tuyến (Online)
    setOnlineCount(Math.floor(Math.random() * (15 - 5 + 1)) + 5);
  }, []);

  return (
    <footer className="bg-gray-950 pt-24 pb-12 border-t border-gray-900 text-gray-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Cột 1: Brand */}
          <div className="space-y-8 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo FCT Vinh Thinh .,JSC" 
                width={48} 
                height={48} 
                className="brightness-110"
              />
              <span className="font-bold text-2xl text-white tracking-tight">FCT Vinh Thinh .,JSC</span>
            </Link>
            <p className="text-sm font-light leading-relaxed">
              Tiên phong trong việc cung cấp các giải pháp hạ tầng số hiện đại. Chúng tôi đồng hành cùng doanh nghiệp Việt vươn tầm thế giới thông qua sức mạnh công nghệ đột phá.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                <X className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                <Video className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300">
                <BriefcaseBusiness className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Cột 2: Tin tức và bài viết */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Tin tức và bài viết</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/news" className="hover:text-blue-500 transition-colors">Bảo vệ bản quyền phần mềm</Link></li>
              <li><Link href="/news" className="hover:text-blue-500 transition-colors">Bảo mật ứng dụng di động</Link></li>

              <li><Link href="/news" className="hover:text-blue-500 transition-colors">Xác thực & Bảo mật phần cứng</Link></li>
              <li><Link href="/news" className="hover:text-blue-500 transition-colors">Giải pháp dữ liệu công nghiệp IIoT</Link></li>
            </ul>
          </div>

          {/* Cột 3: Công ty */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Công Ty</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Liên hệ</Link></li>
              <li><Link href="/products" className="hover:text-blue-500 transition-colors">Danh mục sản phẩm</Link></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Tin tức công nghệ</a></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Liên Hệ</h4>
            <ul className="space-y-5 text-sm font-light">
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Trụ sở chính</p>
                  <p className="text-[13px] opacity-70">Tầng 03 tòa nhà Ngôi Sao, ô 15 lô B đường Nguyễn Cảnh Dị, Phường Đại Kim, Quận Hoàng Mai, Hà Nội</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Hotline</p>
                  <p className="text-[13px] opacity-70">0983 027 776</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Email hỗ trợ</p>
                  <p className="text-[13px] opacity-70">andrew@fct.vn</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-10">
            <p className="text-[11px] font-medium uppercase tracking-widest leading-loose">
              © 2026 FCT Vinh Thinh .,JSC. Đã đăng ký bản quyền.
            </p>
            
            {/* Visitor Counter Badge */}
            <div className="inline-flex items-center gap-4 bg-gray-900/50 border border-white/5 rounded-full px-5 py-2 backdrop-blur-sm shadow-inner group hover:border-blue-500/30 transition-all duration-500">
              <div className="relative flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-40"></div>
              </div>
              <div className="flex items-center gap-3 divide-x divide-white/10 uppercase tracking-[0.15em] font-bold text-[9px] text-gray-400">
                <span className="flex items-center gap-1.5 group-hover:text-blue-400 transition-colors">
                  <span className="text-white">{onlineCount}</span> trực tuyến
                </span>
                <span className="pl-3 flex items-center gap-1.5 group-hover:text-blue-400 transition-colors">
                   Tổng: <span className="text-white">{visitorCount.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-10 text-[11px] font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
