import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { Grid } from "@mui/material";

const StyledInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 20px;
  width: 250px;
  height: 40px;
  margin-bottom: 15px;
`;

const Btn = styled.button`
  cursor: pointer;
  background-color: black;
  border: none;
  color: white;
  border-radius: 20px;
  height: 40px;
  width: 100px;
  :hover {
    background-color: #f73859;
  }
`;

const GridContainer = styled(Grid)`
  margin-top: 20px;
  .formlayout {
    margin-bottom: 20px;
  }
  .btn {
    margin-top: 10px;
  }
`;

function SigninForm() {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navi("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <GridContainer container direction="column" alignItems="center">
      <Grid item className="formlayout">
        <form onSubmit={handleSubmit}>
          <Grid item>
            <p>Email</p>
            <StyledInput
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <p>Password</p>
            <StyledInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item className="btn">
            <Btn type="submit">Login</Btn>
          </Grid>
          {error && <span>이메일또는 비밀번호가 다릅니다.</span>}
        </form>
      </Grid>
    </GridContainer>
  );
}

export default SigninForm;
