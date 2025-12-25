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
                        AI Destekli CV Analizi 🚀
                    </h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--color-text-secondary)' }}>
                        CV metninizi aşağıya yapıştırın, yapay zeka sizin için staj başvurularına uygunluğunu analiz etsin,
                        güçlü ve zayıf yönlerinizi çıkarsın.
                    </p>

                    <textarea
                        value={cvText}
                        onChange={(e) => setCvText(e.target.value)}
                        placeholder="CV içeriğinizi buraya yapıştırın..."
                        style={{
                            width: '100%',
                            minHeight: '200px',
                            padding: '15px',
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            color: 'var(--color-text-primary)',
                            border: '1px solid var(--color-primary)',
                            resize: 'vertical',
                            fontSize: '16px',
                            marginBottom: '20px',
                            fontFamily: 'inherit'
                        }}
                    />

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !cvText.trim()}
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
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        {loading ? 'Analiz Ediliyor...' : 'Analiz Et ✨'}
                    </button>

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
