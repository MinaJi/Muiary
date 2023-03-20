import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLiked: false,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    SET_IS_LIKED: (state, action) => {
      state.isLiked = action.payload;
    },
  },
});

export const { SET_IS_LIKED } = likeSlice.actions;

export default likeSlice.reducer;
