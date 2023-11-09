import { Routes, Route } from "react-router-dom";

import GamesPage from "../pages/GamesPage/GamesPage";
import GamePage from "../pages/GamePage/GamePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<GamesPage />}></Route>
            <Route path=":id" element={<GamePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
}

export default App;
