"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Shield,
  ShieldCheck,
  Layers,
  Cpu,
  Minimize2,
  CreditCard,
  LayoutDashboard,
  Network,
  Clock,
  Timer,
  HardDrive,
  Code2,
  Crown,
  Smartphone,
  Lock,
  Activity,
  KeyRound,
  LucideIcon,
} from "lucide-react";

import productsVi from "@/data/products_vi.json";
import productsEn from "@/data/products_en.json";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  summary: string;
  description: string;
  isNew: boolean;
  link: string;
}

interface ProductListProps {
  lang: string;
}

// ─── Category colour config ───────────────────────────────────────────────
const categoryConfig: Record<
  string,
  {
    badgeBg: string;
    iconBg: string;
    iconColor: string;
    hoverBorder: string;
    hoverShadow: string;
    activeBtn: string;
    dot: string;
    imgRingColor: string;
  }
> = {
  Thales: {
    badgeBg:      "bg-cyan-800 text-white",
    iconBg:       "bg-cyan-50",
    iconColor:    "text-cyan-800",
    hoverBorder:  "hover:border-cyan-200",
    hoverShadow:  "hover:shadow-cyan-500/10",
    activeBtn:    "bg-cyan-800 text-white shadow-lg shadow-cyan-900/20",
    dot:          "bg-cyan-800",
    imgRingColor: "ring-cyan-100",
  },
  Guardsquare: {
    badgeBg:      "bg-sky-500 text-white",
    iconBg:       "bg-sky-50",
    iconColor:    "text-sky-600",
    hoverBorder:  "hover:border-sky-200",
    hoverShadow:  "hover:shadow-sky-500/10",
    activeBtn:    "bg-sky-500 text-white shadow-lg shadow-sky-500/20",
    dot:          "bg-sky-500",
    imgRingColor: "ring-sky-100",
  },
  "Industrial Data & IIoT": {
    badgeBg:      "bg-amber-500 text-white",
    iconBg:       "bg-amber-50",
    iconColor:    "text-amber-600",
    hoverBorder:  "hover:border-amber-200",
    hoverShadow:  "hover:shadow-amber-500/10",
    activeBtn:    "bg-amber-500 text-white shadow-lg shadow-amber-500/20",
    dot:          "bg-amber-500",
    imgRingColor: "ring-amber-100",
  },
  Longmai: {
    badgeBg:      "bg-red-500 text-white",
    iconBg:       "bg-red-50",
    iconColor:    "text-red-600",
    hoverBorder:  "hover:border-red-200",
    hoverShadow:  "hover:shadow-red-500/10",
    activeBtn:    "bg-red-500 text-white shadow-lg shadow-red-500/20",
    dot:          "bg-red-500",
    imgRingColor: "ring-red-100",
  },
  Guardant: {
    badgeBg:      "bg-emerald-600 text-white",
    iconBg:       "bg-emerald-50",
    iconColor:    "text-emerald-600",
    hoverBorder:  "hover:border-emerald-200",
    hoverShadow:  "hover:shadow-emerald-500/10",
    activeBtn:    "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
    dot:          "bg-emerald-600",
    imgRingColor: "ring-emerald-100",
  },
};

// ─── Per-product fallback icon ─────────────────────────────────────────────
const productIcons: Record<string, LucideIcon> = {
  "sentinel-hl-basic":         Shield,
  "sentinel-hl-pro":           ShieldCheck,
  "sentinel-hl-max":           Layers,
  "sentinel-hl-max-chip":      Cpu,
  "sentinel-hl-max-micro":     Minimize2,
  "sentinel-hl-max-expresscard": CreditCard,
  "sentinel-hl-max-board":     LayoutDashboard,
  "sentinel-hl-net":           Network,
  "sentinel-hl-time":          Clock,
  "sentinel-hl-net-time":      Timer,
  "sentinel-hl-drive":         HardDrive,
  "sentinel-ldk-developer":    Code2,
  "sentinel-ldk-master":       Crown,
  "dexguard":                  Smartphone,
  "ixguard":                   Lock,
  "canary-historian":          Activity,
  "longmai-smartx1":          Shield,
  "longmai-smartx3":          KeyRound,
  "longmai-timepro":          Timer,
  "guardant-ecosystem":        ShieldCheck,
};

export default function ProductList({ lang }: ProductListProps) {
  const isEn = lang === "en";
  const productsData = isEn ? productsEn : productsVi;
  const categoryKeys = ["All", "Thales", "Guardsquare", "Industrial Data & IIoT", "Longmai", "Guardant"];
  const categoryLabels: Record<string, string> = isEn ? {
    "All": "All",
    "Thales": "Thales",
    "Guardsquare": "Guardsquare",
    "Industrial Data & IIoT": "Industrial Data & IIoT",
    "Longmai": "Longmai",
    "Guardant": "Guardant"
  } : {
    "All": "Tất cả",
    "Thales": "Thales",
    "Guardsquare": "Guardsquare",
    "Industrial Data & IIoT": "Dữ liệu công nghiệp & IIoT",
    "Longmai": "Longmai",
    "Guardant": "Guardant"
  };

  const [searchQuery, setSearchQuery]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);
  const [expandedId, setExpandedId]             = useState<string | null>(null);
  const [imgErrors, setImgErrors]               = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    return (productsData as Product[]).filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === categoryKeys[0] || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productsData, searchQuery, selectedCategory, categoryKeys]);

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleImgError = (id: string) =>
    setImgErrors((prev) => new Set(prev).add(id));

  return (
    <div className="space-y-10">
      {/* ── Search + Filter Bar ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-xs sticky top-24 z-20">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="product-search"
            type="text"
            placeholder={isEn ? "Search products..." : "Tìm kiếm sản phẩm..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-900 outline-none focus:border-cyan-500 focus:bg-white transition-all font-sans"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto scrollbar-hide">
          {categoryKeys.map((catKey) => {
            const isActive = selectedCategory === catKey;
            const cfg = categoryConfig[catKey];
            const label = categoryLabels[catKey];
            const activeClass = cfg
              ? cfg.activeBtn
              : "bg-cyan-600 text-white";

            return (
              <button
                key={catKey}
                id={`filter-${catKey.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setSelectedCategory(catKey)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive ? activeClass : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cfg && (
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot} ${isActive ? "opacity-0 w-0 overflow-hidden" : ""}`}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product count */}
      <p className="text-xs text-slate-500 font-mono -mt-4">
        {isEn ? "Showing " : "Hiển thị "}
        <span className="font-bold text-slate-800">{filteredProducts.length}</span>{" "}
        {isEn ? "products" : "sản phẩm"}
      </p>

      {/* ── Product Grid ──────────────────────────────────────────────── */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const cfg = categoryConfig[prod.category];
            const Icon = productIcons[prod.id] ?? Shield;
            const isExpanded = expandedId === prod.id;
            const hasImgError = imgErrors.has(prod.id);

            return (
              <article
                key={prod.id}
                className={`bg-white rounded-lg border flex flex-col transition-all duration-200 overflow-hidden group ${
                  cfg ? `${cfg.hoverBorder} ${cfg.hoverShadow}` : "hover:border-slate-300 hover:shadow-md"
                } hover:shadow-md ${isExpanded ? "border-slate-300 shadow-sm" : "border-slate-200 shadow-xs"}`}
              >
                {/* ── Product Image area ──────────────────────────────── */}
                <div
                  className="relative w-full bg-slate-50 border-b border-slate-100 overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  {prod.image && !hasImgError ? (
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImgError(prod.id)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : prod.category === "Guardant" ? (
                    <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                      <div className="w-14 h-14 bg-emerald-50 rounded-sm flex items-center justify-center border border-emerald-200">
                        <Icon className="w-7 h-7 text-emerald-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-14 h-14 rounded-sm flex items-center justify-center ${
                          cfg ? cfg.iconBg : "bg-cyan-50"
                        }`}
                      >
                        <Icon
                          className={`w-7 h-7 ${cfg ? cfg.iconColor : "text-cyan-800"}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* NEW badge overlay */}
                  {prod.isNew && (
                    <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">
                      {isEn ? "NEW" : "MỚI"}
                    </span>
                  )}
                </div>

                {/* ── Card body ──────────────────────────────────────── */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  {/* Category badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm w-fit ${
                      cfg ? cfg.badgeBg : "bg-cyan-50 text-cyan-700"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {prod.category}
                  </span>

                  {/* Name + summary */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {prod.summary}
                    </p>
                  </div>

                  {/* Expanded description */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-dashed border-slate-200">
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {prod.description}
                      </p>
                    </div>
                  )}

                  {/* Toggle button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      id={`expand-${prod.id}`}
                      onClick={() => toggleExpand(prod.id)}
                      className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                        isExpanded
                          ? cfg?.iconColor ?? "text-cyan-800"
                          : `text-slate-600 hover:${cfg?.iconColor ?? "text-cyan-800"}`
                      }`}
                    >
                      {isExpanded ? (isEn ? "Show less" : "Thu gọn") : (isEn ? "View summary" : "Xem tóm tắt")}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Link button */}
                  <div className="mt-2">
                    <Link 
                      href={prod.category === "Thales" ? `/${lang}/products/thales-sentinel` : 
                            prod.category === "Guardsquare" ? `/${lang}/products/guardsquare` : 
                            prod.category === "Longmai" ? `/${lang}/products/longmai` : 
                            prod.category === "Industrial Data & IIoT" ? `/${lang}/products/canary-labs` :
                            `/${lang}/products/${prod.id}`} 
                          className="w-full block">
                      <button className={`w-full py-2.5 rounded-sm font-semibold uppercase tracking-wider text-[11px] transition-all flex items-center justify-center gap-1.5 group shadow-xs ${
                        cfg ? `${cfg.badgeBg} hover:opacity-90` : "bg-cyan-600 text-white hover:bg-cyan-700"
                      }`}>
                        {isEn ? "View Architecture" : "Xem kiến trúc chi tiết"}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <p className="text-gray-500 font-light text-lg">
            {isEn ? "No products found." : "Không tìm thấy sản phẩm phù hợp."}
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory(categoryKeys[0]); }}
            className="text-cyan-600 font-semibold hover:underline"
          >
            {isEn ? "Clear filters" : "Xoá bộ lọc"}
          </button>
        </div>
      )}
    </div>
  );
}
