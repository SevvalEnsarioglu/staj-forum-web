import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopAppBar from "./components/TopAppBar";
import "./App.css";

import Anasayfa from "./pages/Anasayfa";
import ChatStj from "./pages/ChatStj";
import Forum from "./pages/Forum";
import ForumKonuSecimi from "./pages/ForumKonuSecimi";
import Giris from "./pages/Giris";
import Hakkinda from "./pages/Hakkinda";
import Iletisim from "./pages/Iletisim.tsx";
import Kayit from "./pages/Kayit";

function App() {
    return (
        <Router>
            <TopAppBar />
            <main id="root">
                <Routes>
                    <Route path="/" element={<Anasayfa />} />
                    <Route path="/anasayfa" element={<Anasayfa />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/forum/:id" element={<ForumKonuSecimi />} />
                    <Route path="/chatstj" element={<ChatStj />} />
                    <Route path="/hakkinda" element={<Hakkinda />} />
                    <Route path="/iletisim" element={<Iletisim />} />
                    <Route path="/giris" element={<Giris />} />
                    <Route path="/kayit" element={<Kayit />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;