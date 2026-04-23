import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/config/i18n-config";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";
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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#020617] pt-32 pb-20 px-6 overflow-hidden">
        <NeuralNetworkBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            {isEn ? "Privacy" : "Chính sách"} <span className="text-blue-500">{isEn ? "Policy" : "Bảo mật"}</span>
          </h1>
          <p className="text-slate-400 text-lg font-light">
            {isEn 
              ? "How we protect and manage your data at FCT Vinh Thinh JSC." 
              : "Cách chúng tôi bảo vệ và quản lý dữ liệu của bạn tại FCT Vĩnh Thịnh JSC."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate prose-blue lg:prose-lg">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Eye className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "1. Information Collection" : "1. Thu thập thông tin"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                {isEn 
                  ? "We collect information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, such as your name, email address, phone number, and company name."
                  : "Chúng tôi thu thập thông tin mà bạn tự nguyện cung cấp khi bày tỏ sự quan tâm đến các sản phẩm và dịch vụ của chúng tôi, bao gồm: họ tên, địa chỉ email, số điện thoại và tên doanh nghiệp."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <FileText className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "2. How We Use Information" : "2. Sử dụng thông tin"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                {isEn 
                  ? "We use the information we collect to provide technical consultation, send solution quotes (Thales, Guardsquare, etc.), and improve our website experience. We do not sell or share your data with unauthorized third parties."
                  : "Chúng tôi sử dụng thông tin thu thập được để tư vấn kỹ thuật, cung cấp báo giá giải pháp (Thales, Guardsquare, v.v.) và cải thiện trải nghiệm trên website. Chúng tôi cam kết không bán hoặc chia sẻ dữ liệu của bạn cho bên thứ ba không được ủy quyền."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Lock className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "3. Data Security" : "3. Bảo mật dữ liệu"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                {isEn 
                  ? "We implement a variety of technical and organizational security measures designed to maintain the safety of your personal information. However, no electronic transmission over the Internet can be guaranteed to be 100% secure."
                  : "Chúng tôi triển khai các biện pháp bảo mật kỹ thuật và tổ chức để duy trì sự an toàn cho thông tin cá nhân của bạn. Tuy nhiên, không có phương thức truyền tải điện tử nào qua Internet có thể đảm bảo an toàn 100%."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">{isEn ? "4. Your Rights" : "4. Quyền của bạn"}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
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
