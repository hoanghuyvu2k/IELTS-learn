# Plan: Web app flashcard + AI agent hỗ trợ học IELTS

**Mục tiêu:** xây một web app cá nhân để ôn từ vựng dạng flashcard (đọc dữ liệu từ repo `english` này), học được cả trên điện thoại lẫn máy tính, và có thể phát triển dài hạn để tích hợp AI agent hỗ trợ nhiều việc học tập hơn (chấm Writing, luyện Speaking, tự sinh lesson...).

**Ngày lên plan:** 2026-08-14

---

## Công nghệ

| Thành phần | Chọn | Vì sao |
|---|---|---|
| Framework | **Next.js (React + TypeScript)** | Vừa làm frontend vừa viết API route (backend nhẹ) trong cùng project — cần thiết vì sau này gọi AI (Claude API) phải giấu API key ở server, trang tĩnh thuần (GitHub Pages) không làm được |
| Styling | **Tailwind CSS** | Code nhanh, dễ maintain một mình |
| Hosting + CI/CD | **Vercel** | Free tier, tự deploy mỗi khi push GitHub, có sẵn serverless functions để gọi AI API an toàn |
| Database | **Supabase** (Postgres + Auth, free tier) | Cần để đồng bộ tiến độ ôn từ (SRS state), điểm số quiz giữa điện thoại và máy tính — localStorage không đồng bộ được đa thiết bị |
| AI Agent | **Anthropic Claude API**, gọi qua Vercel serverless route | Key giữ ở server (biến môi trường), không lộ ra client |
| Nguồn nội dung | Repo GitHub `english` hiện tại | Đọc `new_word.md`, `lesson.md` qua GitHub API/raw URL — giữ nguyên quy trình học hiện tại (folder theo ngày) làm nguồn dữ liệu |

**Vì sao không dùng GitHub Pages:** chỉ host được trang tĩnh, không chạy được code server để giấu API key khi tích hợp AI sau này. Next.js + Vercel giải quyết vấn đề này ngay từ đầu, đỡ phải đổi kiến trúc giữa chừng.

---

## Lộ trình các bước

### Phase 1 — MVP Flashcard
1. Tạo project Next.js + TypeScript + Tailwind trong folder `webapp/` (cùng repo hiện tại)
2. Deploy lên Vercel, nối với GitHub repo (auto-deploy mỗi lần push)
3. Viết API route đọc & parse các file `*/new_word.md` từ repo thành danh sách từ (JSON)
4. Build giao diện flashcard + thuật toán Leitner box đơn giản (lưu tạm ở localStorage)

### Phase 2 — Đồng bộ đa thiết bị
5. Thêm Supabase: bảng lưu trạng thái ôn từ (SRS), lịch sử điểm quiz
6. Auth đơn giản (email magic link, vì chỉ 1 người dùng)
7. Chuyển dữ liệu từ localStorage sang Supabase

### Phase 3 — Tích hợp AI Agent
8. Thêm serverless route gọi Claude API (key trong Vercel env var)
9. Chatbot hỏi-đáp ngữ pháp/từ vựng ngay trong app
10. AI chấm Writing Task 2 tự động (thay việc chấm thủ công như `answer.md` hiện tại)
11. Luyện Speaking (ghi âm → AI transcribe + feedback), tự sinh lesson hàng ngày dựa theo "Tiến độ tài liệu"

### Phase 4 — Tự động hóa
12. GitHub Action: mỗi lần commit `new_word.md`/`lesson.md` mới → tự trigger rebuild app, không cần thao tác thủ công

---

## Trạng thái hiện tại

- [ ] Phase 1
- [ ] Phase 2
- [ ] Phase 3
- [ ] Phase 4
