import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Grid } from "@mui/material";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import MyBoardItemLists from "../components/MyBoardItemLists";
import { FaPen } from "react-icons/fa";

const GridContainer = styled(Grid)`
  && {
    .side-div {
      background-color: ${(props) => props.theme.profileBgColor};
      color: ${(props) => props.theme.textColor};
      height: 100vh;
      position: sticky;
      top: 0;
    }
    .contents {
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
        <MyBoardItemLists />
        <Btn onClick={() => navi("/mymuiary/upload")}>
          <FaPen />
        </Btn>
      </Grid>
    </GridContainer>
  );
}

export default MyMuiaryTemplate;
