import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled(Grid)`
  && {
    font-size: 30px;
    input {
      width: 500px;
      border: 1px solid gray;
      border-radius: 10px;
    }
    .title {
      height: 40px;
    }
    .contents {
      height: 300px;
    }
  }
`;

function CreateItem() {
  return (
    <StyledContainer container direction="column" alignItems="center">
      <Grid item>Search</Grid>
      <Grid item>
        <p>Title</p>
        <input className="title" />
      </Grid>
      <Grid item>
        <p>Contents</p>
        <input className="contents" />
      </Grid>

      <Grid item>
        <button>Submit</button>
      </Grid>
    </StyledContainer>
  );
}

export default CreateItem;
