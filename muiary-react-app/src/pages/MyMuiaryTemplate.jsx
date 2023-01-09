import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Grid } from "@mui/material";
import MainHeader from "../components/MainHeader";
import { Outlet, useNavigate } from "react-router-dom";
import MyBoardItemLists from "../components/MyBoardItemLists";
import { FaPen } from "react-icons/fa";
import BoardHeader from "../components/BoardHeader";
import BoardItem from "./BoardItem";

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
  box-shadow: rgba(97, 97, 97, 0.29) 5px 10px 15px;
  :hover {
    background-color: black;
  }
`;

function MyMuiaryTemplate() {
  const navi = useNavigate();
  return (
    <GridContainer container>
      <MainHeader />
      <Grid item xs={2} className="side-div">
        <MuiaryProfile />
      </Grid>
      <Grid item xs={10} className="contents">
        {/* <BoardHeader /> */}
        <MyBoardItemLists />
        <Btn onClick={() => navi("/muiary/upload")}>
          <FaPen />
        </Btn>
      </Grid>
    </GridContainer>
  );
}

export default MyMuiaryTemplate;
