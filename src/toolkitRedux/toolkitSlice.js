import { createSlice } from "@reduxjs/toolkit";

const initialState = {gamesList: null};
const toolkitSlice = createSlice({
    name: "toolkit",
    initialState,
    reducers: {
        async getGames(state){
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
                state.gamesList = gamesJson;
                console.log(gamesJson);
            } catch (error) {
                console.error(error);
            }
        }
    }

});



