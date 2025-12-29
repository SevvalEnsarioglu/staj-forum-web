import React, { useState } from 'react';
import '../styles/pages/CVAnaliz.css';
import { analyzeCV } from '../api/chatService';

const CVAnaliz: React.FC = () => {
    const [cvText, setCvText] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!cvText.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await analyzeCV(cvText);
            setResult(data.analysis);
        } catch (err: any) {
            setError('CV analizi yapılırken bir hata oluştu. Lütfen tekrar deneyin.' + err);
        } finally {
            setLoading(false);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const loadPdfLib = async () => {
            const pdfjs = await import('pdfjs-dist');
            // Explicitly setting worker source for Vite
            pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                'pdfjs-dist/build/pdf.worker.min.mjs',
                import.meta.url
            ).toString();
        };
        loadPdfLib();
    }, []);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Lütfen geçerli bir PDF dosyası yükleyin.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfjs = await import('pdfjs-dist');
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(' ');
                fullText += pageText + '\n\n';
            }

            setCvText(fullText.trim());
        } catch (err: any) {
            console.error('PDF parsing error:', err);
            setError('PDF dosyası okunamadı. Lütfen metni manuel yapıştırın.');
        } finally {
            setLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="cv-analiz-page-container">
            <div className="cv-analiz-container">
                <div className="cv-content">
                    <h1 className="cv-title">
                        AI Destekli CV Analizi
                    </h1>
                    <p className="cv-description">
                        Yüklediğiniz özgeçmişler, gelişmiş yapay zeka algoritmalarımız tarafından profesyonel bir insan kaynakları uzmanı titizliğiyle analiz edilmektedir. Sistemimiz CV içeriğinizdeki veriler ne kadar karmaşık veya düzensiz görünürse görünsün, asıl potansiyelinizi ve yetkinliklerinizi odağa alarak kapsamlı bir tarama gerçekleştirir. Bu süreçte profilinizin en güçlü üç özelliği ve kariyer yolculuğunuzda size avantaj sağlayacak üç geliştirilebilir yönünüz objektif bir şekilde belirlenir. Analiz sonunda özgeçmişinizin genel niteliği on üzerinden puanlanarak başvurularınızda daha başarılı olmanız için uygulanabilir ve net stratejik tavsiyeler paylaşılır. Bu sayede staj başvurularınız öncesinde CV'nizin uzman gözündeki yansımasını görebilir ve eksiklerinizi hızla tamamlayabilirsiniz. </p>

                    <div className="cv-upload-section">
                        <input
                            type="file"
                            accept=".pdf"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            className="cv-upload-btn"
                        >
                            📄 PDF CV Yükle
                        </button>

                        {cvText && !loading && (
                            <div className="cv-success-msg">
                                ✅ PDF Başarıyla Aktarıldı
                            </div>
                        )}
                    </div>

                    {cvText && (
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="cv-analyze-btn"
                        >
                            {loading ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
                        </button>
                    )}

                    {error && (
                        <div className="cv-error-msg">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="cv-result-card">
                            <h2 className="cv-result-title">Analiz Sonucu:</h2>
                            <div className="cv-result-content">
                                {result}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CVAnaliz;
