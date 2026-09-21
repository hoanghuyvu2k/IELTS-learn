import { readFile } from "fs/promises";
import path from "path";
import { askClaude } from "@/lib/anthropic";

const SYSTEM_PROMPT =
  "Bạn là gia sư IELTS soạn bài tập luyện tập ngắn cho học viên band mục tiêu 7.0, xuất phát điểm B1. " +
  "Soạn bài tập thực hành mới (không cần trích y nguyên từ sách nào) phù hợp kỹ năng và chủ đề được yêu cầu, " +
  "độ dài vừa cho 45 phút tự học. Định dạng Markdown, có đề bài rõ ràng, không kèm đáp án.";

async function readProgressTable(): Promise<string> {
  try {
    const planPath = path.join(process.cwd(), "..", "IELTS_Study_Plan.md");
    const content = await readFile(planPath, "utf-8");
    const match = content.match(/## Tiến độ tài liệu[\s\S]*?(?=\n---|\n## )/);
    return match ? match[0] : "";
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  const { skill, topic } = await request.json();
  if (!skill) {
    return Response.json({ error: "Thiếu 'skill'" }, { status: 400 });
  }

  const progressTable = await readProgressTable();
  const userPrompt =
    `Kỹ năng cần luyện hôm nay: ${skill}${topic ? `, chủ đề: ${topic}` : ""}.\n\n` +
    (progressTable ? `Tiến độ tài liệu hiện tại:\n${progressTable}` : "");

  try {
    const lessonMarkdown = await askClaude(SYSTEM_PROMPT, userPrompt);
    return Response.json({ lessonMarkdown });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
