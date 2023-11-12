import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../types/genre";

export interface IGamesListItem {
    genre: string;
    id: number;
    publisher: string;
    releaseDate: string;
    thumbnail: string;
    title: string;
}

export enum Sort {
    RELEASE_DATE = "release-date",
    POPULARITY = "popularity",
    ALPHABETICAL = "alphabetical",
    RELEVANCE = "relevance",
}

export enum Platform {
    PC = "pc",
    BROWSER = "browser",
    ALL = "all",
}

export interface gamesState {
    gamesList: IGamesListItem[] | null;
    sortedBy: null | Sort;
    platform: null | Platform;
    genre: null | Genre;
    isload: boolean;
    error: string;
}

const initialState: gamesState = {
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
        addSort(state, action: PayloadAction<gamesState["sortedBy"]>) {
            state.sortedBy = action.payload;
        },
        setData(state, action: PayloadAction<[] | null>) {
            state.gamesList = action.payload;
        },
        setPlatform(state, action: PayloadAction<gamesState["platform"]>) {
            state.platform = action.payload;
        },
        setGenre(state, action: PayloadAction<gamesState["genre"]>) {
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
