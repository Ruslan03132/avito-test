import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGamesListItem {
    genre: string,
    id: number,
    publisher: string,
    release_date: string,
    thumbnail: string,
    title: string
}

interface gamesState {
    gamesList: IGamesListItem[] | null;
    sortedBy: string;
    platform: string;
    genre: string;
    isload: boolean;
    error: string;
}

const initialState: gamesState = {
    gamesList: [],
    sortedBy: "",
    platform: "",
    genre: "",
    isload: false,
    error: "",
};

const toolkitSliceGamesList = createSlice({
    name: "sliceGamesList",
    initialState,
    reducers: {
        addSort(state, action: PayloadAction<string>) {
            state.sortedBy = action.payload;
        },
        setData(state, action: PayloadAction<[] | null>) {
            state.gamesList = action.payload;
        },
        setPlatform(state, action: PayloadAction<string>) {
            state.platform = action.payload;
        },
        setGenre(state, action: PayloadAction<string>) {
            state.genre = action.payload;
        },
        setLoad(state, action: PayloadAction<boolean>) {
            state.isload = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export default toolkitSliceGamesList.reducer;
export const { addSort, setData, setPlatform, setGenre, setLoad, setError } =
    toolkitSliceGamesList.actions;
