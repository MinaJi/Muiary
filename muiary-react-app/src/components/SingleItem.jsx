import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import ReplyInput from "./ReplyInput";
import { DotIcon } from "../assets/svgs/index";
import parser from "html-react-parser";
import "../css/quill.snow.css";
import { FastAverageColor } from "fast-average-color";
import BoardProfile from "./BoardProfile";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { youtubeSearch } from "../apis/youtube";
import { useState } from "react";
import { async } from "@firebase/util";

const GridContainer = styled(Grid)`
  && {
    strong {
      font-weight: bold;
    }
    em {
      font-style: italic;
    }
    padding-top: 65px;
    justify-content: center;
    .grid-wrapper {
      padding: 40px;
      border: none;
      border-radius: 25px;
      width: 1000px;
      height: max-content;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
    }
    .header {
      height: 1px;
      img {
        filter: blur(8rem);
        -webkit-backdrop-filter: blur(8rem);
        width: 1000px;
        z-index: -1;
        background: no-repeat;
      }
    }
    .title {
      /* font-size: 50px; */
      /* font-weight: 800; */
      font-size: 28px;
      font-weight: 600;
    }
    .body-wrapper {
      padding-top: 20px;
      line-height: 32px;
      img {
        width: 250px;
        height: 250px;
        box-shadow: rgba(0, 0, 0, 0.145) 0px 0px 15px;
        border-radius: 7px;
      }
      .body {
        padding: 20px;
        background-color: #ffffff50;
        border-radius: 20px;
        height: 200px;
      }
      .trackname {
        font-size: 35px;
        font-weight: 700;
      }
      .artist {
        font-size: 25px;
        color: #f73859;
        font-weight: 600;
      }
      .album {
        font-size: 16px;
        color: inherit;
      }
    }
    .contents-wrapper {
      background-color: #ffffff70;
      border-radius: 20px;
      max-height: 500px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    .ql-editor {
      overflow-y: scroll;
      max-height: 500px;
      ::-webkit-scrollbar {
        background-color: transparent;
        width: 16px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #c1c1c187;
        border: 4px solid transparent;
        border-radius: 20px;
        background-clip: padding-box;
      }
    }
    .side-nav {
      button {
        position: fixed;
      }
    }
  }
`;

function SingleItem({
  artwork,
  title,
  contents,
  date,
  artistName,
  trackName,
  collectionName,
  releaseDate,
  userId,
  username,
}) {
  const { user } = UserAuth();
  const fac = new FastAverageColor();
  fac
    .getColorAsync(artwork)
    .then((color) => {
      if (color.value[0] >= 230) {
        document.getElementById("artwork-bg").style.filter =
          "blur(8rem) brightness(75%)";
      }
    })
    .catch((e) => {
      console.log(e);
    });

  const urlOpenHandler = () => {
    youtubeSearch(trackName + artistName).then((res) =>
      window.open("https://www.youtube.com/watch?v=" + res.items[0].id.videoId)
    );
  };

  return (
    <>
      <MainHeader />
      <GridContainer container>
        <Grid item xs={1}>
          <BoardProfile username={username} />
        </Grid>
        <Grid item className="grid-wrapper">
          <Grid container className="header">
            <img src={artwork} alt="artwork" id="artwork-bg" />
          </Grid>
          <Grid item className="title">
            <p>{title}</p>
          </Grid>
          <Grid item>
            <p>{date}</p>
          </Grid>
          <Divider />
          <Grid container className="body-wrapper">
            <Grid item xs={3.5}>
              <img src={artwork} alt="artwork" />
            </Grid>
            <Grid item xs={8.5}>
              <Grid container className="body" direction="column" id="body">
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
                <Divider />
                <Grid item>
                  <button onClick={urlOpenHandler}>유튜브</button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="contents-wrapper">
              <Grid item className="contents" xs={12}>
                <div className="ql-editor">{parser(`${contents}`)}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ReplyInput />
          </Grid>
        </Grid>
        <Grid item xs={1} className="side-nav">
          {user.uid === userId && <button>수정, 삭제</button>}
        </Grid>
      </GridContainer>
    </>
  );
}

export default SingleItem;
