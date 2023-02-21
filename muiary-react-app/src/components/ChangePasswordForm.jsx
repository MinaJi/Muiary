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
import { RiInformationLine } from "react-icons/ri";

const GridContainer = styled(Grid)`
  && {
    .btn {
      background-color: #000000;
      color: white;
      border: none;
      border-radius: 20px;
      font-size: 20px;
    }
    label p {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .icon {
      padding-right: 2px;
    }
  }
`;

const FormContainer = styled(Grid)`
  && {
    margin: 20px 0px 20px 0px;
    input {
      border: 1px solid silver;
      border-radius: 20px;
      padding: 10px;
      width: 50%;
      margin-bottom: 5px;
    }
    button {
      background-color: ${(props) => props.theme.buttonColor};
      border: 1px solid ${(props) => props.theme.borderColor};
      color: ${(props) => props.theme.textColor};
      border-radius: 20px;
      width: max-content;
      height: max-content;
      padding: 8px;
      margin: 3px;
      :hover {
        background-color: ${(props) => props.theme.red};
        border: 1px solid #f73859;
        color: #fff;
      }
    }
  }
`;

function ChangePasswordForm({ isFormOpened }) {
  const { changePassword, user } = UserAuth();
  const { updateAlert, setUpdateAlert } = useState("");

  // const [showEdit, setShowEdit] = useState(false);

  // const handleShowEdit = () => {
  //   setShowEdit(true);
  // };

  const onSubmit = async (values) => {
    // await reauthenticateWithCredential(user, credential);
    // console.log("?");
    try {
      await changePassword(user, values.newPassword);
      console.log("변경완료");
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleBlur, handleChange, errors, handleSubmit, touched } =
    useFormik({
      initialValues: {
        newPassword: "",
        newPasswordConfirm: "",
      },
      // validationSchema: formSchemas,
      onSubmit,
    });

  return (
    <>
      {isFormOpened && (
        <GridContainer container>
          <FormContainer container direction="column">
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Grid item>
                  <label htmlFor="newPassword">
                    <p>New password</p>
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="newPasswordConfirm">
                    <p>Confirm new password</p>
                  </label>
                  <input
                    type="password"
                    id="newPasswordConfirm"
                    value={values.newPasswordConfirm}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Grid container className="info">
                    <Grid item className="icon">
                      <RiInformationLine />
                    </Grid>
                    <Grid item>
                      <p>
                        Make sure password is at least 8 characters, including
                        at least one number and letter and special characters,
                        for example #,?,!.
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <button type="submit">Update</button>
                </Grid>
              </form>
            </Grid>
          </FormContainer>
          {updateAlert && (
            <>
              <p>변경완료!!</p>
            </>
          )}
        </GridContainer>
      )}
    </>
  );
}

export default ChangePasswordForm;
