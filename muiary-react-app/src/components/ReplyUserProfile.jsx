import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import { Avatar, Grid } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GridContainer = styled(Grid)`
  && {
    .username {
      font-weight: 700;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

function ReplyUserProfile({ userId }) {
  const navi = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where(documentId(), "==", `${userId}`)
    );
    const getUserData = onSnapshot(q, (qSnapshot) => {
      let list = [];
      qSnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setUserData(list);
    });
    return () => getUserData();
  }, []);

  return (
    <GridContainer container>
      {userData.map((item) => (
        <>
          <Grid item key={item.id}>
            <StyledAvatar
              src={item.profileImgUrl}
              onClick={() => navi(`/muiary/${item.username}`)}
            />
          </Grid>
          <Grid item className="username">
            @{item.username}
          </Grid>
        </>
      ))}
    </GridContainer>
  );
}

export default ReplyUserProfile;
