import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { RiAddCircleFill } from "react-icons/ri";

const GridContainer = styled(Grid)`
  && {
    padding: 3px;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    font-size: 13px;
  }
`;

const Btn = styled.button`
  background-color: transparent;
  border: 1px solid lightgray;
  cursor: pointer;
`;

const SearchItem = ({
  collectionName,
  artistName,
  trackName,
  artworkUrl100,
}) => (
  <GridContainer container>
    <Grid item>
      <img src={artworkUrl100} alt="artword" />
    </Grid>
    <StyledGrid item xs={8}>
      <Grid item>곡이름: {trackName}</Grid>
      <Grid item>가수이름: {artistName}</Grid>
      <Grid item>앨범이름: {collectionName}</Grid>
    </StyledGrid>
    <Grid itme xs={1}>
      <Btn>
        <RiAddCircleFill />
      </Btn>
    </Grid>
  </GridContainer>
);

export default SearchItem;
