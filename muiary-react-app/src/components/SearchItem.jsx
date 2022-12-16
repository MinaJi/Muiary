import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const SearchItem = ({ kind, artistName, trackName, artworkUrl100 }) => (
  <Grid container>
    <Grid item>
      <img src={artworkUrl100} alt="artwork" />
    </Grid>
    <Grid item>{trackName}</Grid>
  </Grid>
);

export default SearchItem;
