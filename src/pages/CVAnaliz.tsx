import React, { useState } from 'react';
import '../styles/pages/ChatStj.css';
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
        <div className="chat-page-container">
            <div className="chat-container">
                <div style={{
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '0 auto',
                    color: 'var(--color-text-primary)',
                    overflowY: 'auto',
                    height: '100%'
                }}>
                    <h1 style={{ color: 'var(--color-primary)', marginBottom: '20px', textAlign: 'center' }}>
                        AI Destekli CV Analizi
                    </h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--color-text-secondary)' }}>
                        CV'nizi PDF formatında yükleyin, yapay zeka sizin için staj başvurularına uygunluğunu analiz etsin!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
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
                            style={{
                                padding: '20px 40px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'transform 0.2s',
                                boxShadow: '0 4px 14px 0 rgba(191, 9, 47, 0.39)'
                            }}
                        >
                            PDF CV Yükle
                        </button>

                        {cvText && !loading && (
                            <div style={{ marginTop: '15px', color: 'green', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                PDF Başarıyla Okundu
                            </div>
                        )}
                    </div>

                    {/* Textarea removed as requested */}

                    {cvText && (
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '15px',
                                backgroundColor: loading ? 'var(--color-text-muted)' : 'var(--color-secondary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'background-color 0.3s ease',
                                marginTop: '10px'
                            }}
                        >
                            {loading ? 'Analiz Ediliyor...' : 'Analizi Başlat '}
                        </button>
                    )}

                    {error && (
                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            border: '1px solid red',
                            borderRadius: '12px',
                            color: 'red'
                        }}>
                            {error}
                        </div>
                    )}

                    {result && (
                        <div style={{
                            marginTop: '30px',
                            padding: '25px',
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderRadius: '12px',
                            border: '1px solid var(--color-primary)',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '15px' }}>Analiz Sonucu:</h2>
                            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'var(--color-text-primary)' }}>
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
