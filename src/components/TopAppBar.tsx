import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/staj-forum-logo-no-background.png";
import "../styles/components/TopAppBar.css";

const TopAppBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        closeMenu();
    };

    return (
        <header className="top-app-bar">
            <div className="app-logo">
                <Link to="/" className="logo-link" onClick={closeMenu}>
                    <img src={logo} alt="StajForum Logo" className="logo-image" />
                    <span className="logo-text">StajForum</span>
                </Link>
            </div>

            <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                <ul>
                    <li>
                        <Link to="/anasayfa" className="nav-item" onClick={closeMenu}>
                            Anasayfa
                        </Link>
                    </li>
                    <li>
                        <Link to="/forum" className="nav-item" onClick={closeMenu}>
                            Forum
                        </Link>
                    </li>
                    <li>
                        <Link to="/chatstj" className="nav-item" onClick={closeMenu}>
                            ChatSTJ
                        </Link>
                    </li>
                    <li>
                        <Link to="/cv-analiz" className="nav-item" onClick={closeMenu}>
                            CV Analiz
                        </Link>
                    </li>
                    <li>
                        <Link to="/hakkinda" className="nav-item" onClick={closeMenu}>
                            Hakkında
                        </Link>
                    </li>
                    <li>
                        <Link to="/iletisim" className="nav-item" onClick={closeMenu}>
                            İletişim
                        </Link>
                    </li>

                    {/* Mobile Only Auth Links */}
                    {!isAuthenticated ? (
                        <>
                            <li className="mobile-only">
                                <Link to="/giris" className="nav-item" onClick={closeMenu}>
                                    Giriş Yap
                                </Link>
                            </li>
                            <li className="mobile-only">
                                <Link to="/kayit" className="nav-item" onClick={closeMenu}>
                                    Kayıt Ol
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="mobile-only">
                            <Link to="/profile" className="nav-item" onClick={closeMenu}>
                                Profilim ({user?.firstName})
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="auth-buttons">
                {!isAuthenticated ? (
                    <>
                        <Link to="/giris" className="auth-link outline">
                            Giriş Yap
                        </Link>
                        <Link to="/kayit" className="auth-link">
                            Kayıt Ol
                        </Link>
                    </>
                ) : (
                    <div className="user-profile-menu" onClick={handleProfileClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}>
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                            {user?.firstName} {user?.lastName}
                        </span>
                    </div>
                )}
            </div>

            <button
                className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
                aria-label="Menu aç/kapat"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default TopAppBar;