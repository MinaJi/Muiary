import React from "react";
import { Navigate, Route, Routes, useLocation, Switch } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import BoardItem from "./pages/BoardItem";
import CreateItem from "./pages/CreateItem";
import ExploreFeed from "./pages/ExploreFeed";
import Main from "./pages/Main";
import Muiary from "./pages/Muiary";
import MyMuiaryTemplate from "./pages/MyMuiaryTemplate";
import Mypage from "./pages/Mypage";
import MypageAccount from "./pages/MypageAccount";
import MypageLike from "./pages/MypageLike";
import MypageProfile from "./pages/MypageProfile";
import MypageSaved from "./pages/MypageSaved";
import ResetPassword from "./pages/ResetPassword";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function Router() {
  const { user } = UserAuth();
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route index path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <>
          <Route
            path="/mypage"
            element={
              <RequireAuth>
                <Mypage />
              </RequireAuth>
            }
          >
            <Route path="profile" element={<MypageProfile />} />
            <Route path="account" element={<MypageAccount />} />
            <Route path="saved" element={<MypageSaved />} />
            <Route path="liked" element={<MypageLike />} />
          </Route>
        </>

        <>
          <Route
            path="/muiary"
            element={
              <RequireAuth>
                <Muiary />
              </RequireAuth>
            }
          >
            <Route path=":username" element={<MyMuiaryTemplate />} />
            <Route path="explore" element={<ExploreFeed />} />
            <Route path="upload" element={<CreateItem />} />
            <Route path="pages/:itemId" element={<BoardItem />} />
          </Route>
        </>

        <Route path="/explore" element={<ExploreFeed />} />
        {/* <>
          <Route path="/muiary">
            <Route
              path="/muiary/:username"
              element={
                <RequireAuth>
                  <MyMuiaryTemplate />
                </RequireAuth>
              }
            />
            <Route
              path="/muiary/pages/:itemId"
              element={
                <RequireAuth>
                  <BoardItem />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/muiary/upload"
            element={
              <RequireAuth>
                <CreateItem />
              </RequireAuth>
            }
          />
        </> */}
      </Routes>
    </>
  );
}

export default Router;
