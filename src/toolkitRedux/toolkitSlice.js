import { createSlice } from "@reduxjs/toolkit";









const initialState = { gamesList: [], sortedBy: null, platform: null, genre: null };
const toolkitSlice = createSlice({
  name: "toolkit",
  initialState,
  reducers: {
    addSort(state, action){
        state.sortedBy = action.payload;
    },
    getData(state, action){
        state.gamesList = action.payload
    },
    setPlatform(state, action) {
        state.platform = action.payload
    },
    setGenre(state, action) {
        state.genre = action.payload
    }
  },
});

export default toolkitSlice.reducer;
export const {addSort, getData,setPlatform,setGenre} = toolkitSlice.actions;
