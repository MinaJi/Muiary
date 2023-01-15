import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";

const Header = styled(Grid)`
  && {
    margin-top: 5px;
    justify-content: flex-end;
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
`;

function BoardHeader() {
  return (
    <Header container maxWidth="1400px">
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
    </Header>
  );
}

export default BoardHeader;
