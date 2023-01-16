import { Divider, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";

const GridContainer = styled(Grid)`
  && {
    margin-top: 5px;
    max-width: 1100px;
    .header {
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
`;

const Btn = styled.button`
  width: 35px;
  height: 35px;
  border: 1px solid silver;
  background-color: transparent;
  padding: 5px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 5px;
`;

function BoardHeader() {
  return (
    <GridContainer container direction="column">
      <Divider />
      <Grid container className="header">
        <Grid item>
          <Btn>
            <BsList />
          </Btn>
        </Grid>
        <Grid item>
          <Btn>
            <CgMenuGridR />
          </Btn>
        </Grid>
      </Grid>
    </GridContainer>
  );
}

export default BoardHeader;
