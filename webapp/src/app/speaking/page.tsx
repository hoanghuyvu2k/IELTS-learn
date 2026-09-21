"use client";

import { useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};

function createRecognition(): SpeechRecognitionLike | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

export default function SpeakingPage() {
  const [topic, setTopic] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  function toggleRecording() {
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }

    const recognition = createRecognition();
    if (!recognition) {
      setError("Trình duyệt này không hỗ trợ ghi âm chuyển văn bản (thử Chrome).");
      return;
    }
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setTranscript((prev) => (prev ? `${prev} ${text}` : text));
    };
    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  }

  async function handleGetFeedback() {
    if (!transcript.trim()) return;
    setLoading(true);
    setError("");
    setFeedback("");
    const res = await fetch("/api/ai/speaking-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, topic }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else setFeedback(data.feedback);
  }

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-10 gap-4">
      <h1 className="text-2xl font-semibold">Luyện Speaking</h1>
      <div className="w-full max-w-2xl flex flex-col gap-3">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Chủ đề (ví dụ: Describe a memorable trip)"
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 bg-white dark:bg-zinc-900"
        />
        <button
          onClick={toggleRecording}
          className={`self-start rounded-full px-5 py-2 font-medium text-white ${
            recording ? "bg-red-600" : "bg-black dark:bg-white dark:text-black"
          }`}
        >
          {recording ? "Dừng ghi âm" : "Bắt đầu nói"}
        </button>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Transcript sẽ hiện ở đây (có thể sửa tay nếu nhận sai)"
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 min-h-[160px] bg-white dark:bg-zinc-900"
        />
        <button
          onClick={handleGetFeedback}
          disabled={loading}
          className="self-start rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Đang chấm..." : "Nhận xét"}
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
