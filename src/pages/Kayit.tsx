import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import '../styles/pages/Auth.css';

const Kayit: React.FC = () => {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (error) clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }

        try {
            await register({
                firstName: formData.name,
                lastName: formData.surname,
                email: formData.email,
                password: formData.password
            });
            navigate('/');
        } catch (err) {
            // Error is handled in store
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Kayıt Ol</h2>
                    <p>StajForum topluluğuna katılmak için hesap oluşturun.</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Ad</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Adınız"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Soyad</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                placeholder="Soyadınız"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-posta Adresi</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ornek@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Şifre Tekrar</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Zaten hesabınız var mı? <Link to="/giris">Giriş Yap</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Kayit;
