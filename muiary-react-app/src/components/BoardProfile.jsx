import { Avatar, Grid } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";

const GridContainer = styled(Grid)`
  && {
    align-items: flex-end;
    padding-right: 10px;
    text-align: right;
    .wrapper {
      position: fixed;
      width: max-content;
    }
    .avatar {
      width: max-content;
      align-self: flex-end;
    }
    .nickname {
      font-weight: 600;
    }
    .username {
      color: #626262
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    margin-bottom: 7px;
    width: 75px;
    height: 75px;
    cursor: pointer;
  }
`;

function BoardProfile({ username }) {
  const navi = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getUserProfileUrl = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", `${username}`)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          setProfileUrl(doc.data().profileImgUrl);
          setNickname(doc.data().nickname);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfileUrl();
  }, []);

  return (
    <GridContainer container direction="column">
      <Grid container className="wrapper" direction="column">
        <Grid item className="avatar">
          <StyledAvatar
            src={profileUrl}
            alt="profile"
            onClick={() => navi(`/muiary/${username}`)}
          />
        </Grid>
        <Grid item className="nickname">
          <p>{nickname}</p>
        </Grid>
        <Grid item className="username">
          <p>@{username}</p>
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default BoardProfile;
