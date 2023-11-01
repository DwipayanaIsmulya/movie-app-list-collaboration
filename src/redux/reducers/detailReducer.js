import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: [],
};

const movieSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setDetails } = movieSlice.actions;

export default movieSlice.reducer;
