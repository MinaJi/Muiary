import React from "react";
import { Route, Routes } from "react-router-dom";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import Main from "./pages/Main";
import MyMuiaryTemplate from "./pages/MyMuiaryTemplate";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/mymuiary" element={<MyMuiaryTemplate />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
