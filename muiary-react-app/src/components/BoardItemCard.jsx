import { Grid } from "@mui/material";
import React from "react";
import { BiGridAlt } from "react-icons/bi";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Bg = styled.div`
  width: 200px;
  height: 250px;
  filter: blur(1rem);
`;

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

function BoardItemCard({ artwork, title, date, username }) {
  return (
    <GridContainer container direction="column">
      {/* <Bg style={{ backgroundImage: `url(${artwork})` }} /> */}
      <Grid item>
        <img src={artwork} width="250px" alt="artwork" />
      </Grid>
      <Grid item className="content">
        <Grid item className="title">
          <p>{title}</p>
        </Grid>
        <Grid item className="date">
          <p>{date}</p>
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default BoardItemCard;
