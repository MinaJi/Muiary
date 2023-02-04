import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { UserData } from "../context/UserDataContext";

const GridContainer = styled(Grid)`
  && {
    label p {
      font-weight: 600;
      margin-bottom: 5px;
      margin-top: 20px;
    }
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
      cursor: pointer;
      :hover {
        background-color: ${(props) => props.theme.red};
        border: 1px solid #f73859;
        color: #fff;
      }
    }
  }
`;

function ChangeUsernameForm({ isFormOpened }) {
  const { users } = UserData();

  const handleSubmit = () => {};

  return (
    <>
      {isFormOpened && (
        <GridContainer container direction="column">
          <Grid item className="info">
            <p>
              Your username is currently{" "}
              <span style={{ fontWeight: "800" }}>@{users.username}</span>.
            </p>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item>
              <label htmlFor="newUsername">
                <p>New Username</p>
              </label>
              <input id="newUsername" />
            </Grid>
            <Grid item>
              <button type="submit">Update</button>
            </Grid>
          </form>
        </GridContainer>
      )}
    </>
  );
}

export default ChangeUsernameForm;
