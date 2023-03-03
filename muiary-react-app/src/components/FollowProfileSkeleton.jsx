import { Grid } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    padding: 10px;
    align-items: center;
    display: flex;
    .avatar {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      cursor: pointer;
    }
    .profile-div {
      flex: 1;
    }
    .btn {
      width: 55px;
      border: none;
      color: #fff;
      padding: 10px;
      border-radius: 20px;
    }
  }
`;

const SubContainer = styled(Grid)`
  && {
    line-height: 24px;
    margin-left: 10px;
    width: 150px;
  }
`;

function FollowProfileSkeleton({ cards }) {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <GridContainer container key={i}>
            <Grid item>
              <Skeleton className="avatar" />
            </Grid>
            <Grid item className="profile-div">
              <SubContainer container direction="column">
                <Grid item>
                  <Skeleton />
                </Grid>
                <Grid item>
                  <Skeleton />
                </Grid>
              </SubContainer>
            </Grid>
            <Grid item>
              <Skeleton className="btn" />
            </Grid>
          </GridContainer>
        ))}
    </>
  );
}

export default FollowProfileSkeleton;
