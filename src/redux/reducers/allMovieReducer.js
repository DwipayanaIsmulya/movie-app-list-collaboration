import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMovie: [],
};

const movieSlice = createSlice({
  name: "seeAll",
  initialState,
  reducers: {
    setAllMovie: (state, action) => {
      state.allMovie = action.payload;
    },
  },
});

export const { setAllMovie } = movieSlice.actions;

export default movieSlice.reducer;
