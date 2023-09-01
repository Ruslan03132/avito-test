import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gamesList: [],
    sortedBy: null,
    platform: null,
    genre: null,
    isload: false,
    error: "",
};

const toolkitSliceGamesList = createSlice({
    name: "sliceGamesList",
    initialState,
    reducers: {
        addSort(state, action) {
            state.sortedBy = action.payload;
        },
        getData(state, action) {
            state.gamesList = action.payload;
        },
        setPlatform(state, action) {
            state.platform = action.payload;
        },
        setGenre(state, action) {
            state.genre = action.payload;
        },
        setLoad(state, action) {
            state.isload = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export default toolkitSliceGamesList.reducer;
export const { addSort, getData, setPlatform, setGenre, setLoad, setError } =
    toolkitSliceGamesList.actions;
