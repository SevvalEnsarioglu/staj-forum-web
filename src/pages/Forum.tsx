import React, { useState } from "react";
import { sendTopicMessage } from "../api/contactService";
import "../styles/pages/Common.css";
import "../styles/pages/Forum.css";

const Forum: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const newErrors: any = {};

        if (!title || title.length < 3 || title.length > 200)
            newErrors.title = "Başlık 3-200 karakter arasında olmalıdır.";

        if (!content || content.length < 10 || content.length > 5000)
            newErrors.content = "İçerik 10-5000 karakter arasında olmalıdır.";

        if (!authorName || authorName.length < 2 || authorName.length > 100)
            newErrors.authorName = "Ad-Soyad 2-100 karakter arasında olmalıdır.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createTopic = async () => {
        if (!validate()) return;

        try {
            const topic = await sendTopicMessage({ title, content, authorName });
            console.log("Topic oluşturuldu:", topic);

            setIsOpen(false);
            setTitle("");
            setContent("");
            setAuthorName("");
        } catch (error) {
            console.error("Topic oluşturulurken hata:", error);
        }
    };

    return (
        <div className="page-container forum-page">
            <div className="forum-header">
                <h1>Forum</h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn-topic-open"
                >
                    Topic Oluştur
                </button>
            </div>

            <div className="topics-container">
                <p className="empty-state">Sayfa içeriği gelecek.</p>
            </div>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Yeni Topic Oluştur</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="modal-close"
                                aria-label="Kapat"
                            >
                                ×
                            </button>
                        </div>

                        <div className="topic-form">
                            <div className="form-group">
                                <label htmlFor="topic-title">Başlık</label>
                                <input
                                    type="text"
                                    id="topic-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {errors.title && (
                                    <p className="error-message">{errors.title}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="topic-content">İçerik</label>
                                <textarea
                                    id="topic-content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                {errors.content && (
                                    <p className="error-message">{errors.content}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="topic-author">Ad Soyad</label>
                                <input
                                    type="text"
                                    id="topic-author"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                />
                                {errors.authorName && (
                                    <p className="error-message">{errors.authorName}</p>
                                )}
                            </div>

                            <div className="form-actions">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="btn-cancel"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={createTopic}
                                    className="btn-submit"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Forum;
