import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Div = styled(Grid)`
  && {
    height: 320px;
    overflow-y: auto;
    padding: 10px;
    margin: 0 auto;
    p {
      font-size: 20px;
    }
  }
`;

function NoResults({ closeModal }) {
  return (
    <Div container alignItems="center" justifyContent="center">
      <Grid item>
        <p>No Search Results</p>
      </Grid>
      <button
        onClick={() => {
          closeModal(false);
        }}
      >
        닫기
      </button>
    </Div>
  );
}

export default NoResults;
