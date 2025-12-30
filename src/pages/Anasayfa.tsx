import React from "react";

const Anasayfa: React.FC = () => {
    return (
        <div className="page-container">
            <section className="hero-section">
                <h1 className="hero-title" style={{ marginBottom: "2rem" }}>StajForum'a Hoş Geldiniz!</h1>
                <p className="hero-subtitle">
                    StajForum; öğrencilerin staj süreçlerinde bilgi paylaşımı yapabileceği, deneyimlerini
                    aktarabileceği ve yeni fırsatlara ulaşabileceği bir topluluk platformudur.
                </p>
            </section>
            <section className="info-section">
                <h2>🚀 Neler Sunuyoruz?</h2>
                <ul className="feature-list">
                    <li>🔍 Staj yeri incelemeleri ve yorumlar</li>
                    <li>💬 Forum ortamında bilgi paylaşımı</li>
                    <li>📄 Staj başvurusu rehberleri</li>
                    <li>🎓 Deneyim temelli içerikler ve ipuçları</li>
                </ul>
            </section>

            <section className="info-section">
                <h2>💡 Amacımız</h2>
                <p>
                    StajForum, üniversite öğrencileri için staj sürecini daha şeffaf, erişilebilir ve
                    öğretici hale getirmeyi amaçlar. Öğrenciler kendi staj deneyimlerini paylaşabilir,
                    firmalar hakkında yorum yapabilir ve staj başvurusu yapmadan önce gerçek kullanıcı
                    deneyimlerinden faydalanabilir.
                </p>
            </section>

            <section className="info-section">
                <h2>👥 Kimler Kullanabilir?</h2>
                <p>
                    Platform, öncelikle üniversite öğrencileri, yeni mezunlar ve stajyer arayan firmalar
                    için tasarlanmıştır. Kullanıcılar kayıt olmadan, sadece Ad-Soyad girerek forumda yorum
                    yapabilir ve topluluğa katkı sağlayabilir.
                </p>
            </section>
            <section className="info-section">
                <h2>🌍 Topluluk Gücü</h2>
                <p>
                    Her öğrenci kendi deneyimini paylaşarak başkalarının yolunu aydınlatır. StajForum,
                    dayanışma kültürünü dijital ortama taşıyarak bilgiye erişimi kolaylaştırır.
                </p>
            </section>

        </div>
    );
};

export default Anasayfa;
