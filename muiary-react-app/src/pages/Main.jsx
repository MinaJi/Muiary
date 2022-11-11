import styled from "styled-components";
import React from "react";
import MainFooter from "../components/MainFooter";
import MainPage from "./MainPage";
import MainHeader from "../components/MainHeader";
import UserMenu from "../components/UserMenu";
import { useState } from "react";
import { useEffect } from "react";

const Div = styled.div`
  height: auto;
  /* min-height: 100%; */
`;

function Main() {
  const [userMenu, setUserMenu] = useState(false);
  const [mainpage, setMainpage] = useState(true);
  const [size, setSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (userMenu && size.width > 899) {
        setUserMenu(false);
        setMainpage(true);
      }
    };
  });

  const handleFunc = () => {
    setUserMenu((prev) => !prev);
    setMainpage((prev) => !prev);
  };

  return (
    <Div>
      <MainHeader handleOpenUserMenu={handleFunc} />
      {userMenu && <UserMenu />}
      {mainpage && (
        <div id="mainpage">
          <MainPage />
          <MainFooter />
        </div>
      )}
    </Div>
  );
}

export default Main;
