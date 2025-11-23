import React from "react";
import "../../styles/components/chat/ChatHeader.css";

const ChatHeader: React.FC = () => {
    return (
        <div className="chat-header">
            <div className="chat-header-content">
                <div className="chat-header-icon">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div className="chat-header-text">
                    <h2 className="chat-header-title">ChatSTJ</h2>
                    <p className="chat-header-subtitle">
                        Staj hakkında sorularınızı sorun, yapay zeka size yardımcı olsun
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;


