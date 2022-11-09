import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 400px;
`;

const StyledGrid = styled(Grid)`
  && {
    padding-top: 75px;
  }
`;

function MainPage() {
  return (
    <StyledGrid container>
      <Grid item>메인페이지</Grid>
      <Grid item>
        <Img src="static/muiarylogo.png" alt="muiarylogo" />
      </Grid>
    </StyledGrid>
  );
}

export default MainPage;
