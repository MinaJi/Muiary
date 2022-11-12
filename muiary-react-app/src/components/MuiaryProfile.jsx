import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";

const AvatarGrid = styled(Grid)`
  && {
    padding-top: 90px;
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

const NameGrid = styled(Grid)`
  && {
    font-size: 30px;
  }
`;

const EditBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  color: ${(props) => props.theme.textColor};
  border-radius: 30px;
  width: 100px;
  padding: 10px;
  margin: 3px;
  cursor: pointer;
`;

function MuiaryProfile() {
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <AvatarGrid item>
          <Avatar className="avatar" />
        </AvatarGrid>
        <NameGrid item>
          <p>@MinaJi</p>
        </NameGrid>
        <Grid item>
          <p>여기에 소개</p>
        </Grid>
        <Grid item>
          <EditBtn>Edit Profile</EditBtn>
        </Grid>
      </Grid>
    </>
  );
}

export default MuiaryProfile;
