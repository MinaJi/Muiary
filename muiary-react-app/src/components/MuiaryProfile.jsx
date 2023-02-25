import React, { useEffect } from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import ProfileImageModal from "./ProfileImageModal";
import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase-config";
import FollowerList from "./FollowerList";

const GridContainer = styled(Grid)`
  && {
    padding: 20px;
    @media screen and (max-width: 615px) {
      flex-direction: row;
    }
    .bio {
      padding: 12px;
      border-radius: 10px;
      line-height: 23px;
      font-size: 14px;
      max-height: 100px;
      overflow: auto;
    }
  }
`;

const AvatarGrid = styled(Grid)`
  && {
    padding-bottom: 20px;
    .avatar {
      width: 150px;
      height: 150px;
      cursor: pointer;
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

function MuiaryProfile({ userData, username }) {
  const { user } = UserAuth();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [profileImageModal, setProfileImageModal] = useState(false);
  const [follower, setFollower] = useState([]);

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleModal = () => {
    setProfileImageModal(true);
  };

  const handleFollow = async (uid) => {
    if (!uid) return false;
    const usernameRef = collection(db, "usernames", username, "follower");
    try {
      await addDoc(usernameRef, {
        uid: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFollowerData = async () => {
      let list = [];
      const usernameRef = collection(db, "usernames", username, "follower");
      try {
        const snapshot = await getDocs(usernameRef);
        snapshot.forEach((doc) => {
          list.push({ id: doc.data().uid, ...doc.data() });
        });
        setFollower(list);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowerData();
  }, []);

  return (
    <>
      <>
        {follower.map((item, i) => (
          <div>
            <FollowerList follower={item.id} />
          </div>
        ))}
      </>
      {Object.keys(userData).map((item, i) => (
        <div key={i}>
          <GridContainer container direction="column" alignItems="center">
            <AvatarGrid item>
              <Avatar
                className="avatar"
                src={userData[item].profileImgUrl}
                onClick={handleModal}
              />
            </AvatarGrid>
            <NameGrid item className="nickname">
              <p>{userData[item].nickname}</p>
            </NameGrid>
            <Grid item className="username">
              <p>@{userData[item].username}</p>
            </Grid>
            {openEditModal ? (
              <Grid item>수정하기 기능 여기에 넣을거임</Grid>
            ) : (
              <Grid item className="bio">
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
                <button onClick={() => handleFollow(user.uid)}>
                  팔로우하기
                </button>
              </Grid>
            )}
          </GridContainer>
          {profileImageModal && (
            <ProfileImageModal
              imgSrc={userData[item].profileImgUrl}
              setProfileImageModal={setProfileImageModal}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default MuiaryProfile;
