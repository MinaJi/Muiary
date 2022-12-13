import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useFormik } from "formik";
import { formSchemas } from "../schemas";
import { RiInformationLine, RiInformationFill } from "react-icons/ri";
import { Tooltip } from "./tooltips/Tooltip";

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
    margin-bottom: 8px;
    display: inline-table;
  }
  .input-div {
    margin-bottom: 8%;
  }
  input {
    border: ${(props) => props.theme.formBorder};
    height: 45px;
    width: 100%;
    border-radius: 12px;
    :focus {
      outline: none;
      border: 2px solid #f1d18a;
    }
  }
  .input-error,
  select.input-error {
    border: 1.5px solid #e11d48;
  }
  .i-icon {
    font-size: 24px;
  }
  .error-wrapper {
    display: flex;
    line-height: 1.5;
    font-size: 13px;
    font-weight: 500;
    color: #e11d48;
  }
  .i-icon-fill {
    font-size: 19px;
    margin-right: 3px;
  }
  .error-msg {
    margin-top: 0.1rem;
  }
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
          {errors.email && touched.email && (
            <span className="error-wrapper">
              <span className="i-icon-fill">
                <RiInformationFill />
              </span>
              <span className="error-msg">
                <span>{errors.email}</span>
              </span>
            </span>
          )}
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
            <span className="error-wrapper">
              <span className="i-icon-fill">
                <RiInformationFill />
              </span>
              <span className="error-msg">
                <span>{errors.password}</span>
              </span>
            </span>
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
            <span className="error-wrapper">
              <span className="i-icon-fill">
                <RiInformationFill />
              </span>
              <span className="error-msg">
                <span>{errors.confirmPassword}</span>
              </span>
            </span>
          )}
        </Grid>
        <Grid item className="input-div">
          <p>Username</p>
          <Tooltip
            message="Username is define your profile address."
            direction="top"
          >
            <RiInformationLine className="i-icon" />
          </Tooltip>
          <input
            id="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.username && touched.username ? "input-error" : ""}
          />
          {errors.username && touched.username && (
            <span className="error-wrapper">
              <span className="i-icon-fill">
                <RiInformationFill />
              </span>
              <span className="error-msg">
                <span>{errors.username}</span>
              </span>
            </span>
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
