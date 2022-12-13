import React from "react";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StyledDiv = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.bgColor},
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
      background-color: ${(props) => props.theme.signupBg};
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
      margin-bottom: 12px;
    }
    .loginText {
      text-decoration: underline;
      cursor: pointer;
      font-weight: 600;
      margin-left: 5px;
    }
  }
`;

function Signup() {
  const navi = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <Grid item className="text2">
            <span>
              Already have an account?
              <span
                className="loginText"
                onClick={() => {
                  navi("/signin");
                }}
              >
                Login
              </span>
            </span>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <SignupForm />
        </Grid>
      </StyledDiv>
    </motion.div>
  );
}

export default Signup;
