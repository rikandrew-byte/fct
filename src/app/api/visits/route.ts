import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST() {
  try {
    // Lệnh INCR sẽ tự động cộng 1 vào biến 'fct_page_views' trong Database
    // Nếu biến này chưa tồn tại, nó sẽ tự tạo và bắt đầu từ 1.
    const total = await kv.incr('fct_page_views');
    
    return NextResponse.json({ total });
  } catch (error) {
    console.error('[VISITS_API_ERROR]', error);
    // Nếu bạn chưa cấu hình Database Vercel KV, nó sẽ báo lỗi và tạm trả về 0
    return NextResponse.json({ total: 0, error: 'Database chưa được kết nối' }, { status: 500 });
  }
}
