import { async } from "@firebase/util";
import { border } from "@mui/system";
import {
  collection,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Card from "../components/Card";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import MainHeader from "../components/MainHeader";
import { Grid } from "@mui/material";
import FeedTemplate from "../components/FeedTemplate";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    .contents-wrapper {
      width: 100vw;
      margin-top: 65px;
    }
  }
`;

function ExploreFeed() {
  return (
    <>
      <MainHeader />
      <GridContainer container>
        <Grid item className="contents-wrapper">
          <FeedTemplate />
        </Grid>
      </GridContainer>
    </>
  );
}

export default ExploreFeed;
