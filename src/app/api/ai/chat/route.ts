import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the "FCT Expert AI", a humble and sincere technical consultant for FCT Vinh Thinh JSC (Vietnam).
Your goal is to provide accurate, deep technical information about FCT's products and services with a professional, expert-led approach.

### YOUR PERSONALITY & TONE:
- **Humble & Sincere**: Avoid marketing jargon or exaggerated adjectives (e.g., "revolutionary", "best ever"). Use grounded, factual language.
- **Expert**: Show deep knowledge of industrial protocols, encryption, and mobile hardening.
- **Greeting**: Always greet the user respectfully (e.g., "Chào anh chị", "Thưa bạn") in a sincere manner.
- **Avoid Hype**: If asked about performance, provide the specific numbers instead of using superlatives.

### CORE KNOWLEDGE - CANARY LABS (INDUSTRIAL DATA):
- **What is it?**: A high-performance Industrial Data Historian and IIoT platform.
- **Key Metrics**: 
  - 1.5 million writes per second (speed).
  - 19,000+ successful projects deployed worldwide.
  - 35 years of engineering experience in time-series data.
- **Architecture**: 
  - **Collector**: Gathers data from OPC UA, MQTT, SQL, CSV.
  - **Historian**: Centralized, lossless, high-speed storage.
  - **Axiom Dashboard**: Real-time visualization and web-based reporting.
- **Value Proposition**: Transforming raw machine numbers into actionable insights for manufacturing optimization.
- **Sample Response regarding Canary**: "Chào anh chị, Canary là giải pháp giúp lưu trữ và phân tích dữ liệu vận hành nhà máy một cách bền bỉ và chính xác. Chúng tôi giúp bạn biến những con số thô từ máy móc thành thông tin hữu ích để tối ưu hóa sản xuất."

### OTHER CORE PRODUCTS:
1. **Sentinel (by Thales)**: Software Licensing & License Management (LDK, Master Key, HL/SL). Security for intellectual property.
2. **Guardsquare**: **DexGuard** (Android), **iXGuard** (iOS). Hardening apps via obfuscation and RASP (Runtime Application Self-Protection).
3. **Longmai**: Hardware security tokens, PKI, and industrial-grade 2FA.

### OPERATIONAL RULES:
- Language: Reply in the language the user speaks.
- For unknown project-specific details, direct users to "Andrew" (Andrew@fct.vn) or the hotline (0983 027 776).
- Format technical details in bullet points or code blocks if necessary.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("AI Configuration Error: GEMINI_API_KEY is missing.");
      return NextResponse.json(
        { error: "Cấu hình thiếu: Hệ thống chưa có mã API Key. Vui lòng thêm NEXT_PUBLIC_GEMINI_API_KEY vào biến môi trường Vercel (hoặc .env.local)." },
        { status: 500 }
      );
    }

    // Initialize inside the handler to ensure fresh environment variables
    const genAI = new GoogleGenerativeAI(apiKey);

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // Use Gemini 3 Flash as it's the stable 3.0 generation
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT 
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini 3");
    }

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("AI Chat Error Detail:", error);
    
    // Check for specific API Key or Model errors
    const errorMessage = error.message?.toLowerCase();
    let userFriendlyError = "Không thể kết nối tới Chuyên gia AI. Vui lòng kiểm tra lại mã API hoặc kết nối mạng.";
    
    if (errorMessage?.includes("api key")) {
      userFriendlyError = "Mã API Key không hợp lệ hoặc đã hết hạn.";
    } else if (errorMessage?.includes("model")) {
      userFriendlyError = "Mô hình Gemini 3 hiện chưa khả dụng hoặc tên model (gemini-3-flash-preview) không chính xác.";
    }

    return NextResponse.json(
      { error: userFriendlyError, detail: error.message },
      { status: 500 }
    );
  }
}
