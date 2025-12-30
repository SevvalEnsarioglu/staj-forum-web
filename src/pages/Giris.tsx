
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Auth.css';

const Giris: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Giriş Yap</h1>
                    <p>Hesabınıza erişmek için bilgilerinizi girin.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-posta Adresi</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ornek@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Giriş Yap
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Hesabınız yok mu? <Link to="/kayit">Kayıt Ol</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Giris;
