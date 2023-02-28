import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Follow from "./components/FollowCount";
import FollowerList from "./components/FollowerList";
import FollowingList from "./components/FollowingList";
import MyBoardItemLists from "./components/MyBoardItemLists";
import ProfileImageModal from "./components/ProfileImageModal";
import { UserAuth } from "./context/AuthContext";
import BoardItem from "./pages/BoardItem";
import CreateItem from "./pages/CreateItem";
import ExploreFeed from "./pages/ExploreFeed";
import FollowMain from "./pages/FollowMain";
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
import Test from "./pages/Test";

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
            path="/muiary/*"
            element={
              <RequireAuth>
                <Muiary />
              </RequireAuth>
            }
          >
            <Route path=":username" element={<MyMuiaryTemplate />}>
              <Route path="" element={<MyBoardItemLists />} />
              <Route path="" element={<FollowMain />}>
                <Route path="followers" element={<FollowerList />} />
                <Route path="following" element={<FollowingList />} />
              </Route>
            </Route>
            <Route path="upload" element={<CreateItem />} />
            <Route path="pages/:itemId" element={<BoardItem />} />
            <Route path="testpage" element={<Test />} />
          </Route>
        </>
        <Route path="/explore" element={<ExploreFeed />} />
      </Routes>
    </>
  );
}

export default Router;
