import { Avatar, Grid } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GridContainer = styled(Grid)`
  && {
    .avatar {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    .container-wrapper {
      margin-top: 5px;
      margin-left: 8px;
      line-height: 20px;
      .nickname {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;

function CardProfile(props) {
  const [userData, setUserData] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      let list = [];
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", `${props.nickname}`)
        );
        const qSnapshot = await getDocs(q);
        qSnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUserData(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Grid container>
      {userData.map((item, i) => (
        <GridContainer container key={i} alignItems="stretch">
          <Grid item>
            <Avatar
              src={item.profileImgUrl}
              className="avatar"
              alt="profile-image"
              onClick={() => navi(`/muiary/${item.username}`)}
            />
          </Grid>
          <Grid item className="container-wrapper">
            <Grid container direction="column">
              <Grid item className="nickname">
                {item.nickname}
              </Grid>
              <Grid item className="username">
                @{item.username}
              </Grid>
            </Grid>
          </Grid>
        </GridContainer>
      ))}
    </Grid>
  );
}

export default CardProfile;
