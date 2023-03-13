import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import followReducer from "./slice/followSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer,
    user: userReducer,
  },
});

export default store;
