import React from "react";
import MainHeader from "../components/MainHeader";
import styled from "styled-components";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const menu = [
  {
    title: "Profile",
    icon: "ri-account-circle-line",
    url: "/mypage/profile",
  },
  {
    title: "Account",
    icon: "ri-user-settings-line",
    url: "/mypage/account",
  },
  {
    title: "Saved",
    icon: "ri-bookmark-line",
    url: "/mypage/saved",
  },
  {
    title: "Likes",
    icon: "ri-heart-2-line",
    url: "/mypage/liked",
  },
];

const LeftDiv = styled(Grid)`
  && {
    padding-top: 65px;
    background-clip: content-box;
    height: 100vh;
    position: fixed;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    font-weight: 500;
    .icon {
      color: ${(props) => props.theme.red};
    }
    .title-text {
      @media screen and (max-width: 758px) {
        display: none;
      }
    }
  }
`;

const RigthDiv = styled(Grid)`
  && {
    padding-top: 65px;
    background-clip: content-box;
    padding-left: 15%;
  }
`;

function Mypage() {
  const navi = useNavigate();

  return (
    <>
      <MainHeader />
      <LeftDiv item>
        {menu.map((item, i) => (
          <StyledMenuItem key={i} onClick={() => navi(item.url)}>
            <IconButton className="icon">
              <i className={item.icon}></i>
            </IconButton>
            <span className="title-text">{item.title}</span>
          </StyledMenuItem>
        ))}
      </LeftDiv>
      <RigthDiv item>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Outlet />
        </motion.div>
      </RigthDiv>
    </>
  );
}

export default Mypage;
