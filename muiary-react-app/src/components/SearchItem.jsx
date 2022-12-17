import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledGrid = styled(Grid)`
  font-size: 13px;
`;

const SearchItem = ({
  kind,
  collectionName,
  artistName,
  trackName,
  artworkUrl100,
}) => (
  <Grid container>
    <Grid item>
      <img src={artworkUrl100} alt="artwork" />
    </Grid>
    <StyledGrid item>
      <Grid item>곡이름: {trackName}</Grid>
      <Grid item>가수이름: {artistName}</Grid>
      <Grid item>앨범이름: {collectionName}</Grid>
      <Grid item>종류: {kind}</Grid>
    </StyledGrid>
    <Grid itme>
      <button>Add</button>
    </Grid>
  </Grid>
);

export default SearchItem;
