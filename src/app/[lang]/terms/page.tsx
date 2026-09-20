import { Metadata } from "next";
import { Locale } from "@/config/i18n-config";
import TechGridBackground from "@/components/TechGridBackground";
import { Gavel, Copyright, AlertTriangle, RefreshCcw } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";
  return {
    title: isEn ? "Terms of Use | FCT Vinh Thinh" : "Điều khoản sử dụng | FCT Vĩnh Thịnh",
    description: "Terms and conditions for using the FCT Vinh Thinh JSC website.",
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-slate-900 border-b border-slate-800 pt-36 pb-20 px-6 overflow-hidden">
        <TechGridBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-sm px-3.5 py-1 text-[11px] font-mono font-semibold text-cyan-400 tracking-wider uppercase">
             {isEn ? "LEGAL & COMPLIANCE" : "QUY ĐỊNH PHÁP LÝ"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight">
            {isEn ? "Terms of" : "Điều khoản"} <span className="text-cyan-400">{isEn ? "Use" : "Sử dụng"}</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? "The rules and guidelines for using our digital infrastructure." 
              : "Các quy định và hướng dẫn khi sử dụng hạ tầng số của chúng tôi."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-slate-200 shadow-sm">
          <div className="space-y-10">
            <div className="space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-cyan-700">
                <Copyright className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "1. Intellectual Property" : "1. Sở hữu trí tuệ"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "All content on this website, including text, graphics, logos, and software, is the property of FCT Vinh Thinh JSC or its content suppliers and protected by international copyright laws."
                  : "Toàn bộ nội dung trên website này, bao gồm văn bản, hình ảnh, logo và phần mềm, là tài sản của FCT Vĩnh Thịnh JSC hoặc các đối tác cung cấp nội dung, và được bảo vệ bởi luật sở hữu trí tuệ quốc tế."}
              </p>
            </div>

            <div className="space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-cyan-700">
                <Gavel className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "2. Acceptable Use" : "2. Quy định sử dụng"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "You agree not to use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful."
                  : "Bạn đồng ý không sử dụng website theo bất kỳ cách nào gây thiệt hại hoặc có thể gây thiệt hại cho website, hoặc làm suy giảm khả năng truy cập của người dùng khác; không sử dụng cho các mục đích bất hợp pháp, gian lận hoặc gây hại."}
              </p>
            </div>

            <div className="space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-cyan-700">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "3. Limitation of Liability" : "3. Giới hạn trách nhiệm"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "FCT Vinh Thinh JSC will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss."
                  : "FCT Vĩnh Thịnh JSC sẽ không chịu trách nhiệm đối với bất kỳ tổn thất gián tiếp, đặc biệt hoặc mang tính hệ quả nào phát sinh từ việc sử dụng hoặc liên quan đến nội dung trên website này."}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-cyan-700">
                <RefreshCcw className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "4. Changes to Terms" : "4. Thay đổi điều khoản"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "We reserve the right to revise these terms of use at any time. The revised terms will apply to the use of our website from the date of the publication of the revised terms on our website."
                  : "Chúng tôi có quyền sửa đổi các điều khoản sử dụng này bất cứ lúc nào. Các điều khoản sửa đổi sẽ có hiệu lực kể từ ngày được đăng tải công khai trên website."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
