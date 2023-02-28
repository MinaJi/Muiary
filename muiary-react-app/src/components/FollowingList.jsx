import { Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-config";
import FollowProfile from "./FollowProfile";
import { UserData } from "../context/UserDataContext";

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

function FollowingList() {
  const { followingData, myFollowing } = useOutletContext();

  return (
    <GridContainer container direction="column">
      <Grid item className="header-title">
        <p>Following</p>
      </Grid>
      <div>
        <hr className="divider" />
      </div>
      <Grid item className="body">
        {followingData.map((item, i) => (
          <div key={i}>
            <FollowProfile data={item.id} myFollowing={myFollowing} />
          </div>
        ))}
      </Grid>
    </GridContainer>
  );
}

export default FollowingList;
