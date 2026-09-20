import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST() {
  try {
    // L廙h INCR s廕?t廙??廙g c廙g 1 v?o bi廕積 'fct_page_views' trong Database
    // N廕簑 bi廕積 n?y cha t廙 t廕【, n籀 s廕?t廙?t廕︽ v? b廕眩 ?廕吟 t廙?1.
    const total = await kv.incr('fct_page_views');
    
    return NextResponse.json({ total });
  } catch (error) {
    console.error('[VISITS_API_ERROR]', error);
    // N廕簑 b廕》 cha c廕只 h穫nh Database Vercel KV, n籀 s廕?b獺o l廙 v? t廕《 tr廕?v廙?0
    return NextResponse.json({ total: 0, error: 'Database cha ?廙θ k廕篙 n廙' }, { status: 500 });
  }
}
