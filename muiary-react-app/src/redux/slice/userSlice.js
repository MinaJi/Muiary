import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  username: "",
  params: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_STATE: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    SET_PARAMS: (state, action) => {
      state.params = action.payload;
    },
  },
});

export const { SET_USER_STATE, SET_PARAMS } = userSlice.actions;

export default userSlice.reducer;
