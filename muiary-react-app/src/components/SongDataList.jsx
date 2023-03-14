import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";

const GridContainer = styled(Grid)`
  && {
    width: max-content;
    height: max-content;
    padding: 15px;
    position: relative;
    margin: 3px;
    .circular-div {
      position: relative;
      display: inline-block;
      .btn {
        top: -5px;
        left: 30px;
        position: absolute;
        background-color: #000;
        border-radius: 50%;
        border: none;
        width: 18px;
        height: 18px;
        justify-content: center;
        align-items: center;
        display: flex;
        :hover {
          background-color: #f73859;
        }
        .remove-icon {
          font-size: 15px;
          color: #fff;
        }
      }
      .artwork {
        width: 45px;
        border-radius: 50%;
        cursor: pointer;
        :hover {
          filter: brightness(80%);
        }
      }
    }
  }
`;

function SongDataList({ songData, setSongData, setIndexNum }) {
  const deleteHandler = (e, i) => {
    e.preventDefault();
    setSongData((songData) => {
      return songData.filter((_, index) => index !== i);
    });
  };

  const selectHandler = (e, i) => {
    e.preventDefault();
    setIndexNum(i);
  };

  return (
    <GridContainer container>
      {songData.map((item, i) => (
        <Grid item key={i}>
          <div className="circular-div">
            <img
              className="artwork"
              src={item.artworkUrl100}
              alt="artwork"
              onClick={(e) => selectHandler(e, i)}
            />
            <button onClick={(e) => deleteHandler(e, i)} className="btn">
              <RemoveIcon className="remove-icon" />
            </button>
          </div>
        </Grid>
      ))}
    </GridContainer>
  );
}

export default SongDataList;
