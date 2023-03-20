import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaved: false,
};

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    SET_IS_SAVED: (state, action) => {
      state.isSaved = action.payload;
    },
  },
});

export const { SET_IS_SAVED } = saveSlice.actions;

export default saveSlice.reducer;
