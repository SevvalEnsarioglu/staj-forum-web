import React from "react";
import "../../styles/components/chat/ChatMessage.css";

interface ChatMessageProps {
    message: string;
    isUser: boolean;
    timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className={`chat-message ${isUser ? "chat-message-user" : "chat-message-bot"}`}>
            <div className="chat-message-content">
                <div className="chat-message-text">{message}</div>
                <div className="chat-message-time">{formatTime(timestamp)}</div>
            </div>
        </div>
    );
};

export default ChatMessage;


