# 🌐 Staj Forum Web Uygulaması

**Staj Forum**, öğrencilerin staj deneyimlerini paylaşabildiği, diğer kullanıcılarla etkileşime geçebildiği ve yapay zekâ destekli "ChatSTJ" aracılığıyla rehberlik alabileceği bir web platformudur.

## 📋 Proje Durumu

Proje aktif geliştirme aşamasındadır. Temel sayfalar ve bileşenler tamamlanmış, backend API entegrasyonu yapılmıştır.

## 🚀 Teknolojiler

- **React 19** - UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool ve dev server
- **React Router DOM** - Sayfa yönlendirme
- **Material-UI (MUI)** - UI bileşen kütüphanesi
- **Axios** - HTTP istekleri
- **Lucide React** - İkonlar

## 📁 Proje Yapısı

```
src/
├── api/              # Backend API servisleri
│   ├── apiService.ts      # Axios client yapılandırması
│   ├── forumService.ts    # Forum API işlemleri
│   └── contactService.ts  # İletişim formu API işlemleri
├── components/       # Yeniden kullanılabilir bileşenler
│   ├── TopAppBar.tsx      # Üst navigasyon çubuğu
│   ├── BottomBar.tsx      # Alt footer
│   ├── TopicCard.tsx      # Forum topic kartı
│   └── chat/              # Chat bileşenleri
│       ├── ChatHeader.tsx
│       ├── ChatInput.tsx
│       └── ChatMessage.tsx
├── pages/           # Sayfa bileşenleri
│   ├── Anasayfa.tsx           # Ana sayfa
│   ├── Forum.tsx              # Forum listesi ve topic oluşturma
│   ├── ForumKonuSecimi.tsx   # Topic detay sayfası (geliştirme aşamasında)
│   ├── ChatStj.tsx           # AI chat bot (şimdilik mock)
│   ├── Hakkinda.tsx          # Hakkında sayfası
│   └── Iletisim.tsx          # İletişim formu
└── styles/          # CSS dosyaları
    ├── global.css
    ├── variables.css
    ├── components/
    └── pages/
```

## ✨ Tamamlanan Özellikler

### 🏠 Sayfalar
- ✅ **Anasayfa**: Hoş geldin sayfası ve platform tanıtımı
- ✅ **Forum**: Topic listeleme, yeni topic oluşturma, backend entegrasyonu
- ✅ **ChatSTJ**: AI chat arayüzü (şimdilik mock yanıtlar)
- ✅ **Hakkında**: Platform bilgilendirme sayfası
- ✅ **İletişim**: İletişim formu (backend entegrasyonu ile)

### 🧩 Bileşenler
- ✅ **TopAppBar**: Responsive üst navigasyon menüsü (hamburger menu)
- ✅ **BottomBar**: Footer bileşeni
- ✅ **TopicCard**: Forum topic kartları
- ✅ **Chat Bileşenleri**: ChatHeader, ChatInput, ChatMessage

### 🔌 Backend Entegrasyonu
- ✅ API servis yapılandırması (Axios)
- ✅ Forum topic'leri listeleme ve oluşturma
- ✅ İletişim formu mesaj gönderme
- ✅ Backend API varsayılan adresi: `http://localhost:5236/api`
- 🌐 Farklı ortamlar için `.env` dosyasına `VITE_API_BASE_URL` yazarak adresi özelleştirebilirsiniz

### 📡 API Endpoint'leri

**Base URL**: `http://localhost:5236/api`

#### Forum Endpoint'leri
- `GET /forum/topics` - Topic listesi
  - Query Parameters: `page`, `pageSize`, `sortBy`, `search`
  - Response: `PagedResult<Topic>`
- `GET /forum/topics/{id}` - Topic detayı
  - Response: `Topic`
- `POST /forum/topics` - Yeni topic oluşturma
  - Body: `{ title: string, content: string, authorName: string }`
  - Response: `Topic`

#### İletişim Endpoint'leri
- `POST /contact` - İletişim mesajı gönderme
  - Body: `{ name: string, email: string, subject: string, message: string }`
  - Response: `ContactMessage`

### 🎨 Stil ve Tasarım
- ✅ CSS modüler yapı
- ✅ Responsive tasarım
- ✅ Modern UI/UX

## 🚧 Devam Eden Geliştirmeler

- ⏳ **ForumKonuSecimi**: Topic detay sayfası ve yanıt sistemi
- ⏳ **ChatSTJ**: Gerçek AI entegrasyonu (şimdilik mock)
- ⏳ Kullanıcı kimlik doğrulama sistemi

## 🛠️ Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Opsiyonel: API adresini özelleştirin
echo "VITE_API_BASE_URL=https://api.ornek.com/api" >> .env

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview
```

## 📝 Notlar

- Backend API'nin çalışıyor olması gerekmektedir (`localhost:5236`)
- Forum ve İletişim sayfaları backend'e bağlıdır
- ChatSTJ şu anda mock yanıtlar üretmektedir
- Geliştirme sırasında farklı bir makineden erişiyorsanız, tarayıcıdaki host temel alınarak backend isteği aynı makinedeki `:5236/api` adresine yönlendirilir
