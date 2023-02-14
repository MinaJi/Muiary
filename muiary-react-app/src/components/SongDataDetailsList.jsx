import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    width: 1000px;
    padding: 2rem;
  }
`;

function SongDataDetailsList({ songData }) {
  return (
    <GridContainer container>
      <Grid item><p>여기에 접기표시</p></Grid>
      {songData.map((item, i) => (
        <Grid container direction="row">
          <Grid item xs={5}>
            <p>{item.trackName}</p>
          </Grid>
          <Grid item xs={3}>
            <p>{item.artistName}</p>
          </Grid>
          <Grid item xs={4}>
            {item.collectionName}
          </Grid>
        </Grid>
      ))}
    </GridContainer>
  );
}

export default SongDataDetailsList;
