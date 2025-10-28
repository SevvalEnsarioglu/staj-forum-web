# 🎨 Stil Yapısı Dokümantasyonu

Bu klasör, StajForum projesinin tüm CSS stillerini organize bir şekilde içerir.

## 📁 Klasör Yapısı

```
src/styles/
├── variables.css          # CSS değişkenleri (renkler, fontlar, spacing vb.)
├── global.css            # Global stiller (reset, base styles)
├── components/           # Component bazlı stiller
│   ├── TopAppBar.css
│   └── BottomBar.css
└── pages/               # Sayfa bazlı stiller
    ├── Common.css       # Tüm sayfalarda ortak kullanılan stiller
    └── Anasayfa.css     # Anasayfaya özel stiller
```

## 🎯 Dosya Açıklamaları

### `variables.css`
Tüm projede kullanılan CSS değişkenlerini içerir:
- **Renkler**: Primary, secondary, accent renkler
- **Tipografi**: Font ailesi, boyutları, ağırlıkları
- **Spacing**: Margin ve padding değerleri
- **Shadow**: Gölge efektleri
- **Border Radius**: Köşe yuvarlaklıkları
- **Transitions**: Geçiş animasyonları
- **Layout**: Boyut değişkenleri

**Örnek Kullanım:**
```css
.my-element {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}
```

### `global.css`
Projenin temel stil kurallarını içerir:
- CSS Reset
- Body ve HTML base stilleri
- Root container (#root) stilleri
- Global link, button, heading stilleri
- Responsive temel ayarlamalar

### `components/`
Her component için ayrı CSS dosyaları:
- **TopAppBar.css**: Header navigation stilleri
- **BottomBar.css**: Footer stilleri

### `pages/`
Sayfa bazlı stil dosyaları:
- **Common.css**: Tüm sayfalarda ortak kullanılan class'lar
  - `.page-container`
  - `.info-section`
  - `.feature-list`
- **Anasayfa.css**: Sadece anasayfaya özel stiller
  - `.hero-section`
  - `.hero-title`
  - `.hero-subtitle`

## 🔄 Import Sırası

**index.css** → **App.css** → Component/Page Styles

```css
/* index.css */
@import './styles/global.css';

/* App.css */
@import './styles/components/TopAppBar.css';
@import './styles/components/BottomBar.css';
@import './styles/pages/Common.css';
@import './styles/pages/Anasayfa.css';
```

## ✅ Clean Code İlkeleri

### 1. **DRY (Don't Repeat Yourself)**
- Tekrar eden değerler CSS değişkenlerine çevrildi
- Ortak stiller `Common.css`'de toplandı

### 2. **Separation of Concerns**
- Her component/sayfa kendi stil dosyasına sahip
- Global ve local stiller ayrıldı

### 3. **Naming Convention**
- BEM benzeri net class isimleri kullanıldı
- Açıklayıcı CSS değişken isimleri

### 4. **Maintainability**
- Değişiklikler tek bir yerden yapılabiliyor
- Yeni sayfalar kolayca eklenebiliyor

## 🆕 Yeni Sayfa/Component Ekleme

### Yeni Sayfa Stili Eklemek:
1. `src/styles/pages/` altına yeni CSS dosyası oluştur
2. `src/App.css` dosyasına import ekle

```css
/* src/styles/pages/YeniSayfa.css */
.yeni-sayfa-ozel-class {
  /* Özel stiller */
}
```

```css
/* src/App.css */
@import './styles/pages/YeniSayfa.css';
```

### Yeni Component Stili Eklemek:
1. `src/styles/components/` altına yeni CSS dosyası oluştur
2. `src/App.css` dosyasına import ekle

## 📱 Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 900px) { ... }

/* Tablet (küçük) */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }
```

## 🎨 Renk Paleti

| Renk | Değişken | Hex |
|------|----------|-----|
| Primary | `--color-primary` | #BF092F |
| Primary Dark | `--color-primary-dark` | #8b0620 |
| Secondary | `--color-secondary` | #16476A |
| Secondary Dark | `--color-secondary-dark` | #132440 |
| Accent | `--color-accent` | #3B9797 |

## 💡 İpuçları

1. **Yeni stil eklerken** önce `variables.css`'de ilgili değişken var mı kontrol edin
2. **Ortak stil** birden fazla yerde kullanılacaksa `Common.css`'e ekleyin
3. **Responsive tasarım** için mevcut breakpoint'leri kullanın
4. **Değişken kullanımı** hard-coded değerler yerine CSS değişkenlerini tercih edin

## 🚀 Öncesi vs Sonrası

### Önce:
- ❌ Tekrar eden renk kodları
- ❌ Tüm stiller tek dosyada (App.css)
- ❌ Hard-coded değerler
- ❌ Organize olmayan yapı

### Sonra:
- ✅ CSS değişkenleri ile merkezi yönetim
- ✅ Modüler ve organize dosya yapısı
- ✅ Kolay bakım ve genişletme
- ✅ Clean code prensipleri uygulandı

---

**Son Güncelleme:** Ekim 2025

