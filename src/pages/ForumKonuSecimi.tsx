import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTopicById, getReplies, createReply } from "../api/forumService";
import type { Reply } from "../api/forumService";
import "../styles/pages/Common.css";
import "../styles/pages/ForumKonuSecimi.css";

interface Topic {
    id: number;
    title: string;
    content: string;
    authorName: string;
    createdAt: string;
    updatedAt: string | null;
    viewCount: number;
    replyCount: number;
}

const ForumKonuSecimi: React.FC = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Reply Form States
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [replyAuthor, setReplyAuthor] = useState("Ad Soyad");
    const [replyContent, setReplyContent] = useState("");
    const [replyError, setReplyError] = useState("");

    const fetchAllData = async () => {
        try {
            setIsLoading(true);
            if (id) {
                const topicId = Number(id);
                // Parallel fetch for speed
                const [topicData, repliesData] = await Promise.all([
                    getTopicById(topicId),
                    getReplies(topicId)
                ]);

                setTopic(topicData);
                setReplies(repliesData.data);
                setError(null);
            }
        } catch (err) {
            console.error("Veri yüklenirken hata:", err);
            setError("Veri yüklenirken bir hata oluştu.");
            setTopic(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [id]);

    const handleCreateReply = async () => {
        if (!replyContent.trim()) {
            setReplyError("Lütfen bir yanıt yazın.");
            return;
        }

        try {
            if (id) {
                await createReply(Number(id), {
                    authorName: replyAuthor || "Ad Soyad",
                    content: replyContent
                });

                // Reset form
                setReplyContent("");
                setIsReplyOpen(false);
                setReplyError("");

                // Refresh data
                fetchAllData();
            }
        } catch (err) {
            console.error("Yanıt gönderilirken hata:", err);
            setReplyError("Yanıt gönderilemedi.");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="page-container forum-topic-page">
                <p className="loading-text">Yükleniyor...</p>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="page-container forum-topic-page">
                <p className="error-text">{error || "Topic bulunamadı."}</p>
            </div>
        );
    }

    return (
        <div className="page-container forum-topic-page">
            <div className="topic-detail-header">
                <h1>{topic.title}</h1>
                <div className="topic-meta">
                    <span>Yazar: {topic.authorName}</span>
                    <span>Tarih: {formatDate(topic.createdAt)}</span>
                    <span>Görüntüleme: {topic.viewCount}</span>
                </div>
            </div>

            <div className="topic-content">
                <p className="topic-content-text">{topic.content}</p>
            </div>

            <div className="replies-section">
                <div className="replies-header">
                    <h2>Yanıtlar</h2>
                    <div className="replies-header-actions">
                        <span className="reply-count">{replies.length} yanıt</span>
                        <button
                            className="btn-add-reply"
                            onClick={() => setIsReplyOpen(true)}
                        >
                            + Yanıtla
                        </button>
                    </div>
                </div>

                {/* Reply Form Area (Inline or Modal - Inline is simpler for now) */}
                {isReplyOpen && (
                    <div className="reply-form">
                        <h3>Yanıt Gönder</h3>

                        <div className="form-group">
                            <label>Ad Soyad</label>
                            <input
                                type="text"
                                className="form-input"
                                onChange={(e) => setReplyAuthor(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Yanıtınız</label>
                            <textarea
                                rows={4}
                                className="form-textarea"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                        </div>

                        {replyError && <p className="form-error">{replyError}</p>}

                        <div className="form-actions">
                            <button
                                className="btn-cancel"
                                onClick={() => setIsReplyOpen(false)}
                            >
                                İptal
                            </button>
                            <button
                                className="btn-submit"
                                onClick={handleCreateReply}
                            >
                                Gönder
                            </button>
                        </div>
                    </div>
                )}

                {replies.length === 0 ? (
                    <div className="empty-replies">
                        Henüz yanıt bulunmamaktadır.
                    </div>
                ) : (
                    <div className="replies-list">
                        {replies.map((reply) => (
                            <div key={reply.id} className="reply-card">
                                <div className="reply-header">
                                    <span className="reply-author">{reply.authorName}</span>
                                    <span className="reply-date">{formatDate(reply.createdAt)}</span>
                                </div>
                                <p className="reply-content">{reply.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumKonuSecimi;