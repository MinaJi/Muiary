import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useFormik } from "formik";
import { formSchemas } from "../schemas";
import { RiInformationLine } from "react-icons/ri";
import { useState } from "react";

const GridContainer = styled(Grid)`
  && {
    margin-top: 10%;
  }
`;

const Btn = styled.button`
  background-color: #000;
  border: 1px solid ${(props) => props.theme.borderColor};
  color: #fff;
  padding: 5px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  width: 100%;
  padding: 13px;
  margin: 3px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.red};
    border: none;
    color: #fff;
  }
`;

const StyledForm = styled.form`
  width: 400px;
  p {
    font-weight: 600;
    margin-bottom: 5px;
  }
  .input-div {
    margin-bottom: 8%;
  }
  input {
    border: 1px solid gray;
    height: 45px;
    width: 100%;
    border-radius: 12px;
  }
  .input-error,
  select.input-error {
    border: 1px solid red;
    /* outline: 1px solid red; */
  }
  /* .input-error {
    border: 1px solid red;
  } */
  .i-icon {
    float: right;
    font-size: 24px;
    cursor: pointer;
  }
  .tooltip {
    float: right;
    ::before,
    ::after {
      position: absolute;
      font-size: 13px;
      /* top: 20rem; */
      transform: translateX(-50%) translateY(-200%);
    }
    ::before {
      content: attr(data-tooltip);
      text-align: center;
      color: white;
      width: max-content;
      max-width: 100%;
      background-color: #000000d9;
      /* padding: 0.5rem; */
      padding: 8px;
      border-radius: 10px;
    }
    :hover::before {
    }
  }
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 13px;
  font-weight: 500;
`;

function SignupForm() {
  const navi = useNavigate();
  const { createUser } = UserAuth();

  const onSubmit = async (values, actions) => {
    try {
      await createUser(values.email, values.password).then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          email: values.email,
          username: values.username,
          nickname:
            values.username + Math.floor(100000 + Math.random() * 900000),
          registerDate: new Date().toUTCString(),
          dateOfBirth: "",
          country: "",
          bio: "",
          profileImgUrl: "",
        });
      });
      navi("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { values, handleBlur, handleChange, errors, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      },
      validationSchema: formSchemas,
      onSubmit,
    });

  return (
    <GridContainer container direction="column" alignContent="center">
      <StyledForm onSubmit={handleSubmit}>
        <Grid item className="input-div">
          <p>Email</p>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </Grid>
        <Grid item className="input-div">
          <p>Password</p>
          <input
            type="password"
            id="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <ErrorMsg>{errors.password}</ErrorMsg>
          )}
        </Grid>
        <Grid item className="input-div">
          <p>Confirm Password</p>
          <input
            type="password"
            id="confirmPassword"
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword}</ErrorMsg>
          )}
        </Grid>
        <Grid item className="input-div">
          <p>
            Username
            <span className="i-icon">
              <RiInformationLine />
            </span>
          </p>
          <div
            className="tooltip"
            data-tooltip="유저네임은 주소로 사용될거임"
          />
          <input
            id="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.username && touched.username ? "input-error" : ""}
          />
          {errors.username && touched.username && (
            <ErrorMsg>{errors.username}</ErrorMsg>
          )}
        </Grid>
        <Grid item>
          <Btn type="submit">Continue to email vartification</Btn>
          {/* 이거 버튼타입 서브밋해도되나? */}
        </Grid>
      </StyledForm>
    </GridContainer>
  );
}

export default SignupForm;
