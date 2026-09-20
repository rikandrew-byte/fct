"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ho?ng Nguy廙",
    role: "CTO Ng璽n h?ng s廙?,
    content: "Ch繳ng t繫i ?瓊 tin d羅ng DexGuard t廙?Guardsquare do FCT cung c廕叼 ?廙?b廕υ v廙?廙姊g d廙叩g Mobile Banking. Gi廕ξ ph獺p n?y ng?n ch廕搖 c獺c n廙?l廙帷 d廙h ng廙θ v? t廕叩 c繫ng gi廕?m廕︽ b廕彫g c獺ch m瓊 h籀a m瓊 ngu廙 v? ph獺t hi廙 Overlay trong th廙 gian th廙帷, b廕υ v廙?h?ng tri廙 giao d廙h m廙 ng?y.",
  },
  {
    name: "Tr廕吵 Anh",
    role: "Tr廙g ph簷ng R&D Ph廕吵 m廙",
    content: "T廙?khi tri廙 khai qu廕τ l羸 license b廕彫g kh籀a c廙姊g Sentinel c廙吧 Thales, v廕叩 ?廙?b廕τ quy廙 kh繫ng c簷n l? n廙 lo. H廙?th廙g linh ho廕﹀ v? b廕υ m廕負 c廙帷 cao ?瓊 gi繳p ch繳ng t繫i an t璽m m廙?r廙g th廙?tr廙g ra qu廙 t廕?",
  },
  {
    name: "L礙 Minh",
    role: "Gi獺m ?廙 V廕要 h?nh S廕τ xu廕另",
    content: "H廙?th廙g Canary Historian ?瓊 gi廕ξ quy廕篙 tri廙 ?廙?b?i to獺n thu th廕計 d廙?li廙 kh廙g l廙?t廙?nh? m獺y. Kh廕?n?ng n矇n d廙?li廙 m廕》h m廕?v? truy xu廕另 th廙 gian th廙帷 gi繳p ch繳ng t繫i ki廙 so獺t ch廕另 l廙τg ch穩nh x獺c ?廕積 t廙南g mili gi璽y.",
  },
  {
    name: "?廕搖g Tu廕叩",
    role: "Tech Lead t廕【 Fintech Startup",
    content: "Vi廙 t穩ch h廙φ iXGuard cho 廙姊g d廙叩g iOS ?瓊 gi繳p ch繳ng t繫i v廙ㄅ qua c獺c ?廙ㄅ ki廙 duy廙 b廕υ m廕負 kh廕眩 khe t廙??廙 t獺c qu廙 t廕? Gi廕ξ ph獺p c廙吧 Guardsquare th廙帷 s廙?l? 't廕叮 khi礙n' v廙疸g ch廕畚 cho m瓊 ngu廙 c廙吧 ch繳ng t繫i.",
  },
  {
    name: "Ph廕《 Th?nh",
    role: "Tr廙g ph簷ng CNTT (Kh廙 Nh? n廙)",
    content: "Ch繳ng t繫i ?獺nh gi獺 cao d簷ng s廕τ ph廕姓 Token PKI c廙吧 Longmai do FCT ph璽n ph廙. S廙?廙 ?廙h v? kh廕?n?ng tng th穩ch v廙 h廙?th廙g ch廙?k羸 s廙?hi廙 t廕【 ?瓊 gi繳p quy tr穫nh h?nh ch穩nh c繫ng ?廙θ b廕υ v廙?b廕彫g ti礙u chu廕姊 FIPS 140-2 Level 3.",
  },
  {
    name: "Nguy廙 Hng",
    role: "Gi獺m ?廙 C繫ng ty Ph廕吵 m廙",
    content: "Hn 5 n?m h廙φ t獺c, FCT Vinh Thinh kh繫ng ch廙?l? nh? cung c廕叼 m? c簷n l? ?廙 t獺c tin c廕軌. ?廙 ng觼 k廙?thu廕負 lu繫n c籀 m廕暗 k廙 th廙 ?廙?x廙?l羸 c獺c v廕叩 ?廙?ph獺t sinh trong vi廙 qu廕τ l羸 license ph廙妾 t廕︾.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter opacity-90">Kh獺ch H?ng N籀i G穫</h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-tight italic">
            Ni廙 tin l? gi獺 tr廙?c廙 l繭i trong m廙 gi廕ξ ph獺p an ninh c廙吧 ch繳ng t繫i.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-8 group relative"
            >
              <div>
                <div className="flex gap-1 mb-6 text-cyan-600">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-gray-700 font-light italic leading-relaxed text-lg">
                  &quot;{testi.content}&quot;
                </p>
              </div>
              <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 font-black text-lg group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-gray-950 text-base tracking-tight">{testi.name}</h3>
                  <p className="text-xs text-cyan-700 font-bold uppercase tracking-widest mt-0.5">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
