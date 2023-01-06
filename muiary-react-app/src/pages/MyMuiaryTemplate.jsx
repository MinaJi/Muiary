import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Grid } from "@mui/material";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import MyBoardItemLists from "../components/MyBoardItemLists";

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
        <button onClick={() => navi("/mymuiary/upload")}>글쓰기</button>
      </Grid>
    </GridContainer>
  );
}

export default MyMuiaryTemplate;
