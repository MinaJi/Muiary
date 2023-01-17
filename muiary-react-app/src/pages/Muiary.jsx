import { Grid } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import MuiaryProfile from "../components/MuiaryProfile";
import UserMenu from "../components/UserMenu";
import { db } from "../firebase-config";

const GridContainer = styled(Grid)`
  && {
    direction: column;
    @media screen and (max-width: 576px) {
      flex-direction: column;
    }
    .side-div {
      background-color: ${(props) => props.theme.profileBgColor};
      color: ${(props) => props.theme.textColor};
      height: 100vh;
      /* width: 17%; */
      position: sticky;
      top: 0;
      @media screen and (max-width: 576px) {
        height: 30vh;
        width: 100vw;
      }
    }
    .contents {
      width: 83%;
      margin-top: 60px;
    }
  }
`;

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
      <>
        <MainHeader handleOpenUserMenu={handleFunc} />
        {userMenu && <UserMenu />}
      </>
      <>
        {mainpage && (
          <GridContainer container>
            <Grid item xs={2} className="side-div">
              <MuiaryProfile />
            </Grid>
            <Grid item xs={10} className="contents">
              <Outlet />
            </Grid>
          </GridContainer>
        )}
      </>
    </>
  );
}

export default Muiary;
