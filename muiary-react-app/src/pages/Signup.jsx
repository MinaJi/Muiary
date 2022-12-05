import React from "react";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

const StyledDiv = styled(Grid)`
  && {
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
    .backIcon {
      font-size: 32px;
      cursor: pointer;
      color: ${(props) => props.theme.textColor};
      :hover {
        color: #f1d18a;
      }
    }
    .left {
      background-color: #f73859;
      padding: 35px;
    }
    .logo {
      margin-top: 30px;
      margin-bottom: 15px;
      img {
        width: 150px;
      }
    }
    .text {
      font-size: 35px;
      font-weight: 800;
    }
  }
`;

function Signup() {
  const navi = useNavigate();

  return (
    <StyledDiv container>
      <Grid item xs={4} className="left">
        <Grid item>
          <RiArrowLeftLine
            className="backIcon"
            onClick={() => {
              navi("/");
            }}
          />
        </Grid>
        <Grid item className="logo">
          {/* <img src="/static/logoonlytext.png" alt="logo" /> */}
        </Grid>
        <Grid item>
          <h1 className="text">
            Create a <span style={{ color: "#F1D18A" }}>Muiary</span> account
          </h1>
        </Grid>
        <Grid item>
          <span>Already have an account?</span>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <SignupForm />
      </Grid>
    </StyledDiv>
  );
}

export default Signup;
