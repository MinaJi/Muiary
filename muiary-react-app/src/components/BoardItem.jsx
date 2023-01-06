import { Grid } from "@mui/material";
import React from "react";
import { BiGridAlt } from "react-icons/bi";
import styled from "styled-components";

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
  }
`;

function BoardItem({ artwork, title, date }) {
  return (
    <GridContainer container direction="column">
      {/* <Bg style={{ backgroundImage: `url(${artwork})` }} /> */}
      <Grid item>
        <img src={artwork} width="250px" alt="artwork" />
      </Grid>
      <Grid item>{title}</Grid>
      <Grid item>{date}</Grid>
    </GridContainer>
  );
}

export default BoardItem;
