import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { Container, Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const SyledContainer = styled(Container)`
  && {
    font-size: 40px;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  border: 1px solid black;
  background-color: inherit;
  border-radius: 30px;
  font-size: 20px;
  padding: 5px;
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
    <SyledContainer>
      <Grid container direction="column" alignContent="center">
        <Grid item style={{ margin: "40px" }}>
          <p>SignupForm</p>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <p>Email</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Username</p>
            <input required onChange={(e) => setUsername(e.target.value)} />
            <Grid item>
              <Btn type="submit">submit</Btn>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </SyledContainer>
  );
}

export default SignupForm;
