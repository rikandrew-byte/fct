import { Metadata } from "next";
import { Locale } from "@/config/i18n-config";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#020617] pt-32 pb-20 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            {isEn ? "Terms of" : "Điều khoản"} <span className="text-blue-500">{isEn ? "Use" : "Sử dụng"}</span>
          </h1>
          <p className="text-slate-400 text-lg font-light">
            {isEn 
              ? "The rules and guidelines for using our digital infrastructure." 
              : "Các quy định và hướng dẫn khi sử dụng hạ tầng số của chúng tôi."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate prose-blue lg:prose-lg">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Copyright className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "1. Intellectual Property" : "1. Sở hữu trí tuệ"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                {isEn 
                  ? "All content on this website, including text, graphics, logos, and software, is the property of FCT Vinh Thinh JSC or its content suppliers and protected by international copyright laws."
                  : "Toàn bộ nội dung trên website này, bao gồm văn bản, hình ảnh, logo và phần mềm, là tài sản của FCT Vĩnh Thịnh JSC hoặc các đối tác cung cấp nội dung, và được bảo vệ bởi luật sở hữu trí tuệ quốc tế."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Gavel className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "2. Acceptable Use" : "2. Quy định sử dụng"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                {isEn 
                  ? "You agree not to use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful."
                  : "Bạn đồng ý không sử dụng website theo bất kỳ cách nào gây thiệt hại hoặc có thể gây thiệt hại cho website, hoặc làm suy giảm khả năng truy cập của người dùng khác; không sử dụng cho các mục đích bất hợp pháp, gian lận hoặc gây hại."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "3. Limitation of Liability" : "3. Giới hạn trách nhiệm"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                {isEn 
                  ? "FCT Vinh Thinh JSC will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss."
                  : "FCT Vĩnh Thịnh JSC sẽ không chịu trách nhiệm đối với bất kỳ tổn thất gián tiếp, đặc biệt hoặc mang tính hệ quả nào phát sinh từ việc sử dụng hoặc liên quan đến nội dung trên website này."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <RefreshCcw className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "4. Changes to Terms" : "4. Thay đổi điều khoản"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
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
