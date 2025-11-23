import React from "react";
import { useParams } from "react-router-dom";
import "../styles/pages/Common.css";
import "../styles/pages/ForumKonuSecimi.css";

const ForumKonuSecimi: React.FC = () => {
    const { id } = useParams();

    return (
        <div className="page-container forum-topic-page">
            <div className="topic-detail-header">
                <h1>Forum Konusu #{id}</h1>
                <div className="topic-meta">
                    <span>Yazar: Yükleniyor...</span>
                    <span>Tarih: Yükleniyor...</span>
                </div>
            </div>

            <div className="topic-content">
                <p className="topic-content-text">Sayfa içeriği gelecek.</p>
            </div>

            <div className="replies-section">
                <div className="replies-header">
                    <h2>Yanıtlar</h2>
                    <span className="reply-count">0 yanıt</span>
                </div>
                <div className="empty-replies">
                    Henüz yanıt bulunmamaktadır.
                </div>
            </div>
        </div>
    );
};

export default ForumKonuSecimi;