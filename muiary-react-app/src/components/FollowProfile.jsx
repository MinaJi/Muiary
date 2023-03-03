import { Avatar, Grid } from "@mui/material";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import FollowProfileSkeleton from "./FollowProfileSkeleton";

const GridContainer = styled(Grid)`
  && {
    padding: 10px;
    align-items: center;
    display: flex;
    .avatar {
      width: 65px;
      height: 65px;
      cursor: pointer;
    }
    .profile-div {
      flex: 1;
    }
    button {
      background-color: black;
      border: none;
      color: #fff;
      padding: 10px;
      border-radius: 20px;
    }
    .remove-btn,
    .following-btn {
      background-color: transparent;
      border: 1px solid silver;
      color: silver;
    }
  }
`;

const SubContainer = styled(Grid)`
  && {
    line-height: 24px;
    margin-left: 10px;
    .nickname {
      font-weight: 500;
      font-size: 18px;
    }
    .username {
      color: #5c5c5c;
    }
  }
`;

function FollowProfile({ followerData, followingData, data }) {
  const [userData, setUserData] = useState([]);
  const { user } = UserAuth();
  const { users, username } = useOutletContext();
  const navi = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Follow");
  const [btnClassName, setBtnClassName] = useState("btn");
  const { myFollowing, myFollowers } = useOutletContext();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where(documentId(), "==", `${data}`)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setUserData(list);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    async function isFollowing() {
      if (users.username === username) {
        if (followerData) {
          setButtonText("Remove");
          setBtnClassName("remove-btn");
        } else if (followingData) {
          setButtonText("Following");
          setBtnClassName("following-btn");
        }
      } else {
        if (myFollowing.some((el) => el.uid === followerData)) {
          setButtonText("Following");
          setBtnClassName("following-btn");
        } else if (myFollowing.some((el) => el.uid === followingData)) {
          setButtonText("Following");
          setBtnClassName("following-btn");
        }
      }
    }
    isFollowing();
  }, [userData, username]);

  return (
    <>
      {isLoading ? (
        <FollowProfileSkeleton cards={1} />
      ) : (
        <>
          {userData.map((item, i) => (
            <GridContainer container key={i}>
              <Grid item>
                <Avatar
                  src={item.profileImgUrl}
                  className="avatar"
                  onClick={() => navi(`/muiary/${item.username}`)}
                />
              </Grid>
              <Grid item className="profile-div">
                <SubContainer container direction="column">
                  <Grid item className="nickname">
                    <p>{item.nickname}</p>
                  </Grid>
                  <Grid item className="username">
                    <p>@{item.username}</p>
                  </Grid>
                </SubContainer>
              </Grid>
              <Grid item className="btn-div">
                {user.uid !== item.id && (
                  <button className={btnClassName}>{buttonText}</button>
                )}
              </Grid>
            </GridContainer>
          ))}
        </>
      )}
    </>
  );
}

export default FollowProfile;
