# Lucky Draw - Quay Số Trúng Thưởng 🎉

Hệ thống quay số trúng thưởng online miễn phí, công bằng và minh bạch. Hỗ trợ đa ngôn ngữ (Tiếng Việt & English).

## 🎯 Tính năng

- ✅ **5 cấp độ giải thưởng**: Giải đặc biệt, Giải nhất, Giải nhì, Giải ba, Giải khuyến khích
- ✅ **Đa ngôn ngữ**: Tiếng Việt & English
- ✅ **Quản lý danh sách**: Nhập và lưu trữ danh sách người tham gia
- ✅ **Lưu kết quả**: Tự động lưu trữ danh sách trúng thưởng
- ✅ **Hiệu ứng đẹp mắt**: Animations, confetti, popup chúc mừng
- ✅ **Responsive**: Tương thích mọi thiết bị
- ✅ **Tối ưu SEO**: Chuẩn SEO Google

## 🚀 Cài đặt

1. Clone repository:
```bash
git clone https://github.com/StevenNgo25/wheelofwow.git
cd wheelofwow
```

2. Mở file `index.html` trong trình duyệt hoặc deploy lên server

## 📱 Sử dụng

1. **Nhập danh sách tham gia**:
   - Cuộn xuống phần "Quản lý danh sách tham gia"
   - Nhập theo format: `Mã - Tên` hoặc chỉ `Mã`
   - Nhấn "Tải danh sách"

2. **Chọn giải thưởng**:
   - Chọn một trong 5 giải: Đặc biệt, Nhất, Nhì, Ba, Khuyến khích
   - Hoặc dùng mũi tên trái/phải để chuyển

3. **Quay số**:
   - Nhấn nút "QUAY SỐ" hoặc phím Space/Enter
   - Chờ 10 giây để hệ thống chọn người trúng
   - Kết quả sẽ hiển thị từng số một

4. **Chuyển ngôn ngữ**:
   - Nhấn nút 🇻🇳 VN hoặc 🇬🇧 EN ở góc phải header

## 🔧 Cấu trúc file

```
wheelofwow/
├── index.html              # Trang chính
├── styles.css              # CSS styling
├── script.js               # Logic chính
├── translations.js         # Hệ thống đa ngôn ngữ
├── manifest.json           # PWA manifest
├── sitemap.xml             # Sitemap cho Google
├── robots.txt              # Hướng dẫn cho search bots
├── .htaccess              # Cấu hình Apache (SEO)
└── README.md              # File này
```

## 🎨 Tùy chỉnh giải thưởng

Mở file `script.js` và tìm đến hàm `showCongratulationsPopup`:

```javascript
const prizeRewards = {
    'giải đặc biệt': '',
    'giải nhất': '',
    'giải nhì': '',
    'giải ba': '',
    'giải khuyến khích': ''
};
```

Thay đổi tên giải thưởng theo ý muốn.

## 🔍 SEO Optimization

Website đã được tối ưu SEO với:

### Meta Tags
- ✅ Title, Description, Keywords
- ✅ Open Graph (Facebook)
- ✅ Twitter Cards
- ✅ Canonical URL
- ✅ Language tags

### Technical SEO
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structured Data (JSON-LD)
- ✅ Schema.org WebApplication
- ✅ Semantic HTML5
- ✅ Mobile-friendly
- ✅ Fast loading

### Performance
- ✅ Gzip compression (.htaccess)
- ✅ Browser caching
- ✅ Optimized fonts loading
- ✅ Minimal external dependencies

### Hướng dẫn tăng thứ hạng Google

1. **Submit Sitemap**:
   - Vào [Google Search Console](https://search.google.com/search-console)
   - Thêm property: `https://wheelofwow.vercel.app/wheelofwow`
   - Submit sitemap: `https://wheelofwow.vercel.app/wheelofwow/sitemap.xml`

2. **Tạo Backlinks**:
   - Chia sẻ trên social media
   - Viết blog posts về công cụ
   - Đăng ký directory websites

3. **Tối ưu nội dung**:
   - Thêm blog/articles về cách sử dụng
   - Tạo video hướng dẫn
   - Thêm FAQ section

4. **Technical**:
   - Đảm bảo HTTPS
   - Tối ưu tốc độ loading (<3s)
   - Đảm bảo mobile-friendly
   - Fix broken links

5. **Local SEO** (nếu cần):
   - Thêm địa chỉ công ty
   - Google My Business
   - Local citations

## 📊 Analytics (khuyến nghị)

Thêm Google Analytics hoặc alternatives:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🌐 Deploy

### GitHub Pages
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Bật GitHub Pages trong Settings → Pages

### Netlify / Vercel
- Kéo thả folder vào dashboard
- Hoặc kết nối Git repository

## 📝 License

MIT License - Sử dụng tự do cho mọi mục đích

## 👨‍💻 Author

**Steven Ngo**
- GitHub: [@StevenNgo25](https://github.com/StevenNgo25)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📞 Support

Nếu có vấn đề, vui lòng tạo issue trên GitHub.

---

⭐ **Nếu thấy hữu ích, hãy star cho project nhé!** ⭐
