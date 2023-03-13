import React from "react";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import ProfileImageModal from "./ProfileImageModal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { UserData } from "../context/UserDataContext";
import { HiOutlineLocationMarker, HiOutlineCake, HiLink } from "react-icons/hi";
import FollowCount from "./FollowCount";
import EditProfileModal from "./EditProfileModal";
import { BiWorld } from "react-icons/bi";

const GridContainer = styled(Grid)`
  && {
    padding: 20px;
    @media screen and (max-width: 615px) {
      flex-direction: row;
    }
    .nickname {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .username {
      font-size: 15px;
    }
    .bio {
      padding: 5px;
      border-radius: 10px;
      line-height: 23px;
      font-size: 14px;
      max-height: 120px;
      margin-top: 10px;
      margin-bottom: 10px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        background-color: transparent;
        width: 15px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #c1c1c187;
        border: 4px solid transparent;
        border-radius: 20px;
        background-clip: padding-box;
      }
    }
    .country,
    .birthday,
    .location,
    .profileLink {
      .icon {
        margin-right: 3px;
      }
      align-self: flex-start;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .follow {
      font-size: 13px;
      padding: 20px;
    }
    a {
      text-decoration: none;
      color: inherit;
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
    img:hover {
      filter: brightness(80%);
    }
  }
`;

const EditBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  width: 100px;
  padding: 10px;
  margin: 3px;
  :hover {
  }
`;

function MuiaryProfile({ userData, userId }) {
  const { user } = UserAuth();
  const { users } = UserData();
  const { username } = useParams();
  const [profileImageModal, setProfileImageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("The link was clicked.");
  };

  const handleModal = () => {
    if (!userData[0].profileImgUrl) return;
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
            <Grid item className="nickname">
              <p>{userData[item].nickname}</p>
            </Grid>
            <Grid item className="username">
              <p>@{userData[item].username}</p>
            </Grid>
            <Grid item className="bio">
              <p>{userData[item].bio}</p>
            </Grid>
            {userData[item].country !== "" && (
              <Grid item className="country">
                <Grid container>
                  <Grid item>
                    <BiWorld className="icon" />
                  </Grid>
                  <Grid item>
                    <span>{userData[item].country.label}</span>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {userData[item].dateOfBirth !== "" && (
              <Grid item className="birthday">
                <Grid container>
                  <Grid item>
                    <HiOutlineCake className="icon" />
                  </Grid>
                  <Grid item>
                    <span>{userData[item].birthday}</span>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {userData[item].location && (
              <Grid item className="location">
                <Grid container>
                  <Grid item>
                    <HiOutlineLocationMarker className="icon" />
                  </Grid>
                  <Grid item>
                    <span>{userData[item].location}</span>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {userData[item].profileLink && (
              <Grid item className="profileLink">
                <Grid container>
                  <Grid item>
                    <HiLink className="icon" />
                  </Grid>
                  <Grid item>
                    <a href={userData[item].profileLink}>
                      <span>{userData[item].profileLink}</span>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item className="follow">
              <FollowCount />
            </Grid>
            <Grid item>
              {user.uid === userData[item].id ? (
                <EditBtn onClick={() => setEditModal(true)}>
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
          </GridContainer>
          {profileImageModal && (
            <ProfileImageModal
              imgSrc={userData[item].profileImgUrl}
              setProfileImageModal={setProfileImageModal}
            />
          )}
          {editModal && <EditProfileModal setEditModal={setEditModal} />}
        </div>
      ))}
    </>
  );
}

export default MuiaryProfile;
