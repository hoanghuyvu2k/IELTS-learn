import { askClaude } from "@/lib/anthropic";

const SYSTEM_PROMPT =
  "Bạn là giám khảo IELTS Speaking. Học viên gửi bản chuyển văn bản (transcript) từ câu trả lời nói của họ. " +
  "Nhận xét theo 4 tiêu chí: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation " +
  "(chỉ suy đoán qua văn bản, ví dụ câu ngập ngừng/lặp từ). Chỉ ra lỗi ngữ pháp/từ vựng cụ thể kèm cách sửa, " +
  "gợi ý từ vựng band cao hơn có thể thay thế. Cho điểm band ước tính. Trả lời bằng tiếng Việt.";

export async function POST(request: Request) {
  const { transcript, topic } = await request.json();
  if (!transcript) {
    return Response.json({ error: "Thiếu 'transcript'" }, { status: 400 });
  }

  const userPrompt = `Chủ đề: ${topic ?? "(không rõ)"}\n\nTranscript câu trả lời của học viên:\n${transcript}`;

  try {
    const feedback = await askClaude(SYSTEM_PROMPT, userPrompt);
    return Response.json({ feedback });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
