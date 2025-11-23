import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

        // Simüle edilmiş bot yanıtı (şimdilik backend'e bağlanmıyoruz)
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateMockResponse(messageText),
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
            setLoading(false);
        }, 1000);
    };

    const generateMockResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes("başvuru") || lowerMessage.includes("nasıl")) {
            return "Staj başvurusu yapmak için şirketlerin kariyer sayfalarını ziyaret edebilir veya LinkedIn üzerinden başvuru yapabilirsiniz. CV'nizi güncel tutmanız ve ilgili deneyimlerinizi vurgulamanız önemlidir.";
        } else if (lowerMessage.includes("cv") || lowerMessage.includes("özgeçmiş")) {
            return "CV'nizde staj için önemli olan bilgiler: Eğitim bilgileri, teknik beceriler, projeler, gönüllü çalışmalar ve referanslar. CV'nizi 1-2 sayfa tutmaya özen gösterin.";
        } else if (lowerMessage.includes("mülakat") || lowerMessage.includes("görüşme")) {
            return "Staj mülakatında genellikle teknik sorular, proje deneyimleriniz ve şirket hakkında sorular sorulur. Kendinizi rahatça ifade edebilmek ve şirketi araştırmış olmak önemlidir.";
        } else if (lowerMessage.includes("stajyer") || lowerMessage.includes("ne yapar")) {
            return "Stajyerler genellikle gerçek projelerde çalışır, mentorluk alır ve ekip içinde deneyim kazanır. Aktif olmak, soru sormak ve öğrenmeye açık olmak başarılı bir staj için önemlidir.";
        } else {
            return "Staj sürecinizde başarılar dilerim! Staj başvurusu, CV hazırlama, mülakat teknikleri veya stajyerlik deneyimi hakkında daha fazla bilgi almak isterseniz sorabilirsiniz.";
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
