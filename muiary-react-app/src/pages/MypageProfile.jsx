import { Grid } from "@mui/material";
import React from "react";
import EditProfilePic from "../components/EditProfilePic";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    padding: 5%;
  }
`;

const StyledInput = styled.input`
  padding: 2%;
  border-radius: 18px;
  border: 1px solid gray;
  font-size: 15px;
`;

function MypageProfile() {
  const { user } = UserAuth();

  console.log(user.id);

  return (
    <>
      <GridContainer container>
        <Grid item xs={9}>
          <div>
            <p>Profile</p>
            <hr />
          </div>
          <StyledInput placeholder={user.email} readOnly />
          <StyledInput placeholder="닉네임" readOnly />
          <StyledInput placeholder="폰번호" readOnly />
          <StyledInput placeholder="생일" readOnly />
          <StyledInput placeholder="bio" readOnly />
        </Grid>
        <Grid item xs={3}>
          <EditProfilePic />
        </Grid>
      </GridContainer>
    </>
  );
}

export default MypageProfile;
