import { askClaude } from "@/lib/anthropic";

const SYSTEM_PROMPT =
  "Bạn là giám khảo IELTS Writing. Chấm bài theo 4 tiêu chí chính thức: Task Achievement/Response, " +
  "Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy. " +
  "Với mỗi tiêu chí: cho điểm band ước tính (0-9) và nhận xét ngắn gọn bằng tiếng Việt. " +
  "Liệt kê cụ thể các câu có lỗi ngữ pháp/từ vựng kèm cách sửa. Cuối cùng cho điểm overall band ước tính.";

export async function POST(request: Request) {
  const { essay, taskType, prompt } = await request.json();
  if (!essay) {
    return Response.json({ error: "Thiếu 'essay'" }, { status: 400 });
  }

  const userPrompt = `Đề bài (${taskType ?? "Task 2"}): ${prompt ?? "(không có đề cụ thể)"}\n\nBài làm của học viên:\n${essay}`;

  try {
    const feedback = await askClaude(SYSTEM_PROMPT, userPrompt);
    return Response.json({ feedback });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
