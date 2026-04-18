import { Metadata } from "next";
import ProductList from "./ProductList";

export const metadata: Metadata = {
  title: "Sản phẩm | Danh mục thiết bị chính hãng",
  description: "Khám phá danh mục thiết bị mạng, máy chủ, lưu trữ và thiết bị đo lường từ các đối tác công nghệ hàng đầu.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Danh Mục Sản Phẩm</h1>
          <p className="text-gray-600 font-light text-lg">Những thiết bị công nghệ hàng đầu được phân phối chính hãng.</p>
        </div>

        <ProductList />
      </div>
    </main>
  );
}
