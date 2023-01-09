import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { parser } from "html-react-parser";

const Bg = styled.div`
  width: 1200px;
  height: 1200px;
  filter: blur(2rem);
`;

function SingleItem({ artwork, title, contents, date }) {
  return (
    <Grid container>
      {/* <Grid itme>{parser({contents})}</Grid> */}
      <Bg style={{ backgroundImage: `url(${artwork})` }}>
        <Grid item>{title}</Grid>
      </Bg>
    </Grid>
  );
}

export default SingleItem;
