"use client";

import { useState } from "react";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else setAnswer(data.answer);
  }

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-10 gap-4">
      <h1 className="text-2xl font-semibold">Hỏi đáp ngữ pháp / từ vựng</h1>
      <div className="w-full max-w-xl flex flex-col gap-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ví dụ: phân biệt relation và relationship"
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 min-h-[100px] bg-white dark:bg-zinc-900"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="self-start rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Đang hỏi..." : "Hỏi"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {answer && (
          <div className="whitespace-pre-wrap border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}
