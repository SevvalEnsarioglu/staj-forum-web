import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/TopicCard.css";

interface TopicCardProps {
  id: string;
  authorName: string;
  title: string;
  description: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ id, authorName, title, description }) => {
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
    </div>
  );
};

export default TopicCard;

