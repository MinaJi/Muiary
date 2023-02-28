import { async } from "@firebase/util";
import { Avatar, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";

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

const Btn = styled.button`
  background-color: black;
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 20px;
`;

function FollowProfile({ data, myFollowers, myFollowing }) {
  const [userData, setUserData] = useState([]);
  const { user } = UserAuth();
  const navi = useNavigate();
  const [buttonText, setButtonText] = useState("Follow");

  function isFollowing() {
    if (myFollowing.some((el) => el.uid === `${data}`)) {
      setButtonText("Following");
    }
  }

  useEffect(() => {
    isFollowing();
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
    });
    return () => unsub();
  }, []);

  return (
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
              <>
                <Btn id="btn" value={buttonText}>
                  {buttonText}
                </Btn>
              </>
            )}
          </Grid>
        </GridContainer>
      ))}
    </>
  );
}

export default FollowProfile;
