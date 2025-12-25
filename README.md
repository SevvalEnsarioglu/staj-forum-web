# Staj Forum Web

Staj Forum platformunun modern web arayüzüdür. Stajyerlerin deneyimlerini paylasabilecegi bir forum, yapay zeka destekli sohbet asistani ve CV analiz araclari sunar.

## Ozellikler

*   **Forum:** Kullanicilarin staj deneyimlerini paylasip tartisabilecegi konu tabanli yapi.
*   **AI Sohbet Asistani (ChatStj):** Google Gemini API destekli, stajyerlerin sorularini yanitlayan akilli asistan.
*   **AI CV Analizi:** PDF formatindaki CV'leri tarayici uzerinde isleyerek (Client-Side), yapay zeka ile guclu/zayif yon analizi ve puanlama yapar.
*   **Duyarli Tasarim (Responsive):** Mobil ve masaustu cihazlarla tam uyumlu modern arayuz.

## Teknolojiler

*   **Framework:** React 19
*   **Dil:** TypeScript
*   **Derleme Araci:** Vite
*   **Stil:** Vanilla CSS (CSS Degiskenleri ve Moduler Yapi)
*   **AI Entegrasyonu:** Google Gemini API
*   **PDF Isleme:** pdfjs-dist
*   **HTTP Istekleri:** Axios

## Kurulum ve Calistirma

Projeyi yerel ortamda calistirmak icin asagidaki adimlari izleyin.

1.  **Bagimliliklari Yukleyin:**
    ```bash
    npm install
    ```

2.  **Gelistirme Sunucusunu Baslatin:**
    ```bash
    npm run dev
    ```

3.  **Tarayicida Acin:**
    Terminalde verilen yerel adresi (ornegin `http://localhost:5173`) tarayicinizda acin.

## Proje Yapisi

*   `src/api`: Backend ile iletisimi saglayan servis dosyalari.
*   `src/components`: Tekrar kullanilabilir UI bilesenleri (Header, Footer vb.).
*   `src/pages`: Uygulamanin ana sayfalari (Forum, Chat, CV Analiz vb.).
*   `src/styles`: CSS stil dosyalari, degiskenler ve bilesen stilleri.
    *   `global.css`: Genel sifirlama ve temel stiller.
    *   `variables.css`: Renk paleti ve tipografi degiskenleri.

## Ortam Degiskenleri

Proje, backend baglantisi ve API anahtarlari icin `.env` dosyasina ihtiyac duyabilir. Gerekli degiskenler `chatService.ts` ve diger servis dosyalarinda yapilandirilmistir.
