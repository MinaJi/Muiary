import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import MainHeader from "../components/MainHeader";

const Bg = styled.div`
  width: 1200px;
  height: 1200px;
  filter: blur(2rem);
`;

const GridContainer = styled(Grid)`
  && {
    padding-top: 65px;
    justify-content: center;
    .grid-wrapper {
      border: none;
      border-radius: 20px;
      width: 1200px;
      height: 800px;
      overflow: hidden;
    }
    img {
      filter: blur(5rem);
      width: 1200px;
    }
  }
`;

function SingleItem({ artwork, title, contents, date }) {
  return (
    <>
      <MainHeader />
      <GridContainer container>
        <Grid item className="grid-wrapper">
          <img src={artwork} alt="artwork" />
        </Grid>
      </GridContainer>
    </>
  );
}

export default SingleItem;
