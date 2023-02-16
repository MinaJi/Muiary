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
  const deleteHandler = (e, i) => {
    e.preventDefault();
    console.log(i);
  };

  return (
    <GridContainer container>
      {songData.map((item, i) => (
        <Grid item key={i} className="image-wrapper">
          <button onClick={(e) => deleteHandler(e, i)}>삭제</button>
          <img src={item.artworkUrl100} alt="artwork" />
        </Grid>
      ))}
    </GridContainer>
  );
}

export default SongDataList;
