import React, { useState, useEffect } from "react";
import { createTopic, getTopics } from "../api/forumService";
import { useAuthStore } from "../store/useAuthStore";
import TopicCard from "../components/TopicCard";
import CustomDropdown from "../components/CustomDropdown";
import RichTextEditor from "../components/RichTextEditor";
import "../styles/pages/Common.css";
import "../styles/pages/Forum.css";
const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

interface Topic {
    id: string;
    authorName: string;
    title: string;
    description: string;
    createdAt: string;
    viewCount: number;
    replyCount?: number;
}

const Forum: React.FC = () => {
    const { user } = useAuthStore();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("newest");
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState<any>({});

    // Kullanıcı giriş yapmışsa authorName'i otomatik doldur
    useEffect(() => {
        if (user && isOpen) {
            setAuthorName(`${user.firstName} ${user.lastName}`);
        }
    }, [user, isOpen]);

    const fetchTopics = async () => {
        try {
            setIsLoading(true);
            const response = await getTopics(1, 50, sortBy);

            const formattedTopics: Topic[] = response.data.map((topic) => ({
                id: topic.id.toString(),
                authorName: topic.authorName,
                title: topic.title,
                description: stripHtml(topic.content).length > 200
                    ? stripHtml(topic.content).substring(0, 200) + '...'
                    : stripHtml(topic.content),
                createdAt: new Date(topic.createdAt).toLocaleDateString("tr-TR"),
                viewCount: topic.viewCount,
                replyCount: topic.replyCount || 0
            }));
            setTopics(formattedTopics);
        } catch (error) {
            console.error("Topic'ler yüklenirken hata:", error);
            setTopics([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, [sortBy]);

    const validate = () => {
        const newErrors: any = {};
        const plainContent = stripHtml(content);

        if (!title || title.length < 3 || title.length > 200)
            newErrors.title = "Başlık 3-200 karakter arasında olmalıdır.";

        if (!plainContent || plainContent.length < 10 || plainContent.length > 5000)
            newErrors.content = "İçerik 10-5000 karakter arasında olmalıdır.";

        if (!authorName || authorName.length < 2 || authorName.length > 100)
            newErrors.authorName = "Ad-Soyad 2-100 karakter arasında olmalıdır.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTopic = async () => {
        if (!validate()) return;

        try {
            await createTopic({ title, content, authorName });
            await fetchTopics();

            setIsOpen(false);
            setTitle("");
            setContent("");
            if (!user) setAuthorName(""); // Sadece giriş yapmamışsa temizle
            setErrors({});
        } catch (error) {
            console.error("Topic oluşturulurken hata:", error);
            alert("Topic oluşturulurken bir hata oluştu.");
        }
    };

    return (
        <div className="page-container forum-page">
            <div className="forum-header">
                <h1>Forum</h1>
                <div className="header-actions">
                    <div className="sort-container">
                        <CustomDropdown
                            options={[
                                { value: "newest", label: "En Yeni" },
                                { value: "oldest", label: "En Eski" },
                                { value: "popular", label: "En Çok Görüntülenen" }
                            ]}
                            value={sortBy}
                            onChange={(val) => setSortBy(val)}
                            className="sort-dropdown"
                        />
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="btn-topic-open"
                    >
                        Topic Oluştur
                    </button>
                </div>
            </div>

            <div className="topics-container">
                {isLoading ? (
                    <p className="empty-state">Yükleniyor...</p>
                ) : topics.length > 0 ? (
                    topics.map((topic) => (
                        <TopicCard
                            key={topic.id}
                            id={topic.id}
                            authorName={topic.authorName}
                            title={topic.title}
                            description={topic.description}
                            createdAt={topic.createdAt}
                            viewCount={topic.viewCount}
                            replyCount={topic.replyCount}
                        />
                    ))
                ) : (
                    <p className="empty-state">Henüz topic bulunmamaktadır.</p>
                )}
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
                                <label htmlFor="topic-author">
                                    Ad Soyad {user && "(Otomatik dolduruldu)"}
                                </label>
                                <input
                                    type="text"
                                    id="topic-author"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    disabled={!!user}
                                    placeholder={user ? "" : "Adınız Soyadınız"}
                                />
                                {errors.authorName && (
                                    <p className="error-message">{errors.authorName}</p>
                                )}
                            </div>
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
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Konu içeriğini buraya yazınız..."
                                />
                                {errors.content && (
                                    <p className="error-message">{errors.content}</p>
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
                                    onClick={handleCreateTopic}
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