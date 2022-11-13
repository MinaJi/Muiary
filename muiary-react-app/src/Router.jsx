import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import Main from "./pages/Main";
import MyMuiaryTemplate from "./pages/MyMuiaryTemplate";
import Mypage from "./pages/Mypage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function Router() {
  const { user } = UserAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  return (
    <>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/mypage"
          element={
            <RequireAuth>
              <Mypage />
            </RequireAuth>
          }
        />
        <Route
          path="/mymuiary"
          element={
            <RequireAuth>
              <MyMuiaryTemplate />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default Router;
