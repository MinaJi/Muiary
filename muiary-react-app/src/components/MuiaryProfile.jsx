import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { UserData } from "../context/UserDataContext";
import { useState } from "react";
import { useParams } from "react-router-dom";

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
  const { user } = UserAuth();
  const { users } = UserData();
  const { username } = useParams();

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEdit = () => {
    setOpenEditModal(true);
  };
  
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <AvatarGrid item>
          <Avatar className="avatar" src={user.photoURL} />
        </AvatarGrid>
        <NameGrid item>
          <p>{users.nickname}</p>
        </NameGrid>
        <Grid item>
          <p>@{users.username}</p>
        </Grid>
        {openEditModal ? (
          <Grid item>수정하기 기능 여기에 넣을거임</Grid>
        ) : (
          <Grid item>
            <p>{users.bio}</p>
          </Grid>
        )}
        <Grid item>
          <EditBtn onClick={handleEdit}>Edit Bio</EditBtn>
        </Grid>
      </Grid>
    </>
  );
}

export default MuiaryProfile;
