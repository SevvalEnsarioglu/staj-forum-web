import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./styles/App.css";
import Anasayfa from "./pages/Anasayfa";
import ChatStj from "./pages/ChatStj";
import Forum from "./pages/Forum";
import ForumKonuSecimi from "./pages/ForumKonuSecimi";
import Hakkinda from "./pages/Hakkinda";
import Iletisim from "./pages/Iletisim";
import CVAnaliz from "./pages/CVAnaliz";
import Giris from "./pages/Giris";
import Kayit from "./pages/Kayit";

import TopAppBar from "./components/TopAppBar";
import BottomBar from "./components/BottomBar";

const AppRoutes = () => {
    const routes = [
        { path: "/", element: <Anasayfa /> },
        { path: "/anasayfa", element: <Anasayfa /> },
        { path: "/forum", element: <Forum /> },
        { path: "/forum/:id", element: <ForumKonuSecimi /> },
        { path: "/chatstj", element: <ChatStj /> },
        { path: "/cv-analiz", element: <CVAnaliz /> },
        { path: "/hakkinda", element: <Hakkinda /> },
        { path: "/giris", element: <Giris /> },
        { path: "/kayit", element: <Kayit /> },
        { path: "/iletisim", element: <Iletisim /> },
    ] as const;

    return useRoutes(routes as any);
};

function App() {
    return (
        <Router>
            <TopAppBar />
            <main className="app-main">
                <AppRoutes />
            </main>
            <BottomBar />
        </Router>
    );
}

export default App;