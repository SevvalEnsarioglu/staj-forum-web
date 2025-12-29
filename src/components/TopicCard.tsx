import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Eye, MessageCircle } from "lucide-react";
import "../styles/components/TopicCard.css";

interface TopicCardProps {
    id: string;
    authorName: string;
    title: string;
    description: string;
    createdAt: string;
    viewCount: number;
    replyCount?: number;
}

const TopicCard: React.FC<TopicCardProps> = ({ id, authorName, title, description, createdAt, viewCount, replyCount = 0 }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/forum/${id}`);
    };

    return (
        <div className="topic-card" onClick={handleClick}>
            <div className="topic-card-header">
                <h3 className="topic-title">{title}</h3>
            </div>
            <h3 className="topic-author">{authorName}</h3>
            <p className="topic-description">{description}</p>

            <div className="topic-meta">
                <span className="topic-date">
                    <Calendar size={16} />
                    {createdAt}
                </span>
                <span className="topic-views">
                    <Eye size={16} />
                    {viewCount}
                </span>
                <span className="topic-replies">
                    <MessageCircle size={16} />
                    {replyCount}
                </span>
            </div>
        </div>
    );
};

export default TopicCard;