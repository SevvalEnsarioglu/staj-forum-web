import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/staj-forum-logo-no-background.png";

const TopAppBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
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
                </ul>
            </nav>

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