import React from "react";
import MuiaryProfile from "../components/MuiaryProfile";
import styled from "styled-components";
import { Grid } from "@mui/material";

const ProfileDiv = styled(Grid)`
  && {
    background-color: #dddddd;
    width: 20%;
    height: 100vh;
  }
`;

function MyMuiaryTemplate() {
  return (
    <div>
      <ProfileDiv>
        <MuiaryProfile />
      </ProfileDiv>
    </div>
  );
}

export default MyMuiaryTemplate;
