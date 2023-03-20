import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import followReducer from "./slice/followSlice";
import userReducer from "./slice/userSlice";
import likeReducer from "./slice/likeSlice";
import saveReducer from "./slice/saveSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer,
    user: userReducer,
    like: likeReducer,
    save: saveReducer,
  },
});

export default store;
