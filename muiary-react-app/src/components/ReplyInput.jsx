import { Divider, Grid } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import ReplyList from "./ReplyList";

const InputDiv = styled(Grid)`
  && {
    background-color: #ffffff77;
    width: 100%;
    border: none;
    border-radius: 20px;
    height: max-content;
    padding: 15px;
    .btn {
      font-size: 18px;
      width: max-content;
      height: max-content;
      padding: 5px;
      border: 1px solid silver;
      border-radius: 20px;
      background-color: transparent;
      margin-left: 5px;
      :hover {
        background-color: #f73859;
      }
    }
    .input-div {
      border: 1px solid silver;
      border-radius: 20px;
      height: 50px;
      outline: none;
      background-color: #ffffff;
      display: flex;
      flex-direction: row;
      input {
        width: 90%;
        border: none;
        background-color: transparent;
        outline: none;
        border-radius: 20px;
        height: 45px;
      }
      .button-wrapper {
        width: 10%;
        display: flex;
        button {
          border: none;
          background-color: transparent;
          font-size: 15px;
          font-weight: 600;
          :hover {
            color: #f73859;
          }
          :disabled {
            color: silver;
          }
        }
      }
    }
  }
`;

const StyledDivder = styled(Divider)`
  && {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

function ReplyInput() {
  const { user } = UserAuth();
  const [content, setContent] = useState("");
  const { itemId } = useParams();
  const date = moment().format("YYYY-MM-DD");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "replyItems"), {
        userId: user.uid,
        content: content,
        boardItem: itemId,
        date: date,
        timestamp: serverTimestamp(),
      })
        .then(e.target.reset(""))
        .then(setContent(""));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "replyItems"), {
        userId: user.uid,
        content: e.target.value,
        boardItem: itemId,
        date: date,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <InputDiv>
        <form onSubmit={handleSubmit}>
          <div>
            <span>What do you think of this song?</span>
            <button
              type="button"
              className="btn"
              value="Good song."
              onClick={handleSubmitBtn}
            >
              👍
            </button>
            <button
              type="button"
              className="btn"
              value="It's LIT!"
              onClick={handleSubmitBtn}
            >
              🔥
            </button>
            <button
              type="button"
              className="btn"
              value="Love it."
              onClick={handleSubmitBtn}
            >
              ❤️
            </button>
            <button
              type="button"
              className="btn"
              value="100% AGREE."
              onClick={handleSubmitBtn}
            >
              💯
            </button>
            <button
              type="button"
              className="btn"
              value="Make me dance!"
              onClick={handleSubmitBtn}
            >
              🕺
            </button>
          </div>
          <StyledDivder />
          <div className="input-div">
            <input onChange={(e) => setContent(e.target.value)} />
            <div className="button-wrapper">
              <button type="submit" disabled={content === ""}>
                Upload
              </button>
            </div>
          </div>
        </form>
        <div>
          <ReplyList />
        </div>
      </InputDiv>
    </Grid>
  );
}

export default ReplyInput;
