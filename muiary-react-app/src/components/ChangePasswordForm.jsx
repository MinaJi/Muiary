import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import { formSchemas } from "../schemas";
import {
  EmailAuthCredential,
  reauthenticateWithCredential,
} from "firebase/auth";

const GridContainer = styled(Grid)`
  && {
    padding: 10px;
    button {
      cursor: pointer;
      background-color: #000000;
      color: white;
      border: none;
      border-radius: 20px;
      font-size: 20px;
    }
  }
`;

function ChangePasswordForm() {
  const { user, credential } = UserAuth();

  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     //   if () {
  //     //     await changePassword().then(alert("비번 변경 완료"));
  //     //   }
  //   } catch (error) {}
  // };
  // old pwd의 입력값이 현재 패스워드와 같을때,
  // new pwd와 confirm new pwd의 값이 같을때
  // updatePassword 실행하기

  const onSubmit = async (values) => {
    await reauthenticateWithCredential(user, credential);
    console.log("?")
  };

  const { values, handleBlur, handleChange, errors, handleSubmit, touched } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      // validationSchema: formSchemas,
      onSubmit,
    });

  return (
    <GridContainer container direction="column">
      <Grid item>
        <p>비밀번호를 변경하시겠습니까?</p>
      </Grid>
      <Grid item>
        <button onClick={handleShowEdit}>Change password</button>
      </Grid>
      {showEdit && (
        <Grid container>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Grid item>
                <p>Old password</p>
                <input
                  type="password"
                  id="oldPassword"
                  value={values.oldPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <p>New password</p>
                <input
                  type="password"
                  id="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <p>Confirm new password</p>
                <input
                  type="password"
                  id="newPasswordConfirm"
                  value={values.newPasswordConfirm}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <button type="submit">update</button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
    </GridContainer>
  );
}

export default ChangePasswordForm;
