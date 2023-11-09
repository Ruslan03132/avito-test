import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface dataGameProps {
    title: string;
    thumbnail: string;
    publisher: string;
    developer: string;
    release_date: string;
    minimumSystemRequirements: object;
    genre: string;
    screenshots: Array<object>;
}

interface gameState {
    dataGame: dataGameProps | null;
    isLoadGame: boolean;
    gameError: string;
}

const initialState: gameState = {
    dataGame: null,
    isLoadGame: false,
    gameError: "",
};

const toolkitSliceGame = createSlice({
    name: "sliceGame",
    initialState,
    reducers: {
        setDataGame(state: gameState, action: PayloadAction<dataGameProps>) {
            state.dataGame = action.payload;
        },
        setLoadGame(state: gameState, action: PayloadAction<boolean>) {
            state.isLoadGame = action.payload;
        },
        setGameError(state: gameState, action: PayloadAction<string>) {
            state.gameError = action.payload;
        },
    },
});

export default toolkitSliceGame.reducer;
export const { setDataGame, setLoadGame, setGameError } =
    toolkitSliceGame.actions;
