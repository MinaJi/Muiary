import React from "react";
import { Route, Routes } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Main from "./pages/Main";
import MyMuiaryTemplate from "./pages/MyMuiaryTemplate";
import Signup from "./pages/Signup";

function Router() {
  return (
    <>
    <MainHeader />
      <Routes>
        <Route path="/">
          <Route index path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mymuiary" element={<MyMuiaryTemplate />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
