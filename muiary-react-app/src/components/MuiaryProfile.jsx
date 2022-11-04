import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";

const AvatarGrid = styled(Grid)`
  && {
    padding-top: 70px;
    padding-bottom: 20px;
  }
  .avatar {
    width: 150px;
    height: 150px;
  }
  @media screen and (max-width: 576px) {
    .avatar {
      width: 50%;
    }
  }
`;

function MuiaryProfile() {
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <AvatarGrid item>
          <Avatar className="avatar" />
        </AvatarGrid>
        <Grid item>
          <p>@지민아</p>
        </Grid>
        <Grid item>
          <p>여기에 소개</p>
        </Grid>
      </Grid>
    </>
  );
}

export default MuiaryProfile;
