import React from "react";
import MainHeader from "../components/MainHeader";
import styled from "styled-components";
import { Container } from "@mui/system";
import { Avatar, Badge, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import EditProfilePic from "../components/EditProfilePic";

const StyledContainer = styled(Container)`
  && {
    padding-top: 65px;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    border: 1px solid black;
  }
`;

const Div = styled.div`
  width: 15%;
  height: 100vh;
  background-color: #e0e0e0;
`;

function Mypage() {
  const { user } = UserAuth();

  return (
    <>
      <MainHeader />
      {/* <Div /> */}
      <StyledContainer>
        <StyledGrid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>마이페이지</Grid>
          <Grid item>이메일: {user.email}</Grid>
          <Grid item>
            <EditProfilePic />
          </Grid>
        </StyledGrid>
      </StyledContainer>
    </>
  );
}

export default Mypage;
