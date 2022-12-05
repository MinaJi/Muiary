import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import CreateItem from "./pages/CreateItem";
import Main from "./pages/Main";
import MyMuiaryTemplate from "./pages/MyMuiaryTemplate";
import Mypage from "./pages/Mypage";
import MypageAccount from "./pages/MypageAccount";
import MypageLike from "./pages/MypageLike";
import MypageProfile from "./pages/MypageProfile";
import MypageSaved from "./pages/MypageSaved";
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
        >
          <Route path="/mypage/profile" element={<MypageProfile />} />
          <Route path="/mypage/account" element={<MypageAccount />} />
          <Route path="/mypage/saved" element={<MypageSaved />} />
          <Route path="/mypage/liked" element={<MypageLike />} />
        </Route>
        <Route
          path="/mymuiary"
          element={
            <RequireAuth>
              <MyMuiaryTemplate />
            </RequireAuth>
          }
        />
        <Route path="/mymuiary/upload" element={<CreateItem />} />
      </Routes>
    </>
  );
}

export default Router;
