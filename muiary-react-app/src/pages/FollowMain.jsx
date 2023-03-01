import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserData } from "../context/UserDataContext";
import { db } from "../firebase-config";

function FollowMain() {
  const { username } = useParams();
  const { users } = UserData();
  const [followingData, setFollowingData] = useState([]);
  const [followerData, setFollowerData] = useState([]);
  const [myFollowing, setMyFollowing] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);

  useEffect(() => {
    const getAllFollowing = async () => {
      let list = [];
      const usernameRef = collection(db, "usernames", username, "following");
      try {
        const snapshot = await getDocs(usernameRef);
        snapshot.forEach((doc) => {
          list.push({ id: doc.data().uid, ...doc.data() });
        });
        setFollowingData(list);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFollowing();
  }, []);

  useEffect(() => {
    const getMyFollowing = async () => {
      let list = [];
      const usernameRef = collection(
        db,
        "usernames",
        users.username,
        "following"
      );
      try {
        const snapshot = await getDocs(usernameRef);
        snapshot.forEach((doc) => {
          list.push({ id: doc.data().uid, ...doc.data() });
        });
        setMyFollowing(list);
      } catch (error) {
        console.log(error);
      }
    };
    getMyFollowing();
  }, []);

  useEffect(() => {
    const getAllFollower = async () => {
      let list = [];
      const usernameRef = collection(db, "usernames", username, "follower");
      try {
        const snapshot = await getDocs(usernameRef);
        snapshot.forEach((doc) => {
          list.push({ id: doc.data().uid, ...doc.data() });
        });
        setFollowerData(list);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFollower();
  }, []);

  useEffect(() => {
    const getMyFollowers = async () => {
      let list = [];
      const usernameRef = collection(
        db,
        "usernames",
        users.username,
        "follower"
      );
      try {
        const snapshot = await getDocs(usernameRef);
        snapshot.forEach((doc) => {
          list.push({ id: doc.data().uid, ...doc.data() });
        });
        setMyFollowers(list);
      } catch (error) {
        console.log(error);
      }
    };
    getMyFollowers();
  }, []);

  return (
    <div>
      <Outlet
        context={{
          followingData,
          followerData,
          myFollowing,
          myFollowers,
          username,
          users,
        }}
      />
    </div>
  );
}

export default FollowMain;
