import { getSupabaseClient } from "./supabaseClient";

export type CardProgress = {
  box: number; // 1-5
  dueAt: number; // epoch ms
};

export type ProgressMap = Record<string, CardProgress>;

const STORAGE_KEY = "flashcard-progress";
const BOX_INTERVAL_DAYS = [0, 0, 1, 3, 7, 14]; // index = box number, box 1 -> due immediately

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

type WordProgressRow = { word_id: string; box: number; due_at: string };

// Cross-device progress: Supabase when configured, localStorage otherwise/as offline cache.
export async function loadProgressSynced(): Promise<ProgressMap> {
  const local = loadProgress();
  const supabase = getSupabaseClient();
  if (!supabase) return local;

  const { data, error } = await supabase
    .from("word_progress")
    .select("word_id, box, due_at");
  if (error || !data) return local;

  const remote: ProgressMap = {};
  (data as WordProgressRow[]).forEach((row) => {
    remote[row.word_id] = { box: row.box, dueAt: new Date(row.due_at).getTime() };
  });
  const merged = { ...local, ...remote };
  saveProgress(merged);
  return merged;
}

export async function saveCardSynced(id: string, card: CardProgress) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("word_progress").upsert({
    word_id: id,
    box: card.box,
    due_at: new Date(card.dueAt).toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export function ensureCard(progress: ProgressMap, id: string): CardProgress {
  if (!progress[id]) {
    progress[id] = { box: 1, dueAt: Date.now() };
  }
  return progress[id];
}

export function reviewCard(
  progress: ProgressMap,
  id: string,
  remembered: boolean
): ProgressMap {
  const current = ensureCard(progress, id);
  const nextBox = remembered ? Math.min(current.box + 1, 5) : 1;
  const intervalDays = BOX_INTERVAL_DAYS[nextBox];
  const dueAt = Date.now() + intervalDays * 24 * 60 * 60 * 1000;
  const updated: ProgressMap = { ...progress, [id]: { box: nextBox, dueAt } };
  saveProgress(updated);
  saveCardSynced(id, updated[id]);
  return updated;
}
