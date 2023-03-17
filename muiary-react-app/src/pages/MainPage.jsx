import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { ThemeProviderMode } from "../context/themeProvider";
import { darkTheme, theme } from "../theme/theme";

const HeadContainer = styled(Grid)`
  && {
    z-index: -1;
    position: absolute;
    flex: 0;
    top: 0px;
    left: 0px;
    width: 1920px;
    height: 540px;
    background: ${(props) => props.theme.mainPageBg};
    opacity: 1;
  }
`;

const StyledContainer = styled(Container)`
  && {
    height: max-content;
    padding-top: 180px;
    .head {
      padding: 50px;
      .h1 {
        font-size: 80px;
        font-weight: 700;
      }
      .h2 {
        margin-bottom: 20px;
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
`;

const BtnContainer = styled(Grid)`
  && {
    padding: 20px;
    font-size: 20px;
    align-items: center;
    font-weight: 500;
    .btn {
      font-size: 18px;
      margin-left: 10px;
      padding: 10px;
      border: none;
      background-color: black;
      color: #fff;
      border-radius: 10px;
    }
  }
`;

function MainPage() {
  return (
    <>
      <HeadContainer container />
      <StyledContainer>
        <Grid container direction="column">
          <Grid item className="head">
            <p className="h2">Music 🎵 + Diary = Muiary</p>
            <p className="h1">공유하고, 듣고, 발견하세요. </p>
          </Grid>
          <BtnContainer container justifyContent="center">
            <Grid item>
              <p>Are you new to Muiary?</p>
            </Grid>
            <Grid item>
              <button className="btn">지금 가입하기</button>
            </Grid>
            <img alt="s1" src="static/s1.png" width="800px" />
          </BtnContainer>
        </Grid>
      </StyledContainer>
    </>
  );
}

export default MainPage;
