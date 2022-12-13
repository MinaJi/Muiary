import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const StyledInput = styled.input`
  color: ${(props) => props.theme.textColor};
  border: ${(props) => props.theme.inputBorder};
  border-radius: 20px;
  width: 250px;
  height: 40px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.inputBg};
  :focus {
    outline: none;
    border: 2px solid #f1d18a;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  background-color: black;
  border: none;
  color: white;
  border-radius: 20px;
  height: 40px;
  width: 100%;
  :hover {
    background-color: #f73859;
  }
`;

const GridContainer = styled(Grid)`
  && {
    margin-top: 20px;
    .formlayout {
      margin-bottom: 20px;
    }
    .btn {
      margin-top: 32px;
    }
    .inputDiv {
      background-color: ${(props) => props.theme.inputBg};
      display: flex;
      margin-bottom: -7px;
      box-sizing: border-box;
      border: ${(props) => props.theme.inputBorder};
      border-radius: 20px;
      height: 40px;
      margin-bottom: 5px;
      :focus-within {
        outline: none;
        border: 2px solid #f1d18a;
      }
    }
    .passwordInput {
      color: ${(props) => props.theme.textColor};
      flex-grow: 1;
      border: none;
      background-color: inherit;
      border-radius: 20px;
      box-sizing: inherit;
      :focus {
        outline: none;
      }
    }
    .spanIcon {
      cursor: pointer;
      font-size: 23px;
      margin-top: 7px;
      box-sizing: inherit;
      align-items: flex-end;
      margin-right: 4%;
    }
    p {
      margin-bottom: 5px;
      font-weight: 600;
    }
    .spanText {
      margin-left: 3px;
      font-size: 15px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
      :hover {
        color: #f73859;
      }
    }
    .errormsg {
      font-size: 15px;
      border: 1px solid #e11d48;
      border-radius: 10px;
      width: 100%;
      padding: 14px;
      text-align: center;
      background-color: #e11d4757;
      .closeicon {
        margin-left: 20px;
        color: #e11d48;
        cursor: pointer;
      }
    }
  }
`;

function SigninForm() {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="inputDiv">
              <input
                className="passwordInput"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="spanIcon"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </span>
            </div>
          </Grid>
          <Grid item>
            <span
              className="spanText"
              onClick={() => {
                navi("/password-reset");
              }}
            >
              Forgot password?
            </span>
          </Grid>
          <Grid item className="btn">
            <Btn type="submit">Login</Btn>
          </Grid>
        </form>
      </Grid>
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Grid item className="errormsg">
            <span>
              Incorrect username or password.
              <MdClose
                className="closeicon"
                onClick={() => {
                  setError(false);
                }}
              />
            </span>
          </Grid>
        </motion.div>
      )}
    </GridContainer>
  );
}

export default SigninForm;
