import React from "react";

const BottomBar: React.FC = () => {
    return (
        <footer className="bottom-footer">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="footer-link">
                StajForum
            </a>
            . Tüm hakları saklıdır.
        </footer>
    );
};

export default BottomBar;