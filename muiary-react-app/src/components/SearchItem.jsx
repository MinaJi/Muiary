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
    padding: 10px;
  }
`;

const Btn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 25px;
  color: ${(props) => props.theme.textColor};
  :hover {
    color: #f73859;
  }
`;

const SearchItem = ({
  collectionName,
  artistName,
  trackName,
  artworkUrl100,
  releaseDate,
}) => (
  <GridContainer container>
    <Grid item>
      <img src={artworkUrl100} alt="artword" />
    </Grid>
    <StyledGrid item xs={8}>
      <Grid container direction="column" justifyContent="center">
        <Grid item className="trackname">
          {trackName}
        </Grid>
        <Grid item className="artist">
          {artistName}
        </Grid>
        <Grid item className="album">
          {collectionName}
        </Grid>
        <Grid item className="year">
          {releaseDate}
        </Grid>
      </Grid>
    </StyledGrid>
    <Grid item xs={1}>
      {/* <Btn onClick={this.addDataHandler.bind(this, this.props.data)}>
        <RiAddCircleFill />
      </Btn> */}
      <Btn>
        <RiAddCircleFill />
      </Btn>
    </Grid>
  </GridContainer>
);

export default SearchItem;
