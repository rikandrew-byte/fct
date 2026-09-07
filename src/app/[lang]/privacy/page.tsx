import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/config/i18n-config";
import TechGridBackground from "@/components/TechGridBackground";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";
  return {
    title: isEn ? "Privacy Policy | FCT Vinh Thinh" : "Chính sách bảo mật | FCT Vĩnh Thịnh",
    description: "Privacy policy and data protection guidelines for FCT Vinh Thinh JSC customers.",
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-slate-900 border-b border-slate-800 pt-36 pb-20 px-6 overflow-hidden">
        <TechGridBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-sm px-3.5 py-1 text-[11px] font-mono font-semibold text-blue-400 tracking-wider uppercase">
             {isEn ? "COMPLIANCE & PRIVACY" : "QUY ĐỊNH & BẢO MẬT"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight">
            {isEn ? "Privacy" : "Chính sách"} <span className="text-blue-400">{isEn ? "Policy" : "Bảo mật"}</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? "How we protect and manage your data at FCT Vinh Thinh JSC." 
              : "Cách chúng tôi bảo vệ và quản lý dữ liệu của bạn tại FCT Vĩnh Thịnh JSC."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-slate-200 shadow-sm">
          <div className="space-y-10">
            <div className="space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-blue-700">
                <Eye className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "1. Information Collection" : "1. Thu thập thông tin"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "We collect information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, such as your name, email address, phone number, and company name."
                  : "Chúng tôi thu thập thông tin mà bạn tự nguyện cung cấp khi bày tỏ sự quan tâm đến các sản phẩm và dịch vụ của chúng tôi, bao gồm: họ tên, địa chỉ email, số điện thoại và tên doanh nghiệp."}
              </p>
            </div>

            <div className="space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-blue-700">
                <FileText className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "2. How We Use Information" : "2. Sử dụng thông tin"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "We use the information we collect to provide technical consultation, send solution quotes (Thales, Guardsquare, etc.), and improve our website experience. We do not sell or share your data with unauthorized third parties."
                  : "Chúng tôi sử dụng thông tin thu thập được để tư vấn kỹ thuật, cung cấp báo giá giải pháp (Thales, Guardsquare, v.v.) và cải thiện trải nghiệm trên website. Chúng tôi cam kết không bán hoặc chia sẻ dữ liệu của bạn cho bên thứ ba không được ủy quyền."}
              </p>
            </div>

            <div className="space-y-3 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 text-blue-700">
                <Lock className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "3. Data Security" : "3. Bảo mật dữ liệu"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "We implement a variety of technical and organizational security measures designed to maintain the safety of your personal information. However, no electronic transmission over the Internet can be guaranteed to be 100% secure."
                  : "Chúng tôi triển khai các biện pháp bảo mật kỹ thuật và tổ chức để duy trì sự an toàn cho thông tin cá nhân của bạn. Tuy nhiên, không có phương thức truyền tải điện tử nào qua Internet có thể đảm bảo an toàn 100%."}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-700">
                <ShieldCheck className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{isEn ? "4. Your Rights" : "4. Quyền của bạn"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isEn 
                  ? "You have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request a review or removal, please contact us at andrew@fct.vn."
                  : "Bạn có quyền yêu cầu truy cập thông tin cá nhân mà chúng tôi thu thập, yêu cầu chỉnh sửa hoặc xóa bỏ thông tin đó trong một số trường hợp. Để thực hiện các yêu cầu này, vui lòng liên hệ với chúng tôi qua andrew@fct.vn."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
