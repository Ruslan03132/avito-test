import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import GamesPage from "../pages/GamesPage/GamesPage";
import GamePage from "../pages/GamePage/GamePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GamesPage />}></Route>
            <Route path=":id" element={<GamePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
};

export default App;
