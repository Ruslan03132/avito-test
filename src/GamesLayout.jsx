import { useCallback, useEffect } from "react";
import { Game } from "./Game";

export function GamesLayout() {

    
    const getDataGames = useCallback(async () => {
        const url =
            "https://free-to-play-games-database.p.rapidapi.com/api/games";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "bd3fe325d8mshf112ef355bf466dp1df81cjsnfb70b0c0201e",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        try {
            const gamesData = await fetch(url, options);
            const gamesJson = await gamesData.text();
            console.log(gamesJson);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getDataGames();
    }, []);

    return <div>{}</div>
}
