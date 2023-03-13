import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: 0,
  following: 0,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    SET_NUMBER_OF_FOLLOWERS: (state, action) => {
      state.followers = action.payload;
    },
    SET_NUMBER_OF_FOLLOWING: (state, action) => {
      state.following = action.payload;
    },
  },
});

export const { SET_NUMBER_OF_FOLLOWERS, SET_NUMBER_OF_FOLLOWING } =
  followSlice.actions;

export default followSlice.reducer;
