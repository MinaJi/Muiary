import React from "react";
import SigninForm from "../components/SigninForm";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

const Div = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  .backIcon {
    font-size: 32px;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
    :hover {
      color: #f1d18a;
    }
  }
`;

const GridContainer = styled(Grid)`
  && {
    height: 100vh;
  }
`;

const Layout = styled(Grid)`
  && {
    width: 400px;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0 0 30px 0 rgba(224, 224, 224, 0.7);
    img {
      width: 150px;
    }
    .signinForm {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .signupLink {
      cursor: pointer;
      text-decoration: underline;
      font-weight: 600;
      margin-left: 5px;
      :hover {
        color: #f73859;
      }
    }
  }
`;

const Btn = styled.button`
  background-color: inherit;
  border: 1px solid black;
  border-radius: 20px;
`;

function Signin() {
  const navi = useNavigate();

  return (
    <>
      <Div>
        <RiArrowLeftLine
          className="backIcon"
          onClick={() => {
            navi("/");
          }}
        />
      </Div>
      <GridContainer
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Layout container justifyContent="center">
          <Grid item className="logo">
            <img src="static/muiarylogo.png" alt="muiarylogo" />
          </Grid>
          <Grid item className="signinForm">
            <SigninForm />
          </Grid>
          <Grid item>
            <span>
              아직 회원이 아니신가요?
              <span
                className="signupLink"
                onClick={() => {
                  navi("/signup");
                }}
              >
                회원가입하기
              </span>
            </span>
          </Grid>
        </Layout>
      </GridContainer>
    </>
  );
}

export default Signin;
