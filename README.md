# Staj Forum Web

Staj Forum platformunun modern web arayüzüdür. Stajyerlerin deneyimlerini paylasabilecegi bir forum, yapay zeka destekli sohbet asistani, kullanici kimlik dogrulama sistemi ve CV analiz araclari sunar.

PROJE TANITIMI YOUTUBE LİNK: https://youtu.be/qcWZVtor6gA

## Ozellikler

*   **Kullanici Kimlik Dogrulama:**
    *   JWT tabanlı güvenli giriş ve kayıt sistemi
    *   Zustand ile global state yönetimi
    *   LocalStorage ile oturum kalıcılığı
    *   Profil sayfası ile kullanıcı bilgileri yönetimi

*   **Forum:**
    *   Kullanicilarin staj deneyimlerini paylasip tartisabilecegi konu tabanli yapi
    *   **Topic Sıralama:** "En Yeni", "En Eski" ve "En Çok Görüntülenen" seçenekleri
    *   **Arama Fonksiyonu:** Konu başlıklarında arama
    *   **Gelişmiş Filtreleme:** Özel tasarım dropdown menüsü
    *   **Rich Text Editor:** HTML destekli zengin içerik editörü
    *   **Sayfalama:** Performanslı içerik yükleme
    *   **Konu Detay Sayfası:** Yorumlar, görüntülenme sayısı ve yanıt ekleme
    *   **Kullanıcı Bazlı İçerik:** Sadece kendi konularını düzenleyebilme/silebilme

*   **AI Sohbet Asistani (ChatStj):**
    *   Google Gemini API destekli akıllı asistan
    *   Stajyerlerin sorularini yanitlayan konusma tabanlı arayüz
    *   Conversation ID ile sohbet geçmişi takibi
    *   Gerçek zamanlı yazıyor göstergesi
    *   Otomatik scroll ve kullanıcı dostu mesajlaşma

*   **AI CV Analizi:**
    *   PDF formatindaki CV'leri tarayici uzerinde işleme (Client-Side)
    *   pdfjs-dist ile PDF parsing
    *   Yapay zeka ile güçlü/zayıf yön analizi
    *   10 üzerinden puanlama sistemi
    *   Stratejik kariyer tavsiyeleri
    *   Manuel metin yapıştırma desteği

*   **İletişim Formu:**
    *   Backend'e mesaj gönderme sistemi
    *   Form validasyonu
    *   Başarı/hata bildirimleri

*   **Duyarli Tasarim (Responsive):**
    *   Mobil ve masaustu cihazlarla tam uyumlu
    *   Modern, premium UI/UX tasarımı
    *   CSS değişkenleri ile tutarlı stil sistemi
    *   Responsive font boyutları ve spacing

## Teknolojiler

### Core
*   **Framework:** React 19.1.1
*   **Dil:** TypeScript 5.9.3
*   **Derleme Araci:** Vite 7.1.7
*   **Routing:** React Router DOM 7.9.4

### State Yönetimi
*   **Zustand:** 5.0.9 (Global state management)
*   **Zustand Persist:** LocalStorage ile state kalıcılığı

### UI ve Stil
*   **Stil Sistemi:** Vanilla CSS (CSS Değişkenleri ve Modüler Yapı)
*   **Material-UI:** @mui/material 7.3.4 (Seçili bileşenler için)
*   **Emotion:** @emotion/react ve @emotion/styled (MUI için)
*   **İkonlar:** lucide-react 0.546.0

### API ve Veri
*   **HTTP Client:** Axios 1.13.2
*   **JWT Decode:** jwt-decode 4.0.0
*   **AI Entegrasyonu:** Google Gemini API (Backend üzerinden)
*   **PDF İşleme:** pdfjs-dist 5.4.449

### Geliştirme Araçları
*   **Linter:** ESLint 9.36.0
*   **TypeScript ESLint:** typescript-eslint 8.45.0
*   **Vite Plugin:** @vitejs/plugin-react 5.0.4

## Kurulum ve Calistirma

Projeyi yerel ortamda calistirmak icin asagidaki adimlari izleyin.

### Gereksinimler
*   Node.js 18.x veya üzeri
*   npm veya yarn
*   Backend API'nin çalışır durumda olması (varsayılan: `http://localhost:5276/api`)

### Adımlar

1.  **Bagimliliklari Yukleyin:**
    ```bash
    npm install
    ```

2.  **Ortam Değişkenlerini Ayarlayın (Opsiyonel):**
    Proje kök dizininde `.env` dosyası oluşturun:
    ```env
    VITE_API_BASE_URL=http://localhost:5276/api
    ```
    Not: Belirtilmezse otomatik olarak localhost:5276 kullanılır.

3.  **Gelistirme Sunucusunu Baslatin:**
    ```bash
    npm run dev
    ```
    Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

4.  **Production Build (Opsiyonel):**
    ```bash
    npm run build
    npm run preview
    ```

## Proje Mimarisi

### Dizin Yapısı

```
src/
├── api/                    # Backend API servisleri
│   ├── apiService.ts       # Axios client ve interceptor'lar
│   ├── authService.ts      # Kimlik doğrulama servisleri
│   ├── forumService.ts     # Forum CRUD işlemleri
│   ├── chatService.ts      # AI chat servisleri
│   └── contactService.ts   # İletişim formu servisleri
│
├── components/             # Yeniden kullanılabilir UI bileşenleri
│   ├── TopAppBar.tsx       # Üst navigasyon çubuğu
│   ├── BottomBar.tsx       # Alt bilgi çubuğu
│   ├── TopicCard.tsx       # Forum konu kartı
│   ├── CustomDropdown.tsx  # Özel dropdown bileşeni
│   ├── RichTextEditor.tsx  # HTML editör bileşeni
│   └── chat/               # Chat bileşenleri
│       ├── ChatHeader.tsx
│       ├── ChatMessage.tsx
│       └── ChatInput.tsx
│
├── pages/                  # Ana sayfa bileşenleri
│   ├── Anasayfa.tsx        # Ana sayfa
│   ├── Forum.tsx           # Forum listesi
│   ├── ForumKonuSecimi.tsx # Konu detay sayfası
│   ├── ChatStj.tsx         # AI sohbet sayfası
│   ├── CVAnaliz.tsx        # CV analiz sayfası
│   ├── Giris.tsx           # Giriş sayfası
│   ├── Kayit.tsx           # Kayıt sayfası
│   ├── Profile.tsx         # Kullanıcı profil sayfası
│   ├── Hakkinda.tsx        # Hakkında sayfası
│   └── Iletisim.tsx        # İletişim sayfası
│
├── store/                  # Global state yönetimi
│   └── useAuthStore.ts     # Zustand auth store
│
├── types/                  # TypeScript tip tanımları
│   └── auth.ts             # Auth tipleri
│
├── styles/                 # CSS stil dosyaları
│   ├── global.css          # Global stiller ve reset
│   ├── variables.css       # CSS değişkenleri
│   ├── App.css             # App bileşeni stilleri
│   ├── components/         # Bileşen stilleri
│   └── pages/              # Sayfa stilleri
│
├── App.tsx                 # Ana uygulama bileşeni
└── main.tsx                # Giriş noktası
```

## Özellikler Detayı

### 1. Kimlik Doğrulama Sistemi

**Zustand Store (`useAuthStore.ts`):**
*   JWT token yönetimi
*   Kullanıcı bilgileri (user, token, isAuthenticated)
*   Login/Register/Logout fonksiyonları
*   LocalStorage ile persist
*   Hata yönetimi

**API Interceptor:**
*   Her istekte otomatik JWT token ekleme
*   Authorization header yönetimi
*   Token'ı localStorage'dan okuma

**Sayfalar:**
*   `Giris.tsx`: Email/şifre ile giriş
*   `Kayit.tsx`: Yeni kullanıcı kaydı
*   `Profile.tsx`: Kullanıcı profili ve içerikleri

### 2. Forum Sistemi

**Özellikler:**
*   Konu listeleme (sayfalama ile)
*   Sıralama: newest, oldest, popular
*   Arama fonksiyonu
*   Rich text editor ile konu oluşturma
*   Konu detay sayfası
*   Yorum ekleme/görüntüleme
*   Kullanıcı bazlı düzenleme/silme

**Bileşenler:**
*   `Forum.tsx`: Ana forum sayfası
*   `ForumKonuSecimi.tsx`: Konu detay sayfası
*   `TopicCard.tsx`: Konu kartı bileşeni
*   `CustomDropdown.tsx`: Sıralama dropdown'u
*   `RichTextEditor.tsx`: HTML editör

**API Servisleri:**
*   `getTopics()`: Konu listesi
*   `getTopicById()`: Konu detayı
*   `createTopic()`: Yeni konu
*   `updateTopic()`: Konu güncelleme
*   `deleteTopic()`: Konu silme
*   `getReplies()`: Yorumları getir
*   `createReply()`: Yeni yorum
*   `updateReply()`: Yorum güncelleme
*   `deleteReply()`: Yorum silme

### 3. AI Sohbet Asistanı (ChatStj)

**Özellikler:**
*   Google Gemini API entegrasyonu
*   Conversation ID ile sohbet takibi
*   Gerçek zamanlı mesajlaşma
*   Yazıyor göstergesi
*   Otomatik scroll
*   Mesaj geçmişi

**Bileşenler:**
*   `ChatStj.tsx`: Ana chat sayfası
*   `ChatHeader.tsx`: Chat başlığı
*   `ChatMessage.tsx`: Mesaj balonu
*   `ChatInput.tsx`: Mesaj giriş alanı

**API:**
*   `sendChatMessage()`: Mesaj gönder ve yanıt al

### 4. CV Analizi

**Özellikler:**
*   PDF yükleme ve parsing (client-side)
*   pdfjs-dist ile metin çıkarma
*   AI ile analiz
*   Güçlü/zayıf yönler
*   Puanlama (1-10)
*   Kariyer tavsiyeleri

**Teknik:**
*   PDF.js worker konfigürasyonu
*   ArrayBuffer ile dosya okuma
*   Sayfa sayfa metin çıkarma
*   Backend'e metin gönderme

**API:**
*   `analyzeCV()`: CV analizi yap

### 5. Stil Sistemi

**CSS Değişkenleri (`variables.css`):**
*   **Renkler:** Primary (#BF092F), Secondary (#16476A), Accent (#3B9797)
*   **Tipografi:** Inter font, responsive font boyutları
*   **Spacing:** xs'den 4xl'e kadar spacing sistemi
*   **Shadows:** sm, md, lg, xl gölge efektleri
*   **Border Radius:** sm, md, lg, xl
*   **Transitions:** fast (0.2s), normal (0.3s)
*   **Z-Index:** Katman yönetimi

**Responsive Tasarım:**
*   Desktop: 1280px max-width
*   Tablet: 768px breakpoint
*   Mobile: 480px breakpoint
*   Responsive font boyutları
*   Mobile-first yaklaşım

**Modüler CSS:**
*   Her sayfa için ayrı CSS dosyası
*   Her bileşen için ayrı CSS dosyası
*   Global stiller ve reset
*   CSS değişkenleri ile tutarlılık

## API Servisleri

### apiService.ts (Base Client)

**Özellikler:**
*   Axios instance oluşturma
*   Base URL yönetimi (env veya otomatik)
*   Request interceptor (JWT token ekleme)
*   LocalStorage'dan token okuma

### authService.ts

*   `register(data)`: Yeni kullanıcı kaydı
*   `login(data)`: Kullanıcı girişi
*   `getUser(id)`: Kullanıcı bilgilerini getir

### forumService.ts

*   `getTopics(page, pageSize, sortBy, search)`: Konu listesi
*   `getTopicById(id)`: Konu detayı
*   `createTopic(topic)`: Yeni konu
*   `updateTopic(id, title, content)`: Konu güncelle
*   `deleteTopic(id)`: Konu sil
*   `getReplies(topicId, page, pageSize)`: Yorumları getir
*   `createReply(topicId, reply)`: Yeni yorum
*   `updateReply(id, content, authorName)`: Yorum güncelle
*   `deleteReply(id)`: Yorum sil
*   `getUserTopics(userId, page, pageSize)`: Kullanıcı konuları
*   `getUserReplies(userId, page, pageSize)`: Kullanıcı yorumları

### chatService.ts

*   `sendChatMessage(request)`: Chat mesajı gönder
*   `analyzeCV(cvText)`: CV analizi yap

### contactService.ts

*   `sendContactMessage(contact)`: İletişim mesajı gönder

## Routing Yapısı

/                    → Anasayfa
/anasayfa           → Anasayfa
/forum              → Forum listesi
/forum/:id          → Konu detay sayfası
/chatstj            → AI sohbet
/cv-analiz          → CV analizi
/giris              → Giriş sayfası
/kayit              → Kayıt sayfası
/profile            → Kullanıcı profili
/hakkinda           → Hakkında
/iletisim           → İletişim formu

## State Yönetimi

### Zustand Auth Store

**State:**
*   `user`: Kullanıcı bilgileri (User | null)
*   `token`: JWT token (string | null)
*   `isAuthenticated`: Giriş durumu (boolean)
*   `isLoading`: Yükleme durumu (boolean)
*   `error`: Hata mesajı (string | null)

**Actions:**
*   `login(data)`: Giriş yap
*   `register(data)`: Kayıt ol
*   `logout()`: Çıkış yap
*   `clearError()`: Hata temizle

**Persist:**
*   LocalStorage'da `auth-storage` anahtarı ile saklanır
*   Sayfa yenilendiğinde oturum korunur

## Güvenlik Özellikleri

*   JWT token tabanlı kimlik doğrulama
*   HTTP-only olmayan token (client-side yönetim)
*   Request interceptor ile otomatik token ekleme
*   Protected routes (kullanıcı kontrolü)
*   XSS koruması (React'ın built-in koruması)
*   CORS desteği (backend tarafında)

## Performans Optimizasyonları

*   Lazy loading (React.lazy kullanılabilir)
*   Sayfalama ile veri yükleme
*   Axios interceptor ile merkezi hata yönetimi
*   CSS değişkenleri ile render optimizasyonu
*   Vite ile hızlı build ve HMR
*   PDF parsing client-side (backend yükü azaltma)

## Build ve Deployment

### Development
```bash
npm run dev          # Development server
npm run lint         # ESLint kontrolü
```

### Production
```bash
npm run build        # TypeScript compile + Vite build
npm run preview      # Production build önizleme
```

### Build Çıktısı
*   `dist/` klasörüne static dosyalar oluşturulur
*   Minified ve optimized JavaScript/CSS
*   Herhangi bir static hosting'e deploy edilebilir

## Ortam Degiskenleri

### .env Dosyası (Opsiyonel)

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:5276/api

# Diğer ortam değişkenleri gerekirse eklenebilir
```

**Not:** Ortam değişkeni belirtilmezse, `apiService.ts` otomatik olarak `http://localhost:5276/api` kullanır.

## Tarayıcı Desteği

*   Chrome/Edge (son 2 versiyon)
*   Firefox (son 2 versiyon)
*   Safari (son 2 versiyon)
*   Modern mobile browsers

## Geliştirme Notları

*   React 19 kullanıldığı için bazı kütüphaneler uyumluluk sorunları yaşayabilir
*   PDF.js worker'ı Vite ile kullanmak için özel konfigürasyon gerekir
*   Material-UI minimal kullanılmıştır, çoğunlukla vanilla CSS tercih edilmiştir
*   TypeScript strict mode aktif
*   ESLint ile kod kalitesi kontrol edilir

## Bilinen Sorunlar ve Çözümler

### PDF.js Worker Hatası
**Sorun:** PDF worker bulunamıyor hatası  
**Çözüm:** `CVAnaliz.tsx` içinde worker path'i dinamik olarak ayarlanmıştır

### React 19 Uyumluluk
**Sorun:** Bazı kütüphaneler React 19 ile tam uyumlu değil  
**Çözüm:** package.json'da uyumlu versiyonlar kullanılmıştır

### CORS Hataları
**Sorun:** Backend'e istek atarken CORS hatası  
**Çözüm:** Backend'de CORS ayarları yapılmalıdır (localhost izni)
