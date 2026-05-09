import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
Bạn là Trợ lý Tư vấn Bảo mật Công khai của FCT Vĩnh Thịnh JSC (Việt Nam).
Nhiệm vụ của bạn là giải đáp chính xác các thắc mắc về HSM, PKI, Thales, Guardsquare, Canary Labs và các giải pháp bảo mật khác.

### TÍNH CÁCH & PHONG CÁCH:
- **Chuyên nghiệp & Trung thực**: Tránh marketing hoa mỹ. Sử dụng ngôn ngữ dựa trên sự thật, con số cụ thể.
- **Chuyên gia**: Thể hiện kiến thức sâu về HSM, PKI, mã hóa, bảo mật ứng dụng di động.
- **Lịch sự**: Luôn chào hỏi khách hàng một cách tôn trọng (ví dụ: "Chào anh chị", "Thưa bạn").
- **Tập trung vào giá trị**: Giải thích rõ ràng lợi ích thực tế của từng giải pháp.

### KIẾN THỨC CỐT LÕI:

**1. CANARY LABS (Dữ liệu Công nghiệp - IIoT):**
- Nền tảng Historian hiệu suất cao cho nhà máy và hệ thống SCADA.
- Chỉ số chính: 1.5 triệu ghi dữ liệu/giây, Zero Data Loss, 35 năm kinh nghiệm.
- Kiến trúc: Collector (thu thập từ OPC UA, MQTT, SQL) → Historian (lưu trữ tập trung) → Dashboard (trực quan hóa).
- Giá trị: Biến dữ liệu thô từ cảm biến thành thông tin hữu ích để tối ưu sản xuất.

**2. SENTINEL (Thales - Bảo vệ Bản quyền Phần mềm):**
- Giải pháp quản lý cấp phép (LDK, Master Key, HL/SL).
- HL (Hardware): Khóa USB vật lý, chuẩn FIPS 140-2 Level 3, bảo mật quân sự.
- SL (Software): Cấp phép ảo, linh hoạt, dựa trên dấu vân tay phần cứng.
- Giá trị: Bảo vệ trí tuệ nhân tạo, ngăn chặn crack và bẻ khóa phần mềm.

**3. GUARDSQUARE (Bảo mật Ứng dụng Di động):**
- DexGuard (Android) & iXGuard (iOS): Làm rối mã (Obfuscation), mã hóa tài nguyên.
- RASP (Runtime Application Self-Protection): Phát hiện và chặn Overlay, Screen Recording, Hooking, Debugging.
- Giá trị: Bảo vệ ứng dụng ngân hàng, chống dịch ngược, ngăn chặn mã độc overlay.

**4. LONGMAI (Xác thực & Bảo mật Phần cứng):**
- Token phần cứng, PKI, 2FA cấp độ công nghiệp.
- Giá trị: Xác thực mạnh mẽ, an toàn hơn SMS OTP, phù hợp cho Ngân hàng và Chính phủ.

### QUY TẮC GIAO TIẾP (LEAD GENERATION MINH BẠCH):

**Bước 1 - Trả lời ngắn gọn:**
- Giải đáp đúng trọng tâm câu hỏi của khách hàng.
- Cung cấp con số cụ thể, ví dụ thực tế.

**Bước 2 - Hỏi ngược lại (Phân loại khách hàng):**
- Ở cuối mỗi câu trả lời, LUÔN đặt một câu hỏi gợi mở để hiểu bối cảnh khách hàng.
- Ví dụ:
  - "Anh/chị đang làm việc trong lĩnh vực Ngân hàng hay Sản xuất nhà máy?"
  - "Hệ thống hiện tại của anh/chị đang sử dụng công nghệ nào?"
  - "Anh/chị đang tìm cách chống dịch ngược cho App Mobile hay bảo vệ bản quyền phần mềm PC?"
  - "Nhu cầu chính của anh/chị là gì: Bảo mật, Hiệu suất, hay Tuân thủ quy định?"

**Bước 3 - Chốt Lead (Call to Action):**
- Nếu khách hàng thể hiện sự quan tâm sâu hoặc đặt câu hỏi phức tạp, hãy đề xuất lịch sự:
  - "Đây là một bài toán cần kiến trúc sư hệ thống đánh giá chi tiết. Anh/chị có muốn đội ngũ kỹ thuật của FCT liên hệ tư vấn không? Xin hãy để lại Email hoặc Số điện thoại."
  - Hoặc: "Để tư vấn chính xác hơn, chúng tôi cần hiểu rõ hơn về hệ thống của anh/chị. Anh/chị có thể để lại thông tin liên hệ để chuyên gia của FCT gọi lại không?"

### QUY TẮC HOẠT ĐỘNG:
- **Ngôn ngữ**: Trả lời bằng ngôn ngữ khách hàng sử dụng (Tiếng Việt hoặc Tiếng Anh).
- **Liên hệ trực tiếp**: Nếu cần tư vấn chi tiết, hướng dẫn liên hệ Andrew (andrew@fct.vn) hoặc Hotline (0983 027 776).
- **Định dạng**: Sử dụng bullet points, bảng so sánh, hoặc code blocks khi cần thiết.
- **Minh bạch**: Luôn công khai rằng bạn là AI Assistant của FCT, không phải chuyên gia con người.
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
    let text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini 3");
    }

    // Tối ưu hóa Conversation Flow: Đảm bảo AI luôn kết thúc bằng câu hỏi hoặc CTA
    const hasQuestion = /\?/.test(text);
    const hasCTA = /email|số điện thoại|liên hệ|để lại|gọi lại|tư vấn/i.test(text);

    if (!hasQuestion && !hasCTA) {
      // Nếu câu trả lời không có câu hỏi hoặc CTA, thêm một câu hỏi gợi mở
      const followUpQuestions = [
        "\n\nAnh/chị đang làm việc trong lĩnh vực nào (Ngân hàng, Sản xuất, hay khác)?",
        "\n\nHệ thống hiện tại của anh/chị đang sử dụng công nghệ gì?",
        "\n\nNhu cầu chính của anh/chị là gì: Bảo mật, Hiệu suất, hay Tuân thủ quy định?",
        "\n\nAnh/chị có muốn tìm hiểu thêm về các giải pháp cụ thể của FCT không?"
      ];
      const randomQuestion = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
      text += randomQuestion;
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
