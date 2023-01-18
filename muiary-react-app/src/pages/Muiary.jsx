import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import UserMenu from "../components/UserMenu";

function Muiary() {
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
    <>
      <MainHeader handleOpenUserMenu={handleFunc} />
      {userMenu && <UserMenu />}
      {mainpage && (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}

export default Muiary;
