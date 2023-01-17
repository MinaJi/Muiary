import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import "animate.css";

const Div = styled(Grid)`
  && {
    height: 320px;
    overflow-y: auto;
    padding: 10px;
    margin: 0 auto;
    .text {
      margin-top: 8px;
      font-size: 17px;
    }
    .emoji {
      text-align: center;
      .face {
        font-size: 35px;
      }
      .bubble {
        font-size: 25px;
        margin-left: 48px;
      }
      /* animation: bounce;
      animation-duration: 1.1s; */
    }
  }
`;

function NoResults() {
  return (
    <Div container alignItems="center" justifyContent="center">
      <Grid item>
        <div className="emoji">
          <p className="bubble">💬</p>
          <p className="face">🤔</p>
        </div>
        <p className="text">No Search Results.</p>
      </Grid>
    </Div>
  );
}

export default NoResults;
