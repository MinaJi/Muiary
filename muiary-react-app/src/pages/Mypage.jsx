import React from "react";
import MainHeader from "../components/MainHeader";
import styled from "styled-components";
import { Container } from "@mui/system";
import { Grid, IconButton, List, MenuItem } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
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
    title: "Liked",
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
    width: 15%;
  }
`;

const StyledMenu = styled(MenuItem)`
  && {
    font-weight: 500;
    :hover {
      /* background-color: ${(props) => props.theme.borderColor}; */
    }
    .icon {
      color: ${(props) => props.theme.red};
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
  const { user } = UserAuth();
  const navi = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainHeader />
      <LeftDiv item>
        {menu.map((item, i) => (
          <StyledMenu key={i} onClick={() => navi(item.url)}>
            <IconButton className="icon">
              <i className={item.icon}></i>
            </IconButton>
            <span>{item.title}</span>
          </StyledMenu>
        ))}
      </LeftDiv>
      <RigthDiv item>
        <Outlet />
      </RigthDiv>
    </motion.div>
  );
}

export default Mypage;
