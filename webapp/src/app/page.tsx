"use client";

import { useEffect, useMemo, useState } from "react";
import { ensureCard, loadProgressSynced, reviewCard, type ProgressMap } from "@/lib/leitner";
import type { WordCard } from "@/lib/words";

export default function Home() {
  const [words, setWords] = useState<WordCard[] | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [skipIds, setSkipIds] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setSkipIds([]);
  }, [showAll]);

  useEffect(() => {
    fetch("/api/words")
      .then((res) => res.json())
      .then((data: { words: WordCard[] }) => setWords(data.words));
    loadProgressSynced().then(setProgress);
  }, []);

  const wordMap = useMemo(() => {
    const map = new Map<string, WordCard>();
    words?.forEach((w) => map.set(w.id, w));
    return map;
  }, [words]);

  const queue = useMemo(() => {
    if (!words) return [];
    const now = Date.now();
    const skip = new Set(skipIds);
    return words
      .filter((w) => !skip.has(w.id))
      .filter((w) => showAll || ensureCard({ ...progress }, w.id).dueAt <= now)
      .map((w) => w.id);
  }, [words, progress, showAll, skipIds]);

  const currentId = queue[0];
  const currentCard = currentId ? wordMap.get(currentId) : undefined;

  function handleAnswer(remembered: boolean) {
    if (!currentId) return;
    const updated = reviewCard(progress, currentId, remembered);
    setProgress(updated);
    setReviewedCount((c) => c + 1);
    setFlipped(false);
    setSkipIds((ids) => [...ids, currentId]);
  }

  if (!words) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">Đang tải từ vựng...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black px-4 py-10 gap-6">
      <h1 className="text-2xl font-semibold">Ôn từ vựng IELTS</h1>
      <p className="text-sm text-zinc-500">
        Tổng {words.length} từ · Đã ôn hôm nay: {reviewedCount} · Còn lại: {queue.length}
      </p>

      <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
        />
        Ôn tất cả (bỏ qua lịch Leitner)
      </label>

      {!currentCard ? (
        <div className="mt-10 text-center">
          <p className="text-lg">🎉 Không còn thẻ nào đến hạn hôm nay!</p>
          <p className="text-sm text-zinc-500 mt-2">
            Bật &quot;Ôn tất cả&quot; nếu muốn ôn lại toàn bộ từ đã học.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <button
            onClick={() => setFlipped((f) => !f)}
            className="w-full min-h-[220px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col items-center justify-center gap-3 text-center shadow-sm"
          >
            {!flipped ? (
              <span className="text-xl font-medium">{currentCard.term}</span>
            ) : (
              <div className="flex flex-col gap-2">
                {currentCard.wordType && (
                  <span className="text-xs uppercase tracking-wide text-zinc-400">
                    {currentCard.wordType}
                  </span>
                )}
                <span className="text-lg font-medium">{currentCard.meaning}</span>
                {currentCard.example && (
                  <span className="text-sm italic text-zinc-500">
                    {currentCard.example}
                  </span>
                )}
                {currentCard.note && (
                  <span className="text-xs text-zinc-400">{currentCard.note}</span>
                )}
              </div>
            )}
          </button>
          <p className="text-center text-xs text-zinc-400 mt-2">
            Bấm vào thẻ để lật {flipped ? "lại" : "xem đáp án"}
          </p>

          {flipped && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 rounded-full border border-red-300 text-red-600 py-3 font-medium hover:bg-red-50 dark:hover:bg-red-950"
              >
                Chưa nhớ
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 rounded-full bg-green-600 text-white py-3 font-medium hover:bg-green-700"
              >
                Nhớ rồi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
