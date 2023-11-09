import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { Spin, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../toolkitRedux/hooks";
import { useEffect, useCallback } from "react";
import {
    setDataGame,
    setLoadGame,
    setGameError,
} from "../../../toolkitRedux/toolkitSliceGame";
import GameLayout from "../../GameLayout/GameLayout";
import { fetchWithTimeout } from "../../../libs/fetchWithTimeout";
import NotWorkingServicePage from "../NotWorkingServicePage/NotWorkingServicePage";
import { Link } from "react-router-dom";
import { getItemFromCache, setItemToCache } from "../../../libs/cache";

function GamePage() {
    const id = useParams().id;

    const dispatch = useAppDispatch();
    const isloadGame = useAppSelector((state) => state.sliceGame.isLoadGame);
    const gameError = useAppSelector((state) => state.sliceGame.gameError);
    const dataGame = useAppSelector((state) => state.sliceGame.dataGame);

    let countRequests = 0;
    const maxRequests = 3;

    const getDataGame = useCallback(() => {
        return async () => {
            const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "bd3fe325d8mshf112ef355bf466dp1df81cjsnfb70b0c0201e",
                    "X-RapidAPI-Host":
                        "free-to-play-games-database.p.rapidapi.com",
                },
            };

            dispatch(setLoadGame(true));
            dispatch(setGameError(""));

            const item = getItemFromCache(Number(id));

            if (item) {
                dispatch(setDataGame(item));
                dispatch(setLoadGame(false));
                return;
            }
            while (countRequests < maxRequests) {
                try {
                    console.log(countRequests);
                    dispatch(setLoadGame(true));
                    const response = await fetchWithTimeout(url, options);
                    const jsonData = await response.json();
                    dispatch(setDataGame(jsonData));
                    setItemToCache(Number(id), jsonData);
                    countRequests = 0;
                    dispatch(setGameError(""));
                    break;
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === "AbortError") {
                            dispatch(setGameError("AbortError"));
                        }
                        dispatch(setGameError(error.message));
                        countRequests++;
                    }
                } finally {
                    dispatch(setLoadGame(false));
                }
            }
        };
    }, []);

    useEffect(() => {
        dispatch(getDataGame());
    }, []);

    if (gameError) {
        return (
            <NotWorkingServicePage error={gameError}></NotWorkingServicePage>
        );
    }

    if (isloadGame || !dataGame) {
        return (
            <div className={styles.wrapperSpin}>
                <Spin size="large" spinning className={styles.spin}></Spin>
            </div>
        );
    }

    if (!isloadGame && dataGame) {
        return (
            <>
                <Link to="/">
                    <Button type="primary" className={styles.back}>
                        Назад
                    </Button>
                </Link>
                <GameLayout {...dataGame}></GameLayout>
            </>
        );
    }
}

export default GamePage;
