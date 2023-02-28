import { Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";

const Btn = styled.button`
  background: transparent;
  border: none;
  
`

function FollowCount() {
  const navi = useNavigate();
  const { username } = useParams();
  const [followerNum, setFollowerNum] = useState(0);
  const [followingNum, setFollowingNum] = useState(0);

  useEffect(() => {
    const getNumberOfFollowers = async () => {
      let list = [];
      const followergRef = collection(db, "usernames", username, "follower");
      try {
        const followers = await getDocs(followergRef);
        followers.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setFollowerNum(list.length);
      } catch (error) {
        console.log(error);
      }
    };
    getNumberOfFollowers();
  }, []);

  useEffect(() => {
    const getNumberOfFollowing = async () => {
      let list = [];
      const followingRef = collection(db, "usernames", username, "following");
      try {
        const followers = await getDocs(followingRef);
        followers.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setFollowingNum(list.length);
      } catch (error) {
        console.log(error);
      }
    };
    getNumberOfFollowing();
  }, []);

  return (
    <Grid container>
      <Grid item>
        <Btn onClick={() => navi("followers")}>
          Followers {followerNum}
        </Btn>
      </Grid>
      <Grid item>
        <Btn onClick={() => navi("following")}>
          Following {followingNum}
        </Btn>
      </Grid>
    </Grid>
  );
}

export default FollowCount;
