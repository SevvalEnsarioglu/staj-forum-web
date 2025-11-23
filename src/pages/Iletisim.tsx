import React, { useState } from "react";
import "../styles/pages/Common.css";
import "../styles/pages/Contact.css";
import { sendContactMessage } from "../api/contactService";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Iletisim: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Ad Soyad zorunludur.";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Ad Soyad en az 2 karakter olmalıdır.";
        } else if (formData.name.length > 100) {
            newErrors.name = "Ad Soyad en fazla 100 karakter olabilir.";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "E-posta zorunludur.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Geçerli bir e-posta adresi giriniz.";
        } else if (formData.email.length > 255) {
            newErrors.email = "E-posta en fazla 255 karakter olabilir.";
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = "Konu zorunludur.";
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = "Konu en az 3 karakter olmalıdır.";
        } else if (formData.subject.length > 200) {
            newErrors.subject = "Konu en fazla 200 karakter olabilir.";
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = "Mesaj zorunludur.";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Mesaj en az 10 karakter olmalıdır.";
        } else if (formData.message.length > 2000) {
            newErrors.message = "Mesaj en fazla 2000 karakter olabilir.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name as keyof ContactFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccess(false);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Backend'e istek at ve veriyi veritabanına kaydet
            await sendContactMessage({
                name: formData.name.trim(),
                email: formData.email.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
            });

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (error: any) {
            console.error("Error sending contact message:", error);
            setErrorMessage(
                error.response?.data?.error || 
                error.message || 
                "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="contact-form-container">
                <h1 className="contact-title">İletişim</h1>
                <p className="contact-subtitle">
                    Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçebilirsiniz.
                </p>

                {success && (
                    <div className="alert alert-success">
                        <strong>✓ Başarılı!</strong> Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-error">
                        <strong>✗ Hata:</strong> {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Ad Soyad <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input ${errors.name ? "input-error" : ""}`}
                            placeholder="Ad Soyad"
                            disabled={loading}
                        />
                        {errors.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            E-posta <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? "input-error" : ""}`}
                            placeholder="ornek@email.com"
                            disabled={loading}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                            Konu <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`form-input ${errors.subject ? "input-error" : ""}`}
                            placeholder="Mesajınızın konusu"
                            disabled={loading}
                        />
                        {errors.subject && (
                            <span className="error-message">{errors.subject}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">
                            Mesaj <span className="required">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={`form-textarea ${errors.message ? "input-error" : ""}`}
                            placeholder="Mesajınızı buraya yazın..."
                            rows={6}
                            disabled={loading}
                        />
                        <div className="character-count">
                            {formData.message.length} / 2000 karakter
                        </div>
                        {errors.message && (
                            <span className="error-message">{errors.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Iletisim;
