import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { getUserTopics, getUserReplies, deleteTopic, deleteReply } from '../api/forumService';
import type { Topic, Reply } from '../api/forumService';
import '../styles/pages/Auth.css';
import '../styles/pages/Profile.css';

const Profile: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'topics' | 'replies'>('topics');
    const [topics, setTopics] = useState<Topic[]>([]);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/giris');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user) {
            if (activeTab === 'topics') {
                fetchUserTopics();
            } else {
                fetchUserReplies();
            }
        }
    }, [activeTab, user]);

    const fetchUserTopics = async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const result = await getUserTopics(user.id, 1, 50);
            setTopics(result.data);
        } catch (error) {
            console.error('Konular yüklenirken hata:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserReplies = async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const result = await getUserReplies(user.id, 1, 50);
            setReplies(result.data);
        } catch (error) {
            console.error('Yorumlar yüklenirken hata:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTopic = async (topicId: number) => {
        if (!window.confirm('Bu konuyu silmek istediğinizden emin misiniz?')) return;

        try {
            await deleteTopic(topicId);
            setTopics(topics.filter(t => t.id !== topicId));
        } catch (error) {
            console.error('Konu silinirken hata:', error);
            alert('Konu silinirken bir hata oluştu.');
        }
    };

    const handleDeleteReply = async (replyId: number) => {
        if (!window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

        try {
            await deleteReply(replyId);
            setReplies(replies.filter(r => r.id !== replyId));
        } catch (error) {
            console.error('Yorum silinirken hata:', error);
            alert('Yorum silinirken bir hata oluştu.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    {user.firstName[0]}{user.lastName[0]}
                </div>
                <div className="profile-info">
                    <h1>{user.firstName} {user.lastName}</h1>
                    <p className="email">{user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Çıkış Yap
                </button>
            </div>

            <div className="profile-content">
                <div className="tab-buttons">
                    <button
                        className={`tab-btn ${activeTab === 'topics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topics')}
                    >
                        Konularım ({topics.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'replies' ? 'active' : ''}`}
                        onClick={() => setActiveTab('replies')}
                    >
                        Yorumlarım ({replies.length})
                    </button>
                </div>

                <div className="tab-content">
                    {isLoading ? (
                        <div className="loading-state">Yükleniyor...</div>
                    ) : activeTab === 'topics' ? (
                        <div className="topics-list">
                            {topics.length > 0 ? (
                                topics.map((topic) => (
                                    <div key={topic.id} className="profile-item">
                                        <div className="item-content">
                                            <h3 className="item-title">{topic.title}</h3>
                                            <p className="item-description">
                                                {stripHtml(topic.content).substring(0, 150)}
                                                {stripHtml(topic.content).length > 150 ? '...' : ''}
                                            </p>
                                            <div className="item-meta">
                                                <span className="meta-item">
                                                    📅 {new Date(topic.createdAt).toLocaleDateString('tr-TR')}
                                                </span>
                                                <span className="meta-item">
                                                    👁️ {topic.viewCount} görüntülenme
                                                </span>
                                                <span className="meta-item">
                                                    💬 {topic.replyCount || 0} yanıt
                                                </span>
                                            </div>
                                        </div>
                                        <div className="item-actions">
                                            <button
                                                onClick={() => navigate(`/forum/${topic.id}`)}
                                                className="btn-view"
                                            >
                                                Görüntüle
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTopic(topic.id)}
                                                className="btn-delete"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p>Henüz açtığınız bir konu bulunmuyor.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="replies-list">
                            {replies.length > 0 ? (
                                replies.map((reply) => (
                                    <div key={reply.id} className="profile-item">
                                        <div className="item-content">
                                            <p className="item-description">{stripHtml(reply.content)}</p>
                                            <div className="item-meta">
                                                <span className="meta-item">
                                                    📅 {new Date(reply.createdAt).toLocaleDateString('tr-TR')}
                                                </span>
                                                <span className="meta-item">
                                                    📝 Konu ID: {reply.topicId}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="item-actions">
                                            <button
                                                onClick={() => navigate(`/forum/${reply.topicId}`)}
                                                className="btn-view"
                                            >
                                                Konuya Git
                                            </button>
                                            <button
                                                onClick={() => handleDeleteReply(reply.id)}
                                                className="btn-delete"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p>Henüz yaptığınız bir yorum bulunmuyor.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
