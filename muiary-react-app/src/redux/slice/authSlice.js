import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_CURRENT_USER: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { SET_CURRENT_USER } = authSlice.actions;

export default authSlice.reducer;
