import React from "react";
import MainHeader from "../components/MainHeader";
import styled from "styled-components";
import { Container } from "@mui/system";
import { Avatar, Badge, Grid, IconButton, List, MenuItem } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import EditProfilePic from "../components/EditProfilePic";
import { list } from "firebase/storage";
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
    /* background-color: #e8e8e8; */
    height: 100vh;
    position: fixed;
    width: 15%;
  }
`;

const RigthDiv = styled(Grid)`
  && {
    padding-top: 65px;
    background-clip: content-box;
    padding-left: 15%;
    /* p {
      font-size: 50px;
    } */
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
          <MenuItem key={i} onClick={() => navi(item.url)}>
            <IconButton>
              <i className={item.icon}></i>
            </IconButton>
            <span>{item.title}</span>
          </MenuItem>
        ))}
      </LeftDiv>
      <RigthDiv item>
        <Outlet />
      </RigthDiv>
    </motion.div>
  );
}

export default Mypage;
