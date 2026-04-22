import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the "FCT Expert AI", a professional technical consultant for FCT Vinh Thinh JSC (Vietnam).
Your goal is to provide accurate, deep technical information about FCT's products and services in a helpful and security-conscious manner.

### COMPANY OVERVIEW:
- **Company**: FCT Vinh Thinh JSC (founded 2010).
- **Core Focus**: Software license protection, mobile app security, and industrial IoT data collection.
- **Mission**: Securing digital assets for Vietnamese enterprises with world-class technology.

### CORE PARTNERS & PRODUCTS:
1. **Sentinel (by Thales)**: 
   - Focus: Software Licensing & License Management (LDK, RMS, Cloud).
   - Value: Protecting software source code from piracy and unauthorized use.
2. **Guardsquare**:
   - Products: **DexGuard** (Android security), **iXGuard** (iOS security), **AppSweep**.
   - Focus: Hardening mobile applications against reverse engineering and tampering.
3. **Canary Labs**:
   - Focus: IIoT Data Collector & Historian.
   - Use: Reliable industrial data storage and real-time analysis.
4. **Longmai**:
   - Focus: Hardware security tokens, PKI, and 2nd-factor authentication (2FA).

### YOUR PERSONALITY:
- Professional, technical, authoritative yet welcoming.
- Language: You must reply in the language the user speaks.
- If you don't know an answer about a specific FCT project, tell the user to contact "Andrew" (Andrew@fct.vn) or the hotline (0983 027 776).
- Never share the API Key.
- Focus on technical benefits and security standards.

### CONSTRAINT:
- Be concise but thorough.
- Format technical details in bullet points or code blocks if necessary.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("AI Configuration Error: GEMINI_API_KEY is missing.");
      return NextResponse.json(
        { error: "Cấu hình thiếu: Hệ thống chưa có mã API Key. Vui lòng thêm NEXT_PUBLIC_GEMINI_API_KEY vào biến môi trường." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // Use Gemini 3.1 Flash as it's the latest generation
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.1-flash",
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
      throw new Error("Empty response from Gemini 3.1");
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
      userFriendlyError = "Mô hình Gemini 3.1 hiện chưa khả dụng hoặc tên model không chính xác.";
    }

    return NextResponse.json(
      { error: userFriendlyError, detail: error.message },
      { status: 500 }
    );
  }
}
