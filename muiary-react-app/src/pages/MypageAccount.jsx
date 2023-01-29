import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ChangeUsernameForm from "../components/ChangeUsernameForm";

const TitleDiv = styled(Grid)`
  && {
    .title {
      font-size: 30px;
      font-weight: bold;
    }
    .divider {
      height: 1px;
      background-color: #ededed;
      border: none;
      margin-bottom: 4%;
    }
  }
`;

const GridContainer = styled(Grid)`
  && {
    padding: 5%;
  }
`;

function MypageAccount() {
  return (
    <GridContainer container>
      <Grid item>
        <TitleDiv item>
          <p className="title">Change Password</p>
          <hr className="divider" />
          <Grid item>
            <ChangePasswordForm />
          </Grid>
        </TitleDiv>
        <TitleDiv item>
          <p className="title">Change Username</p>
          <hr className="divider" />
          <Grid item>
            <ChangeUsernameForm />
          </Grid>
        </TitleDiv>
        <TitleDiv item>
          <p className="title">Delete Account</p>
          <hr className="divider" />
        </TitleDiv>
      </Grid>
    </GridContainer>
  );
}

export default MypageAccount;
