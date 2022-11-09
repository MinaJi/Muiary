import styled from "styled-components";
import React from "react";
import MainFooter from "../components/MainFooter";
import MainPage from "./MainPage";
import MainHeader from "../components/MainHeader";
import { Box } from "@mui/material";
import UserMenu from "../components/UserMenu";
import { useState } from "react";
import { useEffect } from "react";

const Div = styled.div`
  height: auto;
  /* min-height: 100%;
  padding-bottom: 100px; */
`;

// let isResized = true;

function Main() {
  const [userMenu, setUserMenu] = useState(false);
  const [mainpage, setMainpage] = useState(true);

  // const [width, setWidth] = useState(window.innerWidth);
  // const handleWindowSizeChange = () => {
  //   setWidth(window.innerWidth);
  //   isResized = window.innerWidth < 900 ? true : false;
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //     if (width > 899) {
  //       alert("ddd")
  //     }
  //   };
  // }, []);

  // console.log(width);

  const handleFunc = () => {
    setUserMenu((prev) => !prev);
    setMainpage((prev) => !prev);
  };

  return (
    <Div>
      <MainHeader handleOpenUserMenu={handleFunc} />
      {userMenu && <UserMenu />}
      {mainpage && (
        <>
          <MainPage />
          <MainFooter />
        </>
      )}
    </Div>
  );
}

export default Main;
