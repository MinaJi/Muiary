import { Divider, Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";
import FollowerProfile from "./FollowerProfile";

const GridContainer = styled(Grid)`
  && {
    padding: 30px;
    .header-title {
      font-size: 32px;
      font-weight: 700;
    }
    .body {
      width: 100%;
      columns: 2 auto;
    }
  }
`;

function FollowerList() {
  const { username } = useParams();
  const [followerData, setFollowerData] = useState([]);

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

  return (
    <GridContainer container direction="column">
      <Grid item className="header-title">
        <p>Followers</p>
      </Grid>
      <Divider />
      <Grid item className="body">
        {followerData.map((item, i) => (
          <div key={i}>
            <FollowerProfile data={item.id} />
          </div>
        ))}
      </Grid>
    </GridContainer>
  );
}

export default FollowerList;
