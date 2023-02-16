import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion } from "framer-motion";

const GridContainer = styled(Grid)`
  && {
    padding: 10px;
    .list-header {
      color: gray;
      font-size: 14px;
      padding-left: 10px;
    }
    .close-icon {
      cursor: pointer;
    }
    .list-item:nth-child(even) {
      background-color: #fafafa;
    }
    .list-item-wrapper {
      padding: 10px 30px 10px 10px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      &:not(:hover) {
        text-overflow: ellipsis;
      }
      &:hover,
      &:focus {
        span {
          display: inline-block;
          animation-name: scroll-text;
          animation-duration: 15s;
          animation-timing-function: linear;
          animation-delay: 1.3s;
          animation-iteration-count: infinite;
          animation-direction: normal;
        }
      }
      @keyframes scroll-text {
        0% {
          transform: translateX(0%);
        }
        90% {
          transform: translateX(-100%);
        }
        95% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(0%);
        }
      }
    }
    img {
      width: 40px;
      border-radius: 5px;
    }
  }
`;

function SongDataDetailsList({ songData, setOpenList }) {
  return (
    <GridContainer container>
      <Grid container className="list-header">
        <Grid item xs={0.5}></Grid>
        <Grid item xs={5}>
          <p>Song</p>
        </Grid>
        <Grid item xs={3}>
          <p>Artist</p>
        </Grid>
        <Grid item xs={3}>
          <p>Album</p>
        </Grid>
        <Grid item className="close-icon-div">
          <KeyboardArrowUpIcon
            className="close-icon"
            onClick={() => {
              setOpenList(false);
            }}
          />
        </Grid>
      </Grid>
      {songData.map((item, i) => (
        <Grid
          container
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          key={i}
          direction="row"
          className="list-item"
          alignItems="center"
        >
          <Grid item>
            <img src={item.artworkUrl100} alt="artwork" />
          </Grid>
          <Grid item xs={5} className="list-item-wrapper">
            <span>{item.trackName}</span>
          </Grid>
          <Grid item xs={3} className="list-item-wrapper">
            <span>{item.artistName}</span>
          </Grid>
          <Grid item xs={3} className="list-item-wrapper">
            <span>{item.collectionName}</span>
          </Grid>
        </Grid>
      ))}
    </GridContainer>
  );
}

export default SongDataDetailsList;
