"use client";

import { useState } from "react";

const SKILLS = ["Grammar", "Vocabulary", "Listening", "Reading", "Writing", "Speaking", "Review"];

export default function LessonPage() {
  const [skill, setSkill] = useState(SKILLS[0]);
  const [topic, setTopic] = useState("");
  const [lessonMarkdown, setLessonMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setLessonMarkdown("");
    const res = await fetch("/api/ai/generate-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill, topic }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else setLessonMarkdown(data.lessonMarkdown);
  }

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-10 gap-4">
      <h1 className="text-2xl font-semibold">Tạo bài học nhanh bằng AI</h1>
      <p className="text-sm text-zinc-500 max-w-xl text-center">
        Bài tập ở đây do AI tự soạn mới, không trích nguyên văn từ sách Cambridge — dùng khi muốn luyện thêm
        ngoài giáo trình chính trong <code>lesson.md</code>.
      </p>
      <div className="w-full max-w-2xl flex flex-col gap-3">
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 bg-white dark:bg-zinc-900 self-start"
        >
          {SKILLS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Chủ đề cụ thể (tuỳ chọn)"
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 bg-white dark:bg-zinc-900"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="self-start rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Đang soạn..." : "Tạo bài học"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {lessonMarkdown && (
          <div className="whitespace-pre-wrap border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
            {lessonMarkdown}
          </div>
        )}
      </div>
    </div>
  );
}
