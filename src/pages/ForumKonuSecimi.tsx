import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTopicById } from "../api/forumService";
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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                setIsLoading(true);
                if (id) {
                    const topicData = await getTopicById(Number(id));
                    setTopic(topicData);
                    setError(null);
                }
            } catch (err) {
                console.error("Topic yüklenirken hata:", err);
                setError("Topic yüklenirken bir hata oluştu.");
                setTopic(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopic();
    }, [id]);

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
                    <span className="reply-count">{topic.replyCount} yanıt</span>
                </div>
                {topic.replyCount === 0 ? (
                    <div className="empty-replies">
                        Henüz yanıt bulunmamaktadır.
                    </div>
                ) : (
                    <div className="replies-list">
                        {/* Yanıtlar burada listelenecek */}
                        <p>Yanıtlar yakında gösterilecek.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumKonuSecimi;