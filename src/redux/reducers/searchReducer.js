import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
};

const movieSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = movieSlice.actions;

export default movieSlice.reducer;
