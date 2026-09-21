"use client";

import { useState } from "react";

export default function WritingPage() {
  const [taskType, setTaskType] = useState("Task 2");
  const [prompt, setPrompt] = useState("");
  const [essay, setEssay] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGrade() {
    if (!essay.trim()) return;
    setLoading(true);
    setError("");
    setFeedback("");
    const res = await fetch("/api/ai/grade-essay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ essay, taskType, prompt }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else setFeedback(data.feedback);
  }

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-10 gap-4">
      <h1 className="text-2xl font-semibold">Chấm Writing bằng AI</h1>
      <div className="w-full max-w-2xl flex flex-col gap-3">
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 bg-white dark:bg-zinc-900 self-start"
        >
          <option>Task 1</option>
          <option>Task 2</option>
        </select>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Đề bài (tuỳ chọn)"
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 bg-white dark:bg-zinc-900"
        />
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Dán bài viết của bạn vào đây..."
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 min-h-[240px] bg-white dark:bg-zinc-900"
        />
        <button
          onClick={handleGrade}
          disabled={loading}
          className="self-start rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Đang chấm..." : "Chấm bài"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {feedback && (
          <div className="whitespace-pre-wrap border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
