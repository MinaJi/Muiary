import { Divider, Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";
import FollowProfile from "./FollowProfile";

const GridContainer = styled(Grid)`
  && {
    padding: 30px;
    .header-title {
      font-size: 32px;
      font-weight: 700;
    }
    .divider {
      height: 1px;
      background-color: #ededed;
      border: none;
      /* margin-bottom: 4%; */
    }
    .body {
      width: 100%;
      columns: 2 auto;
    }
  }
`;

function FollowerList() {
  const { followerData, myFollowers, myFollowing } = useOutletContext();

  // function isFollowing() {
  //   if (
  //     myFollowing ||
  //     (followerData.some((el) => el.uid === `${myFollowing.uid}`) &&
  //       myFollowers.some((el) => el.uid === `${myFollowing.uid}`))
  //   ) {
  //     return true;
  //   } else if (!myFollowing) {
  //     return false;
  //   }
  // }

  console.log(myFollowing);

  return (
    <GridContainer container direction="column">
      <Grid item className="header-title">
        <p>Followers</p>
      </Grid>
      <div>
        <hr className="divider" />
      </div>
      <Grid item className="body">
        {followerData.map((item, i) => (
          <div key={i}>
            <FollowProfile
              data={item.id}
              myFollowers={myFollowers}
              myFollowing={myFollowing}
            />
          </div>
        ))}
      </Grid>
    </GridContainer>
  );
}

export default FollowerList;