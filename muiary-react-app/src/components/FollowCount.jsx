import { Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_NUMBER_OF_FOLLOWERS,
  SET_NUMBER_OF_FOLLOWING,
} from "../redux/slice/followSlice";

const Btn = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  span {
    font-weight: 600;
  }
`;

function FollowCount() {
  const navi = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  const numOfFollowers = useSelector((state) => state.follow.followers);
  const numOfFollowing = useSelector((state) => state.follow.following);

  useEffect(() => {
    const getNumberOfFollowers = async () => {
      let list = [];
      const followergRef = collection(db, "usernames", username, "follower");
      try {
        const followers = await getDocs(followergRef);
        followers.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        dispatch(
          SET_NUMBER_OF_FOLLOWERS({
            followers: list.length,
          })
        );
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
        dispatch(
          SET_NUMBER_OF_FOLLOWING({
            following: list.length,
          })
        );
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
          Followers <span>{numOfFollowers.followers}</span>
        </Btn>
      </Grid>
      <Grid item>
        <Btn onClick={() => navi("following")}>
          Following <span>{numOfFollowing.following}</span>
        </Btn>
      </Grid>
    </Grid>
  );
}

export default FollowCount;
