import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { alertTitleClasses, Grid } from "@mui/material";
import MainHeader from "../components/MainHeader";
import { Outlet, useNavigate } from "react-router-dom";
import MyBoardItemLists from "../components/MyBoardItemLists";
import { FaPen } from "react-icons/fa";
import BoardHeader from "../components/BoardHeader";
import BoardItem from "./BoardItem";
import UserMenu from "../components/UserMenu";
import { useState } from "react";
import { useEffect } from "react";

const Div = styled.div`
  height: auto;
  /* min-height: 100%; */
`;

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

const Btn = styled.button`
  background-color: #f73859;
  border-radius: 50%;
  border: none;
  width: 80px;
  height: 80px;
  color: white;
  cursor: pointer;
  font-size: 28px;
  position: fixed;
  bottom: 4rem;
  right: 5rem;
  box-shadow: rgba(97, 97, 97, 0.29) 5px 10px 15px;
  :hover {
    background-color: black;
    animation: bounce 0.4s;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
    animation-iteration-count: infinite;
    @keyframes bounce {
      from {
        transform: translate3d(0, 0, 0);
      }
      to {
        transform: translate3d(0, 20px, 0);
      }
    }
  }
`;

function MyMuiaryTemplate() {
  const navi = useNavigate();
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
        <GridContainer container>
          <Grid item xs={2} className="side-div">
            <MuiaryProfile />
          </Grid>
          <Grid item xs={10} className="contents">
            {/* <BoardHeader /> */}
            <MyBoardItemLists />
          </Grid>
          <Btn onClick={() => navi("/muiary/upload")}>
            <FaPen />
          </Btn>
        </GridContainer>
      )}
    </>
  );
}

export default MyMuiaryTemplate;
