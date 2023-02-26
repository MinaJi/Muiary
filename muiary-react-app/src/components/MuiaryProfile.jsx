import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import ProfileImageModal from "./ProfileImageModal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../context/UserDataContext";

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

function MuiaryProfile({ userData, userId }) {
  const { user } = UserAuth();
  const { users } = UserData();
  const { username } = useParams();
  const navi = useNavigate();
  const [profileImageModal, setProfileImageModal] = useState(false);

  const handleModal = () => {
    setProfileImageModal(true);
  };

  const handleFollow = async (uid) => {
    if (!uid) return false;
    const followerRef = collection(db, "usernames", username, "follower");
    const followingRef = collection(
      db,
      "usernames",
      users.username,
      "following"
    );
    try {
      await addDoc(followerRef, {
        uid: user.uid,
      });
      await addDoc(followingRef, {
        uid: userId,
        username: username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <Grid item className="bio">
              <p>{userData[item].bio}</p>
            </Grid>
            <Grid item>
              {user.uid === userData[item].id ? (
                <EditBtn onClick={() => navi("/mypage/profile")}>
                  Edit Profile
                </EditBtn>
              ) : (
                <>
                  <Grid item>
                    <button onClick={() => handleFollow(user.uid)}>
                      팔로우하기
                    </button>
                  </Grid>
                </>
              )}
            </Grid>
            <div>
              <button onClick={() => navi("followers")}>팔로워</button>
            </div>
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
