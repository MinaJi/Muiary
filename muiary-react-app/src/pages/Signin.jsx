import React from "react";
import SigninForm from "../components/SigninForm";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useTheme } from "../context/themeProvider";

const GridContainer = styled(Grid)`
  && {
    height: 100vh;
    background-color: ${(props) => props.theme.gradientBgColor};
    background-image: ${(props) => props.theme.gradienBgImg};
    background-repeat: no-repeat;
  }
`;

const Div = styled.div`
  margin: 30px;
  .backIcon {
    font-size: 32px;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
    :hover {
      color: #f73859;
    }
  }
`;

const Layout = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.bgColor};
    width: 400px;
    padding: 30px;
    border-radius: 30px;
    box-shadow: ${(props) => props.theme.boxShadow};
    img {
      width: 150px;
    }
    .signinForm {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .signupLink {
      cursor: pointer;
      color: #f73859;
      font-weight: 600;
      margin-left: 5px;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

function Signin() {
  const [ThemeMode] = useTheme();
  const navi = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GridContainer container direction="column" mode={ThemeMode}>
        <Div>
          <RiArrowLeftLine
            className="backIcon"
            onClick={() => {
              navi("/");
            }}
          />
        </Div>
        <Grid container justifyContent="center" style={{ marginTop: "30px" }}>
          <Layout container justifyContent="center">
            <Grid item className="logo">
              <img src="static/muiarylogo.png" alt="muiarylogo" />
            </Grid>
            <Grid item className="signinForm">
              <SigninForm />
            </Grid>
            <Grid item>
              <span>
                Don't hava an account?
                <span
                  className="signupLink"
                  onClick={() => {
                    navi("/signup");
                  }}
                >
                  Create one now.
                </span>
              </span>
            </Grid>
          </Layout>
        </Grid>
      </GridContainer>
    </motion.div>
  );
}

export default Signin;
