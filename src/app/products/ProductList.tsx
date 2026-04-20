"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  ChevronDown,
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
  RefreshCcw,
  LucideIcon,
} from "lucide-react";
import productsData from "@/data/products.json";

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
    badgeBg:      "bg-blue-800 text-white",
    iconBg:       "bg-blue-50",
    iconColor:    "text-blue-800",
    hoverBorder:  "hover:border-blue-200",
    hoverShadow:  "hover:shadow-blue-500/10",
    activeBtn:    "bg-blue-800 text-white shadow-lg shadow-blue-900/20",
    dot:          "bg-blue-800",
    imgRingColor: "ring-blue-100",
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
  "Canary Labs": {
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
};

const categories = ["Tất cả", "Thales", "Guardsquare", "Canary Labs", "Longmai"];

export default function ProductList() {
  const [searchQuery, setSearchQuery]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [expandedId, setExpandedId]             = useState<string | null>(null);
  const [imgErrors, setImgErrors]               = useState<Set<string>>(new Set());

  const filteredProducts = (productsData as Product[]).filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleImgError = (id: string) =>
    setImgErrors((prev) => new Set(prev).add(id));

  return (
    <div className="space-y-10">
      {/* ── Search + Filter Bar ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm sticky top-24 z-20">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="product-search"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto scrollbar-hide">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const cfg = categoryConfig[cat];
            const activeClass = cfg
              ? cfg.activeBtn
              : "bg-blue-600 text-white shadow-lg shadow-blue-500/20";

            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive ? activeClass : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cfg && (
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${cfg.dot} ${isActive ? "opacity-0 w-0 overflow-hidden" : ""}`}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product count */}
      <p className="text-sm text-gray-400 font-light -mt-4">
        Hiển thị{" "}
        <span className="font-semibold text-gray-700">{filteredProducts.length}</span>{" "}
        sản phẩm
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
              <div
                key={prod.id}
                className={`bg-white rounded-[2rem] border flex flex-col transition-all duration-200 overflow-hidden group ${
                  cfg ? `${cfg.hoverBorder} ${cfg.hoverShadow}` : "hover:border-blue-200 hover:shadow-blue-500/5"
                } hover:shadow-xl ${isExpanded ? "border-gray-200 shadow-lg" : "border-gray-100 shadow-sm"}`}
              >
                {/* ── Product Image area ──────────────────────────────── */}
                <div
                  className={`relative w-full bg-gray-50 overflow-hidden ${
                    cfg ? cfg.imgRingColor : "ring-blue-100"
                  }`}
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
                  ) : (
                    /* Fallback icon when no image or error */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                          cfg ? cfg.iconBg : "bg-blue-50"
                        }`}
                      >
                        <Icon
                          className={`w-10 h-10 ${cfg ? cfg.iconColor : "text-blue-800"}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* NEW badge overlay */}
                  {prod.isNew && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg animate-pulse">
                      MỚI
                    </span>
                  )}
                </div>

                {/* ── Card body ──────────────────────────────────────── */}
                <div className="p-7 flex flex-col flex-1 gap-4">
                  {/* Category badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg w-fit ${
                      cfg ? cfg.badgeBg : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {prod.category}
                  </span>

                  {/* Name + summary */}
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">
                      {prod.name}
                    </h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed italic line-clamp-3">
                      {prod.summary}
                    </p>
                  </div>

                  {/* Expanded description */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-dashed border-gray-100">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {prod.description}
                      </p>
                    </div>
                  )}

                  {/* Toggle button */}
                  <div className="pt-4 border-t border-gray-50">
                    <button
                      id={`expand-${prod.id}`}
                      onClick={() => toggleExpand(prod.id)}
                      className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                        isExpanded
                          ? cfg?.iconColor ?? "text-blue-800"
                          : `text-gray-400 hover:${cfg?.iconColor ?? "text-blue-800"}`
                      }`}
                    >
                      {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <p className="text-gray-500 font-light text-lg">
            Không tìm thấy sản phẩm phù hợp.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("Tất cả"); }}
            className="text-blue-600 font-semibold hover:underline"
          >
            Xoá bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
