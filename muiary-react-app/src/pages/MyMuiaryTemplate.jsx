import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Grid } from "@mui/material";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";

const ProfileDiv = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.profileBgColor};
    color: ${(props) => props.theme.textColor};
    height: 100vh;
  }
`;

function MyMuiaryTemplate() {
  const navi = useNavigate();
  return (
    <Grid container>
      <MainHeader />
      <ProfileDiv item xs={3}>
        <MuiaryProfile />
      </ProfileDiv>
      <Grid item xs={9} style={{ paddingTop: "90px" }}>
        <button onClick={() => navi("/mymuiary/upload")}>글쓰기</button>
      </Grid>
    </Grid>
  );
}

export default MyMuiaryTemplate;
