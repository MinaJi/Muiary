import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

const GridContainer = styled(Grid)`
  && {
    padding: 20px;
    @media screen and (max-width: 615px) {
      flex-direction: row;
    }
  }
`;

const AvatarGrid = styled(Grid)`
  && {
    padding-bottom: 20px;
    .avatar {
      width: 150px;
      height: 150px;
      @media screen and (max-width: 1000px) {
        width: 90px;
        height: 90px;
      }
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
`;

function MuiaryProfile({ userData }) {
  const { user } = UserAuth();
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  return (
    <>
      {Object.keys(userData).map((item, i) => (
        <GridContainer container direction="column" alignItems="center" key={i}>
          <AvatarGrid item>
            <Avatar className="avatar" src={userData[item].profileImgUrl} />
          </AvatarGrid>
          <NameGrid item>
            <p>{userData[item].nickname}</p>
          </NameGrid>
          <Grid item>
            <p>@{userData[item].username}</p>
          </Grid>
          {openEditModal ? (
            <Grid item>수정하기 기능 여기에 넣을거임</Grid>
          ) : (
            <Grid item>
              <p>{userData[item].bio}</p>
            </Grid>
          )}
          <Grid item>
            {user.uid === userData[item].id && (
              <EditBtn onClick={handleEdit}>Edit Bio</EditBtn>
            )}
          </Grid>
          {user.uid !== userData[item].id && (
            <Grid item>
              <button>팔로우하기</button>
            </Grid>
          )}
        </GridContainer>
      ))}
    </>
  );
}

export default MuiaryProfile;
