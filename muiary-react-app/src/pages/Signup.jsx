import React from "react";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";
import { Grid } from "@mui/material";

const StyledDiv = styled(Grid)`
  background-color: blue;
`;

function Signup() {
  return (
    <StyledDiv>
      <SignupForm />
    </StyledDiv>
  );
}

export default Signup;
