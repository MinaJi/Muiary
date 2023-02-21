import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    width: max-content;
    height: max-content;
    padding: 15px;
    .grid-wrapper {
      margin: 3px;
      button {
        background-color: transparent;
        border: none;
        width: max-content;
        height: max-content;
      }
      img {
        width: 45px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;

function SongDataList({ songData, setSongData }) {
  const deleteHandler = (e, i) => {
    e.preventDefault();
    setSongData((songData) => {
      return songData.filter((_, index) => index !== i);
    });
  };

  console.log("길이", songData.length);

  return (
    <GridContainer container>
      {songData.map((item, i) => (
        <Grid item key={i} className="grid-wrapper">
          <img src={item.artworkUrl100} alt="artwork" />
          <button onClick={(e) => deleteHandler(e, i)}>x</button>
        </Grid>
      ))}
    </GridContainer>
  );
}

export default SongDataList;
