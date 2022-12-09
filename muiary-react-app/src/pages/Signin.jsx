import React from "react";
import SigninForm from "../components/SigninForm";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GridContainer = styled(Grid)`
  && {
    margin-top: 100px;
  }
`;

const Img = styled.img`
  width: 150px;
  display: box;
`;

const FormLayout = styled(Grid)`
  && {
    height: 500px;
    border-radius: 10px;
    .signup {
      cursor: pointer;
      text-decoration: underline;
      font-weight: 600;
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
    <GridContainer container justifyContent="center">
      <FormLayout item>
        <Grid item>
          <Img src="static/muiarylogo.png" alt="muiarylogo" />
        </Grid>
        <Grid item>
          <SigninForm />
        </Grid>
        <Grid item>
          <span>
            아직 회원이 아니신가요?
            <span
              className="signup"
              onClick={() => {
                navi("/signup");
              }}
            >
              회원가입하기
            </span>
          </span>
        </Grid>
        <Grid item>
          <Btn>비밀번호 찾기</Btn>
        </Grid>
      </FormLayout>
    </GridContainer>
  );
}

export default Signin;
