import { askClaude } from "@/lib/anthropic";

const SYSTEM_PROMPT =
  "Bạn là gia sư tiếng Anh, chuyên hỗ trợ người học luyện thi IELTS xuất phát điểm B1 hướng tới band 7.0. " +
  "Trả lời bằng tiếng Việt, giải thích ngữ pháp/từ vựng ngắn gọn, có ví dụ minh hoạ, chỉ ra lỗi thường gặp nếu liên quan.";

export async function POST(request: Request) {
  const { question } = await request.json();
  if (!question) {
    return Response.json({ error: "Thiếu 'question'" }, { status: 400 });
  }

  try {
    const answer = await askClaude(SYSTEM_PROMPT, question);
    return Response.json({ answer });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
