import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hero: [],
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHero: (state, action) => {
      state.hero = action.payload;
    },
  },
});

export const { setHero } = heroSlice.actions;

export default heroSlice.reducer;
