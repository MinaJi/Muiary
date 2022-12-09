import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const StyledGrid = styled(Grid)`
  && {
    margin-top: 10%;
  }
`;

const StyledInput = styled.input`
  border: 1px solid gray;
  height: 45px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 4%;
`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  padding: 5px;
  font-size: 20px;
  border-radius: 10px;
  width: 100%;
  height: 45px;
  margin: 3px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.red};
    border: none;
    color: #fff;
  }
`;

function SignupForm() {
  const navi = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password).then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          email: email,
          username: username,
          registerDate: new Date().toUTCString(),
          dateOfBirth: "",
          country: "",
          bio: "",
          profileImgUrl: "",
        });
      });
      navi("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <StyledGrid container direction="column" alignContent="center">
      <Grid item>
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <StyledInput
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <StyledInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>Username</p>
          <StyledInput required onChange={(e) => setUsername(e.target.value)} />
          <span>프로필에 보여지는 이름을 설정해주세요.</span>
          <Grid item>
            <Btn type="submit">submit</Btn>
          </Grid>
        </form>
      </Grid>
    </StyledGrid>
  );
}

export default SignupForm;
