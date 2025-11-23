import React, { useState } from "react";
import { sendTopicMessage } from "../api/contactService";

const Forum: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const newErrors: any = {};

        if (!title || title.length < 3 || title.length > 200)
            newErrors.title = "Başlık 3-200 karakter arasında olmalıdır.";

        if (!content || content.length < 10 || content.length > 5000)
            newErrors.content = "İçerik 10-5000 karakter arasında olmalıdır.";

        if (!authorName || authorName.length < 2 || authorName.length > 100)
            newErrors.authorName = "Ad-Soyad 2-100 karakter arasında olmalıdır.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createTopic = async () => {
        if (!validate()) return;

        try {
            const topic = await sendTopicMessage({ title, content, authorName });
            console.log("Topic oluşturuldu:", topic);

            setIsOpen(false);
            setTitle("");
            setContent("");
            setAuthorName("");
        } catch (error) {
            console.error("Topic oluşturulurken hata:", error);
        }
    };

    return (
        <div className="page-container relative p-6 min-h-screen bg-gray-100">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow"
                >
                    Topic Oluştur
                </button>
            </div>

            <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">Forum</h1>
            <p className="text-center text-gray-600 mb-10">Sayfa içeriği gelecek.</p>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative animate-fadeIn">
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
                            Yeni Topic Oluştur
                        </h2>

                        {/* TITLE */}
                        <label className="block font-medium">Başlık</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mt-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}

                        {/* CONTENT */}
                        <label className="block font-medium mt-4">İçerik</label>
                        <textarea
                            className="w-full border p-2 rounded-lg mt-1 h-28"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                        )}

                        {/* AUTHOR NAME */}
                        <label className="block font-medium mt-4">Ad Soyad</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mt-1"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                        {errors.authorName && (
                            <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>
                        )}

                        {/* BUTTONS */}
                        <div className="flex justify-end mt-6 gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                İptal
                            </button>
                            <button
                                onClick={createTopic}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Forum;
