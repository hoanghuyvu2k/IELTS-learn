# CLAUDE.md — Folder luyện thi IELTS

Folder này dùng để lên kế hoạch và tạo bài học luyện thi IELTS (mục tiêu 7.0, xuất phát điểm Aptis B1).

Kế hoạch chi tiết nằm ở `IELTS_Study_Plan.md` — luôn đọc file này trước khi tạo bài học để lấy đúng lịch tuần, giai đoạn hiện tại, và tài liệu.

## Rule: Khi người dùng yêu cầu tạo bài học cho một ngày

1. Đọc `IELTS_Study_Plan.md` để lấy: lịch tuần (thứ nào học kỹ năng gì), giai đoạn hiện tại, tài liệu tương ứng.
2. Nếu người dùng không nói rõ ngày, dùng ngày hiện tại.
3. Xác định ngày đó là thứ mấy → tra bảng "Lịch tuần" trong plan để biết kỹ năng chính hôm đó.
4. Tạo **folder mới** trong thư mục gốc này, tên theo định dạng `YYYY-MM-DD`.
5. Trong folder đó, tạo file `lesson.md` gồm:
   - Kỹ năng học hôm đó + phân bổ thời gian (45 phút nội dung chính + 15 phút ôn từ vựng)
   - Tài liệu cụ thể (trích từ các sách đang có trong folder gốc: Cambridge Grammar for IELTS, Cambridge Vocabulary for IELTS, Cambridge Vocabulary for IELTS Advanced) — nêu rõ unit/trang nếu xác định được
   - **Đọc trực tiếp trang PDF tương ứng của unit đó (dùng Read tool với `pages`) và chép/ghi lại nguyên nội dung bài tập (câu hỏi, đề bài, danh sách từ vựng...) vào `lesson.md`** — không chỉ ghi số trang/tên unit để người dùng tự mở sách, mà phải đưa bài tập vào thẳng file để làm trực tiếp. Không cần chép đáp án (Key) vào — chỉ chép đề bài.
   - Mục để trống ghi kết quả + lỗi sai sau khi học xong
6. Sau khi người dùng báo kết quả học, cập nhật bảng **"Nhật ký học tập hàng ngày"** ở cuối `IELTS_Study_Plan.md` (ngày, kỹ năng, tài liệu/unit, kết quả/lỗi sai).
7. Nếu có lỗi sai lặp lại, ghi thêm vào mục "Ghi chú lỗi sai lặp lại" trong plan.

## Rule: Khi người dùng yêu cầu "chấm bài"

1. Xác định folder ngày đang làm việc (folder `YYYY-MM-DD` gần nhất đã tạo lesson, hoặc ngày người dùng chỉ rõ) và đọc file `lesson.md` trong đó để biết người dùng đã điền câu trả lời gì.
2. Đọc phần **Key/đáp án** trong đúng trang PDF của sách nguồn tương ứng (Cambridge Grammar for IELTS: đáp án ở trang 223 trở đi; Cambridge Vocabulary for IELTS: đáp án ở mục "Answer key" trang 132 trở đi; Cambridge Vocabulary for IELTS Advanced: đáp án ở mục "Answer key" trang 134 trở đi) — tìm đúng unit/bài tập tương ứng với `lesson.md`.
3. Tạo file **`answer.md`** trong cùng folder ngày đó, gồm:
   - Đáp án đúng của từng bài tập (chép từ Key trong sách)
   - Đối chiếu với câu trả lời người dùng đã điền trong `lesson.md`: đánh dấu đúng/sai cho từng câu
   - **Với mỗi câu sai:** không chỉ nêu đáp án đúng, mà phải **giải thích rõ tại sao đáp án đó đúng** (dựa theo lý thuyết ngữ pháp/từ vựng của unit — quy tắc nào áp dụng, vì sao câu trả lời của người dùng không phù hợp).
   - **Với mỗi câu bị bỏ trống (chưa trả lời):** tự điền đáp án đúng vào, đánh dấu rõ là "chưa làm" (không tính vào điểm số/mẫu số đúng), và **giải thích tại sao đáp án đó đúng** giống như câu sai — không để trống không giải thích.
   - Tổng điểm mỗi bài tập (số câu đúng/tổng, câu bỏ trống không tính là đúng)
   - Danh sách lỗi sai lặp lại (nếu có pattern lỗi giống nhau nhiều câu)
3b. Đồng thời tạo file **`new_word.md`** trong cùng folder ngày đó, tổng hợp **từ vựng/collocation mới từ các câu bị sai hoặc bỏ trống** (không cần lấy từ câu đã làm đúng), gồm với mỗi từ/cụm:
   - Từ/cụm từ (kèm loại từ: danh từ/động từ/tính từ...)
   - Nghĩa tiếng Việt
   - Ví dụ câu (lấy từ chính bài tập đã sai, hoặc ví dụ trong sách nếu có)
   - Ghi chú collocation/cách dùng nếu có (ví dụ đi kèm giới từ nào, dễ nhầm với từ nào)
4. Cập nhật bảng **"Nhật ký học tập hàng ngày"** và mục **"Ghi chú lỗi sai lặp lại"** trong `IELTS_Study_Plan.md` dựa trên kết quả chấm.

## Rule: Khi người dùng yêu cầu "cập nhật kết quả hôm nay"

1. Đọc `lesson.md` (và `answer.md` nếu đã chấm bài) của ngày đang học để lấy kết quả/điểm số/lỗi sai.
2. Cập nhật vào `IELTS_Study_Plan.md`:
   - Thêm/cập nhật dòng tương ứng trong bảng **"Nhật ký học tập hàng ngày"** (ngày, kỹ năng, tài liệu/unit, kết quả/lỗi sai).
   - Nếu có lỗi sai lặp lại mới, thêm vào mục **"Ghi chú lỗi sai lặp lại"**.
   - Cập nhật bảng **"Tiến độ tài liệu"** (xem bên dưới): ghi rõ unit/trang cuối cùng đã hoàn thành cho từng sách (Grammar, Vocabulary, Vocabulary Advanced), để buổi học tiếp theo biết bắt đầu từ đâu.
   - Nếu unit/giai đoạn đã hoàn thành đủ điều kiện, tick vào checklist Giai đoạn 1/2/3 tương ứng.
3. Xác nhận lại ngắn gọn với người dùng: đã cập nhật xong, và cho biết buổi học tiếp theo (theo lịch tuần) sẽ học kỹ năng gì + unit tiếp theo nào.

**Lưu ý quan trọng khi tạo bài học mới (áp dụng ngược lại cho rule "tạo bài học"):** trước khi chọn unit để tạo bài học, luôn tra bảng **"Tiến độ tài liệu"** trong plan để lấy **unit tiếp theo** (unit cuối cùng đã học + 1) cho đúng loại tài liệu (Grammar/Vocabulary) thay vì luôn bắt đầu lại từ Unit 1.

## Rule: Khi người dùng yêu cầu "check grammar" / "correct my paragraph" (folder `ielts-practice/`)

Áp dụng cho các file người dùng tự viết trong `ielts-practice/` (ví dụ `ielts-practice/writing/21-9-2026.txt`). Đây là **kịch bản để nói (speaking script)** cho IELTS Speaking, không phải bài Writing Task — nên văn phong phải là văn nói tự nhiên, không phải văn viết học thuật.

1. Đọc file người dùng chỉ định (nếu không nói rõ, dùng file mới nhất trong `ielts-practice/writing/`). Dòng đầu thường là câu hỏi của giám khảo — giữ nguyên làm đề bài.
2. **Không sửa đè file gốc.** Tạo file mới cùng folder, tên `<tên-file-gốc>_corrected.md` (ví dụ `21-9-2026_corrected.md`). Nếu đã tồn tại thì cập nhật file đó.
3. File `_corrected.md` gồm:
   - **Câu hỏi** (chép từ file gốc)
   - **Bài gốc** (giữ nguyên, để đối chiếu)
   - **Bài đã sửa (Band 7+ model answer)**: viết lại đoạn văn thành câu trả lời phù hợp với bài thi IELTS Speaking:
     - Giữ nguyên ý tưởng và câu chuyện của người dùng, không bịa thêm chi tiết cá nhân khác xa nội dung gốc.
     - Sửa hết lỗi ngữ pháp (thì, chia động từ, mạo từ, giới từ, số ít/số nhiều, chính tả, viết hoa, dấu câu).
     - Văn nói tự nhiên, mạch lạc: có từ nối tự nhiên (discourse markers như "Well,", "Actually,", "After that,"), trả lời thẳng vào câu hỏi, có ý mở rộng/lý do/ví dụ ngắn. Độ dài hợp lý cho Part tương ứng (Part 1: khoảng 2–4 câu / 20–30 giây; Part 2: 1–2 phút; Part 3: 3–5 câu).
     - Dùng từ vựng và collocation tự nhiên, ở mức Band 7 (một vài idiom/phrasal verb phù hợp), nhưng không quá hoa mỹ hay học thuật — người dùng đang ở mức B1 → hướng tới 7.0, nên bản sửa phải là thứ họ có thể nhớ và tự nói được.
   - **Bảng lỗi đã sửa**: cột (Câu gốc → Câu sửa → Giải thích ngắn bằng tiếng Việt vì sao sai / quy tắc nào).
   - **Từ vựng / cụm từ hay đáng học** (từ bản sửa): từ/cụm, nghĩa tiếng Việt, ví dụ ngắn.
4. Nếu có lỗi lặp lại nhiều lần (ví dụ luôn sai thì, thiếu mạo từ, "it have" thay vì "it has"), ghi thêm vào mục "Ghi chú lỗi sai lặp lại" trong `IELTS_Study_Plan.md`.
5. Trả lời ngắn gọn trong chat: bản đã sửa + 2–3 lỗi chính cần chú ý; chi tiết nằm trong file `_corrected.md`.

## Rule: Khi người dùng yêu cầu "tạo plan" (không phải bài học IELTS hàng ngày)

Áp dụng khi người dùng yêu cầu lên kế hoạch cho một dự án/việc khác ngoài phạm vi bài học IELTS hàng ngày (ví dụ: kế hoạch làm web app, dự án cá nhân...).

1. Lưu plan vào file markdown trong folder **`plan/`** ở thư mục gốc (tạo folder này nếu chưa có).
2. Đặt tên file mô tả ngắn gọn nội dung plan, dạng kebab-case, ví dụ `plan/flashcard-webapp.md`.
3. Nếu plan cho cùng một chủ đề được cập nhật sau này, sửa/nối tiếp vào đúng file đó thay vì tạo file mới trùng chủ đề.

---

## Bảng "Tiến độ tài liệu" (thêm vào `IELTS_Study_Plan.md` nếu chưa có)

| Tài liệu | Unit cuối đã hoàn thành | Ngày |
|---|---|---|
| Cambridge Grammar for IELTS | | |
| Cambridge Vocabulary for IELTS | | |
| Cambridge Vocabulary for IELTS Advanced | | |
