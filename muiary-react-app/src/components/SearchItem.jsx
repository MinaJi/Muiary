import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { RiAddCircleFill } from "react-icons/ri";
import { DotIcon } from "../assets/svgs/index";
import { Component } from "react";

const GridContainer = styled(Grid)`
  && {
    padding: 3px;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    font-size: 14px;
    padding: 10px;
    line-height: 20px;
    .trackname {
      font-weight: 600;
    }
    .artist {
      color: #696969;
    }
    .album {
      color: #a9a9a9;
    }
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

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songData: "",
    };
  }

  addDataHandler = (data) => {
    this.setState({ songData: data });
    this.props.closeModal(false);
    // console.log(data);
  };

  render() {
    const {
      artworkUrl100,
      trackName,
      artistName,
      collectionName,
      releaseDate,
      searchData,
    } = this.props;

    const closeModal = this.props.closeModal;

    return (
      <GridContainer container>
        <Grid item xs={2.5}>
          <img src={artworkUrl100} alt="artwork" />
        </Grid>
        <StyledGrid item xs={8.5}>
          <Grid container direction="column" justifyContent="center">
            <Grid item className="trackname">
              {trackName}
            </Grid>
            <Grid item className="artist">
              {artistName}
            </Grid>
            <Grid item className="album">
              {collectionName}
              <DotIcon />
              {releaseDate}
            </Grid>
          </Grid>
        </StyledGrid>
        <Grid item xs={1}>
          <Btn
            onClick={() => {
              closeModal(false);
            }}
          >
            <RiAddCircleFill />
          </Btn>
        </Grid>
      </GridContainer>
    );
  }
}

export default SearchItem;
