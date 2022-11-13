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
  }
`;

function Mypage() {
  const { user } = UserAuth();

  return (
    <>
      <MainHeader />
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
