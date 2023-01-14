import styled from "styled-components";
import { Divider, Grid } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = styled(Grid)`
  && {
    width: max-content;
    /* background-color: ${(props) => props.theme.cardBg}; */
    border-radius: 20px;
    border: ${(props) => props.theme.cardBorder};
    padding: 25px;
    margin: 15px;
    .divider {
      margin: 10px;
    }
  }
`;

function FeedCardsSkeleton({ cards }) {
  return (
    <Grid container justifyContent="center">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <Card container direction="column" key={i}>
            <Grid item>
              <Skeleton width="250" heigth="50px" />
            </Grid>
            <Divider className="divider" />
            <Grid item>
              <Skeleton width="250px" height="250px" />
            </Grid>
            <Grid item>
              <Skeleton />
            </Grid>
            <Grid item>
              <Skeleton />
            </Grid>
          </Card>
        ))}
    </Grid>
  );
}

export default FeedCardsSkeleton;
