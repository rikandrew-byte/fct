import { MessageCircle, X, BriefcaseBusiness, Mail, Phone, MapPin, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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

        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium uppercase tracking-widest">
          <p>© 2026 FCT Vinh Thinh .,JSC. Đã đăng ký bản quyền.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
