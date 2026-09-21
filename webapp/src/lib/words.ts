import { readdir, readFile } from "fs/promises";
import path from "path";

export type WordCard = {
  id: string;
  term: string;
  wordType?: string;
  meaning?: string;
  example?: string;
  note?: string;
  sourceDate: string;
  sourceTable: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "..");
const DATE_FOLDER_RE = /^\d{4}-\d{2}-\d{2}$/;

function stripMd(cell: string): string {
  return cell.replace(/\*\*/g, "").trim();
}

function findHeaderField(header: string, keyword: string): boolean {
  return header.toLowerCase().includes(keyword.toLowerCase());
}

function parseMarkdownTables(markdown: string, sourceDate: string): WordCard[] {
  const lines = markdown.split("\n");
  const cards: WordCard[] = [];
  let currentTableTitle = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("##")) {
      currentTableTitle = line.replace(/^#+\s*/, "");
      continue;
    }

    const isHeaderRow = line.startsWith("|") && lines[i + 1]?.trim().match(/^\|[\s:-]+\|/);
    if (!isHeaderRow) continue;

    const headers = line.split("|").slice(1, -1).map((h) => h.trim());
    const termIdx = 0;
    const typeIdx = headers.findIndex((h) => findHeaderField(h, "loại"));
    const meaningIdx = headers.findIndex((h) => findHeaderField(h, "nghĩa"));
    const exampleIdx = headers.findIndex((h) => findHeaderField(h, "ví dụ"));
    const noteIdx = headers.findIndex((h) => findHeaderField(h, "ghi chú"));

    let rowIdx = i + 2;
    while (rowIdx < lines.length && lines[rowIdx].trim().startsWith("|")) {
      const cells = lines[rowIdx].split("|").slice(1, -1).map(stripMd);
      if (cells[termIdx]) {
        cards.push({
          id: `${sourceDate}-${cards.length}`,
          term: cells[termIdx],
          wordType: typeIdx >= 0 ? cells[typeIdx] : undefined,
          meaning: meaningIdx >= 0 ? cells[meaningIdx] : undefined,
          example: exampleIdx >= 0 ? cells[exampleIdx] : undefined,
          note: noteIdx >= 0 ? cells[noteIdx] : undefined,
          sourceDate,
          sourceTable: currentTableTitle,
        });
      }
      rowIdx++;
    }
    i = rowIdx - 1;
  }

  return cards;
}

export async function loadAllWords(): Promise<WordCard[]> {
  const entries = await readdir(CONTENT_ROOT, { withFileTypes: true });
  const dateFolders = entries
    .filter((e) => e.isDirectory() && DATE_FOLDER_RE.test(e.name))
    .map((e) => e.name)
    .sort();

  const allCards: WordCard[] = [];
  for (const folder of dateFolders) {
    const filePath = path.join(CONTENT_ROOT, folder, "new_word.md");
    try {
      const content = await readFile(filePath, "utf-8");
      allCards.push(...parseMarkdownTables(content, folder));
    } catch {
      continue;
    }
  }

  return allCards;
}
