import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  && {
    width: max-content;
    height: max-content;
    padding: 15px;
    .image-wrapper {
      img {
        width: 45px;
        border-radius: 50%;
        margin: 3px;
        cursor: pointer;
      }
    }
  }
`;

function SongDataList({ songData }) {
  return (
    <GridContainer container>
      {songData.map((item, key) => (
        <Grid item key={key} className="image-wrapper">
          <img src={item.artworkUrl100} alt="artwork" />
        </Grid>
      ))}
    </GridContainer>
  );
}

export default SongDataList;
