import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ChangeUsernameForm from "../components/ChangeUsernameForm";
import { GrStatusWarning } from "react-icons/gr";

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
      /* margin-bottom: 4%; */
    }
  }
`;

const GridContainer = styled(Grid)`
  && {
    padding: 5%;
    .grid-wrapper {
      padding: 10px;
    }
    .info {
      padding: 10px;
      font-size: 13px;
      color: #505050;
    }
  }
`;

const Btn = styled.button`
  border: 1px solid silver;
  background-color: #fff;
  padding: 10px;
  font-size: 15px;
  border-radius: 15px;
  cursor: pointer;
  :hover {
    background-color: #f73859;
  }
`;

const DeleteBtn = styled.button`
  border: 1px solid silver;
  background-color: #fff;
  color: #e11d48;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;
  :hover {
    /* background-color: #f73859; */
  }
`;

function MypageAccount() {
  const [isPwdFormOpened, setIsPwdFormOpened] = useState(false);
  const [isUsernameFormOpened, setIsUsernameFormOpened] = useState(false);

  return (
    <GridContainer container>
      <Grid item>
        <TitleDiv item>
          <p className="title">Change Password</p>
          <hr className="divider" />
          <Grid container className="grid-wrapper" direction="column">
            <Grid item>
              <Btn onClick={() => setIsPwdFormOpened(true)}>
                Change Password
              </Btn>
            </Grid>
            <Grid item>
              <ChangePasswordForm isFormOpened={isPwdFormOpened} />
            </Grid>
          </Grid>
        </TitleDiv>
        <TitleDiv item>
          <p className="title">Change Username</p>
          <hr className="divider" />
          <Grid container className="grid-wrapper" direction="column">
            <Grid item>
              <Btn
                onClick={(e) => {
                  setIsUsernameFormOpened(true);
                }}
              >
                Change Username
              </Btn>
            </Grid>
            <Grid item className="info">
              <p>Username is what identifies your account.</p>
            </Grid>
            <Grid item>
              <ChangeUsernameForm isFormOpened={isUsernameFormOpened} />
            </Grid>
          </Grid>
        </TitleDiv>
        <TitleDiv item>
          <p className="title">Delete Account</p>
          <hr className="divider" />
        </TitleDiv>
        <Grid container className="grid-wrapper" direction="column">
          <Grid container>
            <Grid item>
              <GrStatusWarning />
            </Grid>
            <Grid item>
              <p>
                When you delete your account, your profile, posts, comments,
                likes and followers will be permanently removed.
              </p>
            </Grid>
          </Grid>
          <Grid item>
            <DeleteBtn>Delete Account</DeleteBtn>
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default MypageAccount;
