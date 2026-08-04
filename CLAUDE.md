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
   - Tổng điểm mỗi bài tập (số câu đúng/tổng)
   - Giải thích ngắn cho các câu sai (dựa theo lý thuyết ngữ pháp/từ vựng của unit đó)
   - Danh sách lỗi sai lặp lại (nếu có pattern lỗi giống nhau nhiều câu)
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

---

## Bảng "Tiến độ tài liệu" (thêm vào `IELTS_Study_Plan.md` nếu chưa có)

| Tài liệu | Unit cuối đã hoàn thành | Ngày |
|---|---|---|
| Cambridge Grammar for IELTS | | |
| Cambridge Vocabulary for IELTS | | |
| Cambridge Vocabulary for IELTS Advanced | | |
