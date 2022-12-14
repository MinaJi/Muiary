import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { UserData } from "../context/UserDataContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

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
  const { username } = useParams();
  const [userdata, setUserdata] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  async function getAllUsers() {
    const userData = {};
    const q = query(
      collection(db, "users"),
      where("username", "==", `${username}`)
    );
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      userData[doc.id] = doc.data();
    });
    return userData;
  }

  useEffect(() => {
    const getUserDocs = async () => {
      try {
        const getUserDocs = await getAllUsers();
        setUserdata(getUserDocs);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDocs();
  }, []);

  return (
    <>
      {Object.keys(userdata).map((item, i) => (
        <Grid container direction="column" alignItems="center" key={i}>
          <AvatarGrid item>
            <Avatar className="avatar" src={userdata[item].profileImgUrl} />
          </AvatarGrid>
          <NameGrid item>
            <p>{userdata[item].nickname}</p>
          </NameGrid>
          <Grid item>
            <p>@{userdata[item].username}</p>
          </Grid>
          {openEditModal ? (
            <Grid item>???????????? ?????? ????????? ????????????</Grid>
          ) : (
            <Grid item>
              <p>{userdata[item].bio}</p>
            </Grid>
          )}
          <Grid item>
            <EditBtn onClick={handleEdit}>Edit Bio</EditBtn>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default MuiaryProfile;
