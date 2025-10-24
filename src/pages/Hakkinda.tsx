import React from "react";

const Hakkinda: React.FC = () => {
    return (
        <div className="page-container">
            <section className="info-section">
                <h2>📋 Forum Nedir?</h2>
                <p>
                    Forum, StajForum topluluğunun kalbidir. Burada öğrenciler staj deneyimlerini paylaşabilir ve
                    firmalar hakkında sorular sorup cevaplar alabilirsiniz.
                </p>
                <ul className="feature-list">
                    <li>💬 <strong>Tartışma Başlat:</strong> Staj ile ilgili sorularınızı sorun ve deneyimli öğrencilerden yardım alın</li>
                    <li>⭐ <strong>Firma Değerlendir:</strong> Staj yaptığınız firmalar hakkında diğer öğrencilere rehberlik edin</li>
                    <li>🔍 <strong>İçerik Ara:</strong> Arşivde benzer sorular ve cevapları bulun</li>
                    <li>👥 <strong>Topluluk ile Etkileşim:</strong> Paylaşılan deneyimlerden faydalanın ve görüş iletin</li>
                </ul>
            </section>

            <section className="info-section">
                <h2>💬 ChatSTJ Nedir?</h2>
                <p>
                    ChatSTJ, StajForum'un canlı sohbet özelliğidir. Gerçek zamanlı olarak yapay zeka ile
                    iletişim kurabilir, sorularınıza anında cevap alabilirsiniz.
                </p>
            </section>

            <section className="info-section">
                <h2>🚀 Nasıl Başlanır?</h2>
                <ul className="feature-list">
                    <li>✅ <strong>Adım 1:</strong> İlk olarak bir hesap oluşturun ve profilinizi tamamlayın</li>
                    <li>✅ <strong>Adım 2:</strong> Forum bölümüne giderek başka öğrencilerin paylaşımlarını okuyun</li>
                    <li>✅ <strong>Adım 3:</strong> Siz de bir sorunuz veya deneyiminiz varsa paylaşın</li>
                    <li>✅ <strong>Adım 4:</strong> Staj başvuru sürecinde topluluktan destek alın</li>
                    <li>✅ <strong>Adım 4:</strong> Staj süreçlerine dair takıldığınız dönüş alamadığınız noktalarda ChatSTJ üzerinden bilgi edinin</li>
                </ul>
            </section>

            <section className="info-section">
                <h2>📋 Topluluk Kuralları</h2>
                <ul className="feature-list">
                    <li>🤝 <strong>Saygılı Ol:</strong> Tüm üyelere saygı gösterin, kibar kalın</li>
                    <li>✅ <strong>Doğru Bilgi Paylaş:</strong> Yanlış veya yanıltıcı bilgi yayımlamayın</li>
                    <li>🚫 <strong>Spam Yapmayın:</strong> Aynı mesajı tekrar tekrar göndermek yasaktır</li>
                    <li>🔒 <strong>Gizliliğe Saygı Göster:</strong> Kişisel bilgileri başkalarının izni olmadan paylaşmayın</li>
                    <li>📌 <strong>Tema Dışı Yazı Yazmayın:</strong> Staj ve eğitimle ilgili içerikler paylaşın</li>
                </ul>
            </section>

            <section className="info-section">
                <h2>📞 İletişim & Destek</h2>
                <p>
                    Sorularınız, önerileriniz veya sorun yaşadığınız durumlarda lütfen iletişime geçin.
                </p>
                <ul className="feature-list">
                    <li>📧 Email: support@stajforum.com</li>
                    <li>🐦 Twitter: @StajForum</li>
                </ul>
            </section>
        </div>
    );
};

export default Hakkinda;