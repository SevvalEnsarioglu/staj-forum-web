import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import { sendChatMessage } from "../api/chatService";
import "../styles/pages/Common.css";
import "../styles/pages/ChatStj.css";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const ChatStj: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Merhaba! Staj hakkında sorularınızı sorabilirsiniz. Size nasıl yardımcı olabilirim?",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Conversation ID'yi tutmak için state (Backend conversation history desteklerse)
    const [conversationId, setConversationId] = useState<string | undefined>(undefined);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" } as any);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (messageText: string) => {
        // Kullanıcı mesajını ekle
        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const result = await sendChatMessage({
                message: messageText,
                conversationId: conversationId
            });

            // İlk mesajda conversationId'yi kaydet
            if (!conversationId && result.conversationId) {
                setConversationId(result.conversationId);
            }

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: result.response,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Mesaj gonderilemedi:", error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen daha sonra tekrar deneyin.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-page-container">
            <div className="chat-container">
                <ChatHeader />
                <div className="chat-messages-container">
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message.text}
                                isUser={message.isUser}
                                timestamp={message.timestamp}
                            />
                        ))}
                        {loading && (
                            <div className="chat-message chat-message-bot">
                                <div className="chat-message-content">
                                    <div className="chat-typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
            </div>
        </div>
    );
};

export default ChatStj;
