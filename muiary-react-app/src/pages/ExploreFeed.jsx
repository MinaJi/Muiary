import React from "react";
import MainHeader from "../components/MainHeader";
import { Grid } from "@mui/material";
import FeedTemplate from "../components/FeedTemplate";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    .contents-wrapper {
      width: 1200px;
      margin-top: 65px;
    }
  }
`;

function ExploreFeed() {
  return (
    <>
      <GridContainer container justifyContent="center">
        <Grid item className="contents-wrapper">
          <FeedTemplate />
        </Grid>
      </GridContainer>
    </>
  );
}

export default ExploreFeed;
