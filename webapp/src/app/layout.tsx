import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IELTS Study App",
  description: "Trợ lý học IELTS cá nhân: flashcard, chatbot, chấm Writing/Speaking",
};

const NAV_ITEMS = [
  { href: "/", label: "Flashcard" },
  { href: "/chat", label: "Hỏi đáp" },
  { href: "/writing", label: "Chấm Writing" },
  { href: "/speaking", label: "Luyện Speaking" },
  { href: "/lesson", label: "Tạo bài học" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex gap-4 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </body>
    </html>
  );
}
