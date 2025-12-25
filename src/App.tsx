
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Anasayfa from "./pages/Anasayfa";
import ChatStj from "./pages/ChatStj";
import Forum from "./pages/Forum";
import ForumKonuSecimi from "./pages/ForumKonuSecimi";
import Hakkinda from "./pages/Hakkinda";
import Iletisim from "./pages/Iletisim.tsx";
import CVAnaliz from "./pages/CVAnaliz";

import TopAppBar from "./components/TopAppBar";
import BottomBar from "./components/BottomBar.tsx";

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
                    <Route path="/cv-analiz" element={<CVAnaliz />} />
                    <Route path="/hakkinda" element={<Hakkinda />} />
                    <Route path="/iletisim" element={<Iletisim />} />
                </Routes>
            </main>
            <BottomBar />
        </Router>
    );
}

export default App;