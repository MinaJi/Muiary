import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GridContainer = styled(Grid)`
  && {
    width: max-content;
    height: max-content;
    padding: 20px;
    .content {
      margin-top: 6px;
      line-height: 23px;
    }
    .title {
      font-weight: 500;
    }
    .date {
      font-size: 15px;
      color: silver;
    }
  }
`;

function SkeletonCard({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <GridContainer container direction="column" key={i}>
        <Grid item>
          <Skeleton width="250px" height="250px" />
        </Grid>
        <Grid item className="content">
          <Grid item className="title">
            <Skeleton width="250px" />
          </Grid>
          <Grid item className="date">
            <Skeleton width="250px" />
          </Grid>
        </Grid>
      </GridContainer>
    ));
}

export default SkeletonCard;
