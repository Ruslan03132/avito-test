import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSliceGamesList from "./toolkitSliceGamesList";
import toolkitSliceGame from "./toolkitSliceGame";

const rootReducer = combineReducers({
    sliceGamesList: toolkitSliceGamesList,
    sliceGame: toolkitSliceGame,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
