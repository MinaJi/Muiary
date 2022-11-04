import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

const Header = styled(Grid)`
  && {
    height: 65px;
    background-color: rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid #cccccc;
    backdrop-filter: blur(20px);
    width: 100%;
    position: fixed;
    padding-left: 15px;
  }
`;

const Btn = styled.button`
  background-color: inherit;
  border: 1px solid black;
  border-radius: 30px;
  width: 70px;
  height: 40px;
`;

const Img = styled.img`
  width: 115px;
`;

function MainHeader() {
  return (
    <>
      <Header container alignItems="center">
        <Container maxWidth="xs">
          <Grid item xs={2} style={{backgroundColor:"red"}}>
            <Img src="/static/logoonlytext.png" alt="logo" />
          </Grid>
          <Grid item xs={4}>
            안녕
          </Grid>
          {/* <Grid item xs={1} style={{backgroundColor:"red"}}>
            <div>
              <Btn>Sign up</Btn>
            </div>
            <div>
              <Btn>Sign in</Btn>
            </div>
          </Grid> */}
        </Container>
      </Header>
    </>
  );
}

export default MainHeader;
