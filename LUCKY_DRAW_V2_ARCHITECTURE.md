# 🏗️ TƯ VẤN KIẾN TRÚC HỆ THỐNG LUCKY DRAW V2 (ANGULAR)

Tài liệu này đề xuất kiến trúc hệ thống Lucky Draw hiện đại, tập trung vào khả năng mở rộng, tối ưu SEO, và lộ trình kiếm tiền linh hoạt.

---

## 📋 MỤC LỤC
1. [Tech Stack Đề Xuất](#1-tech-stack-đề-xuất)
2. [Tối Ưu SEO với Angular SSR](#2-tối-ưu-seo-với-angular-ssr)
3. [Chiến Lược Kiếm Tiền (Monetization)](#3-chiến-lược-kiếm-tiền-monetization)
4. [Hệ Thống Người Dùng (User Dashboard)](#4-hệ-thống-người-dùng-user-dashboard)
5. [Bảng Điều Khiển Quản Trị (Admin Panel)](#5-bảng-điều-khuển-quản-trị-admin-panel)
6. [Đa Ngôn Ngữ & Thông Báo](#6-đa-ngôn-ngữ--thông-báo)
7. [Triển Khai & Tối Ưu Chi Phí](#7-triển-khai--tối-ưu-chi-phí)
8. [Roadmap Phát Triển](#8-roadmap-phát-triển)

---

## 1. Tech Stack Đề Xuất

| Thành phần | Công nghệ | Lý do chọn |
| :--- | :--- | :--- |
| **Frontend** | **Angular v17+** | Signal API mới cực nhanh, cấu trúc modular rõ ràng, phù hợp dự án lớn. |
| **Rendering** | **Angular SSR** | Giải quyết vấn đề SEO của SPA, tăng tốc độ tải trang đầu tiên. |
| **UI Library** | **Angular Material** | Chuyên nghiệp, đồng bộ, đặc biệt tốt cho Admin Panel. |
| **Backend/DB** | **Supabase** | Backend-as-a-Service mạnh mẽ, PostgreSQL, Auth, Realtime tích hợp sẵn. |
| **Auth** | **Supabase Auth** | Hỗ trợ Google Login cực kỳ đơn giản cho Angular. |
| **Hosting** | **Vercel / Firebase** | Hỗ trợ tuyệt vời cho Angular SSR, gói Free rất rộng rãi. |

---

## 2. Tối Ưu SEO với Angular SSR
Angular truyền thành (Client-side) gặp khó khăn với Crawler của Google. Giải pháp là dùng **Angular SSR**:
- **Cơ chế**: Server sẽ render HTML hoàn chỉnh trước khi gửi về browser.
- **Lợi ích**: Crawler có thể đọc nội dung ngay lập tức -> Index trang web tốt hơn.
- **Metadata**: Sử dụng `Meta` và `Title` service của Angular để thay đổi Content-Type, Title, Meta Description động theo từng phiên Lucky Draw.

---

## 3. Chiến Lược Kiếm Tiền (Monetization)

Lộ trình được chia làm 2 giai đoạn để tối ưu dòng tiền:

### Giai đoạn 1: Kiếm tiền từ Quảng cáo (Ads-based)
- **Tích hợp**: **Google AdSense**.
- **Vị trí**: 
    - Banner phía trên/dưới vòng quay.
    - Quảng cáo xen kẽ (Interstitial) sau khi có kết quả quay trúng thưởng.
- **Mục tiêu**: Thu hồi vốn từ lượt truy cập tự nhiên.

### Giai đoạn 2: Mô hình Đăng ký (Subscription-based)
- **Tích hợp**: **Stripe**.
- **Cách thức**: Khi người dùng muốn dùng các tính năng Premium (không quảng cáo, tùy chỉnh logo riêng, số lượng người tham gia lớn > 1000).
- **Tính năng**: Cho phép người dùng chọn gói Tuần/Tháng/Năm.

---

## 4. Hệ Thống Người Dùng (User Dashboard)

Cung cấp không gian cá nhân hóa để giữ chân khách hàng:
- **Xác thực**: Đăng nhập bằng Google (Social Login) để giảm ma sát.
- **Profile**: Quản lý thông tin cá nhân.
- **My Lucky Draws**: Danh sách các vòng quay người dùng đã tạo, có thể lưu lại và dùng tiếp lần sau.
- **Subscription Management**: 
    - Sử dụng **Stripe Customer Portal**. 
    - Người dùng tự nâng cấp/hủy gói, xem hóa đơn mà bạn không cần code tay phần quản lý thanh toán phức tạp.

---

## 5. Bảng Điều Khiển Quản Trị (Admin Panel)

Xây dựng bằng **Angular Material** với các chức năng chính:
- **Tổng quan (Insights)**: Biểu đồ tăng trưởng người dùng, số lượt quay trong ngày.
- **Quản lý Users**: 
    - Khóa/mở tài khoản.
    - Xem trạng thái subscription của từng người.
    - Cấp quyền thủ công (Manual Grant) cho khách Vip.
- **Quản lý Nội dung**: Cập nhật danh sách giải thưởng mẫu, template vòng quay.
- **Quản lý Quảng cáo**: Bật/Tắt các vị trí quảng cáo trên hệ thống từ xa mà không cần sửa code.
- **Báo cáo**: Xuất dữ liệu người thắng cuộc (Excel/CSV) để phục vụ trao thưởng.

---

## 6. Đa Ngôn Ngữ & Thông Báo

### Đa ngôn ngữ (Multiple Languages)
- Sử dụng thư viện **Transloco** (linh hoạt hơn i18n mặc định của Angular).
- Hỗ trợ file JSON để dễ dàng thêm ngôn ngữ mới sau này (Việt, Anh, Nhật, Hàn...).

### Thông báo (Notifications)
- **Email**: Sử dụng **SendGrid** hoặc **Amazon SES**. Tự động gửi mail chúc mừng người trúng thưởng hoặc nhắc nhở gia hạn gói subscription.
- **Push**: **Firebase Cloud Messaging (FCM)** thông báo trực tiếp trên trình duyệt khi có sự kiện đặc biệt.

---

## 7. Triển Khai & Tối Ưu Chi Phí

Để bắt đầu với **chi phí $0**, chúng ta sẽ sử dụng mô hình "Pay-as-you-grow":

1. **Frontend**: **Vercel** (Free Tier cho Hobby) - hỗ trợ deploy Angular SSR chỉ với 1 click.
2. **Database**: **Supabase** (Free Tier cho 500MB Data - đủ cho hàng chục ngàn user ban đầu).
3. **Cấu hình**: Tận dụng kiến trúc **Serverless** (chỉ chạy khi có yêu cầu) để giảm thiểu tài nguyên treo.

> [!TIP]
> Bạn chỉ nên nâng cấp lên gói Pro ($20/tháng) khi website bắt đầu có doanh thu từ Quảng cáo hoặc Subs để bù đắp chi phí.

---

## 8. Roadmap Phát Triển

- **Tuần 1-2**: Khởi tạo project Angular + Setup SSR + Tích hợp Supabase Auth.
- **Tuần 3-4**: Xây dựng Core Lucky Draw + Đa ngôn ngữ.
- **Tuần 5-6**: Triển khai Admin Panel + Tích hợp Google AdSense.
- **Tuần 7-8**: Tích hợp Stripe Subscription + Test & Launch Beta.

---

**Kết luận**: Với Angular và kiến trúc Serverless, bạn sẽ có một hệ thống cực kỳ chuyên nghiệp, chuẩn SEO và có thể bắt đầu với kinh phí gần như bằng không.

---
**Phiên bản:** 2.0 (Angular Edition)  
**Ngày cập nhật:** 9 tháng 2, 2026
