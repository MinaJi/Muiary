import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Grid } from "@mui/material";
import MainHeader from "../components/MainHeader";

const ProfileDiv = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.profileBgColor};
    color: ${(props) => props.theme.textColor};
    width: 20%;
    height: 100vh;
  }
`;

function MyMuiaryTemplate() {
  return (
    <div>
      <MainHeader />
      <ProfileDiv>
        <MuiaryProfile />
      </ProfileDiv>
    </div>
  );
}

export default MyMuiaryTemplate;
