import { loadAllWords } from "@/lib/words";

export async function GET() {
  const words = await loadAllWords();
  return Response.json({ words });
}
