import { createSlice } from "@reduxjs/toolkit";

const initialState = { dataGame: null, isloadGame: false, gameError: ""};
const toolkitSliceGame = createSlice({
    name: "sliceGame",
    initialState,
    reducers: {
        setDataGame(state, action) {
            state.dataGame = action.payload;
        },
        setLoadGame(state, action) {
            state.isloadGame = action.payload;
        },
        setGameError(state, action) {
            state.error = action.payload;
        },
    },
});

export default toolkitSliceGame.reducer;
export const { setDataGame, setLoadGame, setGameError } =
    toolkitSliceGame.actions;
